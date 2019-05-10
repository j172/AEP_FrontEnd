import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFolderModifyComponent } from './modal-folder-modify.component';

describe('ModalFolderModifyComponent', () => {
  let component: ModalFolderModifyComponent;
  let fixture: ComponentFixture<ModalFolderModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFolderModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFolderModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
