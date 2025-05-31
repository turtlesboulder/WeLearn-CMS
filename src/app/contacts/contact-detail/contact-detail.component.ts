import { Component, Input, OnInit } from '@angular/core';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit{
  public contact:Contact | null = null;
  
  constructor(private contactService:ContactService, private router:Router, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      let id = params['id'];
      this.contact = this.contactService.getContact(id);
    })
  }

    onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(["/contacts"]);
  }

}
