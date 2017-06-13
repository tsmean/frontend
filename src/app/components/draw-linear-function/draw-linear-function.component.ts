import {Component, ElementRef, Input, OnChanges} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-draw-linear-function',
  templateUrl: './draw-linear-function.component.html',
  styleUrls: ['./draw-linear-function.component.scss']
})
export class DrawLinearFunctionComponent implements OnChanges {

  // Configurable Inputs
  @Input()
  width;

  @Input()
  xMax;

  @Input()
  xMin;

  @Input()
  circleRadius;

  // Data Members. Persistence allows redrawing when parameters change (e.g. width of the plot)
  dataset = [];
  svg;
  padding = 10;

  constructor(
    private el: ElementRef
  ) { }

  // On changing outer parameters (width etc), the plot is redrawn
  ngOnChanges() {
    const plotConfig: PlotConfig = new PlotConfig(
      this.width,
      this.xMax,
      this.xMin,
      this.padding,
      this.circleRadius
    );
    this.setup(plotConfig);
  }

  setup(plotConfig: PlotConfig) {

    const that = this;

    // create a new svg
    if (that.svg) {
      that.svg.remove();
    }
    const svg = that.svg = d3.select('#graph')
      .append('svg:svg');

    svg.attr('width', plotConfig.width)
      .attr('height', plotConfig.height);

    // plot cartesian
    const generateAxis = () => {
      const yAxis = d3.svg.axis()
        .orient('left')
        .scale(plotConfig.yScale);

      // define the y axis
      const xAxis = d3.svg.axis()
        .orient('bottom')
        .scale(plotConfig.xScale);

      const xAxisPlot = that.svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', 'translate(0,' + (plotConfig.height / 2) + ')')
        .call(xAxis);

      const yAxisPlot = that.svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', 'translate(' + (plotConfig.width / 2) + ',0)')
        .call(yAxis);

      xAxisPlot.selectAll('.tick line')
        .attr('y1', (plotConfig.width - (2 * plotConfig.padding)) / 2 * -1)
        .attr('y2', (plotConfig.width - (2 * plotConfig.padding)) / 2 * 1);

      yAxisPlot.selectAll('.tick line')
        .attr('x1', (plotConfig.width - (2 * plotConfig.padding)) / 2 * -1)
        .attr('x2', (plotConfig.width - (2 * plotConfig.padding)) / 2 * 1);
    };
    generateAxis();

    const dragBehaviour = this.generateDragBehaviour(plotConfig.xScale, plotConfig.yScale);
    this.setupClick(svg, plotConfig, dragBehaviour);
    that.drawLine(plotConfig);
  }

  setupClick(svg, plotConfig: PlotConfig, drag) {
    const that = this;
    svg.on('click', function() {

      if (Object.keys(that.dataset).length < 2) {
        const coords = d3.mouse(this);

        // Normally we go from data to pixels, but here we're doing pixels to data
        const newData = {
          x: Math.round(plotConfig.xScale.invert(coords[0])),  // Takes the pixel number to convert to number
          y: Math.round(plotConfig.yScale.invert(coords[1]))
        };

        that.dataset.push(newData);   // Push data to our array
      }

      svg.selectAll('circle')  // For new circle, go through the update process
        .data(that.dataset)
        .enter()
        .append('circle')
        .attr(that.circleAttrs(plotConfig.radius, plotConfig.xScale, plotConfig.yScale))
        .call(drag)
        .classed('circle', true);

      that.drawLine(plotConfig);

    });
  }

  generateDragBehaviour(xScale, yScale) {

    const drag = d3.behavior.drag();

    drag.on('drag', function(d: Point, i) {

      d.x += (<any>d3.event).dx;
      d.y += (<any>d3.event).dy;

      d3.select(this).attr('transform', function(innerD, innerI){
        const newData = {
          x: Math.round( xScale.invert(d.x)),  // Takes the pixel number to convert to number
          y: Math.round( yScale.invert(d.y))
        };

        return 'translate(' + [ newData.x, newData.y ] + ')';
      });

    });

    drag.on('dragend', function() {
      (<any>d3.event).sourceEvent.stopPropagation();
    });
    return drag;
  }

  drawLine(plotConfig: PlotConfig) {
    const that = this;
    if (Object.keys(that.dataset).length === 2) {

      const slope = that.getSlope(that.dataset);
      const offset = that.getOffset(that.dataset);

      let myLine;

      if (typeof slope === 'number') {
        const minY = that.linearFunction(plotConfig.xMin, slope, offset);
        const maxY = that.linearFunction(plotConfig.xMax, slope, offset);

        myLine = that.svg.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(plotConfig.xMin))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(minY))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(plotConfig.xMax))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(maxY))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      } else if (slope === 'infiniteSlope') {
        myLine = that.svg.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(that.dataset[0].x))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(plotConfig.xMin))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(that.dataset[0].x))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(plotConfig.xMax))    // y position of the second end of the line
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

  circleAttrs (radius, xScale, yScale) {
    return {
      cx: function(d) { return xScale(d.x); },
      cy: function(d) { return yScale(d.y); },
      r: radius
    };
  }

}

class PlotConfig {

  xScale;
  yScale;
  height;

  constructor(
    public width,
    public xMax,
    public xMin,
    public padding,
    public radius
  ) {
    this.height = this.width;
    this.xScale = d3.scale.linear().domain([xMax, xMin]).range([width - padding, padding]);
    this.yScale = d3.scale.linear().domain([xMin, xMax]).range([this.height - padding, padding]);
  }

}

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
