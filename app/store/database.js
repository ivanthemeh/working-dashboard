import r from 'rethinkdb';
import userStore from './userStore';
import scheduleStore from './scheduleStore';

let connection = null;
const dbConfig = {
    db: 'database',
    host: 'localhost',
    // host: '18.216.205.42',
    port: 28015
}

const connectToDb = () => {
    return new Promise((resolve, reject) => {
        r.connect({ db: dbConfig.db, host: dbConfig.host, port: dbConfig.port }, (err, conn) => {
            if (err) throw err && reject(err);
            resolve(conn);
        });
    })
}

connectToDb().then((conn) => {
    console.log('connected', conn);
    userStore.connectToChangesDB(conn);
    scheduleStore.connectToChangesDB(conn);
})

export default connection;