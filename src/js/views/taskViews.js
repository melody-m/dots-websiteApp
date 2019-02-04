export const taskDOM = {
    inputDescription: '.add__description',
    inputPrio: '.addTask__prio',
    inputBtn : '.addTask__btn',
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
        let element, html, newHtml;

        if (prio === 1 ){

            element = taskDOM.prio1;  
            html = '<div class="item clearfix" id="prio1-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__priority">%priority%</div><div class="item__delete"><button class="item__delete--btn">X</button></div></div>';              

        } else if (prio === 2 ){
            
            element = taskDOM.prio2;               
            html = '<div class="item clearfix" id="prio2-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__priority">%priority%</div><div class="item__delete"><button class="item__delete--btn">X</button></div></div>';

        } else {
            
            element = taskDOM.prio3;
            html = '<div class="item clearfix" id="prio3-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__priority">%priority%</div><div class="item__delete"><button class="item__delete--btn">X</button></div></div>';
           
        }; 

                    
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%priority%', prio);
        
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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

        let el;

        el = document.getElementById(selectorID); // will give full id of element ex: prio1-0
        el.classList.add('fadeOut');

        el.addEventListener("transitionend", (event) => {
            el.parentNode.removeChild(el);
          }, false);

    },

    clearfields : () => {

        const field = document.querySelector(taskDOM.inputDescription);
        const prio = document.querySelector(taskDOM.inputPrio);

        field.value = "";
        prio.value = 1;
    }

}