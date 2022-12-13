import { Dispatch, FC, SetStateAction } from "react"
import { ISpent } from '../App';
import { SpentCard } from "./SpentCard";

interface Props {
    bills: ISpent[];
    setEditSpent: Dispatch<SetStateAction<ISpent>>
    deleteSpent: (id:string) => void;
    filter: string;
    filteredBills: ISpent[];
}

export const BillsList:FC<Props> = ({bills,setEditSpent, deleteSpent, filter, filteredBills}) => {
  return (
    <div className="listado-gastos contenedor">
      {
        filter ? (
          <>
            <h2>{filteredBills.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
            {filteredBills.map( (bill:ISpent) => (
              <SpentCard 
                key={bill.id} 
                bill={bill}
                setEditSpent={setEditSpent}
                deleteSpent={deleteSpent}
              />
            ))}
          </>
      ) : (
        <>
          <h2>{bills.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {bills.map( (bill:ISpent) => (
            <SpentCard 
              key={bill.id} 
              bill={bill}
              setEditSpent={setEditSpent}
              deleteSpent={deleteSpent}
            />
          ))}
        </>
      )
    }
    </div>
  )
}
