import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css']
})
export class ChatbotWindowComponent implements OnInit {
  @Input() key1: key1;
  @Input() key2: key2;
  @Input() key3: key3;
  recognizing = false;
  isOpen = false;
  recognition;

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
    console.log("clicked");
  }

  handleMic(){
    if (this.recognizing) {
      this.recognizing = false;
      this.recognition.stop();
      return;
    }
    if (!('webkitSpeechRecognition' in window)) {
        alert("Please use the latest version of chrome");
    } else {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.start();
        this.recognizing = true;

    }
  }


  checkEdge(event) {
    this.edge = event;
  }

}
