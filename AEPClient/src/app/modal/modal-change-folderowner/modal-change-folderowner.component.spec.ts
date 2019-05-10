import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeFolderownerComponent } from './modal-change-folderowner.component';

describe('ModalChangeFolderownerComponent', () => {
  let component: ModalChangeFolderownerComponent;
  let fixture: ComponentFixture<ModalChangeFolderownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeFolderownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeFolderownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
