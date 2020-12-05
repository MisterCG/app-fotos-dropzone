export  class FileItem {
    public archivo: File;
    public nombre: string;
    public subiendo: boolean;
    public porcentaje: number;
    public url:  string;

    constructor( archivo: File ) {
        this.archivo = archivo;
        this.nombre = archivo.name;
        this.subiendo = false;
        this.porcentaje = 0;
    }

}