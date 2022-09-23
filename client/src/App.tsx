// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { PizzaProvider } from './components/context/pizza-context.component';
import MainTab from './components/main-pizzacomp.component';


function App() {
  return (
    <PizzaProvider>
      <div className="App">
        <header className="App-header">
            {'Pizza Order App'}
        </header>
        <div className={`App-body`}>
          <MainTab />
        </div>
      </div>
    </PizzaProvider>
  );
}

export default App;
