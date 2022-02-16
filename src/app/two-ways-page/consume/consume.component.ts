import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.css']
})
export class ConsumeComponent implements OnInit {
    @Input() theNumber: number;
    @Input() theName: string;
    @Input() buttonColor: string;
    @Output() request: EventEmitter<number> = new EventEmitter()

    theClass = {};

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.theClass = ['btn', this.buttonColor];
    }

    spend() {
        this.request.emit(-10);
        //this.communicationService.sharedNumber -= 10;
    }
}
