import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css']
})
export class ChatbotWindowComponent implements OnInit {
  @Input() aKey1: boolean;
  @Input() aKey2: boolean;
  @Input() aKey3: boolean;
  recognizing = false;
  isOpen = false;
  recognition;
  pinnedChats = [];
  prevTexts = [
    {
      val : "hello",
      from : "bot"
    },
    {
      val : "hello",
      from : "user"
    }
  ];
  text = {
      val : "",
      from : ""
    };

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
    this.aKey3 = true;
    this.aKey2 = false;
    this.aKey1 = false;
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

  addChat(val, from){
    this.text = {
      val : val,
      from : from
    }
    this.prevTexts.push(this.text);
    this.text = {
      val : "",
      from : ""
    };
  }

  checkEdge(event) {
    this.edge = event;
  }

}
