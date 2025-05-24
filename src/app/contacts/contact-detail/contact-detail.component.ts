import { Component, Input } from '@angular/core';
import Contact from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() public contact:Contact | null = null;
  
// Adding a constructor with parameters bricks the program, even if defaults are provided

}
