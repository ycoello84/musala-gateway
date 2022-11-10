import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { Router, RouterModule } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';
import { DeviceModel } from 'src/app/interfaces/device.interface';
import { GatewayModel } from '../../../../musala-gateway/src/app/interfaces/gateway.interface';
import { Subject, takeUntil } from 'rxjs';

const TITLE_CARD = 'Device list';
@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  objDevice: DeviceModel[] = [];
  objGateway: GatewayModel[] = [];
  stop$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private titleCardService: TitlecardService,
    private router: Router,
    private gatewayService: GatewayService
  ) {
    this.titleCardService.setTitleCard(TITLE_CARD);
  }

  ngOnInit(): void {
    this.loadGateway();
  }

  loadGateway() {
    this.gatewayService
      .getAllDevice()
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: (data: any) => {
          this.objDevice = data;
        },
      });
    this.gatewayService
      .getAllGateways()
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: (data: any) => {
          this.objGateway = data;
        },
      });
  }

  gatewayName(deviceID: string) {
    return this.objGateway
      .filter((gateway) => gateway.id === deviceID)
      .map((gatewayResult) => gatewayResult.name)
      .reduce((acc, score) => acc + score, '');
  }

  ChangeStatus(lastDevice: DeviceModel) {
    for (const device of this.objDevice) {
      if (lastDevice.id === device.id) {
        device.status = device.status == true ? false : true;
        this.updateDevice(device);
      }
    }
  }

  updateDevice(device: DeviceModel) {
    this.gatewayService.updateDevice(device.id, device).subscribe((data) => {});
  }

  deleteDevice(id: any) {
    if (window.confirm('Are you sure, you want to delete device?')) {
      this.gatewayService.deleteDevice(id).subscribe((data) => {
        this.loadGateway();
      });
    }
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();
  }
}
