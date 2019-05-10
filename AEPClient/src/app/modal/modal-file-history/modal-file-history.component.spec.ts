import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFileHistoryComponent } from './modal-file-history.component';

describe('ModalFileHistoryComponent', () => {
  let component: ModalFileHistoryComponent;
  let fixture: ComponentFixture<ModalFileHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFileHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
