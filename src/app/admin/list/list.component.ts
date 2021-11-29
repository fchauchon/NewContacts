import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    elements: Array<string> = ['Elément 1', 'Elément 2', 'Elément 3', 'Elément 4'];

    constructor() { }

    ngOnInit(): void { }

}
