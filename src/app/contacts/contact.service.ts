import { EventEmitter, Injectable, Output } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './mockcontacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contacts: Contact[] = [];
  public contactSelectedEvent = new EventEmitter<Contact>();
  constructor() {
    this.contacts = MOCKCONTACTS;

   }
   getContacts(): Contact[]{
      return this.contacts.slice();
   }
   getContact(id:string):Contact | undefined{
    return this.contacts.find((c)=>{
      return c.id == id;
    })
   }
}
