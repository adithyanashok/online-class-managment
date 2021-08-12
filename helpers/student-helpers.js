var db = require('../config/connection')
var collection = require('../config/collection')
module.exports={

    addTimeTable: (timeTable, callback) => {
        console.log(timeTable);
        db.get().collection('timetable').insertOne(timeTable).then((data) => {
            console.log(data);
            callback(data)
        })
    },
    getAllTimeTable: () => {
        return new Promise(async (resolve, reject) => {
           let timetable = await db.get().collection(collection.TIMETABLE_COLLECTION).find().toArray()
               resolve(timetable)
            
        })
    }
}