import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, of, range, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, reduce, take, takeUntil, tap } from 'rxjs/operators';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css']
})
export class ObsComponent implements OnInit, OnDestroy {

    logText: string = '';
    isLogHidden: boolean = false;
    
    isClassBg1: boolean = true;

    timer$!: Observable<number>;
    subTimer: Subscription = null;

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.communicationService.onData().subscribe(
            data => this.logText += data + "\n"
        );

        this.timer$ = interval(1000);
    }

    clearLog() {
        this.logText = '';
    }

    toggleLog() {
        this.isLogHidden = ! this.isLogHidden;
    }

    toggleBgColor() {
        this.isClassBg1 = ! this.isClassBg1;
    }

    simple() {
        this.clearLog();
        const simple$ = range(1, 10);
        simple$.subscribe(
            (data: number) => this.logText += data + "\n"
        );
    }

    map() {
        this.clearLog();
        const simple$ = range(1, 10).pipe(
            map( data => data * 10),
        );
        simple$.subscribe(
            (data: number) => this.logText += data + "\n"
        );
    }

    mapAndFilter() {
        this.clearLog();
        const simple$ = range(1, 10).pipe(
            map( data => data * 10),
            filter( data => data >= 50)
        );
        simple$.subscribe(
            (data: number) => this.logText += data + "\n"
        );
    }

    distinct() {
        this.clearLog();
        const myObs$ = of(1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4).pipe(
            distinctUntilChanged( (prev, curr) => prev === curr)
        );

        myObs$.subscribe(
            data => this.logText += data + "\n"
        )
    }

    takeUntil() {
        this.clearLog();
        const myObs$ = timer(0, 1000);
        const myEnd$ = interval(10000);

        myObs$.pipe(
            takeUntil(myEnd$)
        ).subscribe(
            data => this.logText += data + "\n",
            () => {},
            () => this.logText += "Fin\n"
        );
    }

    reduce() {
        this.clearLog();
        const myObs$ = range(1, 20);

        myObs$.pipe(
            reduce((prev, curr) => prev + curr)
        ).subscribe(
            data => this.logText += data + "\n"
        );
    }

    ngOnDestroy(): void {
        if (this.subTimer != null) {
           this.subTimer.unsubscribe();
           this.subTimer = null;
        }
    }

}

