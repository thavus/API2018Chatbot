import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotWindowComponent } from './chatbot-window.component';

describe('ChatbotWindowComponent', () => {
  let component: ChatbotWindowComponent;
  let fixture: ComponentFixture<ChatbotWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
