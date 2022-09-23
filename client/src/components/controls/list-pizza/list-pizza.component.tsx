//#region  Import modules and components 
import React from "react"
import { PizzaContext } from "../../context/pizza-context.component";
import { CustomerTypes, IContext, IPizzaType, ISelectedPizza, PizzaSize } from "../../models/IPizza"
//#endregion

import './list-pizza.scss';

interface IListPizza {
    listItems: IPizzaType[] | ISelectedPizza[];
    isConsumeList?: boolean;
}

const ListPizza = (props: IListPizza) => {

    const { onSelectedPizza, totalPayment, selectedCustomer } = React.useContext(PizzaContext) as IContext;

    const calculatePrice = (pizza: ISelectedPizza): number => {
        if(selectedCustomer.type === CustomerTypes.Amazon && pizza.promotePrice !== undefined && pizza.size === PizzaSize.large) {
            return pizza.promotePrice*pizza.counter;
        }
        return pizza.price*pizza.counter;
    }

    return (
        <React.Fragment>
            <ul className={`pizza-list`}>
                {props.listItems.map((item: IPizzaType | ISelectedPizza) => {
                    return <li className={`pizza-item-${item.key} ${!props.isConsumeList ? '':'consume-list'}`}>
                        <span onClick={(evt: React.MouseEvent) => {
                            !props.isConsumeList 
                                && onSelectedPizza(item)
                        }}>
                            {   item.hasOwnProperty('counter') && props.isConsumeList
                                ? `${item.name} x ${((item as ISelectedPizza).counter + (item as ISelectedPizza).promoteAdd)}`
                                : item.name
                            }
                        </span>
                        { !props.isConsumeList && <span>{item.description}</span> }
                        <span className={`item-price`}>
                            {props.isConsumeList ? calculatePrice(item as ISelectedPizza) : item.price}
                        </span>
                    </li>
                })}
                { props.isConsumeList 
                    && <li className={`consume-price`}>{totalPayment}</li>
                }
            </ul>
        </React.Fragment>
    )
}

export default ListPizza;