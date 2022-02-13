import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.css']
})
export class ConsumeComponent implements OnInit {
    @Input() theNumber: number;
    @Input() theName: string;
    @Output() request: EventEmitter<number> = new EventEmitter()

    constructor(communicationService: CommunicationService) { }

    ngOnInit(): void {
    }

    spend() {
        this.request.emit(10);
    }
}
