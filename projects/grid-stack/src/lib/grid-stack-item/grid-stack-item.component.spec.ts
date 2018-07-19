import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStackItemComponent } from './grid-stack-item.component';

describe('GridStackItemComponent', () => {
  let component: GridStackItemComponent;
  let fixture: ComponentFixture<GridStackItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridStackItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
