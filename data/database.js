import mongoose from './conexion';

const PersonaSchema = new mongoose.Schema({
  cedula:  String,
  nombre: String,
  apellido: String,
  edad: Number,
  nacimiento: Date,
  direccion: String,
  telefonos: String,
  hobbies: String,
});

const Persona = mongoose.model('persona', PersonaSchema);

export default mongoose;
