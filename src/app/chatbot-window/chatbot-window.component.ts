import { Component, OnInit, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ServiceNowService } from '../service-now.service';
import { BrainService } from '../brain.service';
import { DomSanitizer } from '@angular/platform-browser';

const {webkitSpeechRecognition} : IWindow = <IWindow>window;

@Component({
  selector: 'app-chatbot-window',
  templateUrl: './chatbot-window.component.html',
  styleUrls: ['./chatbot-window.component.css'],
})

export class ChatbotWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('box') private myInputBox: ElementRef;
  @Input() aKey1: boolean;
  @Input() aKey2: boolean;
  @Input() aKey3: boolean;
  safeHTML : any;
  OIMNeedsPushed = true;
  speechRecognition = Window['webkitSpeechRecognition'];
  recognizing = false;
  isOpen = false;
  pinnedChats = [];
  prevTexts = [
    {
      val : "I noticed you need to take your Managing Risk in Agile Training for 2018. Would you like to go there now?",
      isUser : false,
      isCard : false,
      bubbles : [
        {
          val : "Yes"
        },
        {
          val : "No"
        },
        {
          val : "Remind me later"
        }
      ]
    }
  ];

  notifications = [
    {
      val: "I noticed you need to take your Managing Risk in Agile training for 2018!"
    }
  ];
  text = {
      val : "",
      isUser : false,
      isCard : false,
      bubbles : []
    };
  inputText = "";

  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  constructor(private serviceNow: ServiceNowService, private sanitizer: DomSanitizer, private brain : BrainService) {
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.interimResults = true;
  }

  ngOnInit() {
      this.scrollToBottom();
  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  respond(){
    let data = this.brain.getJSON();
        for(let i = 0; i < data.length; i++){
          for (let j = 0; j < data[i].length; j++) {
              if(typeof data[i][j] == "string"){
                console.log(data[i][j].search(new RegExp("hi", "i")));
              }
          }
        }
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }

  handlePopUp(){
    this.createTicket();
    this.createCard('holiday', '/assets/img/card_chat_holiday.svg', [])
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
        this.speechRecognition.stop();
        this.addChat(this.myInputBox.nativeElement.value, true, []);
      this.myInputBox.nativeElement.value = "";
        return;
    }
    this.speechRecognition.start();
    let final_transcript = '';
    this.recognizing = true;

    this.speechRecognition.onstart = (event) => {
      this.recognizing = true;
    };

    this.speechRecognition.onresult = (event) => {
      let interim_transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        console.log(this.recognizing);
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
          this.myInputBox.nativeElement.value = interim_transcript;
        }
      }
    //this.myInputBox.nativeElement.value = final_transcript;

    };


    this.speechRecognition.onend = () => {
      this.recognizing = false;

      if(!final_transcript) {
        return;
      }
    };
  }

  addChat(val, isUser, bubbles, isCard = false){
    if(!bubbles){
      bubbles = [];
    }
    this.text = {
      val : val,
      isUser : isUser,
      isCard : isCard,
      bubbles : bubbles
    };
    if(this.text.val != ""){
      this.prevTexts.push(this.text);
      this.inputText = "";
    }
  }

  createTicket(){
    this.serviceNow.createTicket().subscribe(data => {
      let result = data['result'];
      let text = "I've created your ServiceNow request. Your Incident Number is <a style=\"color: #fcbc04;\" href=\"";
      text += "https://pncmelliniumfalcon.service-now.com/nav_to.do?uri=incident.do?sys_id=";
      text += result.sys_id;
      text += "\" target=\"_new\">";
      text += result.number;
      text += "</a>";
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(text);
      const bubbles = [
        {
          val : "Pin this"
        },
        {
          val : "One more thing"
        },
        {
          val : "Thanks!"
        }
      ]
      this.addChat(this.safeHTML, false, bubbles);
    });
  }

  createCard(type, url, bubbles){
    if(type === 'holiday') {
      let text = "<img width=\"215px\" src=\"";
      text += url;
      text += "\" />";
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(text);
      this.addChat(this.safeHTML, false, bubbles, true);
    }

  }

  checkEdge(event) {
    this.edge = event;
  }

}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
