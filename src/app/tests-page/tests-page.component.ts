import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';

@Component({
  selector: 'app-tests-page',
  templateUrl: './tests-page.component.html',
  styleUrls: ['./tests-page.component.css']
})
export class TestsPageComponent implements OnInit {

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.httpClient.get('/google', { observe: 'response', responseType: 'text' }).subscribe(
            (data) => console.log(data.status),
            (data) => console.log('fred', data)
        );

        this.httpClient.get('/foot/v2/matches').subscribe(
            (data) => console.log(data)
        );
    }

}
