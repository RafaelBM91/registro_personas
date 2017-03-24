import Express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import mongoose from './data/database';

const Persona = mongoose.model('persona'); 

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
   Persona.findOne({ 'cedula': cedula })
    .exec((err, persona) => {
      if (!persona) {
        Persona.create({
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          nacimiento: nacimiento,
          direccion: direccion,
          telefonos: telefonos,
          hobbies: hobbies,
        },(err));
      } else {
        Persona.findOneAndUpdate({_id: persona._id},{
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          nacimiento: nacimiento,
          direccion: direccion,
          telefonos: telefonos,
          hobbies: hobbies,
        },(err) => {
          if (!err)
            console.log('editado');
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
  Persona.findOne({ 'cedula': cedula })
    .exec((err, persona) => {
      res.json( persona );
    });
});

/**
 * busca la lista de registrados
 */
app.post('/lista',(req, res) => {
  Persona.find({})
    .exec((err, personas) => {
      res.json( personas );
    });
});

/**
 * direccion registro de personal
 */
app.get('/',(req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

/**
 * direccion de lista de personal
 */
app.get('/lista',(req, res) => {
  res.sendFile(path.resolve("./views/lista.html"));
});

server.listen(3000,() => {
  console.log('produccion corriendo.!');
});
