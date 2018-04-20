import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BrainService {
triggers = [
	[
		'managing risk in agile',
		{
		  val : "I noticed you need to take your Managing Risk in Agile training for 2018! Would you like to go there now?",
		  isUser : false,
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
	],

	[
		'remind me later',
		{
		  val : "Ok, I'll remind you later. What can I help you with?",
		  isUser : false,
		  bubbles : []
		}
	],

	[
		'Hi', 'Hello', 'Sup', 'Hola', 'hey', 'default',
		{
		  val : "Hello! I am OATIS and I am here to help you with everyday tasks here at PNC. How can I help you?",
		  isUser : false,
		  bubbles : [
			{
			  val : "Troubleshoot Common Tasks"
			},
			{
			  val : "Check on a ServiceNow Request"
			},
			{
			  val : "Something else"
			}
		  ]
		}
	],

	[
		'holidays', 'holiday',
		{
		  val : "/assets/img/card_chat_holiday.svg",
		  isCard : true,
		  isUser : false,
		  bubbles : []
		}
	],

  [
    'trouble with skype', 'issue with skype', 'issues with skype', 'Skype equipment', 'skype',
    {
      val : "/assets/img/Skype Issues Resolution.svg",
      isCard : true,
      isUser : false,
      bubbles : [
      {
        val : "Fixed!"
      },
      {
        val : "Create Service Now Ticket"
      },
      {
        val : "Something Else"
      }
      ]
    }
  ],

	[
		'vacation time', 'vacation', 'pto',
		{
		  val : "Okay, when you do you want to go on vacation?",
		  isUser : false,
		  bubbles : [
			{
			  val : "Tomorrow"
			},
			{
			  val : "Next Week"
			},
			{
			  val : "Next Month"
			}
		  ]
		}
	],

	[
		'approval','pending Service Now approval',
		{
		  val : "You have a pending approval in Service Now for Jay Leon that has been outstanding for 10 days. Do you want to approve it?",
		  isUser : false,
		  bubbles : [
			{
			  val : "Approve"
			},
			{
			  val : "Deny"
			},
			{
			  val : "Remind Me Later"
			}
		  ]
		}
	],

	[
		'OOO', 'out of office',
		{
		  val : "What would you like your OOO to say?",
		  isUser : false,
		  bubbles : [
			{
			  val : "Please contact my manager if you need immediate assistance."
			},
			{
			  val : "I will respond when I return."
			},
			{
			  val : "Cancel"
			}
		  ]
		}
	],

	[
		'thanks', 'thank you',
		{
		  val : "You are welcome! I am here to help. :-)",
		  isUser : false,
		  bubbles : [
			{
			  val : "Donate Spotlight points to OATIS devs."
			},
			{
			  val : "Maybe later..."
			}
		  ]
		}
	]

  ];
  constructor(private http: HttpClient) {

  }

	public getJSON(): any {
		return this.triggers;
	}

}
