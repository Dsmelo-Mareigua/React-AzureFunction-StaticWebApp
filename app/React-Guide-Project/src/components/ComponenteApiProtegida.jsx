import { useState } from 'react'

function ComponenteConOAuth() {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    const enviarDatos = async () => {
        setCargando(true)
        setError(null)

        try {
            // Preparar datos para enviar
            const payload = {
                "elemento": "Siii funcionooooo"
            }

            console.log(JSON.stringify(payload));

            // Llamar a tu Azure Function (proxy)
            const response = await fetch('/api/HttpTriggerStaticWebApp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            console.log('Respuesta del servidor:', response);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const resultado = await response.text()
            setDatos(resultado)
            
            console.log('Respuesta exitosa:', resultado)

        } catch (err) {
            console.error('Error al enviar datos:', err)
            setError(err.message)
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="seccion">
            <h2>🔐 Petición con OAuth2</h2>
            
            <button 
                onClick={enviarDatos} 
                disabled={cargando}
                className="btn"
            >
                {cargando ? '⏳ Enviando...' : '📤 Enviar POST'}
            </button>

            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    ❌ Error: {error}
                </div>
            )}

            {datos && (
                <div style={{ marginTop: '20px' }}>
                    <h3>✅ Respuesta:</h3>
                    <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '10px', 
                        borderRadius: '5px',
                        overflow: 'auto' 
                    }}>
                        {JSON.stringify(datos, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}

export default ComponenteConOAuth