import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

    inputValue = '';

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
    }

    sendData() {
        this.dataService.pushData(this.inputValue);
    }

}
