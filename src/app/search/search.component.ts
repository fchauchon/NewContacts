import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    propositions: Array<Person> = new Array<Person>();
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            search: this.searchControl
        });

        this.searchControl.valueChanges.pipe(
            debounceTime(2000),
            mergeMap( (query: string) => {
                if (query != null && query.length > 0) {
                    return this.dataService.searchContacts(query)
                } else {
                    return of([]);
                }
            })
        ).subscribe(
            (data: Array<Person>) => {
                this.propositions = [];
                if (data.length > 0) {
                    this.propositions = data
                }
            }
        )
    }

}
