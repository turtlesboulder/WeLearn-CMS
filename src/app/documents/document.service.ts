import { EventEmitter, Injectable } from '@angular/core';
import Document from './document.model';
import { MOCKDOCUMENTS } from './mockdocuments';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentListChangedEvent = new Subject<Document[]>();
  public documentSelectedEvent = new EventEmitter<Document>();
  public documents:Document [] = [];
  public maxId:number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId();
   }

  deleteDocument(document: Document):boolean {
    if (!document) { // if document is undefined
      return false;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) { // indexOf returns -1 if search criteria does not exist
      return false;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
    return true;
  }

  getMaxId():number{
    let max = 0;
    for (let document of this.documents){
      let id:number = Number(document.id);
      if (id > max){
        max = id
      }
    }
    return max;
  }

  addDocument(newDocument:Document):boolean{
    if (newDocument == null){
      return false;
    }
    let nextId:string =(this.maxId + 1) + ""; 
    this.maxId += 1;
    newDocument.id = nextId;
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
    return true;
  }

  updateDocument(originalDocument:Document, newDocument:Document):boolean{
    if (originalDocument == null || newDocument == null){
      return false;
    }
    newDocument.id = originalDocument.id;
    if (this.deleteDocument(originalDocument)){
      this.documents.push(newDocument);
      this.documentListChangedEvent.next(this.documents.slice());
      return true;
    }else{
      return false;
    }
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
