import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Person } from '../classes/person';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() person!: Person;
    @Output() deleteRequest= new EventEmitter<number>();
    styles= {};

    constructor() {

     }

    ngOnInit(): void {

     }

    ngOnChanges(): void {

    }
    ngAfterViewInit(): void {

    }
    ngOnDestroy(): void {

    }

    delete(): void {

        this.deleteRequest.emit(this.person.id);
    }

}
