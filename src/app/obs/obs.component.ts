import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, combineLatest, forkJoin, from, fromEvent, iif, interval, merge, Observable, of, race, range, ReplaySubject, Subject, Subscription, timer, zip } from 'rxjs';
import { concatMap, delay, distinctUntilChanged, exhaustMap, filter, map, mergeMap, reduce, share, startWith, switchMap, take, takeUntil, tap, toArray } from 'rxjs/operators';
import { CommunicationService } from '../services/communication.service';
import { Flight } from '../flight';
import { City } from '../city';

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

    cache = new Map<string, any>()

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

    complique() {
      // Le premier Observable nous renvoie un tableau en un seul morceau.
      // Le but est de faire deux appels par élément du premier tableau
      // Et de stocker la traduction du code de la ville départ et destination
      // Le premier mergeMap éclate le tableau de flight en une séquence de x next() pour chacune des lignes du tableau
      // Le second mergeMap prend la première ligne est la transforme pour récupérer le label correspondant au code
      // Le troisième mergeMap fait la même chose que second sur la destination
      this.http.get('http://localhost:3000/flights').pipe(
        mergeMap( (flights: any[]) => from(flights)),
        mergeMap( (flight: any) => this.http.get('http://localhost:3000/cities?code=' + flight.to).pipe(
            map( (cities: any[]) => {
              flight.to = cities[0].label
              return flight
            })
        )),
        mergeMap( (flight: any) => this.http.get('http://localhost:3000/cities?code=' + flight.from).pipe(
            map( (cities: any[]) => {
              flight.from = cities[0].label
              return flight
            })
        ))
      ).subscribe(
        d => console.log(d)
      )
    }

    compliqueWithCache() {
      this.http.get('http://localhost:3000/flights').pipe(
        mergeMap( (flights: any[]) => from(flights)),
        mergeMap( (flight: any) => {
          const fromCache = this.cache.get(flight.to)
          if (fromCache) {
              console.log('In cache to')
              flight.to = fromCache
              return of(flight)
          } else {
              return this.http.get('http://localhost:3000/cities?code=' + flight.to).pipe(
                  map( (cities: any[]) => {
                      this.cache.set(flight.to, cities[0].label)
                      flight.to = cities[0].label
                      return flight
                  })
              )
          }
        }),
        mergeMap( (flight: any) => {
          const fromCache = this.cache.get(flight.from)
          if (fromCache) {
              console.log('In cache from')
              flight.from = fromCache
              return of(flight)
          } else {
              return this.http.get('http://localhost:3000/cities?code=' + flight.from).pipe(
                  map( (cities: any[]) => {
                      this.cache.set(flight.from, cities[0].label)
                      flight.from = cities[0].label
                      return flight
                  })
              )
          }
        })
      ).subscribe(
        d => console.log(d)
      )
    }

    // concatMap() {
    //   from(['https://jsonplaceholder.typicode.com/users/1', 'https://jsonplaceholder.typicode.com/users/2']).pipe(
    //     tap(()=>console.log("hello")),
    //     concatMap((url: string) => this.http.get(url)),
    //     map(
    //       (objPrinc: any) => {
    //           return objPrinc.name;
    //       }
    //     ),
    //     toArray()
    //   ).subscribe(
    //     d => console.log(d)
    //   );
    // }

    // Le GET nous renvoie un tableau de x vols [{from: code, to: code}, {from: code, to: code}]
    // Le premier concatMap prend le résultat de la requête précédence et avec le tableau récupéré
    // Renvoie un observable qui émet x fois les vols
    // Le second concatMap appelle l'url /cities?code=XXX x fois
    //      On applique un map pour mettre dans le paramètre flight.from la valeur récupérée dans l'appel à cities
    // On fait la même chose pour le to
    // le toArray() permet de récupérer un tableau de résultat
    concatMap() {
        this.http.get('http://localhost:3000/flights').pipe(
            concatMap( (flights: Flight[]) => from(flights) ),
            concatMap( (flight: Flight) => this.http.get('http://localhost:3000/cities?code=' + flight.from).pipe(
                map( (cities: City[]) => ( { from: cities[0].label, to: flight.to } ) )
            )),
            concatMap( (flight: Flight) => this.http.get('http://localhost:3000/cities?code=' + flight.to).pipe(
                map( (cities: City[]) => ( { from: flight.from, to: cities[0].label } ) )
            )),
            toArray()
        ).subscribe(
            (flights: Flight[]) => console.log(flights)
        );
    }

    race() {

      const obs5$ = new Observable( (observer) =>
      {
        observer.next('Valeur 1');
        observer.next('Valeur 2');
        setTimeout( () => {
          observer.next('Valeur 3');
          observer.complete();
        }, 1000);

      });
      const obs6$ = new Observable( (observer) =>
      {
        observer.next('Valeur 11');
        observer.next('Valeur 22');
        setTimeout( () => {
          observer.next('Valeur 33');
          observer.complete();
        }, 2000);

      });
      const obs7$ = new Observable( (observer) =>
      {
        observer.next('Valeur 111');
        observer.next('Valeur 222');
        setTimeout( () => {
          observer.next('Valeur 333');
          observer.complete();
        }, 50);

      });

      race(obs5$, obs6$, obs7$).subscribe(
        d => console.log(d)
      );
    }

    startWith() {

      of('Valeur 1', 'Valeur 2').pipe(
         startWith('Valeur insérée')
      ).subscribe(
        d => console.log(d)
      );
    }

    combineLastest() {

      const obs8$ = new Observable( (observer) =>
      {
        let i = 0;
        setInterval(() => observer.next('OBS1 ' + (++i)), 1000);
      });
      const obs9$ = new Observable( (observer) =>
      {
        let i = 0;
        setInterval(() => observer.next('OBS2 ' + (++i)), 3000);
      });
      const obs10$ = new Observable( (observer) =>
      {
        let i = 0;
        setInterval(() => observer.next('OBS3 ' + (++i)), 5000);
      });

      combineLatest([obs8$, obs9$, obs10$]).subscribe(
        d => console.log(d)
      );
    }

    exhaustMap() {
        of('https://jsonplaceholder.typicode.com/users/1', 'https://jsonplaceholder.typicode.com/users/2', 'https://jsonplaceholder.typicode.com/users/3', 'https://jsonplaceholder.typicode.com/users/4').pipe(
            exhaustMap((url: string) => this.http.get(url)),
            map(
                (objPrinc: any) => {
                    return objPrinc.name;
                }
            ),
            toArray()
        ).subscribe(
            d => console.log(d)
        );
    }

    ngOnDestroy(): void {
        if (this.subTimer != null) {
           this.subTimer.unsubscribe();
           this.subTimer = null;
        }
    }

}

