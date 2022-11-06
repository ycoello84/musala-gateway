import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-gateway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-gateway.component.html',
  styleUrls: ['./list-gateway.component.scss']
})
export class ListGatewayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
