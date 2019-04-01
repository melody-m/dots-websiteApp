
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

    window.addEventListener("load", () => {

        const loaders = document.querySelectorAll('.load');
        const loadersArr = Array.from(loaders);

        loadersArr.forEach((cur)=>{
            cur.style.display = "none";
        })
    });

    window.onload = () => {
        const circles = document.querySelectorAll('.circle');
        
        for(let i=0; i< circles.length; i++){
            
            ((i) => {
                setTimeout(() => {
                    circles[i].style.animationName = 'bounceInLeft';
                    circles[i].style.opacity = '1' ;          
                }, 200*i);                           
            })(i);        }
    };


    popups.forEach((cur) => {

        cur.circleBtn.addEventListener('click', () => {        
            cur.popupExpand(cur.container);
            document.querySelector('body').classList.add('noscroll');
            document.querySelector('.popup__bckgrd').classList.remove('collapse');  
        })
        cur.closeBtn.addEventListener('click', () => {
            cur.popupClose(cur.container);
            document.querySelector('body').classList.remove('noscroll');
            document.querySelector('.popup__bckgrd').classList.add('collapse');  
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

    const input = budgetUI.getInput();


    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    }

    budgetUI.addListItem(newItem, input.type);

    budgetUI.clearFields();

    updateBudget();
            
    updatePercentages();

}



function updateBudget(){

    budgetCtrl.calculateBudget();

    const budget = budgetCtrl.getBudget();
    
    budgetUI.displayBudget(budget);

}


function updatePercentages() {

    budgetCtrl.calculatePercentages();
    
    const percentages = budgetCtrl.getPercentages();
    
    budgetUI.displayPercentages(percentages);
}




function ctrlDeleteItem(e) {
    
    const itemID = e.target.parentNode.parentNode.parentNode.id;

    if (itemID) {        
        //itemID = inc-1
        const splitID = itemID.split('-');
        const type = splitID[0];
        const ID = parseInt(splitID[1]);
        
        budgetCtrl.deleteItem(type, ID);
        
        budgetUI.deleteListItem(itemID);
        
        updateBudget();

        updatePercentages();
    }
};

/************************************************************************************************************ */
//TASK CONTROLLER

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
        if(tipsDOM.displayShare.innerHTML !== ''){ // allow to recalculate split bill multiple times
           tipsDOM.displayShare.innerHTML = '';
        }
        const inputPeople = tipsUI.getPeople();        
        const billShare = tipCtrl.calcShare(inputPeople.people);

        tipsUI.clearfields();
        tipsUI.displayShare(billShare);        
    }
    
}

/************************************************************************************************************ */

init();