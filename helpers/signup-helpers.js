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
    },
    getAllStudents: () => {
        return new Promise( async(resolve, reject) => {
            let students = await db.get().collection(collection.STUDENT_COLLECTION).find().toArray()
            resolve(students)
        })
    },
    studentsLogin: (studentDetails) => {
        console.log(studentDetails);
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let student = await db.get().collection(collection.STUDENT_COLLECTION).findOne({StudentName: studentDetails.StudentName})
            console.log(student);
            if(student){
                bcrypt.compare(studentDetails.IdNumber, student.IdNumber).then((status) => {
                    if(status){
                        console.log("Login Success");
                        response.student = student;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log("login Failed");
                        resolve({status: false})
                    }
                })
            }else {
                console.log("login Failed");
                 resolve({status: false})
            }
        })
    }
    

}