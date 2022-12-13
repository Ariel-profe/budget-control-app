import { ChangeEvent, ChangeEventHandler, Dispatch, FC, FormEvent, useState } from 'react'
import { Message } from './Message';

interface Props {
  budget : number;
  setBudget: Dispatch<React.SetStateAction<number>>;
  setIsValidBudget: Dispatch<React.SetStateAction<boolean>>
}

export const NewBudget:FC<Props> = ({budget, setBudget, setIsValidBudget }) => {

  const [msg, setMsg] = useState<string>('');

  const handleValue = (e:ChangeEvent<HTMLInputElement>) => {
    setBudget(+ e.target.value);
  };

  const handleBudget = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!budget || budget < 0){
     setMsg('No es un presupuesto valido');
    return;
    }
    setMsg('');
    setIsValidBudget(true);
  };

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
      <form 
        className='formulario'
        onSubmit={handleBudget}
      >
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>

          <input 
            type="number"
            className='nuevo-presupuesto' 
            placeholder='Agrega tu presupuesto'
            value={budget}
            onChange={ handleValue }
          />
        </div>

        <input type="submit" value="Agregar" />

        {msg && <Message type='error'>{msg}</Message>}
      </form>
    </div>
  )
}
