import { Component, OnInit } from '@angular/core';
import {MathQuillLoader} from 'mathquill-typescript';

@Component({
  selector: 'app-matheditor',
  templateUrl: './matheditor.component.html',
  styleUrls: ['./matheditor.component.scss']
})
export class MatheditorComponent implements OnInit {

  constructor() {
    MathQuillLoader.loadMathQuill(mathquill => {
      console.log(mathquill.getInterface(2));
    });
  }

  ngOnInit() {
  }

}
