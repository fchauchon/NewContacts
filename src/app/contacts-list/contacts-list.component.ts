import { Component, OnInit } from '@angular/core';
import { Person } from '../classes/person';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

    items!: Array<Person>;

    constructor() { }

    ngOnInit(): void {

        this.items = new Array<Person>();
        this.items.push(new Person(0, "Macron", "Emmanuel", "emacron@gmail.com"));
        this.items.push(new Person(1, "Chirac", "Jacques", "jacky@paradis.et"));
        this.items.push(new Person(2, "Hollande", "François", "fhollande@ps.fr"));
        this.items.push(new Person(3, "Trump", "Donald", "fake@president.com"));
        this.items.push(new Person(4, "Merkel", "Angela", "amerkel@cdu.de"));
    }

    myDelete(id: number): void {

        const index = this.items.findIndex( (element) => element.id === id);
        this.items.splice(index, 1);
    }

    myAdd(person: Person): void {

        this.items.push(person);
    }
}
