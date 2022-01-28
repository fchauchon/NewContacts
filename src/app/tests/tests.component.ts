import { Component, OnInit } from '@angular/core';
import { interval, Observable, range, Subject } from 'rxjs';
import { map, take, takeUntil, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

    letters$: Observable<string[]>;

    count: number = 30;
    stopIt: Subject<number> = new Subject<number>();

    constructor() { }

    ngOnInit(): void {
        this.letters$ = range(65, 26).pipe(
            map(num => String.fromCharCode(num)),
            toArray()
        );

        interval(1000).pipe(
            take(30),
            takeUntil(this.stopIt)
        ).subscribe(
            () => this.count--,
            () => {},
            () => console.log('Terminé')
        )
    }

    stop() {
        this.stopIt.next(0);
        this.stopIt.complete();
    }

}
