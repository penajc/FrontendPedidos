import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  fgvalidador: FormGroup = this.fb.group({
    'nombres'  : ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'correo'   : ['', [Validators.required]],
    'celular'  : ['', [Validators.required]],

  });


  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarPersona(){
    let nombres   = this.fgvalidador.controls["nombres"].value;
    let apellidos = this.fgvalidador.controls["apellidos"].value;
    let correo    = this.fgvalidador.controls["correo"].value;
    let celular   = this.fgvalidador.controls["celular"].value;

    let p = new ModeloPersona();
    p.nombres   = nombres;
    p.apellidos = apellidos;
    p.correo    = correo;
    p.celular   = celular;

    this.servicioPersona.CrearPersona(p).subscribe((datos: ModeloPersona) => {
      alert("usuario creado Correctamente");
      this.router.navigate(["/administracion/listar-personas"]);

    }, (error: any) =>{
      alert("Error al crear al usuario");
    })

  }

}
