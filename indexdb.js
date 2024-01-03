//import express from 'express'
import {connection} from './postgressql.js'
const express=require('express');
const { connection } = require('./postgressql');

const app=express();
const PORT=3002;

connection();

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);

});
