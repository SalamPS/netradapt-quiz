import mysql from 'mysql'

export const query = async (TYPE, COLUMN, TABLE, WHERE, JOIN) => {
  return new Promise((resolve, reject) => {
    let sql = ``
    switch (TYPE) {
      case 'SELECT': {
        JOIN = JOIN ? `${JOIN.map(join => ('JOIN ' + join + ' '))}`.replace(',','') : '';
        const WHERES = Object.keys(WHERE);
        WHERE=WHERES.map(key => (key + `='${WHERE[key]}' `));

        sql+=`SELECT ${COLUMN.join(', ')} FROM ${TABLE} AS ${TABLE[0]} `
        sql+= JOIN.length  ? `${JOIN}` : ''
        sql+= WHERES.length ? `WHERE ${WHERE.join('AND ')} ` : ''; 
      }
      break
      case 'INSERT': {
        // query('INSERT', {a1, a2}, 'TABLE')
        const COLS = Object.keys(COLUMN)
        sql+=`INSERT INTO ${TABLE} `
        sql+=`(${COLS.map(key => (key))}) VALUES `
        sql+=`(${COLS.map(key => (`'${COLUMN[key]}'`))})`; 
      }
      break
      case 'UPDATE': {
        const COLS = Object.keys(COLUMN)
        const WHERES = Object.keys(WHERE)
        WHERE=WHERES.map(key => (key + `='${WHERE[key]}' `))

        sql+=`UPDATE ${TABLE} SET `
        sql+=`${COLS.map(key => (`${key}='${COLUMN[key]}'`))} `
        sql+=`WHERE ${WHERE.join('AND ')} `; 
      }
      break
      case 'DELETE': {
        const WHERES = Object.keys(COLUMN)
        WHERE=WHERES.map(key => (key + `='${COLUMN[key]}' `))
        sql+=`DELETE FROM ${TABLE} `
        sql+=`WHERE ${WHERE.join('AND ')} `; 
      }
      break
    }

    const HOST = process.env.SQL_HOST || 'localhost';
    const USER = process.env.SQL_USER || 'user';
    const PASSWORD = process.env.SQL_PASSWORD || 'password';
    const DATABASE = process.env.SQL_DATABASE || 'database';
    const db = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });

    db.connect((err) => {
      if (err) reject({ message: "Koneksi ke database gagal", status: 500 });
    });

    db.query(sql, async (err, results) => {
      if (err) {
        console.error(err)
        reject({ message: "Error saat menjalankan query", status: 500 })
      }
      else resolve(results);
    });

    db.end((err) => {
      if (err) console.error('Error saat menutup koneksi:', err);
    });
  });
}