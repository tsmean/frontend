import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

interface LinearFunction {
  slope?: number;
  offset?: number;
  error?: 'isPoint' | 'infiniteSlope';
}

type Slope = number | 'isPoint' | 'infiniteSlope';

@Component({
  selector: 'app-draw-linear-function',
  templateUrl: './draw-linear-function.component.html',
  styleUrls: ['./draw-linear-function.component.scss']
})
export class DrawLinearFunctionComponent implements OnInit {

  // TODO's:
  // redraw

  constructor() {}

  ngOnInit() {

    const getSlope = (dataset): Slope => {
      if (dataset[1].x === dataset[0].x && dataset[1].y === dataset[0].y) {
        return 'isPoint';
      } else if (dataset[1].x === dataset[0].x) {
        return 'infiniteSlope';
      } else {
        return (dataset[1].y - dataset[0].y) / (dataset[1].x - dataset[0].x);
      }
    };

    const getOffset = (dataset): number => {
      const slope = getSlope(dataset);
      if (typeof slope === 'number') {
        return dataset[0].y - dataset[0].x * slope;
      } else {
        return NaN;
      }
    };

    const linearFunction = (x, slope, offset) => {
      return x * slope + offset;
    };

    // dragging
    const drag = d3.behavior.drag()
      .on('drag', function(d, i) {

        (<any>d).x += (<any>d3.event).dx;
        (<any>d).y += (<any>d3.event).dy;
        d3.select(this).attr('transform', function(innerD, innerI){
          return 'translate(' + [ innerD.x, innerD.y ] + ')';
        });
      });

    // end dragging

    // Set graph
    const width = Math.min(700, window.innerWidth - 10);
    const height = width; // must be square
    const padding = 10;

    // create an svg container
    const svg = d3.select('#graph')
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height);

    const xMax = 5;
    const xMin = -5;

    const xScale = d3.scale.linear().domain([xMax, xMin]).range([width - padding, padding]);
    const yScale = d3.scale.linear().domain([xMin, xMax]).range([height - padding, padding]);

    // plot cartesian
    const yAxis = d3.svg.axis()
      .orient('left')
      .scale(yScale);

    // define the y axis
    const xAxis = d3.svg.axis()
      .orient('bottom')
      .scale(xScale);

    const xAxisPlot = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', 'translate(0,' + (height / 2) + ')')
      .call(xAxis);

    const yAxisPlot = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', 'translate(' + (width / 2) + ',0)')
      .call(yAxis);

    xAxisPlot.selectAll('.tick line')
      .attr('y1', (width - (2 * padding)) / 2 * -1)
      .attr('y2', (width - (2 * padding)) / 2 * 1);

    yAxisPlot.selectAll('.tick line')
      .attr('x1', (width - (2 * padding)) / 2 * -1)
      .attr('x2', (width - (2 * padding)) / 2 * 1);

    const radius = 6;

    const dataset = [];

    // On Click, we want to add data to the array and chart
    svg.on('click', function() {
      const coords = d3.mouse(this);

      // Normally we go from data to pixels, but here we're doing pixels to data
      const newData = {
        x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
        y: Math.round( yScale.invert(coords[1]))
      };

      if (Object.keys(dataset).length < 2) {
        dataset.push(newData);   // Push data to our array
      }

      const circleAttrs = {
        cx: function(d) { return xScale(d.x); },
        cy: function(d) { return yScale(d.y); },
        r: radius
      };

      svg.selectAll('circle')  // For new circle, go through the update process
        .data(dataset)
        .enter()
        .append('circle')
        .attr(circleAttrs)
        .call(drag)
        .classed('circle', true);

      if (Object.keys(dataset).length === 2) {

        const slope = getSlope(dataset);
        const offset = getOffset(dataset);

        let myLine;

        if (typeof slope === 'number') {
          const minY = linearFunction(xMin, slope, offset);
          const maxY = linearFunction(xMax, slope, offset);

          myLine = svg.append('line')          // attach a line
            .attr('x1', xScale(xMin))     // x position of the first end of the line
            .attr('y1', yScale(minY))      // y position of the first end of the line
            .attr('x2', xScale(xMax))     // x position of the second end of the line
            .attr('y2', yScale(maxY))    // y position of the second end of the line
            .style('stroke-width', 2)
            .classed('connection-line', true);
        } else if (slope === 'infiniteSlope') {
          myLine = svg.append('line')          // attach a line
            .attr('x1', xScale(dataset[0].x))     // x position of the first end of the line
            .attr('y1', yScale(xMin))      // y position of the first end of the line
            .attr('x2', xScale(dataset[0].x))     // x position of the second end of the line
            .attr('y2', yScale(xMax))    // y position of the second end of the line
            .style('stroke-width', 2)
            .classed('connection-line', true);
        }

        // if (Object.keys(dataset).length > 2) {
        //   vis.selectAll('circle').remove();
        //   for (const member in dataset) delete dataset[member];
        // }

      }

    });

  }

}
