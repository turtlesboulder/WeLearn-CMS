import { EventEmitter, Injectable } from '@angular/core';
import Message from './message.model';
import { MOCKMESSAGES } from './mockmessages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages:Message[] = [];
  public messageChangedEvent = new EventEmitter<Message[]>();
  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
        return this.messages.slice();
     }
  getMessage(id:string):Message | undefined{
      return this.messages.find((m)=>{
        return m.id == id;
      })
     }

  addMessage(message:Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice())
  }
}
