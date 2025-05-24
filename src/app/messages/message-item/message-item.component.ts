import { Component, Input, OnInit } from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit{
  @Input() public message:Message;
  public messageSender:String = "";

  constructor(private contactService:ContactService){

  }
  
  ngOnInit(): void {
    let contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }
}
