const ObjectId = require('mongodb').ObjectId;
const dbs = require('../dbs/index.js');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var data = {};
var url = 'mongodb://localhost:27017/WebDB';

const detail = async (id) => {

    // const results = await dbs.collection('San_pham').find({_id: ObjectId(id)})
    //     .toArray();
    // return results;

    //dbs.collection("San_pham").find({_id: ObjectId('5cd7df888d899652d46769c0')}).toArray(function(err, result) {
    // if (err) throw err;
    //data = result[0];
    //res.render('San_pham',{title: 'products.name', result});
    // console.log(result[0].name);
    //})
    var data3 = {};
    mongo.connect(url, {useNewUrlParser: true}, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var dbo = db.db();

        var data1 = dbo.collection("San_pham").find({});//.toArray();
        //return data1;
        var data2 = {};
        //res.render('San_pham',{title: 'products.name', data});
        //console.log(data);
        data1.forEach(row => {
            //console.log(row);
            data = row;

            //return row;
            console.log('data_1');
            console.log(data);
            //res.render('San_pham',{title: 'products.name', data});
        });
       // data3 = data2;
        console.log('data3');
         console.log(data3);
    });
   // data = data3;
   // console.log(data);
    //return data;
}
        exports.data = data;