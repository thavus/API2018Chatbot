import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatbotWindowComponent } from './chatbot-window/chatbot-window.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChoosePageComponent } from './choose-page/choose-page.component';
import { PowerlinkComponent } from './powerlink/powerlink.component';

import { ServiceNowService } from './service-now.service';
import { BrainService } from './brain.service';


const appRoutes: Routes = [
  { path: 'powerlink', component: PowerlinkComponent, data: { title: 'Powerlink' } },
  { path: 'choose-page', component: ChoosePageComponent, data: { title: 'Welcome' } },
  { path: '', redirectTo: 'choose-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatbotWindowComponent,
    PageNotFoundComponent,
    ChoosePageComponent,
    PowerlinkComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    AngularDraggableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceNowService, BrainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
