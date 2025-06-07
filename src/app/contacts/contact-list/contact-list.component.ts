import { Component, OnDestroy, OnInit} from '@angular/core';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  public contacts: Contact [] = [];
  public selectedContact:Contact;
  public subscription:Subscription;

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    
    this.subscription = this.contactService.contactListChangedEvent.subscribe((newContacts)=>{
      this.contacts = newContacts;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private contactService:ContactService){
    
  }
  onContactSelected(contact:Contact){
    this.selectedContact = contact;
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
