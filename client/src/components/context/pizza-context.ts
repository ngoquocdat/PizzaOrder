import { CustomerTypes, ICustomer, IPizzaType, ISelectedPizza, PizzaSize } from "../models/IPizza";

export class PizzaContextFunctions {

    public AddPizza(currentPizza: IPizzaType, selectedPizza: ISelectedPizza[], selectedCustomer: ICustomer) {
        let _tempPizzaSelected = selectedPizza;

        if(!_tempPizzaSelected.length) {
            this.customizeAddPizza(_tempPizzaSelected, currentPizza as ISelectedPizza, selectedCustomer);
            return _tempPizzaSelected ;
        } 
        else {
            let existedIndex = -1;
            _tempPizzaSelected.find((pizza: ISelectedPizza, indx: number) => {
                if(pizza.key === currentPizza.key) return existedIndex = indx;
            });

            existedIndex > -1 
                ? _tempPizzaSelected[existedIndex].counter += 1
                : _tempPizzaSelected = this.customizeAddPizza(_tempPizzaSelected, currentPizza as ISelectedPizza, selectedCustomer);

            const currIndex = _tempPizzaSelected.findIndex((pizza: ISelectedPizza) => pizza.key === currentPizza.key);
            _tempPizzaSelected[currIndex] = this.promotionAddPizza(_tempPizzaSelected[currIndex], selectedCustomer);
            return _tempPizzaSelected ;
        }
    }

    private promotionAddPizza(pizzaAdded: ISelectedPizza, selectedCustomer: ICustomer): any {
        const condMicrosoft = selectedCustomer.type === CustomerTypes.Microsoft && pizzaAdded.size === PizzaSize.small && pizzaAdded.counter >= 2 && pizzaAdded.counter%2 == 0,
            condFacebook = selectedCustomer.type === CustomerTypes.Facebook && pizzaAdded.size === PizzaSize.medium && pizzaAdded.counter >= 4 && pizzaAdded.counter%4 == 0;
        if(condMicrosoft || condFacebook) {
            /* We can set default promoteAdd equal 0 at pizza first time add. */
            !pizzaAdded.promoteAdd ? (pizzaAdded.promoteAdd = 1) : (pizzaAdded.promoteAdd += 1) ;
        }
        return pizzaAdded;
    }
    
    private promotionDiscount(pizzaAdded: ISelectedPizza, selectedCustomer: ICustomer) {
        if(selectedCustomer.discountPercent) {
            const promoPrice = pizzaAdded.price - Number(((pizzaAdded.price*selectedCustomer.discountPercent)/100).toFixed(1));
            return promoPrice;
        }
        return pizzaAdded.price;
    }
    
    private customizeAddPizza(pizzaSelected: ISelectedPizza[], currentPizza: ISelectedPizza, selectedCustomer: ICustomer) {
        currentPizza = { ...currentPizza, counter: 1, promoteAdd: 0, promotePrice: 0 };
        selectedCustomer.type === CustomerTypes.Amazon && currentPizza.size === PizzaSize.large
            && (currentPizza.promotePrice = this.promotionDiscount(currentPizza as ISelectedPizza, selectedCustomer));
        pizzaSelected.push(currentPizza as ISelectedPizza);
        return pizzaSelected;
    }

}