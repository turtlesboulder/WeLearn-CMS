import { EventEmitter, Injectable, Output } from '@angular/core';
import Contact from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contactListChangedEvent = new Subject<Contact[]>();
  public contacts: Contact[] = [];
  public contactSelectedEvent = new EventEmitter<Contact>();
  public contactDroppedEvent = new EventEmitter<Contact>();
  private maxId:number;
  public contactSelected:Contact;
  constructor(private HttpClientService:HttpClient) {
    this.contacts = [];
    this.maxId = this.getMaxId();
    this.contactSelected = null;
   }
   setContactSelected(contact:Contact){
    this.contactSelected = contact;
   }
   drop(){
    if (this.contactSelected != null){
      this.contactDroppedEvent.next(JSON.parse(JSON.stringify(this.contactSelected)));
      this.contactSelected = null;
    }
   }
   getContacts(): Contact[]{
            //return this.contacts.slice();
            let promise = this.HttpClientService.get("https://landonlee-welearncms-default-rtdb.firebaseio.com/contacts.json");
            promise.subscribe((contacts:Contact [])=>{
             this.contacts = contacts;
             this.maxId = this.getMaxId();
             this.sort();
             this.contactListChangedEvent.next(this.contacts.slice());
            }, (e:any)=>{
               console.log(e);
            })
            return this.contacts.slice();
         }
   getContact(id:string):Contact | undefined{
    return this.contacts.find((c)=>{
      return c.id == id;
    })
  }
  getMaxId(){
    let max = 0;
    for (let contact of this.contacts){
      let id = Number(contact.id)
      if (max < id){
        max = id;
      }
    }
    return max;
  }

  deleteContact(contact: Contact):boolean {
       if (!contact) { // if contact is undefined
         return false;
       }
       const pos = this.contacts.indexOf(contact);
       if (pos < 0) { // indexOf returns -1 if search criteria does not exist
         return false;
       }
       this.contacts.splice(pos, 1);
       this.storeContacts();
       return true;
  }
  addContact(contact:Contact):boolean{
    if (contact == null){
      return false;
    }
    contact.id = (this.maxId + 1) + "";
    this.maxId += 1;
    this.contacts.push(contact);
    this.storeContacts();
    return true;
  }
  updateContact(oldContact:Contact, newContact:Contact):boolean{
    if (oldContact == null || newContact == null){
      return false;
    }
    newContact.id = oldContact.id;
    if (this.deleteContact(oldContact)){
      this.contacts.push(newContact);
      this.storeContacts();
      return true;
    }else{
      return false;
    }
  }

  storeContacts(){
      let contactsString = JSON.stringify(this.contacts);
      let head:HttpHeaders = new HttpHeaders("content-type: application/json")
      let promise = this.HttpClientService.put("https://landonlee-welearncms-default-rtdb.firebaseio.com/contacts.json",
         contactsString, {headers:head});
      promise.subscribe(()=>{
        this.contactListChangedEvent.next(this.contacts.slice())
      })
    }

    sort(){
      this.contacts.sort((contactOne, contactTwo)=>{
      if (contactOne.name.toLowerCase() < contactTwo.name.toLowerCase()){
        return -1;
      }else{
        return 1;
      }
    })
    }
}
