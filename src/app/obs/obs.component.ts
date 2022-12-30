import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, forkJoin, fromEvent, interval, merge, Observable, of, range, ReplaySubject, Subject, Subscription, timer, zip } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, mergeMap, reduce, share, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { CommunicationService } from '../services/communication.service';

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
    autre$!: Observable<any>;
    subTimer: Subscription = null;

    names = [ 'Olivier', 'Mathias', 'Thomas', 'Fred' ]
    user$ = new BehaviorSubject<any>(null);

    constructor(
        private communicationService: CommunicationService,
        private http: HttpClient) { }

    ngOnInit(): void {
        this.communicationService.onMessage().subscribe(
            data => this.logText += data + "\n"
        );

        this.timer$ = interval(1000);
        timer(0, 1000).subscribe( (val) => this.user$.next({ id: val, name: this.names[ val % 4] }));

        this.autre$ = timer(0, 1000).pipe(
            map((val) => { return { id: val, name: this.names[ val % 4] }; })
        )
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
            map( (data: number) => "Nombre " + data),
        );

        simple$.subscribe(
            (data: string) => this.logText += data + "\n"
        );
    }

    merge() {
        this.clearLog();
        const simple$ = timer(0, 1000).pipe(
            map( data => 'Toutes les secondes: ' + data )
        );
        const otherSimple$ = timer(0, 5000).pipe(
            map( data => 'Toutes les 5 secondes: ' + data )
        );
        //const theEnd$ = interval(15000);
        const theEnd$ = fromEvent(window, 'dblclick');

        merge(simple$, otherSimple$).pipe(
            takeUntil(theEnd$)
        ).subscribe(
            (data: string) => this.logText += data + "\n"
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

    forkJoin(): void {
        const actor$ = this.http.get<Array<any>>('http://localhost:3000/actors/').pipe(
            delay(2000)
        );
        const series$ = this.http.get<Array<any>>('http://localhost:3000/series');

        // Récupère la dernière valeur de chacun des deux observables
        forkJoin([actor$, series$]).pipe(
            map( ([actors, series]) =>
                actors.map( (actor) => {

                    actor.serie = series.find( (item) => actor.serieId === item.id ).title;
                    delete actor.serieId;
                    return actor;
                })
            )
        ).subscribe(
            (data: any) => this.logText += JSON.stringify(data) + '\n'
        );
    }

    mergeMap() {
        this.clearLog();
        // Permet d'émettre 5 ids avec 3 secondes d'intervale
        const someIds$ = zip(
            of(1, 2, 3, 4, 5),
            timer(0, 3000)
        );
        // let myObj = null;
        // let resultats = [];

        // someIds$.pipe(
        //     mergeMap( ([id, time]) => this.http.get('http://localhost:3000/actors/' + id) ),
        //     tap( (data) => {
        //         myObj = data;
        //     }),
        //     mergeMap( (data) => this.http.get('http://localhost:3000/series/' + data['serieId'])),
        //     tap( (data) => {
        //         myObj.serie = data;
        //         //delete myObj.serieId;
        //         resultats.push(myObj);
        //         this.logText += JSON.stringify(myObj) + '\n';
        //     })
        // ).subscribe(
        //     () => { },
        //     () => { },
        //     () => console.log(resultats)
        // );

        //someIds$.pipe(
        someIds$.pipe(
            mergeMap( ([id, time]) => this.http.get('http://localhost:3000/actors/' + id).pipe(
                mergeMap( (actor: any) => this.http.get('http://localhost:3000/series/' + actor['serieId']).pipe(
                    map( (serie: any) => {
                        actor.serie = serie;
                        return actor
                    })
                ))
            ))
        ).subscribe(
            myObj => {
                this.logText += JSON.stringify(myObj) + '\n';
            }
        );

        const tab = [10, 2, 3];
        console.log(tab.reduce( (acc, el) => acc > el ? acc : el, -1 ));
    }

    switchMap() {
        this.clearLog();
        const someIds$ = of(1, 2, 3, 4, 5);

        someIds$.pipe(
            switchMap( (data) => this.http.get('http://localhost:3000/actors/' + data) )
        ).subscribe(
            (data) => this.logText += 'switchMap: ' + JSON.stringify(data) + '\n'
        );
    }

    subject() {
        this.clearLog();
        const subject$ = new Subject<string>();

        subject$.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );

        subject$.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject$.next("First value");
        subject$.next("Second value");

        subject$.subscribe(
            (data) => this.logText += 'subject3: ' + data + '\n'
        );

        subject$.next("Third value");

        subject$.complete();
    }

    behaviorSubject() {
        this.clearLog();
        const subject$ = new BehaviorSubject<string>("First value");

        subject$.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );

        subject$.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject$.next("Second value");

        subject$.subscribe(
            (data) => this.logText += 'subject3: ' + data + '\n'
        );

        subject$.next("Third value");

        subject$.complete();
    }

    replaySubject() {
        this.clearLog();
        const subject$ = new ReplaySubject<string>(2);

        subject$.subscribe(
            (data) => this.logText += 'subject1: ' + data + '\n'
        );

        subject$.next("First value");
        subject$.next("Second value");
        subject$.next("Third value");

        subject$.subscribe(
            (data) => this.logText += 'subject2: ' + data + '\n'
        );

        subject$.next("Fourth value");
        subject$.complete();
    }

    asyncSubject() {
        this.clearLog();
        const subject$ = new AsyncSubject<string>();

        subject$.subscribe(
            (data) => {
                this.logText += 'subject1: ' + data + '\n'
            }
        );

        subject$.next("First value");
        subject$.next("Second value");
        subject$.next("Third value");

        subject$.subscribe(
            (data) => {
                this.logText += 'subject2: ' + data + '\n'
            }
        );

        subject$.next("Fourth value");
        setTimeout( () => subject$.complete(), 2000);
    }

    takeUntil() {
        this.clearLog();
        const myObs$ = timer(0, 1000);
        const theEnd$ = interval(10000);

        myObs$.pipe(
            takeUntil(theEnd$)
        ).subscribe(
            data => this.logText += data + "\n"
        );
    }

    reduce() {
        this.clearLog();
        const myObs$ = range(1, 20);

        myObs$.pipe(
            reduce((acc, curr) => acc + curr)
        ).subscribe(
            data => this.logText += data + "\n"
        );
    }

    share() {
        this.clearLog();
        const source = interval(5000).pipe(
            map((x: number) => {
                console.log('Processing: ', x);
                return x*x;
            }),
            share()
        );

        source.subscribe(x => console.log('subscription 1: ', x));
        source.subscribe(x => console.log('subscription 2: ', x));
    }

    take() {
        range(0, 20).pipe(
            take(10)
        ).subscribe(
            data => this.logText += data + "\n"
        )
    }

    ngOnDestroy(): void {
        if (this.subTimer != null) {
           this.subTimer.unsubscribe();
           this.subTimer = null;
        }
    }

}

