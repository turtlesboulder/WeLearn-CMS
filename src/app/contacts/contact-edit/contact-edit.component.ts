import { Component, OnInit } from '@angular/core';
import Contact from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{
  groupContacts: Contact[];
  contact:Contact;
  originalContact:Contact;
  isEdit = false;

  constructor(private contactService:ContactService, private router:Router, private route:ActivatedRoute){
    this.groupContacts = [];
  }

  onSubmit(form:NgForm){
    //form.form.value.email, form.form.value.name, etc.
    let values = form.form.value;
    let newContact = new Contact("-1", values.name, values.email, values.phone, values.imageUrl, values.group);
    newContact.group = this.groupContacts;
    if (this.isEdit){
      this.contactService.updateContact(this.originalContact, newContact);
    }else{
      this.contactService.addContact(newContact);
    }
    this.router.navigate(["/contacts"]);
  }
  onCancel(){
    this.router.navigate(["/contacts"]);
  }
  onRemoveItem(i:number){
    this.groupContacts.splice(i, 1);
  }
  ngOnInit(): void {
      this.route.params.subscribe((params)=>{
      let id = params['id'];
      if (id == null){
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact == null){
        return;
      }
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      this.isEdit = true;

      if (this.contact.group != null){
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    })

    this.contactService.contactDroppedEvent.subscribe((contact)=>{
      let identicalContact = false;
      this.groupContacts.map((c)=>{
        if (c.id == contact.id){
          identicalContact = true;
        }
      })

      if (!identicalContact && contact.id != this.contact.id) {
        this.groupContacts.push(contact);
      }
    })
  }
}
