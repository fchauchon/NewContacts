import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    propositions: Array<string> = new Array<string>();
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            search: this.searchControl
        });

        this.searchControl.valueChanges.pipe(
            debounceTime(1000),
            mergeMap( data => this.dataService.searchContacts(data))
        ).subscribe(
            (data: Array<string>) => {
                this.propositions = ['No result'];
                if (data.length > 0) {
                    this.propositions = data
                }
            }
        )
    }

}
