import { Pipe, PipeTransform } from '@angular/core';
import {Point} from '../components/draw-linear-function/draw-linear-function.component';

@Pipe({
  name: 'point'
})
export class PointPipe implements PipeTransform {

  transform(point: Point, args?: any): string {
    return `(${point.x},${point.y})`;
  }

}
