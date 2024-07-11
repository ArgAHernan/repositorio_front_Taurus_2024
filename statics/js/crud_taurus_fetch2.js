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
        body: data ? JSON.stringify(data) : null,
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Ocurrió un error al obtener los datos. Por favor, inténtalo de nuevo.');
    }
}

/**
 * Función para mostrar todos los productos en la tabla.
 */
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
 * Función para guardar un producto (crear o actualizar).
 */
async function saveProducto() {
    const Maquinaria_Id = document.querySelector('#maquinaria_id').value;
    const brand = document.querySelector('#brand').value;
    const name = document.querySelector('#name').value;
    const model = document.querySelector('#model').value;
    const releaseDate = document.querySelector('#release-date').value;
    const banner = document.querySelector('#banner').value;

    // VALIDACION DE FORMULARIO
    if (!brand || !name || !model || !releaseDate || !banner) {  // Corregido aquí
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
    if (Maquinaria_Id !== "") {  // Corregido aquí
        result = await fetchData(`${BASEURL}/productos/${Maquinaria_Id}`, 'PUT', productoData);  // Corregido aquí
    } else {
        // Si no hay maquinaria_id, realiza una petición POST para crear un nuevo producto
        result = await fetchData(`${BASEURL}/productos/`, 'POST', productoData);  // Corregido aquí
    }

    const formBack = document.querySelector('#form_producto');
    formBack.reset();
    Swal.fire({
        title: 'Éxito!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });
    showProductos();
}

 
 

/**
 * Función para eliminar un producto.
 * @param {number} id - ID del producto a eliminar.
 */
async function deleteProducto(id) {
    try {
        let confirmacion = confirm('¿Estás seguro de eliminar este producto?');
        if (confirmacion) {
            let response = await fetchData(`${BASEURL}/productos/${id}`, 'DELETE');
            alert(response.message);
            showProductos();
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}

/**
 * Función para cargar los datos de un producto en el formulario para editar.
 * @param {number} id - ID del producto a editar.
 */
async function updateProducto(id) {
    try {
        let response = await fetchData(`${BASEURL}/productos/${id}`, 'GET');
        document.querySelector('#maquinaria_id').value = response.maquinaria_id;
        document.querySelector('#brand').value = response.brand;
        document.querySelector('#name').value = response.name;
        document.querySelector('#model').value = response.model;
        document.querySelector('#release-date').value = response.release_date;
        document.querySelector('#banner').value = response.banner;
    } catch (error) {
        console.error('Error al cargar producto para edición:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showProductos();

    const btnSaveProducto = document.querySelector('#btn-save-productos');
    if (btnSaveProducto) {
        btnSaveProducto.addEventListener('click', saveProducto);
    }
});
