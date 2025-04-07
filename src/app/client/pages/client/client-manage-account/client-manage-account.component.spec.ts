import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManageAccountComponent } from './client-manage-account.component';

describe('ClientManageAccountComponent', () => {
  let component: ClientManageAccountComponent;
  let fixture: ComponentFixture<ClientManageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientManageAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
