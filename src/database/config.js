import mysql from 'mysql';

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_app",
});


export function execute(query, params = []){
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) =>{
            if(error){
                reject(error)
            }
            else{
                conn.query(query, params, (error, result) =>{
                    conn.release()
                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(result)
                    }
                })
            }
        })
    })
}


export default mysql