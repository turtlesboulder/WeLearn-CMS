import { Component, EventEmitter, Output } from '@angular/core';
import Document from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  public documents:Document [];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(){
    let docOne = new Document(0, "Peanuts", "Everything about peanuts", "https://en.wikipedia.org/wiki/Peanut");
    let docTwo = new Document(1, "Kiwis", "The fruit, not the bird", "https://en.wikipedia.org/wiki/Kiwifruit");
    let docThree = new Document(2, "Weed-eater", "The machine you use to trim the edges of your grass", "https://en.wikipedia.org/wiki/String_trimmer");
    let docFour = new Document(3, "Remote Control", "A television remote", "https://en.wikipedia.org/wiki/Remote_control")
    this.documents = [docOne, docTwo, docThree, docFour];
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
