import { Dispatch, FC, SetStateAction, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ISpent } from '../App';
import CloseBtn from '../img/cerrar.svg';
import { Message } from './Message';

interface Props {
    animateModal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    setAnimateModal: Dispatch<SetStateAction<boolean>>;
    saveSpent: (spent: ISpent) => void;
    editSpent: ISpent;
    setEditSpent: Dispatch<SetStateAction<ISpent>>
}

export const Modal:FC<Props> = ({animateModal,
                                setModal,
                                setAnimateModal,
                                saveSpent,
                                editSpent,
                                setEditSpent
                            }) => {

    const [spent, setSpent] = useState<{id: string, name: string, quantity: number, category: string,  date: number;}>({
        id: '',
        name: '',
        quantity: 0,
        category: '',
        date: 0
    });
    const [error, setError] = useState<string>('');
    // const [id, setId] = useState(0);

    const {id = '', name, quantity, category, date} = spent;

    useEffect(() => {
        if(Object.keys(editSpent).length > 0){
            setSpent({
                name: editSpent.name,
                quantity: editSpent.quantity,
                category: editSpent.category,
                id: editSpent.id,
                date: editSpent.date
            });
          }
    }, [])
    

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement |undefined>) => {
        let nameTarget = e?.target.name;
        let value: string | number = e?.target.value;
        let type = e?.target.type;

        (type === 'number') ? setSpent({...spent, [nameTarget] : +value}) : setSpent({...spent, [nameTarget] : value})
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if([name, quantity, category].includes('')){
            setError('Todos los campos son obligatorios');

            setTimeout(() => {
                setError('')
            }, 3000);
            return;
        }
        
        saveSpent({id, name, quantity, category, date})
        
    };

    const closeModal = () => {
        setAnimateModal(false);
        setEditSpent({} as ISpent);
        setTimeout( () => {
            setModal(false);
          }, 500)
    };

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CloseBtn} 
                alt="icono cerrar"
                onClick={closeModal}
            />
        </div>

        <form
            className={`formulario ${animateModal ? 'animar' : 'cerrar'}`} 
            onSubmit={handleSubmit}
        >
            <fieldset>
                <legend>{editSpent.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {error && <Message type='error'>{error}</Message>}

                <div className="campo">
                    <label htmlFor="name">Nombre Gasto</label>

                    <input 
                        type="text" 
                        id='name'
                        placeholder='Agrega el nombre del gasto'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="quantity">Cantidad</label>

                    <input 
                        type="number" 
                        id='quantity'
                        name='quantity'
                        placeholder='Agrega la cantidad del gasto. Ej: $300'
                        value={quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Categoria</label>

                   <select 
                        id="category"
                        name="category" 
                        value={category}
                        onChange={handleChange}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                   </select>
                </div>

                <input 
                    type="submit" 
                    value={editSpent.name ? 'Guardar cambios' : 'Agregar Gasto'}
                />

            </fieldset>
        </form>
    </div>
  )
}
