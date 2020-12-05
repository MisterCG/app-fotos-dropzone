import { Directive, EventEmitter, HostListener, Input, ElementRef, Output } from '@angular/core';
import { FileItem } from '../models/file.model';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() imagesOver: EventEmitter<boolean> = new EventEmitter();

  @Input() archivos: FileItem[] = [];

  constructor() { }

  @HostListener('dragover', ['$event'])
  public imageOver(event: any) {
    this.preventDefault(event);
    this.imagesOver.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public imageLeave(event: any) {
    this.imagesOver.emit( false );
  }


  @HostListener('drop', ['$event'])
  public imageDrop(event: any) {

    this.preventDefault(event);
    const dataTransfer = this.getTransferencia( event );

    if(!dataTransfer ) {
      return;
    }

    this.extractFiles( dataTransfer.files );

    this.imagesOver.emit( false );
  }

  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles(archivos: FileList) {
    
    for( let archivo of  Object.getOwnPropertyNames( archivos )) {
      const archivoTemp = archivos[ archivo ];
      if( this.archivoPuedeCargar( archivoTemp ) ) {
        const newArchivo = new FileItem( archivoTemp );
        this.archivos.push( newArchivo );
      }
    }
  }


  // Validaciones del dropzone 

  private archivoPuedeCargar(archivo: File): boolean {
    if ( !this.existFile(archivo.name) && this.archivoTypeImage(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }


  private preventDefault( event: any ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private existFile( nombreArchivo: string ): boolean {

    for( let archivo of this.archivos ) {
      if( archivo.nombre === nombreArchivo ) {
        console.log(`Archivo existe ${ nombreArchivo }`);
        return true;
      }
    }

    return false;

  }

  private archivoTypeImage( archivoType: string ): boolean {
    return ( archivoType === '' || archivoType === undefined ) ? false : archivoType.startsWith('image')
  }

}
