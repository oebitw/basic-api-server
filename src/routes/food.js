'use strict';

///////////////////////
//// Dependencies ////
/////////////////////

const express = require('express');
const router = express.Router();


///////////////////////
//// Imports      ////
/////////////////////

// Validator
const validator = require('../middleware/validator.js');


// Models
const Food = require('../models/food.js');
const food = new Food();


///////////////////////
//// ROUTES    ///////
/////////////////////

//get (READ)
router.get('/', getFoodHandler);
router.get('/:id', validator, getFoodByIdHandler);

//post (CREATE)
router.post('/', createFoodHandler);

//put (UPDATE)
router.put('/:id', validator, updateFoodHandler);

//delete (DELETE)
router.delete('/:id', validator, deleteFoodHandler);



//  localhost:3030/api/v1/clothes/
function getFoodHandler(req, res) {
  const resObj = food.read();
  if (resObj.length === 0) {
    res.json('No Data');
  } else{
    res.json(resObj);
  }
}


function getFoodByIdHandler(req, res) {
  const resObj = food.read(req.params.id);
  if (resObj){
    res.json(resObj);
  }else{
    throw new Error(`Invalid ID`);
  }   
}

function createFoodHandler(req, res) {
  const foodObject = req.body;
  const resObj = food.create(foodObject);
  res.status(201).json(resObj);
}

function updateFoodHandler(req, res) {
  const foodObject = req.body;
  const resObj = food.update(req.params.id, foodObject);
  if (resObj){
    res.json(resObj);
  } 
  else{
    throw new Error(`Invalid ID`);
  }
}

function deleteFoodHandler(req, res) {
  const resObj = food.delete(req.params.id);
  if (resObj.length === 0) {
    res.json('No Data');
  } else {
    res.json(resObj);
  } 
}


module.exports =router;