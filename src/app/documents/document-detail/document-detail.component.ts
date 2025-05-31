import { Component, OnInit} from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  nativeWindow:any;
  document:Document;
  constructor(private documentService:DocumentService, private router:Router, private activatedRoute:ActivatedRoute, private windRef:WindRefService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      let id = params['id'];
      this.document = this.documentService.getDocument(id);
    })

    this.nativeWindow = this.windRef.getNativeWindow();
  }

  onView(){
    if (this.document.url != null){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(["/documents"]);
  }
}
