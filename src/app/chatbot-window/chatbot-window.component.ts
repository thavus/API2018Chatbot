import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css']
})
export class ChatbotWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() aKey1: boolean;
  @Input() aKey2: boolean;
  @Input() aKey3: boolean;
  speechRecognition = Window['webkitSpeechRecognition'];
  recognizing = false;
  isOpen = false;
  recognition;
  pinnedChats = [];
  prevTexts = [
    {
      val : "hello",
      isUser : false
    },
    {
      val : "hello",
      isUser : true
    }
  ];
  text = {
      val : "",
      isUser : false
    };
  inputText = "";

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
        this.recognition = new this.speechRecognition();
        this.recognition.start();
        this.recognizing = true;
    }
  }

  addChat(val, isUser){
    this.text = {
      val : val,
      isUser : isUser
    };
    this.prevTexts.push(this.text);
    this.inputText = "";
  }

  checkEdge(event) {
    this.edge = event;
  }

}
