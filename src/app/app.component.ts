import { Component } from '@angular/core';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { WindRefService } from './wind-ref.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [ContactService, DocumentService, MessageService, WindRefService]
})
export class AppComponent {
  title = 'cms';

  constructor(private contactService:ContactService){

  }

  dragEnd(e:DragEvent){
    let elem = document.elementFromPoint(e.clientX, e.clientY)
    let container = document.querySelector("#contactDropper");
    if (container != null && elem != null && container.contains(elem)){
      this.contactService.drop();
    }else{
      this.contactService.setContactSelected(null);
    }
  }
}
