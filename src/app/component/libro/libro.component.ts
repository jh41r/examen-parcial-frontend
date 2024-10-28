import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LibroService } from '../../service/libro.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libros: Libro[] = [];
  titulo: string = '';
  opc: string = '';
  libro = new Libro();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private libroService: LibroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarLibros();
  }

  listarLibros() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Libros';
    this.opc = 'Save';
    this.op = 0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Libro';
    this.opc = 'Editar';
    this.libroService.getLibroById(id).subscribe((data) => {
      this.libro = data;
      this.op = 1;
    });
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  confirmDeleteLibro(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este libro?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Elimina el cliente si el usuario confirma (clic en "Sí")
        this.deleteLibro(id);
      },
      reject: () => {
        // Si el usuario rechaza la confirmación (clic en "No"), muestra notificación
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteLibro(id: number) {
    this.libroService.deleteLibro(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La categoría ha sido eliminada exitosamente',
        });
        this.listarLibros(); // Actualiza la lista después de la eliminación
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el libro',
        });
      },
    });
  }

  addLibro(): void {
    this.libroService.createLibro(this.libro).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Libro Registrado',
        });
        this.listarLibros();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar el libro',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveLibro() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar este libro?'
          : '¿Estás seguro de que deseas editar este libro?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion(); // Llama a opcion() si el usuario confirma
      },
    });
  }

  editLibro() {
    this.libroService.updateLibro(this.libro, this.libro.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Categoria Editada',
        });
        this.listarLibros();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar el libro',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addLibro();
      this.limpiar();
    } else if (this.op == 1) {
      this.editLibro();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.libro.id = 0;
    this.libro.titulo = '';
    this.libro.paginas = 0;
    this.libro.edicion = '';
    this.libro.estado = '';
    this.libro.seccion_id = 0;
    this.libro.editorial_id = 0;
  }
}
