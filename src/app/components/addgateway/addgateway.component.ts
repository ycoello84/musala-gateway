import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { ReactiveFormsModule,  FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';
import { GatewayService } from '../../services/gateway.service';
import { Router } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";


const TITLE_CARD = 'Add gateway';

@Component({
  selector: 'app-addgateway',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers:[GatewayService],
  templateUrl: './addgateway.component.html',
  styleUrls: ['./addgateway.component.scss']
})

export class AddgatewayComponent implements OnInit {

  gatewayForm: FormGroup;
  checkedPeripheralDevice = false;
  gatewayDetails = { name: 'TP-LINK', serial: '123456789', ip: '192.0.0.1' };

  constructor(private titleCardService: TitlecardService, private fb: FormBuilder, private gatewayService: GatewayService, public router: Router) {
    this.titleCardService.setTitleCard(TITLE_CARD);
    this.gatewayForm = this.fb.group({
      name: ['', Validators.required],
      serial: ['', Validators.required],
      ip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.gatewayForm = new FormGroup({
    //   serial: new FormControl('123456789'),
    //   ip: new FormControl(''),
    //   name: new FormControl(''),
    // });   
  }  

  checkValue() {
    this.checkedPeripheralDevice = !this.checkedPeripheralDevice;
    if (this.checkedPeripheralDevice) {
      console.log('Checked: true');
    }else {
      console.log('Checked: false');
    }
  }

  addGateway(datagateway: any) {
    this.gatewayService.createGateway(this.gatewayDetails).subscribe((data: {}) => {
      this.router.navigate(['/home']);
    });
  }

  onSubmitForm() {
    console.log('Valid?', this.gatewayForm.valid); // true or false
    console.log('Name', this.gatewayForm.value.name);
    console.log('Serial', this.gatewayForm.value.serial);
    console.log('IP', this.gatewayForm.value.ip);
    this.gatewayDetails.name = this.gatewayForm.value.name;
    this.gatewayDetails.serial = this.gatewayForm.value.serial;
    this.gatewayDetails.ip = this.gatewayForm.value.ip;
    this.addGateway(this.gatewayDetails);
  }

}
