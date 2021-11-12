import { Component, OnInit } from '@angular/core';
import { Person } from '../classes/person';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

    items = new Array<Person>();

    constructor() { }

    ngOnInit(): void {

        this.items.push(new Person(0, "Macron", "Emmanuel", "emacron@gmail.com"));
        this.items.push(new Person(1, "Chirac", "Jacky", ""));
        this.items.push(new Person(2, "Holande", "Francois", ""));
        this.items.push(new Person(3, "Trump", "Donald", ""));
        this.items.push(new Person(4, "Merkel", "Angela", ""));
    }

    myDelete(data: any) {

        const index = this.items.findIndex( (element) => element.id === data);
        this.items.splice(index, 1);
    }

    myAdd(data: Person) {

        this.items.push(data);
    }
}
