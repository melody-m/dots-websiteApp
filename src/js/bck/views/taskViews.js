export const taskDOM = {
    inputDescription: '.js-add__description',
    inputPrio: '.js-add__input--prio',
    inputBtn : '.js-add__task',
    prio1:'.container__prio1',
    prio2:'.container__prio2',
    prio3:'.container__prio3',
    container: '.container__priority',
    totalPrio1:'.js-total__prio1',
    totalPrio2:'.js-total__prio2',
    totalPrio3:'.js-total__prio3',
    totalValue1:'.totalValue1',
    totalValue2:'.totalValue2',
    totalValue3:'.totalValue3'
};

export const taskUI = {
    getInput : () => {
       
        return {

        description : document.querySelector(taskDOM.inputDescription).value,
        priority: parseInt(document.querySelector(taskDOM.inputPrio).value),
        type : 'prio'+ document.querySelector(taskDOM.inputPrio).value // value of the "value" in html NOT what's selected by user

        };
    },

    addListTask : (obj, prio) => {
        let element, html;

        html = `<div class="item clearfix" id="prio${prio}-${obj.id}">

        <div class="item__description">${obj.description}</div>
        
        <div class="right clearfix">
            <div class="item__priority item__priority--${prio}">${prio}</div>
            <div class="item__delete">
                <button class="item__delete--btn item__priority--${prio}">&times;</button>
            </div>
        </div>`;      

        if (prio === 1 ){
            element = taskDOM.prio1;              
        } else if (prio === 2 ){            
            element = taskDOM.prio2;             
        } else {            
            element = taskDOM.prio3;            
        };                 

        
        document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    addTotalTask : (value, prio) => {
        
        if (prio === 1 ){
            document.querySelector(taskDOM.totalValue1).textContent = value;
            
        } else if (prio === 2 ){ 
            document.querySelector(taskDOM.totalValue2).textContent = value;
            
        } else {
            document.querySelector(taskDOM.totalValue3).textContent = value;            
        };        

    },

    deleteListTask : (selectorID) => {

        const el = document.getElementById(selectorID); // will give full id of element ex: prio1-0
        el.classList.add('fadeOut');

        setTimeout(() => {
            el.parentNode.removeChild(el);
        },500);  // fade out takes .4s
    },

    clearfields : () => {

        const field = document.querySelector(taskDOM.inputDescription);
        const prio = document.querySelector(taskDOM.inputPrio);

        field.value = "";
        prio.value = 1;
    }

}