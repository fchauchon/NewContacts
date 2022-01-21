import { Component, OnInit } from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

    letters$: Observable<string[]>;
    constructor() { }

    ngOnInit(): void {
        this.letters$ = range(65, 26).pipe(
            map(num => String.fromCharCode(num)),
            toArray()
        );
    }

}
