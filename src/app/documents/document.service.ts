import { EventEmitter, Injectable } from '@angular/core';
import Document from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentListChangedEvent = new Subject<Document[]>();
  public documentSelectedEvent = new EventEmitter<Document>();
  public documents:Document [] = [];
  public maxId:number;

  constructor(private HttpClientService:HttpClient) {
    this.documents = [];
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
    this.storeDocuments();
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
    this.storeDocuments();
    return true;
  }

  updateDocument(originalDocument:Document, newDocument:Document):boolean{
    if (originalDocument == null || newDocument == null){
      return false;
    }
    newDocument.id = originalDocument.id;
    if (this.deleteDocument(originalDocument)){
      this.documents.push(newDocument);
      this.storeDocuments();
      return true;
    }else{
      return false;
    }
  }

   getDocuments(): Document[]{
         //return this.documents.slice();
         let promise = this.HttpClientService.get("https://landonlee-welearncms-default-rtdb.firebaseio.com/documents.json");
         promise.subscribe((documents:Document [])=>{
          this.documents = documents;
          this.maxId = this.getMaxId();
          this.sort();
          this.documentListChangedEvent.next(this.documents.slice());
         }, (e:any)=>{
            console.log(e);
         })
         return this.documents.slice();
      }
    getDocument(id:string):Document | undefined{
      return this.documents.find((d)=>{
        return d.id == id;
       })
      }

    sort(){
      this.documents.sort((documentOne, documentTwo)=>{
      if (documentOne.name.toLowerCase() < documentTwo.name.toLowerCase()){
        return -1;
      }else{
        return 1;
      }
    })
    }

    storeDocuments(){
      let documentsString = JSON.stringify(this.documents);
      let head:HttpHeaders = new HttpHeaders("content-type: application/json")
      let promise = this.HttpClientService.put("https://landonlee-welearncms-default-rtdb.firebaseio.com/documents.json",
         documentsString, {headers:head});
      promise.subscribe(()=>{
        this.documentListChangedEvent.next(this.documents.slice())
      })
    }

    
}
