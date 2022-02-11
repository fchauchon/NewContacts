import { HttpClient } from '@angular/common/http';
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

    constructor(private _httpClient: HttpClient) { }

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

        const mapp = new Map();
        mapp.set('KEY1', 'Thomas');
        console.log(mapp.get('KEY1'));
        mapp.set('KEY1', 'Thomasssss');
        console.log(mapp.get('KEY1'));
        console.log(mapp.has('KEY2'));

        const ensemble = new Set();
        ensemble.add('Thomas');
        ensemble.add('Thomas');
        ensemble.add('Thomas');
        ensemble.add('Thomas');
        ensemble.add('Thomas');
        console.log(ensemble.size);

        const tab = [ 1, 2, 3, 4, 5, -1];
        console.log('Some', tab.some( el => el > 10))
        console.log('Some', tab.some( el => el > 3))
        console.log('Every', tab.every( el => el > 0))
        console.log('Every', tab.every( el => el > -5))

        this._httpClient.get('/placeholder/users', { observe: 'response' }).subscribe(
            (response) => {
                console.info('lemonde.fr, status code', response.status);
                console.log(response.body)
                console.log(response.headers)
            },
            (err) => console.error(err)
        );

        this._httpClient.get('/api/v2/matches').subscribe(
            (data) => console.log('apifootbal.org', data)
        );
    }

    stop() {
        this.stopIt.next(0);
        this.stopIt.complete();
    }

}
