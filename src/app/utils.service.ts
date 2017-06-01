import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  /* Copies the data, but loses function assignments! */
  public deepCopyData(data: Object) {
    return JSON.parse(JSON.stringify(data));
  }

  /* Safely concatenates url parts
   * Based on https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
   */
  public urlJoin(partOne, partTwo): string {

    // TODO: query parameter part

    if (partOne.charAt(partOne.length - 1) === '/') {
      if (partTwo.charAt(0) === '/') {
        return partOne.substring(0, partOne.length - 1) + partTwo;
      } else {
        return partOne + partTwo;
      }
    } else {
      if (partTwo.charAt(0) === '/') {
        return partOne + partTwo;
      } else {
        return partOne + '/' + partTwo;
      }
    }

  }



}
