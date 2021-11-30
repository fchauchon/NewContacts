import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, interval, Observable, of, range, ReplaySubject, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
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

    constructor(
        private http: HttpClient,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.communicationService.onMessage().subscribe(
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
        );
    }

    mergeMap() {
        this.clearLog();
        const someIds = of(1);
        let myObj = null;
        
        someIds.pipe(
            mergeMap( (data) => this.http.get('http://localhost:3000/actors/' + data) ),
            tap( (data) => myObj = {...data} ),
            mergeMap( (data) => this.http.get('http://localhost:3000/series/' + data['serieId'])),
            tap((data) => {
                myObj.serie = {...data};
                this.logText += JSON.stringify(myObj) + '\n';
            })
        ).subscribe();
    }

    switchMap() {
        this.clearLog();
        const someIds = of(1, 2, 3, 4, 5);
        someIds.pipe(
            switchMap( (data) => this.http.get('http://localhost:3000/actors/' + data) )
        ).subscribe(
            (data) => this.logText += 'switchMap: ' + JSON.stringify(data) + '\n'
        );
        
    }

    behaviorSubject() {
        this.clearLog();
        const subject = new BehaviorSubject("First value");

        subject.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );

        subject.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject.next("Second value");

        subject.subscribe(
            (data) => this.logText += 'subject3: ' + data + '\n'
        );

        subject.complete();
    }

    replaySubject() {
        this.clearLog();
        const subject = new ReplaySubject(2);

        subject.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );
        
        subject.next("First value");
        subject.next("Second value");
        subject.next("Third value");

        subject.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject.next("Fourth value");  
        subject.complete();
    }

    asyncSubject() {
        this.clearLog();
        const subject = new AsyncSubject();

        subject.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );
        
        subject.next("First value");
        subject.next("Second value");
        subject.next("Third value");

        subject.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject.next("Fourth value");
        subject.complete();
    }

    ngOnDestroy(): void {
        if (this.subTimer != null) {
           this.subTimer.unsubscribe();
           this.subTimer = null;
        }
    }

}

