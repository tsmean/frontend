import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

import * as d3 from 'd3';

interface LinearFunction {
  slope?: number;
  offset?: number;
  error?: 'isPoint' | 'infiniteSlope';
}

interface Point {
  x: number;
  y: number;
}

type Slope = number | 'isPoint' | 'infiniteSlope';

@Component({
  selector: 'app-draw-linear-function',
  templateUrl: './draw-linear-function.component.html',
  styleUrls: ['./draw-linear-function.component.scss']
})
export class DrawLinearFunctionComponent implements OnChanges {

  // TODO's:
  // redraw
  // point should be over line

  @Input()
  width; // depends on rendered element, thus initialization code is in OnInit
  height;
  padding = 10;
  xMax = 5;
  xMin = -5;
  xScale;
  yScale;
  radius = 6;

  dataset = [];

  drag = this.setupDrag();

  svg;


  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges() {

    // on every change of date (currently only width on browser resize), redraw the chart

    const that = this;

    that.height = that.width; // must be square
    that.xScale = d3.scale.linear().domain([that.xMax, that.xMin]).range([that.width - that.padding, that.padding]);
    that.yScale = d3.scale.linear().domain([that.xMin, that.xMax]).range([that.height - that.padding, that.padding]);

    that.setup();

    // On Click, we want to add data to the array and chart
    that.svg.on('click', function() {
      const coords = d3.mouse(this);

      // Normally we go from data to pixels, but here we're doing pixels to data
      const newData = {
        x: Math.round( that.xScale.invert(coords[0])),  // Takes the pixel number to convert to number
        y: Math.round( that.yScale.invert(coords[1]))
      };

      if (Object.keys(that.dataset).length < 2) {
        that.dataset.push(newData);   // Push data to our array
      }

      const circleAttrs = {
        cx: function(d) { return that.xScale(d.x); },
        cy: function(d) { return that.yScale(d.y); },
        r: that.radius
      };

      that.svg.selectAll('circle')  // For new circle, go through the update process
        .data(that.dataset)
        .enter()
        .append('circle')
        .attr(circleAttrs)
        .call(that.drag)
        .classed('circle', true);

      that.drawLine();

    });

  }

  setupDrag() {

    const that = this;

    const drag = d3.behavior.drag();

    drag.on('drag', function(d: Point, i) {

      d.x += (<any>d3.event).dx;
      d.y += (<any>d3.event).dy;

      d3.select(this).attr('transform', function(innerD, innerI){
        // duplication
        const newData = {
          x: Math.round( that.xScale.invert(d.x)),  // Takes the pixel number to convert to number
          y: Math.round( that.yScale.invert(d.y))
        };

        return 'translate(' + [ newData.x, newData.y ] + ')';
      });

    });

    drag.on('dragend', function() {
      (<any>d3.event).sourceEvent.stopPropagation();
    });
    return drag;
  }

  setup() {

    const that = this;

    // create an (new) that.svg container
    if (that.svg) {
      that.svg.remove();
    }
    that.svg = d3.select('#graph')
      .append('svg:svg')
      .attr('width', that.width)
      .attr('height', that.height);

    // plot cartesian
    const yAxis = d3.svg.axis()
      .orient('left')
      .scale(that.yScale);

    // define the y axis
    const xAxis = d3.svg.axis()
      .orient('bottom')
      .scale(that.xScale);

    const xAxisPlot = that.svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', 'translate(0,' + (that.height / 2) + ')')
      .call(xAxis);

    const yAxisPlot = that.svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', 'translate(' + (that.width / 2) + ',0)')
      .call(yAxis);

    xAxisPlot.selectAll('.tick line')
      .attr('y1', (that.width - (2 * that.padding)) / 2 * -1)
      .attr('y2', (that.width - (2 * that.padding)) / 2 * 1);

    yAxisPlot.selectAll('.tick line')
      .attr('x1', (that.width - (2 * that.padding)) / 2 * -1)
      .attr('x2', (that.width - (2 * that.padding)) / 2 * 1);
  }

  drawLine() {
    const that = this;
    if (Object.keys(that.dataset).length === 2) {

      const slope = that.getSlope(that.dataset);
      const offset = that.getOffset(that.dataset);

      let myLine;

      if (typeof slope === 'number') {
        const minY = that.linearFunction(that.xMin, slope, offset);
        const maxY = that.linearFunction(that.xMax, slope, offset);

        myLine = that.svg.append('line')          // attach a line
          .attr('x1', that.xScale(that.xMin))     // x position of the first end of the line
          .attr('y1', that.yScale(minY))      // y position of the first end of the line
          .attr('x2', that.xScale(that.xMax))     // x position of the second end of the line
          .attr('y2', that.yScale(maxY))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      } else if (slope === 'infiniteSlope') {
        myLine = that.svg.append('line')          // attach a line
          .attr('x1', that.xScale(that.dataset[0].x))     // x position of the first end of the line
          .attr('y1', that.yScale(that.xMin))      // y position of the first end of the line
          .attr('x2', that.xScale(that.dataset[0].x))     // x position of the second end of the line
          .attr('y2', that.yScale(that.xMax))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      }

    }
  }

  getSlope = (dataset): Slope => {
    if (dataset[1].x === dataset[0].x && dataset[1].y === dataset[0].y) {
      return 'isPoint';
    } else if (dataset[1].x === dataset[0].x) {
      return 'infiniteSlope';
    } else {
      return (dataset[1].y - dataset[0].y) / (dataset[1].x - dataset[0].x);
    }
  }

  getOffset = (dataset): number => {
    const slope = this.getSlope(dataset);
    if (typeof slope === 'number') {
      return dataset[0].y - dataset[0].x * slope;
    } else {
      return NaN;
    }
  }

  linearFunction = (x, slope, offset) => {
    return x * slope + offset;
  }


}
