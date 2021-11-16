import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../classes/person';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    @Input() person!: Person;
    @Output() deleteRequest= new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void { }

    delete(): void {

        this.deleteRequest.emit(this.person.id);
    }
}
