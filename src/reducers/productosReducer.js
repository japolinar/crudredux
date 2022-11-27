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

// cada reducer tiene su propio state

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default function(state = initialState, action){
    switch(action.type){
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return{
                ...state,
                loading: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_PRODUCTOS_ELIMINAR:
            return{
                ...state,
                productoEliminar: action.payload
            }
        case PRODUCTOS_ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }
        case PRODUCTOS_EDITADO_ERROR:
        case PRODUCTOS_ELIMINADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar: action.payload
            }
        case COMENZAR_EDICION_PRODUCTO:
            return{
                ...state
            }
        case PRODUCTOS_EDITADO_EXITO:
            return{
                ...state,
                productoEditar: null,
                productos: state.productos.map( producto =>
                    producto.id === action.payload.id ? producto = action.payload : producto    
                )
            }
        default:
            return state;
    }
}