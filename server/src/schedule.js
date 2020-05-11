const schedule = require('node-schedule')

const { broadcastNewGame } = require('./connectionHandlers.js')

const rule = new schedule.RecurrenceRule()

rule.hour = new schedule.Range(0, 23)
rule.minute = 0

// Classic games
const { makeNewGame } = require('./gameTypes/classic.js')

/*let job =*/ schedule.scheduleJob(rule, async () => {
    const id = await makeNewGame()
    broadcastNewGame(id)
})
