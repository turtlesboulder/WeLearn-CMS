import { EventEmitter, Injectable } from '@angular/core';
import Message from './message.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages:Message[] = [];
  public messageChangedEvent = new EventEmitter<Message[]>();
  public maxId:number;

  constructor(private HttpClientService:HttpClient) { 
    this.messages = [];
    this.maxId = this.getMaxId();
  }

  getMessages(): Message[]{
           //return this.messages.slice();
           let promise = this.HttpClientService.get("https://landonlee-welearncms-default-rtdb.firebaseio.com/messages.json");
           promise.subscribe((messages:Message [])=>{
            this.messages = messages;
            this.maxId = this.getMaxId();
            this.messageChangedEvent.next(this.messages.slice());
           }, (e:any)=>{
              console.log(e);
           })
           return this.messages.slice();
        }
  getMessage(id:string):Message | undefined{
      return this.messages.find((m)=>{
        return m.id == id;
      })
     }

  addMessage(message:Message){
    if (message == null){
      return;
    }
    let nextId:string =(this.maxId + 1) + ""; 
    this.maxId += 1;
    message.id = nextId;
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages(){
      let messagesString = JSON.stringify(this.messages);
      let head:HttpHeaders = new HttpHeaders("content-type: application/json")
      let promise = this.HttpClientService.put("https://landonlee-welearncms-default-rtdb.firebaseio.com/messages.json",
         messagesString, {headers:head});
      promise.subscribe(()=>{
        this.messageChangedEvent.next(this.messages.slice())
      })
    }

  getMaxId():number{
    let max = 0;
    for (let message of this.messages){
      let id:number = Number(message.id);
      if (id > max){
        max = id
      }
    }
    return max;
  }
}
