//#region   Imports components and modules
import React from 'react';
import { PizzaContext } from '../../context/pizza-context.component';
import { fakeCustomers } from '../../context/fakeData/fakeData';
import { IContext, ICustomer } from '../../models/IPizza';
//#endregion

import './customers.scss';

const Customers = () => {

    const { handleSelectCustomer, selectedCustomer } = React.useContext(PizzaContext) as IContext;

    return (
        <React.Fragment>
            <div className={`customers-wrapper`}>
                { fakeCustomers.map((customer: ICustomer) => {
                    const isCustomerSelected = (selectedCustomer as ICustomer).key === customer.key;
                    return <div key={customer.key} className={`customer ${isCustomerSelected ? 'active':''}`}
                            onClick={() => handleSelectCustomer(customer)}>
                        {customer.name}
                    </div>
                })}
            </div>
        </React.Fragment>
    )
}

export default Customers;