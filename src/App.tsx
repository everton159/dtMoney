import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');


function App() {
  const[isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionOpen(false);
  }

  return (
    <TransactionsProvider>
        <Header onOpenNewTransitionModal={handleOpenNewTransactionModal}/>
        <Dashboard/>
       <GlobalStyle/>

      <NewTransactionModal isOpen={isNewTransactionOpen} onRequestClose={handleCloseNewTransactionModal} />

      </TransactionsProvider>
  );
}

export default App;
