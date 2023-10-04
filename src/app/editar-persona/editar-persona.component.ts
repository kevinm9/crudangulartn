import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Persona } from '../models/persona.model';
import { passwordValidator } from '../_helpers/validations'; // Importa la función de validación desde el archivo 'validations.ts'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
})
export class EditarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  persona: Persona | null = null;
  listnivelacademico: { value: string; nombre: string }[] = [
    { value: 'primaria', nombre: 'Primaria' },
    { value: 'secundaria', nombre: 'secundaria' },
    { value: 'tercer nivel', nombre: 'Tercer nivel' },
    { value: 'cuarto nivel', nombre: 'Cuarto nivel' },
  ];

  constructor(
    private fb: FormBuilder,
    private personaService$: UserService,
    private storageService$: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), passwordValidator],
      ],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      tipodeusuario: ['', [Validators.required]],
      nivelacademico: ['', [Validators.required]],
      motivoderegistro: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.storageService$.getUser() == null) {
      this.router.navigate(['/error']);
    }

    this.route.paramMap.subscribe((params) => {
      let id: any = params.get('id');
      if (!id) {
        this.router.navigate(['/error']);
        return;
      }
      this.personaService$.getUser(params.get('id')).subscribe(
        (data: Persona) => {
          this.personaForm.patchValue(data);
        },
        (error) => {
          this.router.navigate(['/error']);
        }
      );
    });
  }

  guardarCambios(): void {
    if (this.personaForm.valid) {
      const personaActualizada: Persona = this.personaForm.value;

      // Establece el valor en el formulario
      console.log(this.personaForm.get('nombres'));

      console.log(personaActualizada);
      this.persona = personaActualizada;

      // Llama al servicio para actualizar la persona
      //this.personaService$.saveUser(personaActualizada);
    } else {
      console.log('formulario invalido');
    }
  }
}
