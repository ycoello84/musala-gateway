import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGatewayComponent } from './list-gateway.component';

describe('ListGatewayComponent', () => {
  let component: ListGatewayComponent;
  let fixture: ComponentFixture<ListGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
