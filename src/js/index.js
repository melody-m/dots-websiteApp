
import {budgetCtrl} from './models/Budget';
import {DOMstrings} from './views/budgetViews';
import {budgetUI} from './views/budgetViews';

import {taskCtrl} from './models/Task';
import {taskDOM} from './views/taskViews';
import {taskUI} from './views/taskViews';



/************************************************************************************* */
//GLOBAL

function init(){

    // document.getElementById('button-toDo').addEventListener('click', () => {
    //     document.getElementById('popup__budget').classList.toggle('none');
    //     document.getElementById('popup__tips').classList.toggle('none');
    // });

    // document.getElementById('button-budget').addEventListener('click', () => {
    //     document.getElementById('popup__toDo').classList.toggle('none');
    //     document.getElementById('popup__tips').classList.toggle('none');
    // });

    // document.getElementById('button-tips').addEventListener('click', () => {
    //     document.getElementById('popup__budget').classList.toggle('none');
    //     document.getElementById('popup__toDo').classList.toggle('none');
    // });

}




/************************************************************************************ */
//BUDGET CONTROLLER


function initBudget(){
    const DOM = DOMstrings;

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
    }
    });

    document.querySelector(DOM.delete).addEventListener('click', ctrlDeleteItem);


    budgetUI.displayMonth();

};


function ctrlAddItem(){
    let newItem;        
    
    //1. Get input from UI
    const input = budgetUI.getInput();

    // Check if it's not empty
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
         //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //console.log(newItem);
    }

    // 3. Add the item to the UI
    budgetUI.addListItem(newItem, input.type);

    // // 4. Clear the fields
    budgetUI.clearFields();

    // 5. Calculate and update budget
    updateBudget();
            
    // 6. Calculate and update percentages
    updatePercentages();

}



function updateBudget(){
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    const budget = budgetCtrl.getBudget();
    
    // 3. Display the budget on the UI
    budgetUI.displayBudget(budget);

}


function updatePercentages() {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();
    
    // 2. Read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    
    // 3. Update the UI with the new percentages
    budgetUI.displayPercentages(percentages);
}




function ctrlDeleteItem(e) {
    
    const itemID = e.target.parentNode.parentNode.parentNode.id;

    if (itemID) {        
        //itemID = inc-1
        const splitID = itemID.split('-');
        const type = splitID[0];
        const ID = parseInt(splitID[1]);
        
        // 1. delete the item from the data structure
        budgetCtrl.deleteItem(type, ID);
        
        //2. Delete the item from the UI
        budgetUI.deleteListItem(itemID);
        
        //3. Update and show the new budget
        updateBudget();
        
        //4. Calculate and update percentages
        updatePercentages();
    }
};

/************************************************************************************************************ */
//TO DO CONTROLLER

    document.querySelector(taskDOM.inputBtn).addEventListener('click', ctrlAddTask);
    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddTask();
        }
        });
    
    document.querySelector(taskDOM.container).addEventListener('click', ctrlDeleteTask);


function ctrlAddTask() {
        const input = taskUI.getInput();

        if (input.description !== "") {            
            const newItem = taskCtrl.addTask(input.description, input.priority, input.type);
            taskUI.addListTask(newItem, input.priority);
        }
        
        taskUI.clearfields();

        const value = taskCtrl.calcTotalPrio(input.type);

        taskUI.addTotalTask(value,input.priority);

    };

function ctrlDeleteTask(event){

    const taskID = event.target.parentNode.parentNode.parentNode.id;      

    const splitID = taskID.split('-');
    const type = splitID[0];
    const ID = parseInt(splitID[1]);

    const prio = parseInt(type.charAt(4));
    
    taskCtrl.deleteTask(ID,type);
    
    taskUI.deleteListTask(taskID);
    
    taskCtrl.calcTotalPrio(type);
    const totalPrio = taskCtrl.getTotalPrio(type);

    taskUI.addTotalTask(totalPrio,prio);
    
};




/************************************************************************************************************ */
//TIPS CONTROLLER


initBudget();
init();