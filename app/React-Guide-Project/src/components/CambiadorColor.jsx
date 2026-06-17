import { useState } from 'react'

function CambiadorColor() {
  const [color, setColor] = useState('')
  const [inputColor, setInputColor] = useState('')
  const [esAleatorio, setEsAleatorio] = useState(false)

  const manejoLogico = () => {
        if (inputColor.trim()) {
            setColor(inputColor.trim());
            setEsAleatorio(false);
        }
        else {
            setColor(generarColorAleatorio());
            setEsAleatorio(true);
        }
    }

  const generarColorAleatorio = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

  return (
    <div className="ejemplo-interactivo">
        <div className="tarjeta" style={{ backgroundColor: color }}>
            <h3>Valor de color: {color}</h3>
            <p>Generado aleatoriamente: {esAleatorio ? 'Sí' : 'No'}</p>
        </div>

        <div style={{ marginTop: '20px' }}>
            <input
                id="colorInput"
                type="text"
                value={inputColor}
                onChange={(e) => setInputColor(e.target.value)}
                placeholder="Escribe tu color"
                className="input-nombre"
            />

            <button onClick={manejoLogico} className="btn-saludar">
                Cambiar color
            </button>
        </div>
    </div>
  )
}

export default CambiadorColor