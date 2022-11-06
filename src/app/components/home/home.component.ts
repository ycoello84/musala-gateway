import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { HttpClientModule } from "@angular/common/http";
import { GatewayService } from 'src/app/services/gateway.service';
import { GatewayModel } from 'src/app/interfaces/gateway.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[GatewayService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  objGateway: GatewayModel[] = [];


  constructor(private titleCardService: TitlecardService, private gatewayService: GatewayService) {
    this.titleCardService.setTitleCard('Home');
  }

  ngOnInit(): void {
    this.gatewayService.getAllGateways().subscribe({
      next:(data: any)=>{
        console.log('Gateway: ', data);
        this.objGateway = data;
      }
    })
  }
}
