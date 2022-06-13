import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrastrarComponent } from './arrastrar.component';

describe('ArrastrarComponent', () => {
  let component: ArrastrarComponent;
  let fixture: ComponentFixture<ArrastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
