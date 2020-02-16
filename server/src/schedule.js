const schedule = require('node-schedule')

let rule = new schedule.RecurrenceRule()

rule.hour = new schedule.Range(0, 23, 2)
rule.minute = 0

let job = schedule.scheduleJob( rule, () => {
    console.log('tick')
})
