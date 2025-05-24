import { Component, OnInit} from '@angular/core';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  public contacts: Contact [] = [];
  public selectedContact:Contact;

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
  }

  constructor(private contactService:ContactService){
    
  }
  onContactSelected(contact:Contact){
    this.selectedContact = contact;
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
