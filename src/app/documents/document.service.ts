import { EventEmitter, Injectable } from '@angular/core';
import Document from './document.model';
import { MOCKDOCUMENTS } from './mockdocuments';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentSelectedEvent = new EventEmitter<Document>();
  public documentChangedEvent = new EventEmitter<Document[]>();
  public documents:Document [] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

  deleteDocument(document: Document) {
    if (!document) { // if document is undefined
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) { // indexOf returns -1 if search criteria does not exist
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

   getDocuments(): Document[]{
         return this.documents.slice();
      }
    getDocument(id:string):Document | undefined{
       return this.documents.find((d)=>{
         return d.id == id;
       })
      }
}
