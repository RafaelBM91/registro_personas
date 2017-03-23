jQuery.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}

$(document).ready(function(){

  $('header > div > div:nth-child(3) > span#fecha').html(
    'fecha: '+moment().format("DD-MM-YYYY")
  );

  $('*').attr('autocomplete','off');

  $('input#cedula').keypress(function(e) {
    if (e.charCode === 13) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({cedula: $(this).val()}),
        contentType: 'application/json',
        url: 'http://localhost:3000/cedula',
        success: function(data) {
          if (data) {
            $('input#cedula').attr('readonly','readonly');
            $('input#nombre').val(data.nombre);
            $('input#apellido').val(data.apellido);
            $('input#edad').val(data.edad);
            $('input#nacimiento').val(
              moment(data.nacimiento,"YYYY-MM-DD")
                .format("YYYY-MM-DD"));
            $('input#direccion').val(data.direccion);
            $('input#telefonos').val(data.telefonos);
            $('input#hobbies').val(data.hobbies);
          }
        }
      });
    }
  });

  $('input#cancelar').click(function(e) {
    $('input#cedula').removeAttr('readonly');
    $('input#cedula').focus();
    $('form').reset();
  });

});