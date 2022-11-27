import React, {useEffect} from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    //consultar la API
    const cargarProducto = () => dispatch(obtenerProductosAction());
    cargarProducto();
    //eslint-disable-next-line
  }, []);

  //Obtener el state
  const productos = useSelector( (state) => state.productos.productos);
  //console.log(productos.productos);
  const error = useSelector( (state) => state.productos.error)
  const cargando = useSelector( (state) => state.productos.loading)


  return (
    <>
      <h2 className=' text-center my-5'>Listados de Productos</h2>

      {error ? <p className=' font-weight-bold alert alert-danger text-center mt-4 text-uppercase'>Hubo un error</p> : null }

      {cargando ? <p>Cargando...</p> : null }

      <table className="table table-striped">
        <thead className="thead-inverse bg-primary table-dark">
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>           
          </tr>
        </thead>

        <tbody>
          {productos.length === 0 ? <tr><td>No hay Productos</td></tr> : (
            productos.map( producto => (
              <Producto
                producto={producto}
                key={producto.id}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

export default Productos
