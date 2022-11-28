import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaAction';

//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions'

const NuevoProducto = () => {

  //state del comonente
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);

  //utilizar useDispatch y te crea una function
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);  

  //mandar a llamar el action de productoAction
  const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

  // creando el Navigate
  let navigate = useNavigate();

  //cuando el usuario haga submit
  const submitNuevoProducto = (e)=>{
    e.preventDefault();

    // validar el formulario
    if(nombre.trim() === '' || precio <= 0){
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p-3'
      }
      dispatch( mostrarAlertaAction(alerta) );
      
      setTimeout(() => {        
        dispatch(ocultarAlertaAction());
      }, 4000);

      return;
    }
    // si no hay errores
    dispatch(ocultarAlertaAction());

    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    //redireccionar
    navigate('/');

  }

  
  return (
    <div className=' row justify-content-center'>
      <div className=' col-md-8'>
        <div className=' card'>
          <div className=' card-body'>
            <h2 className=' text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}

            <form onSubmit={submitNuevoProducto}>
              <div className=' form-group'>
                <label htmlFor="nombre">Nombre del Producto</label>
                <input 
                  type="text" 
                  className=' form-control'
                  placeholder='Nombre Producto'
                  id='nombre' 
                  name='nombre'
                  value={nombre}
                  onChange={(e)=> setNombre(e.target.value)}
                />
              </div>

              <div className=' form-group'>
                <label htmlFor="precio">Precio del Producto</label>
                <input 
                  type="number" 
                  className=' form-control'
                  placeholder='Precio Producto'
                  id='precio' 
                  name='precio'
                  value={precio}
                  onChange={(e)=> setPrecio(Number(e.target.value))}
                />
              </div>

              <button 
                type='submit'
                className=' btn btn-primary font-weight-bold text-uppercase d-block w-100'
              > 
                Agregar
              </button>
            </form>
            {cargando ? <Spinner/> : null }

            {error ? 
              <p className=' alert alert-danger p-2 mt-3 text-center text-uppercase font-weight-bold'>
                Hubo un error
              </p> : null }

          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto
