import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlecardService } from '../../../../musala-gateway/src/app/services/titlecard.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { HttpClientModule } from '@angular/common/http';
import { GatewayModel } from 'src/app/interfaces/gateway.interface';
import { DeviceModel } from 'src/app/interfaces/device.interface';
import { forkJoin } from 'rxjs';

const TITLE_CARD_DETAILS = 'Details gateway';
@Component({
  selector: 'app-details-gateway',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [GatewayService],
  templateUrl: './details-gateway.component.html',
  styleUrls: ['./details-gateway.component.scss'],
})
export class DetailsGatewayComponent implements OnInit {
  id: string = this.actRoute.snapshot.params['id'];
  objGateway?: GatewayModel;
  objDevices: DeviceModel[] = [];

  constructor(
    public actRoute: ActivatedRoute,
    public router: Router,
    private gatewayService: GatewayService,
    private titleCardService: TitlecardService
  ) {
    this.titleCardService.setTitleCard(TITLE_CARD_DETAILS);
  }

  ngOnInit(): void {
    console.log('ID: ', this.id);
    this.loadDetailsGateway();
  }

  loadDetailsGateway() {
    // this.gatewayService.getGateway(this.id).subscribe({
    //   next: (data: any) => {
    //     console.log('Gateway id: ', data);
    //     this.objGateway = data;
    //   },
    // });
    // this.gatewayService.getDevice(this.id).subscribe({
    //   next: (data: any) => {
    //     console.log('Devices: ', data);
    //     this.objDevices = data;
    //   },
    // });

    forkJoin(this.gatewayService.getGateway(this.id),this.gatewayService.getDevice(this.id)).subscribe({
      next(value) {
        console.log('All values: ', value);
      },
    })

  }
}
