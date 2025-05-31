import { EventEmitter, Injectable, Output } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './mockcontacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contacts: Contact[] = [];
  public contactSelectedEvent = new EventEmitter<Contact>();
  public contactChangedEvent = new EventEmitter<Contact[]>();
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

   deleteContact(contact: Contact) {
       if (!contact) { // if contact is undefined
         return;
       }
       const pos = this.contacts.indexOf(contact);
       if (pos < 0) { // indexOf returns -1 if search criteria does not exist
         return;
       }
       this.contacts.splice(pos, 1);
       this.contactChangedEvent.emit(this.contacts.slice());
     }
}
