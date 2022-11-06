import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayService } from 'src/app/services/gateway.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TitlecardService } from 'src/app/services/titlecard.service';
import { GatewayModel } from 'src/app/interfaces/gateway.interface';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

const TITLE_CARD = 'Edit gateway';
@Component({
  selector: 'app-edit-gateway',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  // providers:[GatewayService],
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.scss'],
})
export class EditGatewayComponent implements OnInit, OnDestroy {

  gatewayForm!: FormGroup;
  stop$: Subject<boolean> = new Subject<boolean>();
  idToUpdate = '';

  constructor(
    private titleCardService: TitlecardService,
    private fb: FormBuilder,
    private router: Router,
    private gatewayService: GatewayService
  ) {
    this.titleCardService.setTitleCard(TITLE_CARD);
    this.gatewayForm = this.fb.group({
      name: ['', Validators.required],
      serial: ['', Validators.required],
      ip: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.listenGatewayToEdit();
  }

  listenGatewayToEdit() {
    this.gatewayService.currentGatewayToEdit
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: (data: GatewayModel) => {
          this.updateGateway(data);
        },
      });
  }

  updateGateway(data: GatewayModel) {
    console.log('updateGateway: ', data);
    if (data.id === '' || data.id === null) {
      this.router.navigateByUrl('/list-gateway');
    }else {
     
      this.idToUpdate = data.id;
      this.gatewayForm.get('ip')?.setValue(data.ip)
      this.gatewayForm.get('serial')?.setValue(data.serial)
      this.gatewayForm.get('name')?.setValue(data.name)
    }
  }

  onSubmitForm() {
    if(window.confirm('Are you sure, you want to update?')){
      const dataGateway: GatewayModel = {
       id:  this.idToUpdate,
       name:  this.gatewayForm.get('name')?.value,
       serial:  this.gatewayForm.get('serial')?.value,
       ip:  this.gatewayForm.get('ip')?.value,
      }
      this.gatewayService.updateGateway(this.idToUpdate, dataGateway).subscribe(data => {
        this.router.navigate(['/list-gateway'])
      })
    }
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();
  }
}
