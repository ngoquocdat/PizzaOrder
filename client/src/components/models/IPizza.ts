export const enum PizzaSize {
    "small" = 1,
    "medium" = 2,
    "large" = 3
}

export const enum CustomerTypes {
    "Default" = 1,
    "Microsoft" = 2,
    "Amazon" = 3,
    "Facebook" = 4
}

export interface IPizzaType {
    key: number;
    size: PizzaSize,
    name: string,
    description: string,
    price: number
}

export interface ICustomer {
    key: string,
    name: string,
    type: CustomerTypes,
    discountPercent?: number
}

export interface ISelectedPizza extends IPizzaType {
    counter: number;
    promoteAdd: number;
    promotePrice: number
}

export interface IContext {
    currentTab: number,
    pizzaSelected: IPizzaType[],
    totalPayment: number,
    selectedCustomer: ICustomer,
    tabSwitch: (tabNum: number) => void,
    onSelectedPizza: (pizzaOnSelect: IPizzaType) => void,
    handleSelectCustomer: (customer: ICustomer) => void
}

export interface ITab {
    tabName: string,
    key: number
}