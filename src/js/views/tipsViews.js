export const tipsDOM = {
    inputBill: document.querySelector('.add__bill'),
    inputTip: document.querySelector('.add__tips'),
    addTip: document.querySelector('.js-add__tip'),
    displayBill : document.getElementById('bill-display'),
    displayTip : document.getElementById('tip-display'),
    displayTotal : document.getElementById('total-display'),
    addPeople : document.querySelector('.tips__addPeople'),
    inputPeople : document.querySelector('.tips__people'),
    displayShare : document.getElementById('share-display'),
    clear : document.querySelector('.tips__clear')
}


export const tipsUI = {

    getInput : () => {
       
        return {
        bill : parseFloat(tipsDOM.inputBill.value),
        tipValue: parseFloat(tipsDOM.inputTip.value)
        };
    },

    displayResults : (bill, tip, totalBill)  => {
        
        const billHtml = `£${bill}`
        const tipHtml = `£${tip}`;
        const totalHtml = `£${totalBill}`;

        tipsDOM.displayBill.insertAdjacentHTML('beforeend',billHtml);
        tipsDOM.displayTip.insertAdjacentHTML('beforeend',tipHtml);
        tipsDOM.displayTotal.insertAdjacentHTML('beforeend',totalHtml);
    },

    clearfields : () => {

        const field = tipsDOM.inputBill;
        const tipSelect = tipsDOM.inputTip;
        const fieldPeople = tipsDOM.inputPeople;

        field.value = "";
        fieldPeople.value = "";
        tipSelect.value = 5;
    },

    clearResults : () =>  {
        tipsDOM.displayBill.innerHTML = '';
        tipsDOM.displayTip.innerHTML = '';
        tipsDOM.displayTotal.innerHTML = '';
        tipsDOM.displayShare.innerHTML = '';
    },

    getPeople : () => {
       
        return {
        people : parseInt(tipsDOM.inputPeople.value)       
        };
    },

    displayShare : (share) => {
        const shareHtml = `£${share}`;

        tipsDOM.displayShare.insertAdjacentHTML('afterbegin',shareHtml);

    }
}