var db = require('../config/connection')
module.exports={

    addTimeTable: (timeTable, callback) => {
        console.log(timeTable);
        db.get().collection('timetable').insertOne(timeTable).then((data) => {
            console.log(data);
            callback(true)
        })
    }
}