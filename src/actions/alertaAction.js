import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index';

//Mostrar la alerta
export function mostrarAlertaAction(alerta){
    return (dispatch) =>{
        dispatch(crearAlerta(alerta))
    }
}
const crearAlerta = (alerta)=>({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

//Ocultar la alerta
export function ocultarAlertaAction(){
    return (dispatch) =>{
        dispatch(eliminarAlerta())
    }
}
const eliminarAlerta = ()=>({
    type:OCULTAR_ALERTA
})