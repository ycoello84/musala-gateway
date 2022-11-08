import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { HttpClientModule } from '@angular/common/http';
import { GatewayModel } from 'src/app/interfaces/gateway.interface';
import { DeviceModel } from 'src/app/interfaces/device.interface';
import { Subject, takeUntil } from 'rxjs';

const TITLE_CARD_DETAILS = 'Details gateway';
@Component({
  selector: 'app-details-gateway',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [GatewayService],
  templateUrl: './details-gateway.component.html',
  styleUrls: ['./details-gateway.component.scss'],
})
export class DetailsGatewayComponent implements OnInit, OnDestroy {
  id: string = this.actRoute.snapshot.params['id'];
  objGateway?: GatewayModel;
  arrDevices: DeviceModel[] = [];
  stop$: Subject<boolean> = new Subject<boolean>();

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
    this.gatewayService.getGateway(this.id).pipe(takeUntil(this.stop$)).subscribe({
      next: (data: any) => {        
        this.objGateway = data;
      },
    });
    this.gatewayService.getDeviceByGatewayID(this.id).pipe(takeUntil(this.stop$)).subscribe({
      next: (data: any) => {        
        this.arrDevices = data;
      },
    });

    // forkJoin(
    //   this.gatewayService.getGateway(this.id),
    //   this.gatewayService.getDeviceByGatewayID(this.id)
    // ).subscribe({
    //   next(value: [GatewayModel, DeviceModel[]]) {
    //     console.log('All values: ', value);
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();
  }
}
