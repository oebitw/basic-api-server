'use strict';

const uuid=require('uuid').v4;

class Clothes{

  constructor(){
    this.clothesDB=[];
    // [{id:, data: {name, type, ...}}]
  }

  read(id) {
    if (id) {
      return this.clothesDB.find((record) => record.id === id);
    } else {
      return this.clothesDB;
    }
  }

  create(obj) {
    const record = {
      id: uuid(),
      data: obj,
    };    
    this.clothesDB.push(record);
    return record;
  }

  delete(id) {
    this.clothesDB = this.clothesDB.filter((clothes) => clothes.id !== id);
    return this.clothesDB;
  }

  update(id, obj) {
    for (let i = 0; i < this.clothesDB.length; i++) {
      if (this.clothesDB[i].id === id) {
        this.clothesDB[i].data = obj;
        return this.clothesDB[i];
      }
    }
  }
}

module.exports = Clothes;
