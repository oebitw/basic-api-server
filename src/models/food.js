'use strict';

'use strict';

const uuid=require('uuid').v4;

class Food{

  constructor(){
    this.foodDB=[];
    // [{id:, data: {name, type, ...}}]
  }

  read(id) {
    if (id) {
      return this.foodDB.find((record) => record.id === id);
    } else {
      return this.foodDB;
    }
  }

  create(obj) {
    const record = {
      id: uuid(),
      data: obj,
    };    
    this.foodDB.push(record);
    return record;
  }

  delete(id) {
    this.foodDB = this.foodDB.filter((food) => food.id !== id);
    return this.foodDB;
  }

  update(id, obj) {
    for (let i = 0; i < this.foodDB.length; i++) {
      if (this.foodDB[i].id === id) {
        this.foodDB[i].data = obj;
        return this.foodDB[i];
      }
    }
  }
}

module.exports = Food;
