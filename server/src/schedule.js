const schedule = require('node-schedule')

const { broadcastNewGame } = require('./connectionHandlers.js')

const rule = new schedule.RecurrenceRule()

rule.hour = new schedule.Range(0, 23)
rule.minute = 0

const { gameTypes } = require('./gameTypes/gameTypes.js')

/*let job =*/ schedule.scheduleJob(rule, async () => {
    for (const type of Object.values(gameTypes)) {
        await type.makeNewGame()
    }
    broadcastNewGame()
})
