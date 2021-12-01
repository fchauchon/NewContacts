import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

    inputValue = '';

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void { }

    sendData(): void {
        this.communicationService.pushData(this.inputValue);
    }

    sendDataAndClear(): void {
        this.communicationService.pushData(this.inputValue);
        this.inputValue = '';
    }
}
