import { EventEmitter, Injectable, Output } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './mockcontacts';
import { Subject } from 'rxjs';

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
  constructor() {
    this.contacts = MOCKCONTACTS;
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
       this.contactListChangedEvent.next(this.contacts.slice());
       return true;
  }
  addContact(contact:Contact):boolean{
    if (contact == null){
      return false;
    }
    contact.id = (this.maxId + 1) + "";
    this.maxId += 1;
    this.contacts.push(contact);
    this.contactListChangedEvent.next(this.contacts.slice());
    return true;
  }
  updateContact(oldContact:Contact, newContact:Contact):boolean{
    if (oldContact == null || newContact == null){
      return false;
    }
    newContact.id = oldContact.id;
    if (this.deleteContact(oldContact)){
      this.contacts.push(newContact);
      this.contactListChangedEvent.next(this.contacts.slice());
      return true;
    }else{
      return false;
    }
  }
}
