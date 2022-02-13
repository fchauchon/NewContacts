import { Component, Input, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-two-ways',
  templateUrl: './two-ways.component.html',
  styleUrls: ['./two-ways.component.css']
})
export class TwoWaysComponent implements OnInit {
    @Input() theNumber: number;
    

    myValue = "Valeur initiale";

    constructor(private communicationService: CommunicationService) { }

    ngOnInit(): void { }

    add() {
        this.communicationService.sharedNumber += 100;
    }
}
