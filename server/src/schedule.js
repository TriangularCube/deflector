const schedule = require('node-schedule')

let rule = new schedule.RecurrenceRule()

rule.hour = new schedule.Range(0, 23)
rule.minute = 0

const { makeNewGame } = require('./game')

let job = schedule.scheduleJob( rule, () => {
    makeNewGame()
    // TODO broadcast change
})
