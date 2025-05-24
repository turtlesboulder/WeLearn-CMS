import { EventEmitter, Injectable } from '@angular/core';
import Document from './document.model';
import { MOCKDOCUMENTS } from './mockdocuments';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentSelectedEvent = new EventEmitter<Document>();
  public documents:Document [] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
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
