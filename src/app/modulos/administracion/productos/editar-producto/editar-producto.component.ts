import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  id: string = "";
  fgvalidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.id = this.route.snapshot.params["id"];
   this.Buscarproducto(); 
  }

  Buscarproducto(){
    this.servicioProducto.ObtenerRegistroPorId(this.id).subscribe((datos:ModeloProducto)=>{
      this.fgvalidador.controls["id"].setValue(this.id);
      this.fgvalidador.controls["nombre"].setValue(datos.nombre);
      this.fgvalidador.controls["precio"].setValue(datos.precio);
      this.fgvalidador.controls["imagen"].setValue(datos.imagen);
    },(error)=>{

    })
  }

  EditarProducto(){
    let nombre = this.fgvalidador.controls["nombre"].value;
    let precio = parseInt(this.fgvalidador.controls["precio"].value);
    let imagen = this.fgvalidador.controls["imagen"].value;

    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    p.id     = this.id;

    this. servicioProducto.ActualizarProducto(p).subscribe((datos: ModeloProducto) => {
      alert("Producto Actualizado Correctamente");
      this.router.navigate(["/administracion/listar-productos"]);

    }, (error: any) =>{
      alert("Error al Actualizar el Producto");
    })

  }
}
