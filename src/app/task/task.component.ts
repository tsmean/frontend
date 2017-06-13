import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  width;

  @ViewChild('taskBody')
  taskBody: ElementRef;

  constructor(
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setWidth();
  }

  setWidth() {
    this.width = this.taskBody.nativeElement.offsetWidth - 40;
  }

}
