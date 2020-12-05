import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public getUrl: Observable<string>;
  public porcentaje: Observable<number>;
  private CARPETA_IMG = 'imagenes';

  constructor(  private storage: AngularFireStorage,
                private firestore: AngularFirestore      
    ) { }

  uploadFile(files: FileItem[]) {
    for (const fileUpload of files) {
      const file = fileUpload.archivo;
      const filePath = `${this.CARPETA_IMG}/${fileUpload.nombre}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.porcentaje = task.percentageChanges();
      this.porcentaje.subscribe( res => fileUpload.porcentaje = res);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.getUrl = fileRef.getDownloadURL();
          this.getUrl.subscribe(url => {
            fileUpload.url = url
            this.saveFirestore({
              nombre: fileUpload.nombre,
              url: fileUpload.url
            });
          });
        })
      ).subscribe();

    }

  }

  saveFirestore(image: { nombre: string, url: string }) {
    this.firestore.collection('img').add(image);
  }

}
