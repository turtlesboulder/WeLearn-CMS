import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{
  public documents:Document [];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService:DocumentService){

    this.documents = [];
  }
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((documents)=>{
      this.documents = documents;
    })
  }

}
