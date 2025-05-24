import { Component } from '@angular/core';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [ContactService, DocumentService, MessageService]
})
export class AppComponent {
  title = 'cms';
  selectedFeature:string = "contacts";

  switchView(page:string){
    this.selectedFeature = page;
  }
}
