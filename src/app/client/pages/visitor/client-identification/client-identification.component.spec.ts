import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIdentificationComponent } from './client-identification.component';

describe('ClientIdentificationComponent', () => {
  let component: ClientIdentificationComponent;
  let fixture: ComponentFixture<ClientIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
