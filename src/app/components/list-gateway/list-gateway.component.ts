import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from '../../services/titlecard.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { GatewayModel } from 'src/app/interfaces/gateway.interface';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const TITLE_CARD_LIST = 'List gateway';
@Component({
  selector: 'app-list-gateway',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [GatewayService],
  templateUrl: './list-gateway.component.html',
  styleUrls: ['./list-gateway.component.scss'],
})
export class ListGatewayComponent implements OnInit {
  objGateway: GatewayModel[] = [];

  constructor(
    private titleCardService: TitlecardService,
    private gatewayService: GatewayService,    
  ) {
    this.titleCardService.setTitleCard(TITLE_CARD_LIST);
  }

  ngOnInit(): void {
    this.titleCardService.setTitleCard(TITLE_CARD_LIST);
    this.loadGateway();
  }

  loadGateway() {
    this.gatewayService.getAllGateways().subscribe({
      next: (data: any) => {
        console.log('Gateway: ', data);
        this.objGateway = data;
      },
    });
  }

    // Delete gateway
    deleteGateway(id: any) {
      if (window.confirm('Are you sure, you want to delete?')) {
        this.gatewayService.deleteGateway(id).subscribe((data) => {
          this.loadGateway();
        });
      }else {
        console.log('No.....');
      }
    }

  ViewDetails(id: string) {
    
  }
}
