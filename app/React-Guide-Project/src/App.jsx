import { useState } from 'react'
import './App.css'
import CambiadorColor from './components/CambiadorColor'
import ComponenteConApi from './components/ComponenteConApi'
import ComponenteConOAuth from './components/ComponenteApiProtegida'

// 📚 COMPONENTE 1: Ejemplo de Props
// Los props permiten pasar datos de un componente padre a un hijo
function Tarjeta({ titulo, descripcion, color }) {
  return (
    <div className="tarjeta" style={{ borderLeft: `4px solid ${color}` }}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  )
}

// 📚 COMPONENTE 2: Ejemplo de Lista
function ListaDeTareas({ tareas }) {
  return (
    <ul className="lista-tareas">
      {tareas.map((tarea, index) => (
        <li key={index} className="tarea-item">
          {tarea}
        </li>
      ))}
    </ul>
  )
}

// 📚 COMPONENTE 3: Ejemplo de Evento y Condicional
function Saludo() {
  const [nombre, setNombre] = useState('')
  const [mostrarSaludo, setMostrarSaludo] = useState(false)

  const manejarClick = () => {
    if (nombre.trim()) {
      setMostrarSaludo(true)
    }
  }

  return (
    <div className="ejemplo-interactivo">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
        className="input-nombre"
      />
      <button onClick={manejarClick} className="btn-saludar">
        Saludar
      </button>
      
      {mostrarSaludo && nombre && (
        <p className="saludo-mensaje">¡Hola, {nombre}! 👋</p>
      )}
    </div>
  )
}

// 📚 COMPONENTE PRINCIPAL
function App() {
  const [contador, setContador] = useState(0)
  const [tema, setTema] = useState('claro')

  const tareasPendientes = [
    'Aprender JSX',
    'Entender componentes',
    'Practicar con useState',
    'Crear mi primera app'
  ]

  return (
    <div className={`app-container tema-${tema}`}>
      {/* ENCABEZADO */}
      <header className="header">
        <h1>📖 Guía Interactiva de React</h1>
        <p className="subtitulo">Aprende React con ejemplos prácticos</p>
        <button 
          onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}
          className="btn-tema"
        >
          {tema === 'claro' ? '🌙' : '☀️'} Cambiar tema
        </button>
      </header>

      {/* SECCIÓN 1: ESTADO (useState) */}
      <section className="seccion">
        <h2>1️⃣ Estado con useState</h2>
        <p className="explicacion">
          El estado permite que los componentes "recuerden" información. 
          Cuando el estado cambia, React actualiza automáticamente la interfaz.
        </p>
        
        <div className="demo-contador">
          <p className="contador-valor">Contador: {contador}</p>
          <div className="botones-contador">
            <button onClick={() => setContador(prevValue => prevValue - 2)} className="btn">
              ➖ Restar
            </button>
            <button onClick={() => setContador(0)} className="btn btn-reset">
              🔄 Reset
            </button>
            <button onClick={() => setContador(contador + 1)} className="btn">
              ➕ Sumar
            </button>
          </div>
        </div>

        <div className="codigo">
          <code>
            const [contador, setContador] = useState(0)
          </code>
        </div>
      </section>

      {/* SECCIÓN 2: PROPS */}
      <section className="seccion">
        <h2>2️⃣ Props (Propiedades)</h2>
        <p className="explicacion">
          Los props son como parámetros de funciones. Permiten pasar datos 
          de un componente padre a sus componentes hijos.
        </p>
        
        <div className="grid-tarjetas">
          <Tarjeta 
            titulo="Componentes" 
            descripcion="Bloques reutilizables de UI"
            color="#61dafb"
          />
          <Tarjeta 
            titulo="JSX" 
            descripcion="Sintaxis que combina JS y HTML"
            color="#f7df1e"
          />
          <Tarjeta 
            titulo="Hooks" 
            descripcion="Funciones especiales de React"
            color="#aa3bff"
          />
        </div>

        <div className="codigo">
          <code>
            &lt;Tarjeta titulo="Hola" descripcion="Mundo" color="#blue" /&gt;
          </code>
        </div>
      </section>

      {/* SECCIÓN 3: EVENTOS */}
      <section className="seccion">
        <h2>3️⃣ Eventos y Condicionales</h2>
        <p className="explicacion">
          React puede responder a acciones del usuario como clicks, 
          cambios en inputs, etc. También podemos mostrar elementos condicionalmente.
        </p>
        
        <Saludo />

        <div className="codigo">
          <code>
            onClick=(e) =&gt; manejarClick(e)
          </code>
        </div>
      </section>

      {/* SECCIÓN 4: LISTAS */}
      <section className="seccion">
        <h2>4️⃣ Renderizado de Listas</h2>
        <p className="explicacion">
          React puede renderizar arrays de datos usando el método .map(). 
          Cada elemento debe tener una key única.
        </p>
        
        <ListaDeTareas tareas={tareasPendientes} />

        <div className="codigo">
          <code>
            {'{'}tareas.map((tarea, index) =&gt; &lt;li key={'{'}index{'}'}&gt;{'{'}tarea{'}'}&lt;/li&gt;{')'}
          </code>
        </div>
      </section>

      {/* SECCIÓN 5: CAMBIADOR DE COLOR */}
      <section className="seccion">
        <h2>5️⃣ Mi primer componente</h2>
        <p className="explicacion">
          Este ha sido mi primer componente que cambia de color según el valor ingresado,
          si el valor es vacío, se genera un color aleatorio.
        </p>
        
        <CambiadorColor />

        <div className="codigo">
          <code>
            const [color, setColor] = useState('#4299e1')
          </code>
        </div>
      </section>

       {/* SECCIÓN 6: COMPONENTE CON API */}
      <section className="seccion">
        <h2>6️⃣ Componente con API</h2>
        <p className="explicacion">
          Este componente obtiene datos de una API y los muestra en una lista.
        </p>
        
        <ComponenteConApi />
      </section>

      {/* SECCIÓN 7: COMPONENTE CON API PROTEGIDA */}
      <section className="seccion">
        <h2>7️⃣ Componente con API Protegida</h2>
        <p className="explicacion">
          Este componente obtiene datos de una API protegida con OAuth2 y los muestra en una lista.
        </p>
        
        <ComponenteConOAuth />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>🚀 Sigue practicando y experimentando con React</p>
        <p className="links">
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
            📚 Documentación oficial
          </a>
          {' | '}
          <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer">
            ⚡ Vite
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
