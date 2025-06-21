import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  public subscription:Subscription;
  public documents:Document [];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService:DocumentService){

    this.documents = [];
  }
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents)=>{
      this.documents = documents;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
