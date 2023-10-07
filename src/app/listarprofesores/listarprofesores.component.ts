import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Persona } from '../models/persona.model';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listarprofesores',
  templateUrl: './listarprofesores.component.html',
  styleUrls: ['./listarprofesores.component.css'],
})
export class ListarprofesoresComponent implements OnInit {
  personaForm: FormGroup;
  personas: Persona[] = [];
  modoEdicion = false;
  personaSeleccionada: Persona | null = null;
  isProfesor:boolean=false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private personaService: AuthService
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
        if (this.storageService.getUser() == null) {
          this.router.navigate(['/error']);
        }
    this.cargarPersonas();
    this.isProfesor = this.storageService.isProfesor();
  }

  cargarPersonas(): void {
    this.personaService.listar().subscribe((personas) => {
      this.personas = personas;
    });
  }

  guardarPersona(): void {
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.value;
      if (this.modoEdicion) {
        if (this.personaSeleccionada !== null) {
          this.personaService.update(persona, this.personaSeleccionada);
        }
      } else {
        this.personaService.register(persona);
      }
      this.limpiarFormulario();
    }
  }

  editarPersona(persona: Persona): void {
    this.modoEdicion = true;
    this.personaSeleccionada = persona;
    this.personaForm.patchValue(persona);
  }

  eliminarPersona(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this.personaService.delete(id);
    }
  }

  limpiarFormulario(): void {
    this.modoEdicion = false;
    this.personaSeleccionada = null;
    this.personaForm.reset();
  }
}
