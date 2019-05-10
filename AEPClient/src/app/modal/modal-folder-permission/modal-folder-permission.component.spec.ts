import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFolderPermissionComponent } from './modal-folder-permission.component';

describe('ModalFolderPermissionComponent', () => {
  let component: ModalFolderPermissionComponent;
  let fixture: ComponentFixture<ModalFolderPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFolderPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFolderPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
