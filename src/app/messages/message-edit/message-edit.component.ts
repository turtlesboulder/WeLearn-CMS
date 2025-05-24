import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Message from '../message.model';
import Contact from '../../contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent{

  constructor(private messageService:MessageService){

  }


  public currentSender = "1";
  @ViewChild("subject") subject:ElementRef;
  @ViewChild("msgText") msgText:ElementRef;
  onSendMessage(){
    let newMessage = new Message("0", this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.messageService.addMessage(newMessage);
  }
  onClear(){
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
