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
    // Timeout required so the width is only polled once the element is actually drawn.
    setTimeout(() => {
      this.setWidth();
    }, 0);
  }

  setWidth() {
    this.width = this.taskBody.nativeElement.offsetWidth - 40;
  }

}
