import { Component, OnInit } from '@angular/core';
import { interval, Observable, range, Subject } from 'rxjs';
import { every, map, take, takeUntil, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

    letters$: Observable<string[]>;

    count: number = 15;
    stopIt: Subject<number> = new Subject<number>();
    text: string = 'vide';

    constructor() { }

    ngOnInit(): void {
        this.letters$ = range(65, 26).pipe(
            map(num => String.fromCharCode(num)),
            toArray()
        );

        interval(1000).pipe(
            take(this.count),
            takeUntil(this.stopIt),
        ).subscribe(
            () => this.count--,
            () => {},
            () => {
                this.count === 0 ? this.text = 'Terminé' : this.text = 'Interrompu';
            }
        )
    }

    stop() {
        this.stopIt.next(0);
        this.stopIt.complete();
    }

}
