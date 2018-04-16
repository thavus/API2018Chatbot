import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css']
})
export class ChatbotWindowComponent implements OnInit {
  isOpen = false;

  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  constructor() { }

  ngOnInit() {
  }

  handlePopUp(){
    this.isOpen = this.isOpen ? false : true;
  }


  checkEdge(event) {
    this.edge = event;
  }

}
