import { Component, OnInit } from '@angular/core';
import { of, range, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css']
})
export class ObsComponent implements OnInit {

    log = '';
    isHidden = false;
    color = false;
    class = 'myRed';
    styles = { 'background-color': 'red' };
    inputValue = '';

    constructor(private dataService: DataService) { }

    ngOnInit(): void {

        this.dataService.onData().subscribe(
            data => this.log += data + "\n"
        )
    }

    clearLog() {
        this.log = '';
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
    }

    simple() {
        this.clearLog();
        const simple$ = range(1, 10);
        simple$.subscribe(
            (data: number) => this.log += "\n" + data
        );
    }

    map() {
        const myArray = new Array();
        this.clearLog();
        const simple$ = range(1, 10).pipe(
            map( data => data * 10),
            tap( x => {
                    console.log(x);
                    myArray.push(x);
                }),
            filter( data => data >= 50),
        );
        simple$.subscribe(
            (data: number) => this.log += "\n" + data,
            (err) => {},
            () => console.log(myArray)
        );
    }

    distinct() {
        this.clearLog();
        const myObs$ = of(1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4).pipe(
            distinctUntilChanged( (prev, curr) => prev === curr)
        );

        myObs$.subscribe(
            data => this.log += data + "\n"
        )
    }

}

