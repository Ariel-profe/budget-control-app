import {useState, useEffect, Dispatch, SetStateAction, FC} from 'react';

interface Props {
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
}

export const Filters:FC<Props> = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className="campo">
                <label htmlFor="filters">Filtrar Gastos</label>
                <select
                    id="filters"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                <option value="">-- Todas las categorías --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}
