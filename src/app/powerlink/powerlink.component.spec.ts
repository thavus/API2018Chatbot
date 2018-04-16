import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerlinkComponent } from './powerlink.component';

describe('PowerlinkComponent', () => {
  let component: PowerlinkComponent;
  let fixture: ComponentFixture<PowerlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
