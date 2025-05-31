import { Component } from '@angular/core';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { WindRefService } from './wind-ref.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [ContactService, DocumentService, MessageService, WindRefService]
})
export class AppComponent {
  title = 'cms';

}
