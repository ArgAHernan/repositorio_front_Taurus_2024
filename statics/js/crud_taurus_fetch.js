const BASEURL = 'http://127.0.0.1:5000';
/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
      const response = await fetch(url, options);  // Realiza la petición fetch
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  }
  
  async function showProductos() {
    try {
        let productos = await fetchData(`${BASEURL}/productos/`, 'GET');
        const tableProductos = document.querySelector('#list-table-productos tbody');
        tableProductos.innerHTML = '';
        productos.forEach((producto) => {
            let tr = `
                <tr>
                    <td>${producto.brand}</td>
                    <td>${producto.name}</td>
                    <td>${producto.model}</td>
                    <td>${producto.release_date}</td>
                    <td>
                        <img src="${producto.banner}" width="100">
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick='updateProducto(${producto.maquinaria_id})'>Editar</button>
                        <button class="btn btn-danger btn-sm" onclick='deleteProducto(${producto.maquinaria_id})'>Eliminar</button>
                    </td>
                </tr>`;
            tableProductos.insertAdjacentHTML('beforeend', tr);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}


  /**
   * Función para comunicarse con el servidor para poder Crear o Actualizar
   * un registro de producto.
   * @returns 
   */
  async function saveProducto(){
    const Maquinaria_Id = document.querySelector('#maquinaria_id').value;
    const brand = document.querySelector('#brand').value;
    const name = document.querySelector('#name').value;
    const model = document.querySelector('#model').value;
    const releaseDate = document.querySelector('#release-date').value;
    const banner = document.querySelector('#banner').value;


    //VALIDACION DE FORMULARIO
    if (!brand || !name || !model || !releaseDate || !banner) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del producto
    const productoData = {
        brand: brand,
        name: name,
        model: model,
        release_date: releaseDate,
        banner: banner,
    };
  
      
    let result = null;
    // Si hay un maquinaria_id, realiza una petición PUT para actualizar el producto existente
    if(Maquinaria_Id!==""){
      result = await fetchData(`${BASEURL}/productos/${Maquinaria_Id}`, 'PUT', productoData);
    }else{
      // Si no hay maquinaria_id, realiza una petición POST para crear un nuevo producto
      result = await fetchData(`${BASEURL}/productos/`, 'POST', productoData);
    }
    
    const formBack = document.querySelector('#form_producto');
    formBack.reset();
    Swal.fire({
      title: 'Exito!',
      text: result.message,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })
    showProductos();
  }
      
  /**
   * Function que permite eliminar un producto del array del localstorage
   * de acuedo al indice del mismo
   * @param {number} id posición del array que se va a eliminar
   */
  function deleteProducto(id){
    Swal.fire({
        title: "Esta seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/productos/${id}`, 'DELETE');
          showProductos();
          Swal.fire(response.message, "", "success");
        }
    });
    
  }
  
  
  /**
   * Function que permite cargar el formulario con los datos del producto 
   * para su edición
   * @param {number} id Id del producto que se quiere editar
   */
  async function updateProducto(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/productos/${id}`, 'GET');
    const Maquinaria_Id = document.querySelector('#maquinaria_id').value;
    const brand = document.querySelector('#brand').value;
    const name = document.querySelector('#name').value;
    const model = document.querySelector('#model').value;
    const releaseDate = document.querySelector('#release-date').value;
    const banner = document.querySelector('#banner').value;
    
    Maquinaria_Id.value = response.maquinaria_id;
    brand.value = response.brand;
    name.value = response.name;
    model.value = response.model;
    releaseDate.value = response.release_date;
    banner.value = response.banner;
  }
    
  // Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
  // contenido del DOM ha sido completamente cargado y parseado.
 
  document.addEventListener('DOMContentLoaded', function(){
    const btnSaveProductos = document.querySelector('#btn-save-productos');
    // Asociar una función al evento click del botón
    btnSaveProductos.addEventListener('click', saveProducto);

    // Mostrar productos al cargar la página
    showProductos();
});
 
 
 
 /* document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProducto = document.querySelector('#btn-save-producto');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
  });*/