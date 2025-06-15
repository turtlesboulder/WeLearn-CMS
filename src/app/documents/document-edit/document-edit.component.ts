import { Component, OnInit } from '@angular/core';
import Document from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit{
  editMode:boolean = false;
  document:Document;
  originalDocument:Document;
  isEdit = false;

  constructor(private documentService:DocumentService, private router:Router, private route:ActivatedRoute){

  }
  onCancel(){
    this.router.navigate(["/documents"]);
  }
  onSubmit(form:NgForm){
    let values = form.form.value;
    let newDocument = new Document("-1", values.name, values.url, values.description);
    if (this.isEdit){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(["/documents"]);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      let id = params['id'];
      if (id == null){
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (this.originalDocument == null){
        return;
      }
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      this.isEdit = true;
    })
  }
}
