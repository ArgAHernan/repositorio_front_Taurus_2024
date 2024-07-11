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

/**
 * Función para mostrar los productos en la tabla.
 */
async function showProductos() {
    try {
        const productos = await fetchData(`${BASEURL}/productos/`, 'GET');
        const tableProductos = document.querySelector('#tbody-table-productos');
        tableProductos.innerHTML = '';
        productos.forEach((producto) => {
            const tr = `
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
 * Función para crear o actualizar un producto.
 */
async function saveProducto() {
    const maquinariaId = document.querySelector('#maquinaria_id').value;
    const brand = document.querySelector('#brand').value;
    const name = document.querySelector('#name').value;
    const model = document.querySelector('#model').value;
    const releaseDate = document.querySelector('#release-date').value;
    const banner = document.querySelector('#banner').value;

    // VALIDACION DE FORMULARIO
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
    try {
        // Si hay un maquinaria_id, realiza una petición PUT para actualizar el producto existente
        if (maquinariaId) {
            result = await fetchData(`${BASEURL}/productos/${maquinariaId}`, 'PUT', productoData);
        } else {
            // Si no hay maquinaria_id, realiza una petición POST para crear un nuevo producto
            result = await fetchData(`${BASEURL}/productos/`, 'POST', productoData);
        }

        // Asegúrate de que el formulario existe antes de intentar resetearlo
        const formProducto = document.querySelector('#form-producto');
        if (formProducto) {
            formProducto.reset();
        } else {
            console.error('Formulario no encontrado');
        }

        Swal.fire({
            title: 'Éxito!',
            text: result.message,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });

        showProductos();
    } catch (error) {
        console.error('Error al guardar producto:', error);
    }
}

/**
 * Función para cargar el formulario con los datos del producto para su edición.
 * @param {number} id - ID del producto a editar.
 */
async function updateProducto(id) {
    try {
        const producto = await fetchData(`${BASEURL}/productos/${id}`, 'GET');
        document.querySelector('#maquinaria_id').value = producto.maquinaria_id;
        document.querySelector('#brand').value = producto.brand;
        document.querySelector('#name').value = producto.name;
        document.querySelector('#model').value = producto.model;
        document.querySelector('#release-date').value = producto.release_date;
        document.querySelector('#banner').value = producto.banner;

        // Cambiar el texto del botón para que diga "Actualizar"
        document.querySelector('#btn-save-productos').textContent = 'Actualizar';
    } catch (error) {
        console.error('Error al cargar datos del producto:', error);
    }
}

/**
 * Función para eliminar un producto.
 * @param {number} id - ID del producto a eliminar.
 */
async function deleteProducto(id) {
    try {
        const result = await fetchData(`${BASEURL}/productos/${id}`, 'DELETE');
        Swal.fire({
            title: 'Éxito!',
            text: result.message,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
        showProductos();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btnSaveProductos = document.querySelector('#btn-save-productos');
    btnSaveProductos.addEventListener('click', saveProducto);

    // Mostrar productos al cargar la página
    showProductos();
});
