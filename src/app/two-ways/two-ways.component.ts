import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-ways',
  templateUrl: './two-ways.component.html',
  styleUrls: ['./two-ways.component.css']
})
export class TwoWaysComponent implements OnInit {

    myValue = "Valeur initiale";

    constructor() { }

    ngOnInit(): void { }

}
