import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagementContainerComponent } from './client-management-container.component';

describe('ClientManagementContainerComponent', () => {
  let component: ClientManagementContainerComponent;
  let fixture: ComponentFixture<ClientManagementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientManagementContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientManagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
