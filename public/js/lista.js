$(document).ready(function(){

  $('header > div > div:nth-child(3) > span#fecha').html(
    'fecha: '+moment().format("DD-MM-YYYY")
  );

  $.post('/lista',function(data) {
    if (data.length) {
      for (i=0; i<data.length; i++) {
        $('<tr>'+
        '<td>'+data[i].cedula+'</td>'+
        '<td>'+data[i].nombre+'</td>'+
        '<td>'+data[i].apellido+'</td>'+
        '<td>'+data[i].edad+'</td>'+
        '<td>'+moment(data[i].nacimiento,'YYYY-MM-DD')
          .format('DD-MM-YYYY')+'</td>'+
        '<td>'+data[i].direccion+'</td>'+
        '<td>'+data[i].telefonos+'</td>'+
        '<td>'+data[i].hobbies+'</td>'+
        '</tr>').appendTo('tbody');
      }
    }
  });

});