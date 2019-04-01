
let data = [];


export const tipCtrl = {

    calcTip(bill, tipValue){
        return (bill * tipValue) / 100;
    },

    calcTotal(bill, tip){
        const totalBill = bill + tip;
        data.push(totalBill);
        return totalBill;
    },

    calcShare(people){
        return data[0] / people;
    },

    clearData(){
        data = [];
    }
};
