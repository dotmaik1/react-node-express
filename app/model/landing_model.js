let connectionPool = require('../config/database_config').connectionPool;


exports.test = () => {
    let statement = 'select * from dual'

    return connectionPool.query(statement)
}