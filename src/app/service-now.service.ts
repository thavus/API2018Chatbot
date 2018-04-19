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
	url: string;

	constructor(private http: HttpClient) { 
		this.data = {
			caller_id: 'Darth.vader',
			short_description: 'Having Skype issues in a conference room'
		};
		this.url = "https://pncmelliniumfalcon.service-now.com/api/now/table/incident"
	}

  createTicket(){
  	return this.http.post(this.url, this.data, httpOptions);
  }

}
