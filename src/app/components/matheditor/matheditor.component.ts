import { Component, OnInit } from '@angular/core';
import {MathquillService} from 'mathquill-angular2';

@Component({
  selector: 'app-matheditor',
  templateUrl: './matheditor.component.html',
  styleUrls: ['./matheditor.component.scss']
})
export class MatheditorComponent implements OnInit {

  options = {
    buttonLatexContents: [
      '+', '-', '*', '\\frac{}{}',
      'x^2', '\\sqrt{}', 'x^{}', '\\sqrt[]{}',
      '\\pi', '\\infty', '\\pm', 'x_{}',
      '\\sum', '\\lim', '\\frac{d}{dx}', '\\int'
    ]
  }

  constructor(

  ) {
  }

  ngOnInit() {
  }

}
