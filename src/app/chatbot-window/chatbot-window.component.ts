import { Component, OnInit, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ServiceNowService } from '../service-now.service';

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
  OIMNeedsPushed = true;
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
      val : "Remind me later"
    }
  ];
  notifications = [
    {
      val: "I noticed you need to take your Managing Risk in Agile training for 2018!"
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

  constructor(private serviceNow: ServiceNowService) {
  }

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
    this.createTicket();
    this.isOpen = this.isOpen ? false : true;
    this.aKey3 = true;
    this.aKey2 = false;
    this.aKey1 = false;
    if(this.OIMNeedsPushed){
      this.notifications.push({ val: "You have a pending OIM approval"});
      this.OIMNeedsPushed = false;
    }
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

  createTicket(){
    this.serviceNow.createTicket().subscribe(data => {
      console.log(data['number']);
      console.log('https://pncmelliniumfalcon.service-now.com/nav_to.do?uri=incident.do?sys_id=' +  data['sys_id']);
    });
  }

  checkEdge(event) {
    this.edge = event;
  }

}
