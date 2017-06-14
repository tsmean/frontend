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

  /**
   * Data Members. Persistence allows redrawing when parameters change (e.g. width of the plot).
   * The dataset holds points in the cartesian system, not to be confused with pixels!
   */
  dataset: Point[] = [];
  line; // the connection line between the points
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

    /**
     * Groups for the items to be drawn.
     * That way, the circles are always above the lines.
     * If the lines would be above the circles, it would interfere with the dragging behaviour.
     */
    svg.append('g').attr('id', 'line-group');
    svg.append('g').attr('id', 'circle-group');

    const dragBehaviour = this.generateDragBehaviour(svg, plotConfig);
    that.setupClick(svg, plotConfig, dragBehaviour);
    that.drawCircles(svg, plotConfig, dragBehaviour);
    that.drawLine(svg, plotConfig, that.dataset[0], that.dataset[1]);
  }

  setupClick(svg, plotConfig: PlotConfig, drag) {
    const that = this;
    svg.on('click', function() {

      if (Object.keys(that.dataset).length < 2) {

        /**
         * Coordinate Origin: Top left of svg;
         * [25, 6] means 25px to right and 6px below origin
         */
        const clickedPoint: number[] = d3.mouse(this);

        // Normally we go from data to pixels, but here we're doing pixels to data
        const newData = {
          x: Math.round(plotConfig.xScale.invert(clickedPoint[0])), // Takes the pixel number to convert to number
          y: Math.round(plotConfig.yScale.invert(clickedPoint[1]))
        };

        that.dataset.push(newData);   // Push data to our array

        that.drawCircles(svg, plotConfig, drag);

        if (Object.keys(that.dataset).length === 2) {
          that.drawLine(svg, plotConfig, that.dataset[0], that.dataset[1]);
        }

      }

    });
  }


  /**
   * Expected dragging behavior:
   * Should 'hop' (= move discontinuously) to the nearest point in the coordinate grid
   * todo: it shouldn't be possible to drag the points outside of the plot
   */
  generateDragBehaviour(svg, plotConfig: PlotConfig) {

    const that = this;
    const drag = d3.behavior.drag();

    /* point starts at {x: dataPointX, y: dataPointY} and then moves according to translation rules */
    drag.on('drag', function(dataPoint: Point, circleNumber: number) {

      // old closest point.
      // performance could be optimized by not calculating oldPoint every time if unchanged.
      const getClosestPoint = (point: Point): Point => {
        return new Point(Math.round(dataPoint.x), Math.round(dataPoint.y));
      };
      const oldClosestPoint = getClosestPoint(dataPoint);

      // changes since last drag event in x and y direction in pixel
      const pixelDx = (<any>d3.event).dx;
      const pixelDy = (<any>d3.event).dy;

      // changes since last drag converted to scale
      dataPoint.x = plotConfig.xScale.invert(plotConfig.xScale(dataPoint.x) + pixelDx);
      dataPoint.y = plotConfig.yScale.invert(plotConfig.yScale(dataPoint.y) + pixelDy);

      const newClosestPoint = getClosestPoint(dataPoint);

      if (!that.pointsAreEqual(oldClosestPoint, newClosestPoint)) {
        d3.select(this).attr('cx', plotConfig.xScale(newClosestPoint.x));
        d3.select(this).attr('cy', plotConfig.yScale(newClosestPoint.y));
        const untouchedPoint = that.dataset[(circleNumber + 1) % 2];
        that.drawLine(svg, plotConfig, newClosestPoint, untouchedPoint);
      }

    });

    drag.on('dragend', function(dataPoint: Point) {

      const clickedPoint: number[] = d3.mouse(this);

      // Normally we go from data to pixels, but here we're doing pixels to data
      const newData = {
        x: Math.round(plotConfig.xScale.invert(clickedPoint[0])), // Takes the pixel number to convert to number
        y: Math.round(plotConfig.yScale.invert(clickedPoint[1]))
      };

      dataPoint.x = newData.x;
      dataPoint.y = newData.y;
    });
    return drag;
  }

  drawCircles(svg, plotConfig: PlotConfig, drag) {
    const that = this;
    svg.select('#circle-group').selectAll('circle')
      .data(that.dataset)
      .enter()
      .append('circle')
      .call(drag)
      .attr('r', plotConfig.radius)
      .attr('cx', d => plotConfig.xScale(d.x))
      .attr('cy', d => plotConfig.yScale(d.y))
      .classed('circle', true);

  }

  /**
   * Drawing a connection line between the points
   */
  drawLine(svg, plotConfig: PlotConfig, pointA, pointB) {

    const that = this;

    if (pointA && pointB) {

      const slope = that.getSlope(pointA, pointB);
      const offset = that.getOffset(pointA, pointB);

      if (that.line) {
        that.line.remove();
      }
      const lineGroup = svg.select('#line-group');

      if (typeof slope === 'number') {
        const minY = that.linearFunction(plotConfig.xMin, slope, offset);
        const maxY = that.linearFunction(plotConfig.xMax, slope, offset);
        that.line = lineGroup.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(plotConfig.xMin))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(minY))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(plotConfig.xMax))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(maxY))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      } else if (slope === 'infiniteSlope') {
        that.line = lineGroup.append('line')          // attach a line
          .attr('x1', plotConfig.xScale(pointA.x))     // x position of the first end of the line
          .attr('y1', plotConfig.yScale(plotConfig.xMin))      // y position of the first end of the line
          .attr('x2', plotConfig.xScale(pointA.x))     // x position of the second end of the line
          .attr('y2', plotConfig.yScale(plotConfig.xMax))    // y position of the second end of the line
          .style('stroke-width', 2)
          .classed('connection-line', true);
      }

    }
  }

  getSlope = (pointA: Point, pointB: Point): Slope => {
    if (pointB.x === pointA.x && pointB.y === pointA.y) {
      return 'isPoint';
    } else if (pointB.x === pointA.x) {
      return 'infiniteSlope';
    } else {
      return (pointB.y - pointA.y) / (pointB.x - pointA.x);
    }
  }

  getOffset = (pointA: Point, pointB: Point): number => {
    const slope = this.getSlope(pointA, pointB);
    if (typeof slope === 'number') {
      return pointA.y - pointA.x * slope;
    } else {
      return NaN;
    }
  }

  linearFunction = (x, slope, offset) => {
    return x * slope + offset;
  }

  pointsAreEqual(pointA: Point, pointB: Point): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }

}

class PlotConfig {

  // scales DATA to PIXEL
  xScale: d3.scale.Linear<number, number>;
  yScale: d3.scale.Linear<number, number>;
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

class Point {
  constructor(
    public x,
    public y
  ) {}
}

type Slope = number | 'isPoint' | 'infiniteSlope';
