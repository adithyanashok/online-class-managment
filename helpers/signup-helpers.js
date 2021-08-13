var db = require('../config/connection')
var collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
var bcrypt = require('bcrypt')
module.exports = {

    addStudent: (studentData) => {
        return new Promise(async (resolve, reject) => {
            studentData.IdNumber = await bcrypt.hash(studentData.IdNumber, 10)
            db.get().collection(collection.STUDENT_COLLECTION).insertOne(studentData).then((data) => {
                console.log(data);
                resolve(data)
            })
        })
    }

}