import { Pipe, PipeTransform } from '@angular/core';
import Contact from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term:string): unknown {
    let newContacts = contacts.filter((contact)=>{
      let name = contact.name.toLowerCase();
      let searchTerm = term.toLowerCase();
      return name.includes(searchTerm);
    })
    return newContacts;
  }

}
