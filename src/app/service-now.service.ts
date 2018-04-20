import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': 'Basic '+ window.btoa('Darth.vader'+':'+'Iwi11Ch0keU!')
  	})
};

@Injectable()
export class ServiceNowService {

	data: any;
	data2: any;
	url: string;
	url2: string;

	constructor(private http: HttpClient) { 
		this.data = {
			caller_id: 'Darth.vader',
			short_description: 'Having Skype issues in a conference room'
		};
		this.url = "https://pncmelliniumfalcon.service-now.com/api/now/table/incident"
		this.data2 = {
			approver: 'Darth.vader',
			state: 'Approved'
		};
		this.url2 = "https://pncmelliniumfalcon.service-now.com/api/now/table/sysapproval_approver/9d682e0adb6d1b00e00e78dabf961942"
	}

  createTicket(){
  	return this.http.post(this.url, this.data, httpOptions);
  }
  
  approveChange(){
  	return this.http.put(this.url2, this.data2, httpOptions);
  }

}
