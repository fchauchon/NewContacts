import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, interval, Observable, of, range, ReplaySubject } from 'rxjs';
import { distinct, distinctUntilChanged, filter, map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

    log: string = '';
    timer: Observable<number>;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.timer = interval(1000);
    }

    simple() {
        this.clearLog();
        const first = range(0, 10);
        first.subscribe(
            (data) => this.writeLog('Raw data:',  data)
        )
    }

    map() {
        this.clearLog();
        const first = range(0, 10);
        first.pipe(
            map( (data: number) => data + 10 )
        ).subscribe(
            (data) => this.writeLog('Data plus 10:', data)
        )
    }

    mapAndFilter() {
        this.clearLog();
        const first = range(0, 10);
        first.pipe(
            map( (data) => data + 10 ),
            filter( (data) => data %2 === 0)
        ).subscribe(
            (data) => this.writeLog('Data plus 10 modulo 2:', data)
        )
    }

    distinct() {
        this.clearLog();
        const lotOfOneAndTwo = of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2);
        lotOfOneAndTwo.pipe(
            distinctUntilChanged( (prev, curr) => prev === curr )
        ).subscribe(
            (data) => this.writeLog('Distinct:', data)
        )
    }

    mergeMap() {
        this.clearLog();
        const someIds=of(1, 2, 3, 4, 5);
        someIds.pipe(
            mergeMap( (data) => this.http.get('http://localhost:3000/actors/' + data) )
        ).subscribe(
            (data) => this.writeLog('mergeMap', JSON.stringify(data))
        )
    }

    switchMap() {
        this.clearLog();
        const someIds=of(1, 2, 3, 4, 5);
        someIds.pipe(
            switchMap( (data) => this.http.get('http://localhost:3000/actors/' + data) )
        ).subscribe(
            (data) => this.writeLog('switchMap', JSON.stringify(data))
        )
    }

    behaviorSubject() {
        this.clearLog();
        const subject = new BehaviorSubject("First value");

        subject.subscribe(
            (data) => this.writeLog('subject1:', data)
        )

        subject.subscribe(
            (data) => this.writeLog('subject2:', data)
        )

        subject.next("Second value");

        subject.subscribe(
            (data) => this.writeLog('subject3:', data)
        )

        subject.complete();
    }

    replaySubject() {
        this.clearLog();
        const subject = new ReplaySubject(2);

        subject.subscribe(
            (data) => this.writeLog('subject1:', data)
        )
        
        subject.next("First value");
        subject.next("Second value");
        subject.next("Third value");

        subject.subscribe(
            (data) => this.writeLog('subject2:', data)
        )

        subject.next("Fourth value");    
        subject.complete();
    }

    asyncSubject() {
        this.clearLog();
        const subject = new AsyncSubject();

        subject.subscribe(
            (data) => this.writeLog('subject1:', data)
        )
        
        subject.next("First value");
        subject.next("Second value");
        subject.next("Third value");

        subject.subscribe(
            (data) => this.writeLog('subject2:', data)
        )

        subject.next("Fourth value");
        subject.complete();
    }

    clearLog() {
        this.log = "";
    }

    writeLog(message: string, extra: any = null) {
        this.log += message + (extra != null ? ' ' + extra : '') + '\n';
    }

}
