import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { GatewayModel } from '../../../../musala-gateway/src/app/interfaces/gateway.interface';
import { GatewayService } from 'src/app/services/gateway.service';
import { DeviceModel } from 'src/app/interfaces/device.interface';
import { Router } from '@angular/router';

const TITLE_CARD = 'Add device';
@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  gateway: GatewayModel[] = [];
  deviceDetails: DeviceModel = {
    UID: '',
    id: '',
    gateway_id: '',
    provider: '',
    creation_date: '',
    status: false,
  };
  constructor(
    private titleCardService: TitlecardService,
    private fb: FormBuilder,
    private router: Router,
    private gatewayService: GatewayService
  ) {
    this.titleCardService.setTitleCard(TITLE_CARD);
    this.deviceForm = this.fb.group({
      UID: [null, Validators.required],
      provider: ['', Validators.required],
      creationDate: ['', Validators.required],
      gateway_id: ['', Validators.required],
      status: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGateway();
    this.deviceForm.get('gateway_id')?.valueChanges.subscribe({
      next: (data: GatewayModel) => {
        console.log('Status changed: ', data);
      },
    });
  }

  loadGateway() {
    this.gatewayService.getAllGateways().subscribe({
      next: (data: any) => {
        console.log('Gateway: ', data);
        this.gateway = data;
      },
    });
  }

  onSubmitForm() {
    this.deviceDetails.UID = this.deviceForm.get('UID')?.value;
    this.deviceDetails.provider = this.deviceForm.get('provider')?.value;
    this.deviceDetails.creation_date =
      this.deviceForm.get('creationDate')?.value;
    this.deviceDetails.gateway_id = this.deviceForm.get('gateway_id')?.value;
    this.deviceDetails.status = this.deviceForm.get('status')?.value;
    this.addDevice(this.deviceDetails);
  }

  addDevice(datadevice: any) {
    console.log('addDevice: ', datadevice);
    this.gatewayService.createDevice(datadevice).subscribe((data: {}) => {
      this.router.navigate(['/list-device']);
    });
  }
}
