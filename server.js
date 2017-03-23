import Express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import models from './data/database';

const app = Express();
const server = http.Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static("public"));

/**
 * crea un nuevo registro o edita uno existente
 */
app.post('/nuevo',(req, res) => {
  let {
    cedula,
    nombre,
    apellido,
    edad,
    nacimiento,
    direccion,
    telefonos,
    hobbies } = req.body;
  models.persona.findOne({where: {cedula: cedula} })
    .then((objeto) => {
      if (objeto) {
        objeto.update({
          nombre,
          apellido,
          edad,
          nacimiento,
          direccion,
          telefonos,
          hobbies});
      } else {
        models.persona.create({
          cedula,
          nombre,
          apellido,
          edad,
          nacimiento,
          direccion,
          telefonos,
          hobbies
        });
      }
    });
  res.redirect("/");
});

/**
 * busca la informacion por la cedula
 */
app.post('/cedula',(req, res) => {
  let { cedula } = req.body;
  models.persona.findOne({where: {cedula: cedula} })
    .then(result => {
      res.json( result );
    });
});

/**
 * busca la lista de registrados
 */
app.post('/lista',(req, res) => {
  models.persona.findAll({})
    .then(result => {
      res.json( result );
    });
});

/**
 * direccion registro de personal
 */
app.get('/',(req, res) => {
  res.sendfile(path.resolve("./views/index.html"));
});

/**
 * direccion de lista de personal
 */
app.get('/lista',(req, res) => {
  res.sendfile(path.resolve("./views/lista.html"));
});

server.listen(3000,() => {
  console.log('produccion corriendo.!');
});
