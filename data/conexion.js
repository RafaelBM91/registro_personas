import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/registro_personas');

mongoose.connection.on('connected', function () {  
  console.log('MONGODB CONECTADO');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('MONGODB error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('MONGODB DESCONECTADO'); 
});

export default mongoose;
