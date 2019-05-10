import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewFolderComponent } from './modal-new-folder.component';

describe('ModalNewFolderComponent', () => {
  let component: ModalNewFolderComponent;
  let fixture: ComponentFixture<ModalNewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
