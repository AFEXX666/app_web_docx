let submit = document.querySelector("#formato");
let send = document.querySelector("#formatoE");
let set = document.querySelector("#forma");

  //grados

$(document).ready(function () {
  $(document).on('click', '.action-button.updateGr', function() {
    var gradosId = $(this).data('grados-id');
    $('#idG').val(gradosId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editGgrado/' + gradosId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#NewGrado').val(response.nameGrado);
        console.log(response);
        // Update other form elements as needed
      },
      error: function() {
        // Handle the error if the request is not successful
        console.error('Error al obtener la información del grado.');
      }
    });
  });

  $('#tuFormularioGrEdit').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/gradoEdit', formData, function(response) {
      var responseData = $(response).find('#areas-container').html();
      $('#areas-container').empty().html(responseData);
      send.style.display = "none";
      Swal.fire({
        title: "El grado fue actualizado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).on('click', '.delete-grados-btns', function() {
    var grados = $(this).data('grados-id');
    var nombre = $(this).data('grados-nombre');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/grados/' + grados,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer este grado está siendo usado.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu archivo imaginario está a salvo :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioGr').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/grados', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "El usuario ya existe", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        submit.style.display = "none";
        Swal.fire({
          title: "El grado fue agregado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });
});
  
  //MAESTROS

$(document).ready(function () {
  $(document).on('click', '.action-button.updateMa', function() {
    var maestroId = $(this).data('maestro-id');
    $('#idMa').val(maestroId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editMaestro/' + maestroId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#newnombre').val(response.Nombres);
        $('#newapellido').val(response.Apellidos);
        $('#newcorreo').val(response.correo);
        $('#newusername').val(response.username);
        $('#newnumero').val(response.numero);
        $('#oldpassword1').val(response.password);

        var selectedCarreraId = response.idCarrera;
        var carreraName = response.carreraName;
    
        $('#carrer').val(selectedCarreraId).text(carreraName);

        var selectedGrupoId = response.idGrupo;
        var grupoName = response.cuatrimestre+' '+response.nombre+' '+response.nombre_area;
    
        $('#newgrupo').val(selectedGrupoId).text(grupoName);
        console.log(response);
      },
      error: function() {
        console.error('Error al obtener la información de carrera.');
      }
    });    
  });

  $('#tuFormularioMaEdit').submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var selectedGrupoId = $('#newgrupo').val();
  
    if (selectedGrupoId === null) {
      selectedGrupoId = $('#newgrupo').attr('value');
    }
    formData += '&txtgrupo=' + selectedGrupoId;
    var pass1 = $("#newpassword1").val();
    var pass2 = $("#newpassword2").val();

    if (pass1 !== pass2) {
      $("#newtextpass").text("Las contraseñas no coinciden");
    } else {
      $("#newtextpass").text("");

      $.post('/maestroEdit', formData, function (response) {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        send.style.display = "none";
        Swal.fire({
          title: "El maestro fue actualizada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }).fail(function (xhr, status, error) {
        console.error(error);
      });
    }
  });

  $(document).on('click', '.delete-maestro-btns', function() {
    var maestro = $(this).data('maestro-id');
    var nombre = $(this).data('maestro-name');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar el maestro '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/maestroDelete/' + maestro,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer este maestro está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioMa').submit(function(event) {
    event.preventDefault();


    var pass1 = $("#password1").val();
    var pass2 = $("#password2").val();

    if (pass1 !== pass2) {
      $("#textpass").text("Las contraseñas no coinciden");
    } else {
      $("#textpass").text("");

      // Realizar el envío del formulario
      var formData = $(this).serialize();
      $.post('/maestrosR', formData, function(response) {
        if (response.status === 'success') {
          Swal.fire("Error", "El maestro ya existe", "error");
        } else {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          submit.style.display = "none";
          Swal.fire({
            title: "El maestro fue agregado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    }
  });
});

  
  //MATERIAS

  $(document).ready(function () {
    $(document).on('click', '.action-button.updateMt', function() {
      var materiaId = $(this).data('materia-id');
      $('#idMt').val(materiaId);
      send.style.display = "flex";
  
      // Realize a request to get the grado data
      $.ajax({
        type: "GET",
        url: '/editmateria/' + materiaId,
        dataType: "json",
        success: function(response) {
          // Update the form elements based on the response data
          $('#newnombre').val(response.nombre_materia);

          var selectedMaestroId = response.idMaestro;
          var maestroName = response.nombre_maestro + ' ' + response.apellidos_maestro;
      
          $('#newmaestro').val(selectedMaestroId).text(maestroName);


          console.log(response)
        },
        error: function() {
          console.error('Error al obtener la información de carrera.');
        }
      });    
    });
  
    $('#tuFormularioMTEdit').submit(function(event) {
      event.preventDefault();
  
      var formData = $(this).serialize();
  

      var selectedMaestroId = $('#newmaestro').val();
  
      if (selectedMaestroId === null) {
        selectedMaestroId = $('#newmaestro').attr('value');
      }
  
      formData += '&txtmaestro=' + selectedMaestroId;

        $.post('/materiasEdit', formData, function (response) {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          send.style.display = "none";
          Swal.fire({
            title: "La materia fue actualizada correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }).fail(function (xhr, status, error) {
          console.error(error);
        });
    });
  
    $(document).on('click', '.delete-materia-btns', function() {
      var materia = $(this).data('materia-id');
      var nombre = $(this).data('materia-name');
      var $button = $(this);
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que quieres borrar la materia de '+nombre+'?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrarlo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "GET",
            url: '/delete_materia/' + materia,
            success: function(response) {
              var responseData = $(response).find('#areas-container').html();
              $('#areas-container').empty().html(responseData);
  
              $button.closest('.areas-container').remove();
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                 nombre+' ha sido eliminado.',
                'success'
              );
            },
            error: function() {
              swalWithBootstrapButtons.fire(
                'Error',
                'Ocurrió un error al parecer esta materia está siendo usada.',
                'error'
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            nombre+' no ha sido eliminado :)',
            'error'
          );
        }
      });
    });
  
    $('#tuFormularioMT').submit(function(event) {
      event.preventDefault();
        // Realizar el envío del formulario
        var formData = $(this).serialize();
        $.post('/materiasAdd', formData, function(response) {
          if (response.status === 'success') {
            Swal.fire("Error", "La materia ya existe", "error");
          } else {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);
            submit.style.display = "none";
            Swal.fire({
              title: "La materia fue agregado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }).fail(function(xhr, status, error) {
          console.error(error);
        });
    });
  });
  
  
  //Edificios

  $(document).ready(function () {
    $(document).on('click', '.action-button.updateEd', function() {
      var edificioId = $(this).data('edificios-id');
      $('#idE').val(edificioId);
      send.style.display = "flex";
  
      // Realize a request to get the grado data
      $.ajax({
        type: "GET",
        url: '/editEdificio/' + edificioId,
        dataType: "json",
        success: function(response) {
          // Update the form elements based on the response data
          $('#NewEdificio').val(response.nameE);
          console.log(response);
          // Update other form elements as needed
        },
        error: function() {
          // Handle the error if the request is not successful
          console.error('Error al obtener la información del grado.');
        }
      });
    });
  
    $('#tuFormularioEd').submit(function(event) {
      event.preventDefault();
  
      var formData = $(this).serialize();
  
      $.post('/EdificioEdit', formData, function(response) {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        send.style.display = "none";
        Swal.fire({
          title: "El edificio fue actualizado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    });
  
    $(document).on('click', '.delete-edificio-btns', function() {
      var edificio = $(this).data('edificios-id');
      var nombre = $(this).data('edificios-name');
      var $button = $(this);
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que quieres borrar el edificio '+nombre+'?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrarlo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "GET",
            url: '/delete_edificio/' + edificio,
            success: function(response) {
              var responseData = $(response).find('#areas-container').html();
              $('#areas-container').empty().html(responseData);
  
              $button.closest('.areas-container').remove();
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                 nombre+' ha sido eliminado.',
                'success'
              );
            },
            error: function() {
              swalWithBootstrapButtons.fire(
                'Error',
                'Ocurrió un error al parecer este grado está siendo usado.',
                'error'
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            nombre+' no se ha eliminado :)',
            'error'
          );
        }
      });
    });
  
    $('#tuFormularioAg').submit(function(event) {
      event.preventDefault();
  
      var formData = $(this).serialize();
  
      $.post('/edificio', formData, function(response) {
        if (response.status === 'success') {
          Swal.fire("Error", "El usuario ya existe", "error");
        } else {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          submit.style.display = "none";
          Swal.fire({
            title: "El grado fue agregado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    });
  });
  

//Especialidades
  
$(document).ready(function () {
  $(document).on('click', '.action-button.updateEs', function() {
    var areaId = $(this).data('area-id');
    $('#idAr').val(areaId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editarea/' + areaId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#newnombre').val(response.aName);

        var selectedCarreraId = response.idCarrera;

        var carreraName = response.carreraName;
    
        $('#carrer').val(selectedCarreraId).text(carreraName);
        console.log(response);
        // Update other form elements as needed
      },
      error: function() {
        // Handle the error if the request is not successful
        console.error('Error al obtener la información del grado.');
      }
    });    
  });

  $('#tuFormularioAredit').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    var selectedCarreraId = $('#carrer').val();
    if (selectedCarreraId === null) {
      selectedCarreraId = $('#carrera').attr('value');
    }

    formData += '&txtcarrera=' + selectedCarreraId;

    $.post('/areaEdit', formData, function(response) {
      var responseData = $(response).find('#areas-container').html();
      $('#areas-container').empty().html(responseData);
      send.style.display = "none";
      Swal.fire({
        title: "El area fue actualizada correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).on('click', '.delete-area-btns', function() {
    var area = $(this).data('area-id');
    var nombre = $(this).data('area-name');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar la area de '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/area/' + area,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer esta area está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioAr').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/area', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "El area ya existe", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        submit.style.display = "none";
        Swal.fire({
          title: "El area fue agregado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });
});
  
//carrera

$(document).ready(function () {
  $(document).on('click', '.action-button.updateCa', function() {
    var carreraId = $(this).data('carrera-id');
    $('#idCa').val(carreraId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editcarrera/' + carreraId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#newnombre').val(response.carreraName);

        var selectedGradoId = response.idGrado;
        var gradoName = response.nameGrado;
    
        $('#grado').val(selectedGradoId).text(gradoName);

        var selectedEdificioId = response.idedificio;
        var edificioName = response.nameE;
        //console.log(nameE)
    
        $('#edificio').val(selectedEdificioId).text(edificioName);
        console.log(response);
        // Update other form elements as needed
      },
      error: function() {
        // Handle the error if the request is not successful
        console.error('Error al obtener la información de carrera.');
      }
    });    
  });

  $('#tuFormularioCaEdit').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    var selectedGradoId = $('#grado').val();
    var selectedEdificioId = $('#edificio').val();

    if (selectedEdificioId === null) {
      selectedEdificioId = $('#edificio').attr('value');
    }

    if (selectedGradoId === null) {
      selectedGradoId = $('#grado').attr('value');
    }

    formData += '&txtedificio=' + selectedEdificioId;
    formData += '&txtGrado=' + selectedGradoId;

    $.post('/carreraedit', formData, function(response) {
      var responseData = $(response).find('#areas-container').html();
      $('#areas-container').empty().html(responseData);
      send.style.display = "none";
      Swal.fire({
        title: "La carrera fue actualizada correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).on('click', '.delete-carrera-btns', function() {
    var carrera = $(this).data('carrera-id');
    var nombre = $(this).data('carrera-name');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar la carrera de '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/carrera/' + carrera,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer esta carrera está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioCa').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/carrera', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "La carrera ya existe", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        submit.style.display = "none";
        Swal.fire({
          title: "La carrera fue agregado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });
});

//Admin

$(document).ready(function () {
  $(document).on('click', '.action-button.updateAd', function() {
    var adminId = $(this).data('admin-id');
    $('#idAd').val(adminId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editadmin/' + adminId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#newnombre').val(response.Nombres);
        $('#newapellido').val(response.Apellidos);
        $('#newcorreo').val(response.correo);
        $('#newusername').val(response.username);
        $('#newnumero').val(response.numero);
        $('#oldpassword1').val(response.password);

        var selectedCarreraId = response.idCarrera;
        var carreraName = response.carreraName;
    
        $('#carrer').val(selectedCarreraId).text(carreraName);
        console.log(response);
      },
      error: function() {
        console.error('Error al obtener la información de carrera.');
      }
    });    
  });

  $('#tuFormularioAdEdit').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    var selectedCarreraId = $('#carrer').val();

    if (selectedCarreraId === null) {
      selectedCarreraId = $('#carrer').attr('value');
    }

    formData += '&txtcarrera=' + selectedCarreraId;

    var pass1 = $("#newpassword1").val();
    var pass2 = $("#newpassword2").val();

    if (pass1 !== pass2) {
      $("#newtextpass").text("Las contraseñas no coinciden");
    } else {
      $("#newtextpass").text("");

      $.post('/adminedit', formData, function (response) {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        send.style.display = "none";
        Swal.fire({
          title: "El admin fue actualizada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }).fail(function (xhr, status, error) {
        console.error(error);
      });
    }
  });

  $(document).on('click', '.delete-admin-btns', function() {
    var admin = $(this).data('admin-id');
    var nombre = $(this).data('admin-name');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar el admin de '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/admin/' + admin,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer esta carrera está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioAd').submit(function(event) {
    event.preventDefault();


    var pass1 = $("#password1").val();
    var pass2 = $("#password2").val();

    if (pass1 !== pass2) {
      $("#textpass").text("Las contraseñas no coinciden");
    } else {
      $("#textpass").text("");

      // Realizar el envío del formulario
      var formData = $(this).serialize();
      $.post('/admin', formData, function(response) {
        if (response.status === 'success') {
          Swal.fire("Error", "El admin ya existe", "error");
        } else {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          submit.style.display = "none";
          Swal.fire({
            title: "El admin fue agregado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    }
  });
});

//grupos

$(document).ready(function () {
  $(document).on('click', '.action-button.updateGp', function() {
    var GrupoId = $(this).data('grupo-id');
    $('#idGp').val(GrupoId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editgrupo/' + GrupoId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#newnombre').val(response.nombre);
        $('#newcuatri').val(response.cuatrimestre);

        var selectedAreaId = response.idArea;
        var AreaName = response.nombreArea;
    
        $('#areas').val(selectedAreaId).text(AreaName);

        var selectedGradoId = response.idGrado;
        var GradoName = response.nombreGrado;
    
        $('#grados').val(selectedGradoId).text(GradoName);
        console.log(response);
        // Update other form elements as needed
      },
      error: function() {
        // Handle the error if the request is not successful
        console.error('Error al obtener la información de carrera.');
      }
    });    
  });

  $('#tuFormularioGpEdit').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    var selectedGradosId = $('#grados').val();
    var selectedAreaId = $('#areas').val();

    if (selectedAreaId === null) {
      selectedAreaId = $('#area').attr('value');
    }
    if (selectedGradosId === null) {
      selectedGradosId = $('#area').attr('value');
    }

    formData += '&txtArea=' + selectedAreaId;
    formData += '&txtGrado=' + selectedGradosId;

    $.post('/grupoedit', formData, function(response) {
      var responseData = $(response).find('#areas-container').html();
      $('#areas-container').empty().html(responseData);
      send.style.display = "none";
      Swal.fire({
        title: "El grupo fue actualizada correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).on('click', '.delete-grupo-btns', function() {
    var grupo = $(this).data('grupo-id');
    var nombre = $(this).data('grupo-name');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar el grupo '+nombre+'?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/grupos/' + grupo,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               nombre+' ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer este grupo está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#tuFormularioGp').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/grupoA', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "El grupo ya existe", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        submit.style.display = "none";
        Swal.fire({
          title: "El grupo fue agregado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });
});


//Plantilla

$(document).ready(function () {
  $(document).on('click', '.action-button.updatePt', function() {
    var plantillaId = $(this).data('plantilla-id');
    $('#idPt').val(plantillaId);
    send.style.display = "flex";

    // Realize a request to get the grado data
    $.ajax({
      type: "GET",
      url: '/editPlantilla/' + plantillaId,
      dataType: "json",
      success: function(response) {
        // Update the form elements based on the response data
        $('#oldnewnombre').val(response.plantilla);

        var selectedMaestro1Id = response.idM1;
        var Maestro1Name = response.Nombres_maestro1;
    
        $('#newmaestro1').val(selectedMaestro1Id).text(Maestro1Name);

        if (response.Nombres_maestro2 != NULL && response.idM2 != NULL) {
          var selectedMaestro2Id = response.idM2;
          var Maestro2Name = response.Nombres_maestro2;
    
          $('#newmaestro2').val(selectedMaestro2Id).text(Maestro2Name);
        }

        if (response.Nombres_maestro3 != NULL && response.idM3 != NULL) {
          var selectedMaestro3Id = response.idM3;
          var Maestro3Name = response.Nombres_maestro3;
        
          $('#newmaestro3').val(selectedMaestro3Id).text(Maestro3Name);
        }
        
        var selectedMateriaId = response.idMa;
        var MateriaName = response.Nombres_materia;
    
        $('#newmateria').val(selectedMateriaId).text(MateriaName);
        console.log(response);
      },
      error: function() {
        console.error('Error al obtener la información de carrera.');
      }
    });    
  });

  $('#formPlantillaEdit').submit(function(event) {
    event.preventDefault();
    send.style.display = "none";
    // Muestra la alerta de carga antes de enviar la request
    var loadingAlert = Swal.fire({
      title: 'Cargando...',
      html: 'Esto podria tardar menos de 5 min. Por favor, espere...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    var formData = new FormData(this);

    var selectedMaestro1Id = $('#newmaestro1').val();
    var selectedMaestro2Id = $('#newmaestro2').val();
    var selectedMaestro3Id = $('#newmaestro3').val();
    var selectedMateriaId = $('#newmateria').val();

    if (selectedMaestro1Id === null) {
      selectedMaestro1Id = $('#newmaestro1').attr('value');
    }
    if (selectedMaestro2Id === null) {
      selectedMaestro2Id = $('#newmaestro2').attr('value');
    }
    if (selectedMaestro3Id === null) {
      selectedMaestro3Id = $('#newmaestro3').attr('value');
    }
    if (selectedMateriaId === null) {
      selectedMateriaId = $('#newmateria').attr('value');
    }

    formData.append('txtmaestroone', selectedMaestro1Id);
    formData.append('txtmaestrotwo', selectedMaestro2Id);
    formData.append('txtmaestrothree', selectedMaestro3Id);
    formData.append('txtmateria', selectedMateriaId);

    $.ajax({
      url: '/plantillaedit',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        // Cierra la alerta de carga cuando la request se completa con éxito
        loadingAlert.close();

        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);

        Swal.fire({
          title: "La plantilla fue actualizada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      },
      error: function(xhr, status, error) {
        // Cierra la alerta de carga en caso de error
        loadingAlert.close();
        console.error(error);
      }
    });
  });

  $(document).on('click', '.delete-plantilla-btns', function() {
    var plantilla = $(this).data('plantilla-id');
    var $button = $(this);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres borrar la plantilla?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: '/plantilla/' + plantilla,
          success: function(response) {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);

            $button.closest('.areas-container').remove();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
               'El archivo ha sido eliminado.',
              'success'
            );
          },
          error: function() {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al parecer esta plantilla está siendo usada.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          nombre+' no ha sido eliminado :)',
          'error'
        );
      }
    });
  });

  $('#formPlantilla').submit(function(event) {
    event.preventDefault();
  
    // Crea un objeto FormData
    var formData = new FormData(this);
    set.style.display = "none";
    // Muestra la alerta de carga antes de enviar la request
    var loadingAlert = Swal.fire({
      title: 'Cargando...',
      html: 'Por favor, espere...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    // Realiza la request usando AJAX
    $.ajax({
      url: '/plantillaA',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        // Cierra la alerta de carga cuando la request se completa con éxito
        loadingAlert.close();
  
        if (response.status === 'success') {
          Swal.fire("Error", "La plantilla ya existe", "error");
        } else {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          Swal.fire({
            title: "La plantilla fue asignada correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      },
      error: function(xhr, status, error) {
        // Cierra la alerta de carga en caso de error
        loadingAlert.close();
        console.error(error);
      }
    });
  });  
});


//filtro

$(document).ready(function () {
  var requestDone = true; 

  $('#tuFormularioFi').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/filtro', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "La filtracion fallo", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);

        if (requestDone) {
          var icono = document.createElement("i");
          icono.classList.add("fa-solid", "fa-arrow-left"); 


          icono.id = "icono-filtrar";
          $('#iconos').prepend(icono);
          requestDone = false; 
        }

        submit.style.display = "none";
        Swal.fire({
          title: "Se filtro correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).off('click', '#icono-filtrar').on('click', '#icono-filtrar', function() {
    if (!requestDone) { 
      $.get('/home_admin', function(response) {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        
        $('#icono-filtrar').remove(); 
        requestDone = true; 
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    }
  });
});


$(document).ready(function () {
  var requestDone = true; 

  $('#tuFormularioFiAD').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.post('/filtro_admin', formData, function(response) {
      if (response.status === 'success') {
        Swal.fire("Error", "La filtracion fallo", "error");
      } else {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);

        if (requestDone) {
          var icono = document.createElement("i");
          icono.classList.add("fa-solid", "fa-arrow-left"); 


          icono.id = "icono-filtrar";
          $('#iconos').prepend(icono);
          requestDone = false; 
        }

        submit.style.display = "none";
        Swal.fire({
          title: "Se filtro correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }).fail(function(xhr, status, error) {
      console.error(error);
    });
  });

  $(document).off('click', '#icono-filtrar').on('click', '#icono-filtrar', function() {
    if (!requestDone) { 
      $.get('/home_sadmin', function(response) {
        var responseData = $(response).find('#areas-container').html();
        $('#areas-container').empty().html(responseData);
        
        $('#icono-filtrar').remove(); 
        requestDone = true; 
      }).fail(function(xhr, status, error) {
        console.error(error);
      });
    }
  });
});


//ALUMNOS

  $(document).ready(function () {
    $(document).on('click', '.action-button.updateAl', function() {
      var maestroId = $(this).data('alumno-id');
      $('#idAl').val(maestroId);
      send.style.display = "flex";
  
      // Realize a request to get the grado data
      $.ajax({
        type: "GET",
        url: '/editAlumnos/' + maestroId,
        dataType: "json",
        success: function(response) {
          // Update the form elements based on the response data
          $('#newnombre').val(response.names);
          $('#newapellidoP').val(response.lastnameP);
          $('#newcorreo').val(response.matricula);
          $('#newapellidoM').val(response.lastnameM);
  
  
          var selectedGrupoId = response.idGrupo;
          var grupoName = response.cuatrimestre+' '+response.nombre+' '+response.nombre_area;
      
          $('#newgrupo').val(selectedGrupoId).text(grupoName);
          console.log(response);
        },
        error: function() {
          console.error('Error al obtener la información de carrera.');
        }
      });    
    });
  
    $('#tuFormularioAlEdit').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      var selectedGrupoId = $('#newgrupo').val();
    
      if (selectedGrupoId === null) {
        selectedGrupoId = $('#newgrupo').attr('value');
      }
      formData += '&txtgrupo=' + selectedGrupoId;
  
        $.post('/alumnoEdit', formData, function (response) {
          var responseData = $(response).find('#areas-container').html();
          $('#areas-container').empty().html(responseData);
          send.style.display = "none";
          Swal.fire({
            title: "El alumno fue actualizada correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }).fail(function (xhr, status, error) {
          console.error(error);
        });
    });
  
    $(document).on('click', '.delete-alumno-btns', function() {
      var maestro = $(this).data('alumno-id');
      var nombre = $(this).data('alumno-name');
      var $button = $(this);
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que quieres borrar el alumno '+nombre+'?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrarlo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "GET",
            url: '/alumnoDelete/' + maestro,
            success: function(response) {
              var responseData = $(response).find('#areas-container').html();
              $('#areas-container').empty().html(responseData);
  
              $button.closest('.areas-container').remove();
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                 nombre+' ha sido eliminado.',
                'success'
              );
            },
            error: function() {
              swalWithBootstrapButtons.fire(
                'Error',
                'Ocurrió un error al parecer este alumno está siendo usada.',
                'error'
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            nombre+' no ha sido eliminado :)',
            'error'
          );
        }
      });
    });
  
    $('#tuFormularioAl').submit(function(event) {
      event.preventDefault();
    
      var formData = new FormData(this);

      $.ajax({
        url: '/alumnosAdd',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          if (response.status === 'success') {
            Swal.fire("Error", "Los alumnos ya existen", "error");
          } else {
            var responseData = $(response).find('#areas-container').html();
            $('#areas-container').empty().html(responseData);
            submit.style.display = "none";
            Swal.fire({
              title: "Los alumnos fueron agregados correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        },
        error: function(xhr, status, error) {
          console.error(error);
        }
      });
    });    
  });
  