import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatCurrency } from "../utils/formatCurrency";
import { ISpent } from '../App';

interface Props {
    budget : number;
    setBudget: Dispatch<React.SetStateAction<number>>;
    bills: ISpent[];
    setBills: Dispatch<SetStateAction<ISpent[]>>
    setIsValidBudget: Dispatch<SetStateAction<boolean>>
};

export const BudgetControl:FC<Props> = ({budget, setBudget, bills, setBills, setIsValidBudget}) => {

    const [available, setAvailable] = useState<number>(0);
    const [wasSpent, setWasSpent] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    
    useEffect(() => {
        // Reduce recibe dos args: el total donde se acumula los datos de la variable y la instancia que es donde itera el metodo
        const totalSpent = bills.reduce( (total, spent) => spent.quantity + total, 0 );

        const totalAvailable = budget - totalSpent;

        // Calc percentaje
        const totalPercentage = +((totalSpent * 100) / budget).toFixed(2);
        
        setAvailable(totalAvailable);
        setWasSpent(totalSpent);

        setTimeout( () => {
            setPercentage(totalPercentage);
        },1000)
    }, [bills]);

    const handleReset = () => {
        const result = confirm('Deseas reiniciar tu app?');
        if(result){
            setBudget(0);
            setBills([]);
            setIsValidBudget(false);
        }
        
    };
    

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                })}
                text={`${percentage}% Gastado`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button 
                className="reset-app"
                onClick={handleReset}
            >
                resetear app
            </button>
            <p>
                <span>Presupuesto: </span> {formatCurrency(budget)}
            </p>
            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatCurrency(available)}
            </p>
            <p>
                <span>Gastado: </span> {formatCurrency(wasSpent)}
            </p>
        </div>
    </div>
  )
}
