var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    seq : Number,
    title : String,
    register : String
});

/*
Schema Type
=============
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
==============
*/

/*

*/

module.exports = mongoose.model("Board", boardSchema);