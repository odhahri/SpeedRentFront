import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientExploreCarsComponent } from './client-explore-cars.component';

describe('ClientExploreCarsComponent', () => {
  let component: ClientExploreCarsComponent;
  let fixture: ComponentFixture<ClientExploreCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientExploreCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientExploreCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
