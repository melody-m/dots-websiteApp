class Task {
    constructor(description, priority, id) {
        this.description = description,
        this.priority = priority,
        this.id = id
    }
} 

const data = {

    allPriorities : {
        prio1: [],
        prio2: [],
        prio3: []
    },
    
    totals : {
        prio1: 0,
        prio2: 0,
        prio3: 0
    }
}

export const taskCtrl = {

    addTask: (des,prio, type) => {
        let ID;

        // Create new ID
        if (data.allPriorities[type].length > 0) {
            ID = data.allPriorities[type][data.allPriorities[type].length -1].id + 1;

        }  else {
            ID = 0;
        };

        // Create new Object
        const newItem = new Task(des, prio, ID)

        //Create new item
        data.allPriorities[type].push(newItem);

        return newItem;
    },

    calcTotalPrio : (type) => {
               
        data.totals[type] = data.allPriorities[type].length;
        return  data.totals[type];
    },

    deleteTask : (id, type) => {
        
        //Create array of all IDs
        const ids = data.allPriorities[type].map((current) => {
            return current.id; 
        });

        const index = ids.indexOf(id);

        if (index !== -1) {
            data.allPriorities[type].splice(index, 1); 
        }
    },

    getTotalPrio : (type) => { 
        return  data.totals[type]; 
    }
}