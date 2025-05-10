import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Message from '../message.model';
import Contact from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @Output() messageSentEvent = new EventEmitter<Message>();
  public currentSender = new Contact(9, "Landon Lee", "lee2006@byui.edu", "18326270050", "")
  @ViewChild("subject") subject:ElementRef;
  @ViewChild("msgText") msgText:ElementRef;
  onSendMessage(){
    console.log(this.subject);
    let newMessage = new Message(0, this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.messageSentEvent.emit(newMessage);
  }
  onClear(){
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
