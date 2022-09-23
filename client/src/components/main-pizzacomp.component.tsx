//#region  Import modules & components
import React from 'react';
import { PizzaContext } from './context/pizza-context.component';
import { IContext, ITab } from './models/IPizza';
import UserTab from './controls/tabs/user-tab/user-tab.component';
import ListPizza from './controls/list-pizza/list-pizza.component';
import CustomerDropdown from './controls/customer/customers.component';
import { tabs4Render } from './context/fakeData/fakeData';
//#endregion

import './main-pizzacomp.scss'
import AdminTab from './controls/tabs/admin-tab/admin-tab.component';


const MainTab = () => {

    const { tabSwitch, currentTab, pizzaSelected } = React.useContext(PizzaContext) as IContext;

    const renderTabsButton = () => {
        return (
            <div className={`tabs-container`}>
                {
                    tabs4Render.map((tab: ITab, indx: number) => {
                        return <div className={`tab-${tab}`} onClick={() => tabSwitch(indx)}>{tab.tabName}</div>
                    })
                }
            </div>
        )
    }

    return(
        <React.Fragment>
            {renderTabsButton()}
            { !currentTab 
                ? <div>
                    <CustomerDropdown/>
                    <UserTab/>
                    { 
                        (pizzaSelected.length > 0)
                        && <div className={`selected-pizza-wrapper`}>
                            <div className={`title`}>{'Selected Pizza: '}</div>
                            <ListPizza listItems={pizzaSelected} isConsumeList={true}/>
                        </div>
                    }
                </div>
                : <AdminTab/>}
        </React.Fragment>
    )
}

export default MainTab;