import { Component, OnInit } from '@angular/core';

declare var d3;

@Component({
  selector: 'app-draw-linear-function',
  templateUrl: './draw-linear-function.component.html',
  styleUrls: ['./draw-linear-function.component.scss']
})
export class DrawLinearFunctionComponent implements OnInit {

  constructor() {}

  ngOnInit() {

    // Set graph
    const width = Math.min(700, window.innerWidth - 10);
    const  height = width;
    const padding = 10;

    // create an svg container
    const vis = d3.select('#graph')
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height);

    const maxGrid = 5;
    const minGrid = -5;

    const xScale = d3.scale.linear().domain([maxGrid, minGrid]).range([width - padding, padding]);
    const yScale = d3.scale.linear().domain([minGrid, maxGrid]).range([height - padding, padding]);

    // plot cartesian
    const yAxis = d3.svg.axis()
      .orient('left')
      .scale(yScale);

    // define the y axis
    const xAxis = d3.svg.axis()
      .orient('bottom')
      .scale(xScale);

    const xAxisPlot = vis.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', 'translate(0,' + (height / 2) + ')')
      .call(xAxis.tickSize(-height, 0, 0));

    const yAxisPlot = vis.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', 'translate(' + (width / 2) + ',0)')
      .call(yAxis.tickSize(-width, 0, 0));

    xAxisPlot.selectAll('.tick line')
      .attr('y1', (width - (2 * padding)) / 2 * -1)
      .attr('y2', (width - (2 * padding)) / 2 * 1);

    yAxisPlot.selectAll('.tick line')
      .attr('x1', (width - (2 * padding)) / 2 * -1)
      .attr('x2', (width - (2 * padding)) / 2 * 1);

    const radius = 6;


    const dataset = [];

    // On Click, we want to add data to the array and chart
    vis.on('click', function() {
      const coords = d3.mouse(this);

      // Normally we go from data to pixels, but here we're doing pixels to data
      const newData = {
        x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
        y: Math.round( yScale.invert(coords[1]))
      };

      dataset.push(newData);   // Push data to our array

      const circleAttrs = {
        cx: function(d) { return xScale(d.x); },
        cy: function(d) { return yScale(d.y); },
        r: radius};


      // alert(newData.x +':'+ newData.y)

      vis.selectAll('circle')  // For new circle, go through the update process
        .data(dataset)
        .enter()
        .append('circle')
        .attr(circleAttrs)
        .classed('circle', true);

      if (Object.keys(dataset).length === 2) {
        // vis.selectAll('circle').remove();
        const myLine = vis.append('line')          // attach a line
          .attr('x1', xScale(dataset[0].x))     // x position of the first end of the line
          .attr('y1', yScale(dataset[0].y))      // y position of the first end of the line
          .attr('x2', xScale(dataset[1].x))     // x position of the second end of the line
          .attr('y2', yScale(dataset[1].y))    // y position of the second end of the line
          .style('stroke-width', 2)
          .style('stroke', 'black');

        // if (Object.keys(dataset).length > 2) {
        //   vis.selectAll('circle').remove();
        //   for (const member in dataset) delete dataset[member];
        // }

      }
    });

  }

}
