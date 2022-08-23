import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css'],
  animations: [
      // Element concerné
      trigger('square', [
        // Etat
        state('normal', style(
        {
          backgroundColor: 'white',
          border: '2px solid #444',
          borderRadius: '0'
        }
        )),
        // Etat
        state('wild', style(
        {
          backgroundColor: 'red',
          border: 'none',
          borderRadius: '50%'
        }
        )),
        // Transitions
        transition('normal <=> wild', animate(1000)),
        transition(':enter', animate(200)),
        transition(':leave', animate('1s')),
      ])
  ]
})
export class AnimateComponent implements OnInit {

    public state = 'normal';
    public showMe = true;

    constructor() { }

    ngOnInit(): void {
    }

}
