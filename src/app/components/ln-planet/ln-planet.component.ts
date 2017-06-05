import {Component, Input, OnInit} from '@angular/core';

const randomBetween = (minimum: number, maximum: number): number => {
  return Math.random() * (maximum - minimum) + minimum;
};

@Component({
  selector: 'app-ln-planet',
  templateUrl: './ln-planet.component.html',
  styleUrls: ['./ln-planet.component.css']
})
export class LnPlanetComponent implements OnInit {

  @Input()
  text;

  randomNegativeDelay = randomBetween(-100, 0) + 's';
  background = `rgba(255,255,255, ${randomBetween(0.75, 1)})`;
  circleRadius = randomBetween(15, 30);

  constructor() {}

  ngOnInit() {
  }

}
