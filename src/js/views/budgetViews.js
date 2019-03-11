export const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__budgetDesc',
    inputValue: '.add__value',
    inputBtn: '.js-add__budget',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    delete: '.delete',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
};



const formatNumber = function(num, type) {
    var numSplit, int, dec, type;   

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); 
    }

    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
};



export const budgetUI = {

    getInput : () => {
        return {
            type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
        };
    },

    addListItem : (obj, type) => {
            let html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = `<div class="item clearfix" id="inc-${obj.id}"> 
                <div class="item__description">${obj.description}</div>
                <div class="item__green right clearfix">
                    <div class="item__income">
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
                    </div>
                    <div class="item__delete"><button class="item__green item__delete--btn">&times;</button></div></div></div>
                </div>`;

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = `<div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>

                <div class="item__red right clearfix">
                    <div class="item__expense">
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
                        <div class="item__percentage">21%</div>
                    </div>
                    <div class="item__delete"><button class="item__red item__delete--btn">&times;</button></div></div></div>
                </div>`;
            }            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);        
    },

    clearFields:() => {
              
        const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
        
        const fieldsArr = Array.prototype.slice.call(fields);
        
        fieldsArr.forEach((current, index, array) => {
            current.value = "";
        });
        
        fieldsArr[0].focus();
    },

    displayPercentages: (percentages) => {

        //percentages > [,]
            
        const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

        const fieldsArr = Array.from(fields);
        
        fieldsArr.forEach((cur, index) => {
            if (percentages[index] > 0) {
                cur.textContent = percentages[index] + '%';
            } else {
                cur.textContent = '---';
            }

        });
       
    },
    
    displayBudget: (obj) => {
        let type;
        obj.budget > 0 ? type = 'inc' : type = 'exp';
       
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

        
        // if (obj.percentage > 0) {
        //     document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
        // } else {
        //     document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        // }
        
    },

    displayMonth: () => {
              
        const now = new Date();
        //var christmas = new Date(2016, 11, 25);
        
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = now.getMonth();
        
        const year = now.getFullYear();
        document.querySelector(DOMstrings.dateLabel).textContent = `${months[month]} ${year}`;
    },

    deleteListItem: (selectorID) => {
            
        const el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);        
    },
    
}








