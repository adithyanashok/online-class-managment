var db = require('../config/connection')
var collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
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
    },
    // Delete Time Table
    deleteDay: (tableId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TIMETABLE_COLLECTION).remove({_id: objectId(tableId)}).then((response) => {
                console.log(response);
                resolve(response)
            })
        })
    },
    // Get Time Table Details
    getTimeTable: (tableId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TIMETABLE_COLLECTION).findOne({_id: objectId(tableId)}).then((timeTable) => {
                resolve(timeTable)
            })
        })
    },
    // Update Time Table
    updateTimeTable: (tableId, tableDetails) => {
        console.log("***"+tableId);
        console.log("********");
        console.log(tableDetails);
        console.log("********");
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TIMETABLE_COLLECTION)
            .updateOne({_id: objectId(tableId)},
            {
                $set: {
                    Day: tableDetails.Day,
                    FirstPeriod: tableDetails.FirstPeriod,
                    SecondPeriod: tableDetails.SecondPeriod,
                    ThirdPeriod: tableDetails.ThirdPeriod,
                    FourthPeriod: tableDetails.FourthPeriod,
                    FifthPeriod: tableDetails.FifthPeriod,
                    SixthPeriod: tableDetails.SixthPeriod,
                    
                }
            }
            ).then((response) => {
                resolve()
            })
        })
    }
}