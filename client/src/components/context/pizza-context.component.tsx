//#region   Import modules and components
import React, { ReactNode, useEffect, useState } from "react";
import { CustomerTypes, IContext, ICustomer, IPizzaType, ISelectedPizza } from "../models/IPizza";
import { fakeCustomers } from "./fakeData/fakeData";
import { PizzaContextFunctions } from "./pizza-context";
//#endregion

interface BaseLayoutProps {
    children?: ReactNode;
}

const PizzaContext = React.createContext<IContext | null>(null);

const PizzaProvider: React.FC<BaseLayoutProps> = ({children}) => {

    const _PizzaContextFuncs: PizzaContextFunctions = new PizzaContextFunctions();
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [pizzaSelected, setPizzaSelected] = useState<ISelectedPizza[]>([]);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>(fakeCustomers[0]);

    useEffect(() => {
        setPizzaSelected([]);
        setTotalPayment(0);
    }, [selectedCustomer])

    const tabSwitch = (tabNum: number) => {
        setCurrentTab(tabNum);
    }

    const handleSelectCustomer = (customer: ICustomer) => {
        setSelectedCustomer(customer);
    }

    const calcTotalPayment = (pizzas: ISelectedPizza[]) => {
        let totalPrice = 0;
        for(let pizza of pizzas) {
            const pizzaCurrPrice = selectedCustomer.type === CustomerTypes.Amazon && (pizza.promotePrice > 0) ? pizza.promotePrice : pizza.price;
            totalPrice = totalPrice + (pizza.counter*pizzaCurrPrice);
        }
        setTotalPayment(Number((totalPrice).toFixed(2)));
    }

    const onSelectedPizza = (pizzaOnSelect: IPizzaType) => {
        const addedPizza = _PizzaContextFuncs.AddPizza(pizzaOnSelect, pizzaSelected, selectedCustomer);
        calcTotalPayment(addedPizza);
        setPizzaSelected(prevState => Array.from(new Set(prevState.concat(addedPizza))));
    }

    return <PizzaContext.Provider value={{tabSwitch, onSelectedPizza, handleSelectCustomer, pizzaSelected, currentTab, totalPayment, selectedCustomer}}>{children}</PizzaContext.Provider>
}

export { PizzaContext, PizzaProvider }