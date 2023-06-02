const express = require('express');
const app = express();
const cors = require('cors');
const { post_agregar, post_obtener, post_borrar, agregarLike } = require('./consultas');

app.use(express.json()) 
app.use(cors());

app.listen(3000, console.log("SERVIDOR ENCENDIDO EN EL PUERTO 3000"));

app.get('/posts', async (req, res) => {
    try {
    const posts = await post_obtener();
    res.json(posts);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

app.post('/posts', async (req, res) => {
    try {
    const { titulo, img, descripcion} = req.body

    if (!titulo ||!img ||!descripcion) {
        res.status(400).json('debe ingresar todos los campos');
     }  
    const resp = await post_agregar(titulo, img, descripcion)
    res.json({titulo, img, descripcion});
    res.send('Post agregado')
} catch (error) {
    res.status(500);
    }
});

app.put("/posts/like/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const like = await agregarLike(id);
      res.send(like);
    } catch (error) {
      console.error(error);
    }
  });

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await post_borrar(id)
        if (result.rowCount === 0) {
            res.status(404).send(error.message)
        } else {
            res.status(200).send({ message: "Post eliminado" })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});