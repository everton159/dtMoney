import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction{
  id:number;
  title:string;
  category:string;
  type:string;
  createdAt:string;
  amount:number;
}

type TransactionInput = Omit<Transaction, 'id' |'createdAt'>;


interface TransactionProviderProps {
  children: ReactNode;
}


//export const TransactionsContext = createContext<Transaction[]>([]);

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction:(transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData);


export function TransactionsProvider({children}:TransactionProviderProps){
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
    .then(response =>setTransaction(response.data.transactions))
  },[]);

  async function createTransaction(transactionInput:TransactionInput) {
    const response = await api.post('/transactions',{...transactionInput, createdAt: new Date()});
    const {transaction} = response.data;
    setTransaction([...transactions, transaction]); 
  }


    return (
        <TransactionsContext.Provider value={{transactions , createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )

}

export function useTransactions(){
  const context = useContext(TransactionsContext)

  return context;
}