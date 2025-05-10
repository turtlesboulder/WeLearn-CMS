import { Component } from '@angular/core';
import Message from '../message.model';
import Contact from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  public messages:Message[] = [];

  constructor(){
    let contactOne = new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-296-3771", "../../assets/images/jacksonk.jpg");
    let contactTwo = new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg");
    let messageOne = new Message(0, "Tacos teusday", "Hey rex. We need to order tacos tomarrow. Can you handle this?", contactOne);
    let messageTwo = new Message(1, "Tacos teusday", "Of course. Do you want taco bell or del taco?", contactTwo);
    let messageThree = new Message(2, "Tacos teusday", "Taco bell is fine. I think they sell in large batches. Just make sure you get reimbursed!", contactOne);

    this.messages = [messageOne, messageTwo, messageThree];
  }

  onAddMessage(message:Message){
    this.messages.push(message);
  }
}
