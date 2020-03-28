const { AsyncNedb } = require('nedb-async')

const getDB = name => {
    const db = new AsyncNedb({ filename: `dbs/${name}.db`, autoload: true })

    // Auto Compaction
    db.persistence.setAutocompactionInterval(60 * 60 * 1000) // Minutes * Seconds * Milliseconds

    db.getHighestId = async () => {
        let id = null
        try {
            const highest = await db.asyncFindOne({}, [['sort', { _id: -1 }]])
            if (highest) {
                id = highest._id
            }
        } catch (err) {
            // Some sort of database error
        }

        return id
    }

    db.getNextId = async () => {
        const id = await db.getHighestId()
        return id ? id + 1 : 1
    }

    return db
}

module.exports = {
    getDB,
}
