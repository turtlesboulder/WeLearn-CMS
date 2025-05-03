import { Component } from '@angular/core';
import Contact from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  public contacts: Contact [];

  constructor(){
    let contactOne = new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-296-3771", "../../assets/images/jacksonk.jpg");
    let contactTwo = new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg");

    this.contacts = [contactOne, contactTwo];
  }
}
