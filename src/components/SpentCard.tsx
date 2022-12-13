import { Dispatch, FC, SetStateAction } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../utils/formatDate';

import AhorroImg        from '../img/icono_ahorro.svg';
import CasaImg          from '../img/icono_casa.svg';
import ComidaImg        from '../img/icono_comida.svg';
import OcioImg          from '../img/icono_ocio.svg';
import SaludImg         from '../img/icono_salud.svg';
import SuscripcionesImg from '../img/icono_suscripciones.svg';
import GastosImg        from '../img/icono_gastos.svg';
import { ISpent } from "../App";


interface Props {
    bill: ISpent
    setEditSpent: Dispatch<SetStateAction<ISpent>>
    deleteSpent: (id:string) => void;
};

const dictionaryIcons: any = {
  ahorro        : AhorroImg,
  comida        : ComidaImg,
  casa          : CasaImg,
  ocio          : OcioImg,
  salud         : SaludImg,
  suscripciones : SuscripcionesImg,
  varios        : GastosImg,
}

export const SpentCard:FC<Props> = ({bill, setEditSpent, deleteSpent}) => {

  const {name, quantity, category, date, id} = bill;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={ () => {setEditSpent(bill)}} >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        destructive={true}
        onClick={ () => deleteSpent(id) } 
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictionaryIcons[category]} alt="icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: {''}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
