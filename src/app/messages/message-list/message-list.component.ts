import { Component, OnInit } from '@angular/core';
import Message from '../message.model';
import Contact from '../../contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',

})
export class MessageListComponent implements OnInit{
  public messages:Message[] = [];

  constructor(private messageService:MessageService){
  }
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages)=>{
      this.messages = messages;
      })
    }

  onAddMessage(message:Message){
    this.messages.push(message);
  }
}
