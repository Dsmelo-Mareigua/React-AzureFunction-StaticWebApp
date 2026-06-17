import { useState, useEffect } from 'react'
import TarjetaReutilizable from './TarjetaReutilizable' 

function ComponenteConApi() {
    const TIEMPO_VISIBLE = 5

    const [datos, setDatos] = useState([])
    const [datosApiExterna, setDatosApiExterna] = useState('')
    const [contadorTiempoApiExterna, setContadorTiempoApiExterna] = useState(TIEMPO_VISIBLE)
    const [intervaloActivo, setIntervaloActivo] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                setDatos(data);
                setCargando(false);
                console.log('Datos recibidos:', data);
            })
            .catch(error => {
                setError(error.message);
                setCargando(false);
            });

        return () => {
            if (intervaloActivo) {
                clearInterval(intervaloActivo)
            }
        }

    }, [intervaloActivo])

    const consumirApiExterna = async () => {
        setDatosApiExterna('Cargando datos de la API externa...')
        try {
            const respuestaApi = await fetch('https://macia.wikiplata.com:44375/conexion');
            if (!respuestaApi.ok) {
                   throw new Error('Error en la solicitud a la API externa');
               }
            const dataApiExterna = await respuestaApi.json()
            setDatosApiExterna(dataApiExterna)
        } catch (error) {
            setDatosApiExterna(`Error: ${error.message}`);
        }
        
        if(!intervaloActivo) {
            const intervalo = setInterval(() => {
               setIntervaloActivo(true);
               setContadorTiempoApiExterna(prev => {
                   if (prev <= 1) {
                       setDatosApiExterna('');
                       clearInterval(intervalo);
                       setIntervaloActivo(false);
                       return TIEMPO_VISIBLE;
                   }
                   return prev - 1;
               });
            }, 1000)
        }
    }

    if(cargando) {
        return <p>Cargando datos...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h2>Datos de la API:</h2>
            <ul>
                {datos.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>

            <button className="btn" disabled={!!datosApiExterna}
                    style={{ marginTop: '20px' }}
                    onClick={consumirApiExterna}>
                Consumir API externa
            </button>

            <div className="grid-tarjetas">
               <TarjetaReutilizable 
                 titulo={`Resultado API externa ${datosApiExterna ? `(visible durante ${contadorTiempoApiExterna} segundos)` : ''}`} 
                 descripcion={datosApiExterna}
                 color="#61dafb"
               />
            </div>

        </div>
    )
}

export default ComponenteConApi