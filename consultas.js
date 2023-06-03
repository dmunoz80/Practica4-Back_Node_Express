const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: '******',
    database: 'likeme',
    allowExitOnIdle: true
});

const post_agregar = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(consulta, values)
    return "Post agregado exitosamente!!"
}

const post_obtener = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

const agregarLike = async(id) => {
    const firstQuery = "SELECT likes FROM posts WHERE id = $1";
    const firstValues = [id];
    const firstResult = await pool.query(firstQuery, firstValues);
    const data = firstResult.rows[0];
    console.log(data)
    let like = data.likes + 1;
    const secondQuery = "UPDATE posts SET likes = $1 WHERE id = $2";
    const secondValue = [like, id];
    const secondResult = await pool.query(secondQuery, secondValue);
    return secondResult.rows[0];
}

const post_borrar = async(id) => {
    const query = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result;
}

module.exports = {
    post_agregar,
    post_obtener,
    agregarLike,
    post_borrar
}
