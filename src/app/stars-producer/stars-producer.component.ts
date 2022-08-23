import { CommunicationService } from 'src/app/services/communication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stars-producer',
  templateUrl: './stars-producer.component.html',
  styleUrls: ['./stars-producer.component.css']
})
export class StarsProducerComponent implements OnInit, OnDestroy {

    protected isLaunched: boolean = false;
    protected stop$: Subject<string>;
    protected period$: Subscription = null;

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.stop$ = new Subject<string>();
    }

    protected launch() {
        this.isLaunched = true;
        this.period$ = timer(0, 500).pipe(takeUntil(this.stop$))
            .subscribe(
                () => {
                    const newOne = Math.random();
                    if (newOne < 0.75) {
                        const idColor = this.getNumberBetween(1, 4);
                        let color = '';
                        const x = this.getNumberBetween(5, 195);
                        const y = this.getNumberBetween(5, 195)

                        switch (idColor) {
                            case 1:
                                color = 'black';
                                break;
                            case 2:
                                color = 'red';
                                break;
                            case 3:
                                color = 'yellow';
                                break;
                            case 4:
                                color = 'white';
                                break;
                        }
                        this.communicationService.pushStar(color + ' ' + x + ' ' + y);
                    }
                }
            );
    }

    protected delete() {
        this.communicationService.pushStar('');
    }

    protected stop() {
        this.isLaunched = false;
        this.stop$.next('');
    }

    protected getNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ngOnDestroy() {
        if (this.period$) {
            this.period$.unsubscribe();
            this.period$ = null;
        }
    }
}
