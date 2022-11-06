import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGatewayComponent } from './details-gateway.component';

describe('DetailsGatewayComponent', () => {
  let component: DetailsGatewayComponent;
  let fixture: ComponentFixture<DetailsGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetailsGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
