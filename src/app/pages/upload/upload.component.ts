import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  archivos: FileItem[] = [];
  enZona: boolean = false;
  constructor( private fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cargarImg() {
    this.fileUploadService.uploadFile( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
