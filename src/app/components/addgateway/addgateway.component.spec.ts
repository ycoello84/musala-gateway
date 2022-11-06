import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgatewayComponent } from './addgateway.component';

describe('AddgatewayComponent', () => {
  let component: AddgatewayComponent;
  let fixture: ComponentFixture<AddgatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddgatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
