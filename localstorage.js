//variables globales
const d = document;
let nombre = d.querySelector(".nombre-pro");
let presentacion = d.querySelector(".presentacion-pro");
let precio = d.querySelector(".precio-pro" );
let imagen = d.querySelector(".imagen-pro");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");
let btnActualizar = d.querySelector(".btn-actualizar");

//agregar evento al navegador
d.addEventListener("DOMContentLoaded", function(){
    mostrarDatos();
})


//agregar evento al boton
btnGuardar.addEventListener("click", function() {
    obtenerDatos();
    limpiarTabla();
    mostrarDatos();
});

//funcion para obtener los datos del formulario
function obtenerDatos() {
    if( nombre.value == "" ||
        presentacion.value == "" ||
        precio.value == "" ||
        imagen.value == ""){
            alert("Debes escribir en un campo");
            return;
    }
    let datos = {
        "nombre": nombre.value,
        "presentacion": presentacion.value,
        "precio" : precio.value,
        "imagen" : imagen.value
    }
    nombre.value ="";
    presentacion.value = "";
    precio.value = "";
    imagen.value = "";
    //mostrar en consola
    console.log(datos)
    //pasar el objeto a la funcion
    guardarDatos( datos )
}
let productosKey = "productos"
//funcion guardar los datos en localStorage
function guardarDatos( objeto ) {
    let productos = [];
    let proGuardadosEnLocal = JSON.parse( localStorage.getItem(productosKey) );
    if( proGuardadosEnLocal != null ){
        productos = proGuardadosEnLocal;
    }
    //guardar producto nuevo
    productos.push(objeto);
    //guardar en localStorage
    localStorage.setItem(productosKey, JSON.stringify(productos));
    alert("productos guardados con exito");
}

//funcion para mostrar los datos guardados
function mostrarDatos() {
    let productos = [];
    let proGuardadosEnLocal = JSON.parse( localStorage.getItem(productosKey) );
    if( proGuardadosEnLocal != null ){
        productos = proGuardadosEnLocal;
    }
    productos.forEach( (dato, i)=> {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${ i } </td>
            <td> ${ dato.nombre } </td>
            <td> ${ dato.presentacion } </td>
            <td> ${ dato.precio } </td>
            <td> <img src="${dato.imagen}" width="40%"> </td>
            <td> <span onclick="editarPro(${i})" class="btn btn-warning">Editar</span> - <span onclick="eliminarPro(${i})" class="btn btn-danger">Eliminar</span> </td>
        `;
        tabla.appendChild(fila);
    });

}
//limpiar tabla
function limpiarTabla() {
    let filasTabla = d.querySelectorAll(".table tbody tr");
    for(let x=0; x<filasTabla.length; x++){
        filasTabla[x].remove();
    }
}

function eliminarPro( posicion ){
    let productos = [];
    let proGuardadosEnLocal = JSON.parse( localStorage.getItem(productosKey) );
    if( proGuardadosEnLocal != null ){
        productos = proGuardadosEnLocal;
    }
    let pro = productos.splice(posicion, 1 );
    //console.log(pro)
    let confirmar = confirm("¿Deseas Eliminar el producto?");
    if(confirmar){
        localStorage.setItem(productosKey, JSON.stringify(productos));
        alert("producto eliminado con exito");
    }
    limpiarTabla();
    mostrarDatos();
}
//funcion editar un dato
function editarPro(posicion) {
    let productos = [];
    let proGuardadosEnLocal = JSON.parse( localStorage.getItem(productosKey) );
    if( proGuardadosEnLocal != null ){
        productos = proGuardadosEnLocal;
    }
    //pasar datos al formulario
    nombre.value = productos[posicion].nombre 
    presentacion.value = productos[posicion].presentacion
    precio.value = productos[posicion].precio
    imagen.value =  productos[posicion].imagen
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
   //guardar informacion actual
   btnActualizar.addEventListener("click", function() {
        productos[posicion].nombre = nombre.value;
        productos[posicion].presentacion = presentacion.value;
        productos[posicion].precio = precio.value;
        productos[posicion].imagen = imagen.value;
        //guardar el dato actualizado
        localStorage.setItem(productosKey, JSON.stringify(productos))
        alert("producto actualizado con exito");
        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");
        limpiarTabla();
        mostrarDatos();
        nombre.value = "";
        presentacion.value = "";
        precio.value = "";
        imagen.value = "";
    });  
}
//ejecutar funcion
//mostrarDatos();