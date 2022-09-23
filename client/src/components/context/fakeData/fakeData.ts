import { CustomerTypes, ICustomer, IPizzaType, ITab, PizzaSize } from "../../models/IPizza";

export const fakeCustomers: ICustomer[] = [
    {   
        key: '01',
        name: 'Default',
        type: CustomerTypes.Default,
    },
    {
        key: '02',
        name: 'Microsoft',
        type: CustomerTypes.Microsoft,
    },
    {
        key: '03',
        name: 'Amazon',
        type: CustomerTypes.Amazon,
        discountPercent: 10
    },
    {
        key: '04',
        name: 'Facebook',
        type: CustomerTypes.Facebook,
    }
];

export const fakeDataList: IPizzaType[] = [
    {   
        key: 1,
        size: PizzaSize.small,
        name: 'Small Pizza',
        description: `10'' pizza for one person`,
        price: 11.99
    },
    {   
        key: 2,
        size: PizzaSize.medium,
        name: 'Medium Pizza',
        description: `12'' pizza for two person`,
        price: 15.99
    },
    {   
        key: 3,
        size: PizzaSize.large,
        name: 'Large Pizza',
        description: `15'' pizza for one person`,
        price: 21.99
    }
];

export const tabs4Render: ITab[] = [ {tabName: 'User', key: 0}, {tabName: 'Admin', key: 1}];