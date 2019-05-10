import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFileInfoComponent } from './modal-file-info.component';

describe('ModalFileInfoComponent', () => {
  let component: ModalFileInfoComponent;
  let fixture: ComponentFixture<ModalFileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
