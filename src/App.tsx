import { useState, useEffect } from "react";
import { BillsList, Filters, Header, Modal } from "./components"; 
import { generateId } from './utils/generateId';
import NewBudgetIcon from './img/nuevo-gasto.svg';

export interface ISpent {
  id: string;
  date: number;
  name: string;
  quantity: number;
  category: string;
};

function App() {

  const [budget, setBudget] = useState<number>(Number(localStorage.getItem('budget')) || 0);
  const [isValidBudget, setIsValidBudget] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [animateModal, setAnimateModal] = useState<boolean>(false);
  const [bills, setBills] = useState<ISpent[]>(JSON.parse(localStorage.getItem("bills") || JSON.stringify([]) ));
  const [editSpent, setEditSpent] = useState<ISpent>({} as ISpent);
  const [filter, setFilter] = useState<string>('');
  const [filteredBills, setFilteredBills] = useState<ISpent[]>([]);

  useEffect(() => {
    if(Object.keys(editSpent).length > 0){
      setModal(true);
      setTimeout( () => {
        setAnimateModal(true);
      }, 500)
    }
  }, [editSpent]);

  useEffect(() => {
    localStorage.setItem('budget', budget.toString() ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills) ?? []);
  }, [bills]);

  useEffect(() => {
    if(filter){
      // Filtrar gastor por categoria
      const filteredBills = bills.filter( bill => bill.category === filter);
      setFilteredBills(filteredBills);
    }
  }, [filter])
  

  useEffect( () => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0){
      setIsValidBudget(true);
    }   
  },[]);
  
  

  const handleNewSpent = () => {
    setModal(true);
    setEditSpent({} as ISpent);
    setTimeout( () => {
      setAnimateModal(true);
    }, 500)
  }

  const saveSpent = (spent: ISpent) => {
    if(spent.id){
      // Actualizar
      const updatedBills = bills.map( (spentState:ISpent) => spentState.id === spent.id ? spent : spentState)

      setBills(updatedBills);
      setEditSpent({} as ISpent);
    } else{
      // Generar nuevo gasto
      spent.id = generateId();
      spent.date = Date.now();
      setBills([...bills, spent]);
    }
    setAnimateModal(false);
    setTimeout( () => {
      setModal(false);
    }, 500)
  };

  const deleteSpent = (id: string) => {
    const deletedSpent = bills.filter( (spent:ISpent) => spent.id !== id );

    setBills(deletedSpent);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        setBills={setBills}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        bills={bills}
      />

      {isValidBudget && (
        <>
        <main>
          <Filters 
            filter={filter}
            setFilter={setFilter}
          />
          <BillsList 
            bills={bills}
            setEditSpent={setEditSpent}
            deleteSpent={deleteSpent} 
            filter={filter}
            filteredBills={filteredBills}
          />
        </main>
        <div className="nuevo-gasto">
          <img 
            src={NewBudgetIcon} 
            alt="icono nuevo gasto" 
            onClick={handleNewSpent}
          />
        </div>
        </>
      )}

      {
        modal && (<Modal 
                    setModal={setModal} 
                    animateModal={animateModal} 
                    setAnimateModal={setAnimateModal}
                    saveSpent={saveSpent}
                    editSpent={editSpent}
                    setEditSpent={setEditSpent}
                  />)
      }
    </div>
  )
}

export default App
