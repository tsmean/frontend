import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lernnavi',
  templateUrl: './lernnavi.component.html',
  styleUrls: ['./lernnavi.component.css']
})
export class LernnaviComponent implements OnInit {

  planets = [
    {
      text: 'Lehrperson einladen',
      link: 'lehrperson-einladen',
      icon: 'invite',
      aboveXsStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-190px, -205px)'
      }
    }, {
      text: 'Aufgaben Editor',
      link: 'aufgaben-editor',
      icon: 'edit',
      aboveXsStyle: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(175px, -195px)'
      }
    }, {
      text: 'Einstufungstest',
      link: 'einstufungstest',
      icon: 'test',
      aboveXsStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-270px, -45%)'
      }
    }, {
      text: 'Aufgabentypen',
      link: 'aufgabentypen',
      icon: 'types',
      aboveXsStyle: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(265px, -55%)'
      }
    }, {
      text: 'Kompetenzen-Übersicht',
      link: 'kompetenzen-uebersicht',
      icon: 'chart',
      aboveXsStyle: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translate(-181px, 195px)'
      }
    }, {
      text: 'Forum',
      link: 'forum',
      icon: 'forum',
      aboveXsStyle: {
        position: 'absolute',
        bottom: '50%',
        right: '50%',
        transform: 'translate(170px, 190px)'
      }
    }

  ];

  constructor() { }

  ngOnInit() {
  }

  iconSrc(icon): string {
    return `/assets/img/lernnavi/landing/${icon}.svg`;
  }

}
