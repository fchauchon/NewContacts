import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-page-two-ways',
  templateUrl: './two-ways-page.component.html',
  styleUrls: ['./two-ways-page.component.css']
})
export class TwoWaysPageComponent implements OnInit {

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void {
    }

    public get sharedNumber(): number {
         return this.communicationService.sharedNumber;
    }

    public set sharedNumber(value: number) {
        this.communicationService.sharedNumber = value;
    }

    doIt(value: number) {
        this.communicationService.sharedNumber += value;
    }
}
