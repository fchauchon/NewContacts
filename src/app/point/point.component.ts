import { CommunicationService } from 'src/app/services/communication.service';
import { Component, Inject, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit, AfterViewInit {

    @Input() theId: string;
    @Input() theBgColor: string;

    protected myStyle: any;
    protected myCanvas: HTMLCanvasElement;

    @ViewChild('myPoint', {static: false}) canvas: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private communicationService: CommunicationService
    ) { }

    ngOnInit(): void {
        this.myStyle = {
            'background-color': this.theBgColor
        };
    }

    ngAfterViewInit(): void {
        this.myCanvas = this.document.getElementById(this.theId) as HTMLCanvasElement;
        this.communicationService.onPoint().subscribe(
            (val) => {
                //const ctx = this.myCanvas.getContext('2d');
                const ctx = this.canvas.nativeElement.getContext('2d');
                const infos = val.split(' ');
                if (infos.length === 1) {
                    ctx.fillStyle = this.theBgColor;
                    ctx.fillRect(0, 0, 200, 200);
                } else {
                    ctx.fillStyle = infos[0];
                    ctx.fillRect(parseInt(infos[1], 10), parseInt(infos[2], 10), 5, 5);
                }
            }
        )
    }

}
