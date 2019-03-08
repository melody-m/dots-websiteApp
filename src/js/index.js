
import {budgetCtrl} from './models/Budget';
import {DOMstrings} from './views/budgetViews';
import {budgetUI} from './views/budgetViews';

import {taskCtrl} from './models/Task';
import {taskDOM} from './views/taskViews';
import {taskUI} from './views/taskViews';

import{tipCtrl} from './models/Tip';
import {tipsDOM} from './views/tipsViews';
import {tipsUI} from './views/tipsViews';

class Popup {
    constructor(circleBtn, container, closeBtn) {
        this.circleBtn = circleBtn;
        this.container = container;
        this.closeBtn = closeBtn;           
    }

    popupExpand(cont){
        cont.classList.remove('collapse');  
        cont.classList.add('appear');
    };

    popupClose(cont){
        cont.classList.remove('appear');  
        cont.classList.add('collapse');
    }
}

const popDOM = {
    btnToDo : document.getElementById('button-toDo'),
    btnBudget: document.getElementById('button-budget'),
    btnTips : document.getElementById('button-tips'),
    toDo : document.getElementById('popup__toDo'),
    budget: document.getElementById('popup__budget'),
    tips : document.getElementById('popup__tips'),
    closeToDo : document.getElementById('close__toDo'),
    closeBudget : document.getElementById('close__budget'),
    closeTips : document.getElementById('close__tips'),
    taskInputBtn : document.querySelector('.add__task--btn')
};

const popupTask = new Popup(popDOM.btnToDo, popDOM.toDo, popDOM.closeToDo);
const popupBudget = new Popup(popDOM.btnBudget, popDOM.budget, popDOM.closeBudget);
const popupTips = new Popup(popDOM.btnTips, popDOM.tips, popDOM.closeTips);

const popups = [popupTask, popupBudget, popupTips];

/************************************************************************************* */
//GLOBAL

function init(){

    window.onload = () => {
        const circles = document.querySelectorAll('.circle');
        
        for(let i=0; i< circles.length; i++){
            
            ((i) => {
                setTimeout(() => {
                    // circles[i].style.animationName = 'bounceInLeft';
                    circles[i].style.opacity = '1' ;          
                }, 200*i);                           
            })(i);        }
    };


    popups.forEach((cur) => {

        cur.circleBtn.addEventListener('click', () => {        
            cur.popupExpand(cur.container);
        })
        cur.closeBtn.addEventListener('click', () => {
            cur.popupClose(cur.container);
        })
    })

    taskEventListener();
    budgetEventListener();
    tipsEventListener();

}




/************************************************************************************ */
//BUDGET CONTROLLER


function budgetEventListener(){
    const DOM = DOMstrings;

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
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
//TASK CONTROLLER

// var someVarName = "value";
// localStorage.setItem("someVarKey", someVarName);
// var someVarName = localStorage.getItem("someVarKey");

function taskEventListener(){
    
    document.querySelector(taskDOM.inputBtn).addEventListener('click', ctrlAddTask);
    
    document.querySelector(taskDOM.container).addEventListener('click', ctrlDeleteTask);

}


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

    if(taskID){
        taskCtrl.deleteTask(ID,type);
        
        taskUI.deleteListTask(taskID);
        
        taskCtrl.calcTotalPrio(type);
        const totalPrio = taskCtrl.getTotalPrio(type);
    
        taskUI.addTotalTask(totalPrio,prio);
    }   
    
};




/************************************************************************************************************ */
//TIPS CONTROLLER


function tipsEventListener(){    

    tipsDOM.addTip.addEventListener('click', ctrlAddTip);

    tipsDOM.addPeople.addEventListener('click', ctrlCalcShare);
    tipsDOM.clear.addEventListener('click', () => {
        tipsUI.clearResults();
        tipCtrl.clearData();
    });
};


function ctrlAddTip() {
    
    tipsUI.clearResults();
    tipCtrl.clearData();

    if(tipsDOM.inputBill !== ""){

        const inputTip = tipsUI.getInput();
        const tip = tipCtrl.calcTip(inputTip.bill, inputTip.tipValue);
        const totalBill = tipCtrl.calcTotal(inputTip.bill, inputTip.tipValue);

        tipsUI.clearfields();
        tipsUI.displayResults(inputTip.bill, tip, totalBill);        
    }

};

function ctrlCalcShare() {
    if(tipsDOM.inputPeople !== ""){

        const inputPeople = tipsUI.getPeople();        
        const billShare = tipCtrl.calcShare(inputPeople.people);

        tipsUI.clearfields();
        tipsUI.displayShare(billShare);        
    }
    
}

/************************************************************************************************************ */

init();