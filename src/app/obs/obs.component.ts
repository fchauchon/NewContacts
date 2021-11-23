import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css']
})
export class ObsComponent implements OnInit {

    log = 'Initial value';
    isHidden = false;
    color = false;
    class = 'myRed';
    styles = { 'background-color': 'red' };

    constructor() { }

    ngOnInit(): void {
    }

    clearLog() {
        this.log = '';
    }
    test(): void {
        //this.clearLog();
        this.log += '\nBonjour';
    }

    hide() {
        this.isHidden = true;
    }
    show() {
        this.isHidden = false;
    }
    changeColor() {
        this.color = ! this.color;
        this.styles = { 'background-color': this.color ? 'red' : 'green' };
        this.class = this.color ? "myBlue" : "myRed";
        if (this.color) {
            this.class= "myBlue";
        } else {
            this.class = "myRed";
        }
        this.class = "myRed";
        if (this.color) {
            this.class= "myBlue";
        }
    }

    simple() {
        const simple$ = of(1, 2, 3);
        simple$.subscribe(
            (data: number) => console.log(data)
        );
    }
}
