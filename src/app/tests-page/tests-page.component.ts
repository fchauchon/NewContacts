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

    ngOnInit(): void { }

}
