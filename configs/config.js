require("dotenv").config()

const config = {
    dbUser: process.env.DBUSER,
    dbPass: process.env.DBPASS,
    dbCluster: process.env.DBCLUSTER,
}

module.exports = { config };