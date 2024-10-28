export class Libro {
    id: number;
    titulo: string;
    paginas: number;
    edicion: string;
    estado: string;
    seccion_id: number;
    editorial_id: number;
    
    constructor(
        id: number = 0, 
        titulo: string = '', 
        paginas: number = 0, 
        edicion: string = '', 
        estado: string  = '', 
        seccion_id: number = 0,
        editorial_id: number = 0) {
            
        this.id = id;
        this.titulo = titulo;
        this.paginas = paginas;
        this.edicion = edicion;
        this.estado = estado;
        this.seccion_id = seccion_id;
        this.editorial_id = editorial_id;
    }
}
