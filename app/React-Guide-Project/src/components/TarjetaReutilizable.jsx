import { useState } from 'react'

function TarjetaReutilizable({ titulo, descripcion, color }) {
  return (
    <div className="tarjeta" style={{ borderLeft: `4px solid ${color}` }}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  )
}

export default TarjetaReutilizable