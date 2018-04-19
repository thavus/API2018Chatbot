import { Component, OnInit, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css'], 
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
      val : "I noticed you need to take your Managing Risk in Agile Training for 2018. Would you like to go there now?",
      isUser : false
    }
  ];
  bubbles = [
    {
      val : "Yes"
    },
    {
      val : "No"
    },
    {
      val : "remind me later"
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
      this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          console.log(this.myScrollContainer.nativeElement.scrollHeight);
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
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
    if(this.text.val != ""){
      this.prevTexts.push(this.text);
      this.inputText = "";
    }
  }

  checkEdge(event) {
    this.edge = event;
  }

}
