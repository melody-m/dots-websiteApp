class Budget {
    constructor(id, description, value, type) {
        this.id = id;
        this.description = description;
        this.value = value;      
        this.type = type;  
    }

    calcPercentage(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }    
    
    getPercentage(){
        return this.percentage;
    }
} 

const data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((cur) => {
        sum += cur.value;
    });
    data.totals[type] = sum;
};




export const budgetCtrl = {


    addItem : (type, des, val) => {
        let ID;
    
        // Create new ID
        if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }
    
        //Create new Budget item
    
        const newItem = new Budget(ID, des, val, type)
    
        //Create new item
        if (type === 'exp') {
            data.allItems[type].push(newItem);
        } else if (type === 'inc') {
            data.allItems[type].push(newItem);
        }
       
        // Return the new element
        return newItem;
    
        },

    calculateBudget: () => {
        
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        
        // Calculate the budget: income - expenses
        data.budget = data.totals.inc - data.totals.exp;
        
        // calculate the percentage of income that we spent
        if (data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }            
    },

    getBudget: () => {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        };
    },
    
    calculatePercentages: () => {
        data.allItems.exp.forEach((cur) => {
           cur.calcPercentage(data.totals.inc);
        });
    },
    
    
    getPercentages: () => {
        const allPerc = data.allItems.exp.map((cur) => {
            return cur.getPercentage();
        });
        //console.log(allPerc);
        return allPerc;
    },

    deleteItem: (type, id) => {
        
        //loop over array of inc/exp - create new array with only the ids
        const ids = data.allItems[type].map((current) => {
            return current.id;
        });

        //retrieve index in the array of the id passed on 
        const index = ids.indexOf(id);

        //remove item according to index
        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
        console.log(data.allItems);        
    }


    
}



