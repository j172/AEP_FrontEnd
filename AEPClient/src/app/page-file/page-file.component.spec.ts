import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFileComponent } from './page-file.component';

describe('PageFileComponent', () => {
  let component: PageFileComponent;
  let fixture: ComponentFixture<PageFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
