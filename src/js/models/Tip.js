
let data = [];


export const tipCtrl = {

    calcTip(bill, tipValue){

        const tip = (bill*tipValue)/100;
        return tip;
    },

    calcTotal(bill, tip){
        const totalBill = bill + tip;
        data.push(totalBill);
        return totalBill;
    },

    calcShare(people){
        const share = data[0]/people;
        return share;
    },

    clearData(){
        data = [];
        console.log(data);
    }
}
