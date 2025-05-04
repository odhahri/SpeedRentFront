import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPayementComponent } from './client-payement.component';

describe('ClientPayementComponent', () => {
  let component: ClientPayementComponent;
  let fixture: ComponentFixture<ClientPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
