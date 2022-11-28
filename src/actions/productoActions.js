import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTOS_ELIMINAR,
    PRODUCTOS_ELIMINADO_EXITO,
    PRODUCTOS_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTOS_EDITADO_EXITO,
    PRODUCTOS_EDITADO_ERROR
} from '../types/index';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

//Crear nuevos Productos

export function crearNuevoProductoAction(producto){
    return async (dispatch) =>{
        //console.log(producto);
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualiza el state
            dispatch(agregarProductoExito(producto));

            //Alerta
            Swal.fire(
                'Correcto!',
                `El producto "${producto.nombre}" se agrego Correctamente!`,
                'success'
              )
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error...',
                text: 'Hubo un error intenta nuevamente!'                
              })
        }
    }
}

const agregarProducto = ()=>({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda en la BDD
const agregarProductoExito = (producto)=>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error
const agregarProductoError = (estado)=>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Funcion que descarga los productos de la base de datos

export function obtenerProductosAction(){
    return async (dispatch)=> {
        dispatch( descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            //console.log(respuesta.data);
            dispatch(descargaProductosExitosa(respuesta.data));

        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = ()=>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Funcion que Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async (dispatch)=>{
        dispatch(obtenerProductoEliminar(id));
        //console.log(id);
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //Si se elimina muestra la alerta
            Swal.fire(
                'Eliminado!',
                'Su registro se ha Eliminado...',
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }

    }
}

const obtenerProductoEliminar = (id)=>({
    type: OBTENER_PRODUCTOS_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTOS_ELIMINADO_EXITO
})

const eliminarProductoError = () =>({
    type: PRODUCTOS_ELIMINADO_ERROR,
    payload: true
})

//Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) =>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = (producto)=> ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Editar un registro en la API y state

export function editarProductoAction(producto){
    return async (dispatch) =>{
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));

            Swal.fire(
                'Guardado!',                
                `El producto "${producto.nombre}" se ha Modificado Correctamente!`,
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto)=>({
    type: PRODUCTOS_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = ()=>({
    type: PRODUCTOS_EDITADO_ERROR,
    payload: true
})