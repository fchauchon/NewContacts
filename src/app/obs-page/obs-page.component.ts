import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-obs',
  templateUrl: './obs-page.component.html',
  styleUrls: ['./obs-page.component.css']
})
export class ObsPageComponent implements OnInit, OnDestroy {

    subClick: Subscription;
    subKeydown: Subscription;

    constructor() { }

    ngOnInit(): void {
        this.subClick = fromEvent(window, 'click').subscribe(
            event => console.log(event)
        );
        this.subKeydown = fromEvent(window, 'keydown').subscribe(
            event => {
                if ((event as KeyboardEvent).key === 'Escape') {
                    alert('Escape key pressed')
                }
            }
        );
    }

    ngOnDestroy() {
        this.subClick.unsubscribe();
        this.subKeydown.unsubscribe();
    }
}
