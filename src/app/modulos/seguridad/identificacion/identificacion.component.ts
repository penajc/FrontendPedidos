import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
const cryptoJS = require("crypto-js");

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgvalidador: FormGroup = this.fb.group({
    'usuario':["",[Validators.required, Validators.email]],
    'clave': ["",[Validators.required, Validators.minLength(8)]]

  });

  constructor( private fb:FormBuilder, private servicioSeguridad: SeguridadService,
    private router: Router ) { }

  

  ngOnInit(): void {
        
  } 

  IdentificarUsuario(){
    let usuario = this.fgvalidador.controls['usuario'].value;
    let clave   = this.fgvalidador.controls['clave'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any) => {
      //OK
      //alert("Datos Correctos");
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
    }, (error: any) =>{
      //KO
      alert("Datos Invalidos");
    })
  }
  

}
