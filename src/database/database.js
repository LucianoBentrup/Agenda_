import SQLite from 'react-native-sqlite-storage';

// Open the database
const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { console.log('Database opened'); },
    error => { console.log(error) }
);

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT);"
        );
    });
};

export const insertUser = (name, email, password, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Users (Name, Email, Password) VALUES (?,?,?)",
            [name, email, password],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            },
            error => {
                console.log(error);
                callback(false);
            }
        );
    });
};

export const verifyUser = (email, password, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM Users WHERE Email = ? AND Password = ?",
            [email, password],
            (tx, results) => {
                if (results.rows.length > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            },
            error => {
                console.log(error);
                callback(false);
            }
        );
    });
};
