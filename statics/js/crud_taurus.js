/**
 * Funcion que permite crear un elemento <div> el contenedor de productos
 * por medio de la creación de nodos.
 */
function showProductoNodes(){
    let producto = JSON.parse(localStorage.getItem('producto'));
    const divProducto = document.querySelector('#list-div-producto');
    divProducto.innerHTML='';
    producto.forEach((producto, index) => {
        // Crear elementos de nodo 
        let tr = document.createElement('tr');
        let tdRubro = document.createElement('td');
        let tdMarca = document.createElement('td');
        let tdModelo = document.createElement('td');
        let tdAnio = document.createElement('td');
        let tdPrecio = document.createElement('td');
        let tdBanner = document.createElement('td');
        let tdButton = document.createElement('td');
        let button = document.createElement('button');
        let icon = document.createElement('i');
    
        // Configurar contenido y atributos
        tdRubro.textContent = producto.rubro;
        tdMarca.textContent = producto.marca;
        tdModelo.textContent = producto.modelo;
        tdAnio.textContent = producto.anio;
        tdPrecio.textContent = producto.precio;
        tdBanner.innerHTML = `<img src="${producto.banner}" alt="${producto.title}" width="30%">`;
        button.className = 'btn-cac';
        button.onclick = function() {
          deleteMovie(index);
        };
        icon.className = 'fa fa-trash';
    
        // Construir la estructura del nodo
        button.appendChild(icon);
        tdButton.appendChild(button);
    
        tr.appendChild(tdRubro);
        tr.appendChild(tdMarca);
        tr.appendChild(tdModelo);
        tr.appendChild(tdAnio);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdBanner);
    
        // Agregar la fila a la tabla
        tableProducto.appendChild(tr);
    });
}
  
/**
 * Funcion que permite crear un elemento <tr> para la tabla de productos
 * por medio del uso de template string de JS.
 */
function showProductoTemplate(){
  let producto = JSON.parse(localStorage.getItem('producto'));
  const tableProducto = document.querySelector('#list-table-producto tbody');
  tableProducto.innerHTML='';
  producto.forEach((producto, index) => {
    let tr = `<tr>
                  <td>${producto.rubro}</td>
                  <td>${producto.marca}</td>
                  <td>${producto.modelo}</td>
                  <td>${producto.anio}</td>
                  <td>${producto.precio}</td>
                  <td><img src="${producto.banner}" alt="${producto.modelo}" width="30%"></td>
                  <td>
                    <button class="btn-cac" onclick='updateMovie(${idproducto})'><i class="fa fa-pencil" ></button></i>
                    <button class="btn-cac" onclick='deleteMovieAlert(${idproducto})'><i class="fa fa-trash" ></button></i>
                    </td>
                </tr>`;
    tableProducto.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * funcion que permite agregar o modificar un producto al listado de productos
 * almacenado en el localstorage
 */
function saveProducto(){
  const form = document.querySelector('#form_back');

  const inputIdProducto = document.querySelector('#idproducto');
  const inputRubro = document.querySelector('#rubro');
  const inputMarca = document.querySelector('#marca');
  const inputModelo = document.querySelector('#modelo');
  const inputAnio = document.querySelector('#anio');
  const inputPrecio = document.querySelector('#precio');
  const inputBanner = document.querySelector('#banner');

  if(inputRubro.value !== '' && inputMarca.value !=='' && inputModelo.value !=='' && inputAnio.value !=='' && inputPrecio.value !=='' && inputBanner.value !==''){
    //Obtiene el listado de productos del localstorage, en caso de no existir crea una array vacio
    let producto = JSON.parse(localStorage.getItem('producto')) || [];
    
    if(inputIdProducto.value!==""){
      let productoFind = producto.find(producto => idproducto == inputId.value);
      if (productoFind) {
        productoFind.rubro = inputRubro.value;
        productoFind.marca = inputMarca.value;
        productoFind.modelo = inputModelo.value;
        productoFind.anio = inputAnio.value;
        productoFind.precio = inputPrecio.value;
        productoFind.banner = inputBanner.value;
      }
    }else{
      let newProducto = {
        id: Object.keys(producto).length+1,
        rubro: inputRubro.value,
        marca: inputMarca.value,
        modelo: inputModelo.value,
        anio: inputAnio.value,
        precio: inputPrecio.value,
        banner: inputBanner.value,
      }
      producto.push(newProducto);
    }
    //Se actualiza el array de productos en el localstorage
    localStorage.setItem('producto',JSON.stringify(producto));
    showProductoTemplate();
    //Limpieza de los campos del formulario
    // inputTitle.value='';
    // inputDirector.value='';
    // inputReleaseDate.value='';
    // inputBanner.value='';
    form.reset();
    Swal.fire({
        title: 'Exito!',
        text: 'Operacion exitosa.',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
  }else{
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
  }
}

/**
 * Function que permite cargar el formulario para editar un producto
 * de acuedo al id del producto
 * @param {number} productoId id producto que se va a actualizar
 */
function updateProducto(productoId){
  let producto = JSON.parse(localStorage.getItem('producto'));
  //se utiliza el metodo find para poder asegurarnos que exista un producto con el id que queremos eliminar.
  let productoToUpdate = producto.find(producto => producto.id===productoId);
  if(productoToUpdate){
    const inputIdProducto = document.querySelector('#idproducto');
    const inputRubro = document.querySelector('#rubro');
    const inputMarca = document.querySelector('#marca');
    const inputModelo = document.querySelector('#modelo');
    const inputAnio = document.querySelector('#anio');
    const inputPrecio = document.querySelector('#precio');
    const inputBanner = document.querySelector('#banner');
    inputIdProducto.value = productoToUpdate.idproducto;
    inputRubro.value = productoToUpdate.rubro;
    inputMarca.value = productoToUpdate.marca;
    inputModelo.value = productoToUpdate.modelo;
    inputAnio.value = productoToUpdate.anio;
    inputPrecio.value = productoToUpdate.precio;
    inputBanner.value = productoToUpdate.banner;
  }
}

/**
 * Function que permite eliminar un producto del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} movieId id producto que se va a eliminar
 */
function deleteMovie(productoId){
  let producto = JSON.parse(localStorage.getItem('producto'));
  //se utiliza el metodo find para poder asegurarnos que exista un producto con el id que queremos eliminar.
  let productoToDelete = producto.find(producto => producto.id===productoId);
  if(productoToDelete){
    //se utiliza el metodo filter para actualizar el array de productos, sin tener el elemento encontrado en cuestion.
    producto = producto.filter(producto => producto.id !== productoToDelete.id);
    //se actualiza el localstorage
    localStorage.setItem('producto',JSON.stringify(producto));
    showProductoTemplate();
  }
}

/**
 * Function que permite eliminar un producto del array del localstorage
 * de acuedo al indice del mismo por medio de sweet alert
 * @param {number} productoIdId id producto que se va a eliminar
 */
function deleteProductoAlert(productoId){
  let producto = JSON.parse(localStorage.getItem('producto'));
  //se utiliza el metodo find para poder asegurarnos que exista un producto con el id que queremos eliminar.
  let productoToDelete = producto.find(producto => producto.id===productoId); 

  if(productoToDelete){
      Swal.fire({
          title: "Esta seguro de eliminar el producto?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
      }).then((result) => {
          if (result.isConfirmed) {
            //se utiliza el metodo filter para actualizar el array de producto, sin tener el elemento encontrado en cuestion.
            producto = producto.filter(producto => producto.id !== productoToDelete.id);
            //se actualiza el localstorage
            localStorage.setItem('producto',JSON.stringify(producto));
            showProductoTemplate();
            Swal.fire("Pelicula Eliminada!", "", "success");
          }
      });
  }else{
      Swal.fire({
          title: 'Error!',
          text: 'No se puede eliminar el producto.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      })
  }
}


//Agregar eventos a elementos una vez que contenido haya sido cargado en el DOM
document.addEventListener('DOMContentLoaded', function() {
  const btnSaveProducto = document.querySelector('#btn-save-producto');
  btnSaveProducto.addEventListener('click',saveProducto);
});

showProductoTemplate();
  