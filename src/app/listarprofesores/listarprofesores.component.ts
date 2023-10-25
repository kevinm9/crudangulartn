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
  isProfesor: boolean = false;
  listnivelacademico: { value: string; nombre: string }[] = [
    { value: 'primaria', nombre: 'Primaria' },
    { value: 'secundaria', nombre: 'Secundaria' },
    { value: 'tercer nivel', nombre: 'Tercer nivel' },
    { value: 'cuarto nivel', nombre: 'Cuarto nivel' },
  ];
  listareaestudio: { value: string; nombre: string }[] = [
    { value: 'matematicas', nombre: 'Matemáticas' },
    { value: 'literatura', nombre: 'Literatura' },
    { value: 'sistemas', nombre: 'Sistemas' },
  ];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private personaService: AuthService
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', Validators.required],
      especialidad: ['', Validators.required],
      nivelacademico: ['', Validators.required],
      areaestudio: ['', Validators.required],
      motivoderegistro: [{ value: null, disabled: true }],
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
    debugger;
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.value;
      if (this.modoEdicion) {
        if (this.personaSeleccionada !== null) {
          this.personaService
            .update(persona, this.personaSeleccionada)
            .subscribe((data) => {
              console.log(data);
              this.cargarPersonas();
            });
        }
      } else {
        this.personaService.register(persona).subscribe((data) => {
          console.log(data);
          this.cargarPersonas();
        });
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

  limpiarFormulario($event?: any): void {
    $event.preventDefault();
    this.personaForm.updateOn;
    this.modoEdicion = false;
    this.personaSeleccionada = null;
  }
}
