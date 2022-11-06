import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-gateway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-gateway.component.html',
  styleUrls: ['./details-gateway.component.scss']
})
export class DetailsGatewayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
