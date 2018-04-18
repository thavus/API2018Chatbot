import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-page',
  templateUrl: './choose-page.component.html',
  styleUrls: ['./choose-page.component.css']
})
export class ChoosePageComponent implements OnInit {
  key1 = false;
  key2 = false;
  key3 = false;

  constructor() { }

  ngOnInit() {
  }

  keyPress(event){
    if(event.key === '1'){
      this.key1 = true;
      this.key2 = false;
      this.key3 = false;
    }
    if(event.key === '2'){
      this.key1 = false;
      this.key2 = true;
      this.key3 = false;
    }
    if(event.key === '3'){
      this.key1 = false;
      this.key2 = false;
      this.key3 = true;
    }
    console.log("key pressed-->", event);
  }

}
