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
const Clothes = require('../models/clothes.js');
const clothes = new Clothes();


///////////////////////
//// ROUTES    ///////
/////////////////////

//get (READ)
router.get('/', getClothesHandler);
router.get('/:id', validator, getClothesByIdHandler);

//post (CREATE)
router.post('/', createClothesHandler);

//put (UPDATE)
router.put('/:id', validator, updateClothesHandler);

//delete (DELETE)
router.delete('/:id', validator, deleteClothesHandler);




// http://localhost:3030/api/v1/clothes/

function getClothesHandler(req, res) {
  const resObj = clothes.read();
  if (resObj.length === 0) {
    res.json('No Data');
  } else{
    res.json(resObj);
  }
}


function getClothesByIdHandler(req, res) {
  const resObj = clothes.read(req.params.id);
  if (resObj){
    res.json(resObj);
  }else{
    throw new Error(`Invalid ID`);
  }   
}

function createClothesHandler(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.create(clothesObject);
  res.status(201).json(resObj);
}

function updateClothesHandler(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.update(req.params.id, clothesObject);
  if (resObj){
    res.json(resObj);
  } 
  else{
    throw new Error(`Invalid ID`);
  }
}

function deleteClothesHandler(req, res) {
  const resObj = clothes.delete(req.params.id);
  if (resObj.length === 0) {
    res.json('No Data');
  } else {
    res.json(resObj);
  } 
}


module.exports =router;