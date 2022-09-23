//#region  Import modules & components
import React from "react";
import { fakeDataList } from "../../../context/fakeData/fakeData";
import ListPizza from "../../list-pizza/list-pizza.component";
//#endregion

import './user-tab.scss';

const UserTab = () => {

    return (
        <React.Fragment>
            <div className={`title`}>{'List Available Pizza: '}</div>
            <ListPizza listItems={fakeDataList} isConsumeList={false}/>
        </React.Fragment>
    )
}

export default UserTab;