import { Dispatch, FC, SetStateAction } from 'react'
import { BudgetControl, NewBudget } from './';
import { ISpent } from '../App';

interface Props {
    budget : number;
    setBudget: Dispatch<React.SetStateAction<number>>;
    isValidBudget: boolean;
    setIsValidBudget: Dispatch<SetStateAction<boolean>>
    bills: ISpent[];
    setBills: Dispatch<React.SetStateAction<ISpent[]>>
}

export const Header:FC<Props> = ({budget, setBudget, isValidBudget, setIsValidBudget, bills, setBills}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {
          isValidBudget ? (
            <BudgetControl
              budget={budget}
              setBudget={setBudget}
              bills={bills}
              setBills={setBills}
              setIsValidBudget={setIsValidBudget}
            />
          ) : (
            <NewBudget
               budget={budget}
               setBudget={setBudget}
               setIsValidBudget={setIsValidBudget}
            />
          )
        }
    </header>
  )
}
