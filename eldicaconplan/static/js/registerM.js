let creates = document.querySelector("#create");
let close = document.querySelector("#close");
let closed = document.querySelector("#closed");
let update = document.querySelector("#update");
let modal = document.querySelector("#formato");
let Umodal = document.querySelector("#formatoE");
let newform = document.querySelector("#newform");
let forma = document.querySelector("#forma");
let volver = document.querySelector("#volver");
let closees = document.querySelector("#closees");


creates.addEventListener("click", function() {
  modal.style.display = "flex";
});

close.addEventListener("click", function() {
  modal.style.display = "none";
});

closed.addEventListener("click", function() {
  Umodal.style.display = "none";
});

newform.addEventListener("click", function () {
  modal.style.display = "none";
  forma.style.display = "flex";
});

volver.addEventListener("click", function () {
  modal.style.display = "flex";
  forma.style.display = "none";
});

closees.addEventListener("click", function () {
  forma.style.display = "none";
});


function searchMain() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var cards = document.querySelectorAll(".mainContent .cards");

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var h2 = card.querySelector(".info .h2");
    var searchText = h2.textContent.toLowerCase();

    var matchFound = searchText.includes(input);
    card.style.display = matchFound ? "block" : "none";
  }
}






update.addEventListener("click", () => {
  Umodal.style.display = "flex";
});

  

  /*let vista_preliminar = (event) => {
    let leer_img = new FileReader();
    let id_img = document.getElementById("img-foto");

    leer_img.onload = () => {
      if (leer_img.readyState == 2) {
        id_img.src = leer_img.result;
        id_img.style.display = "block";
      }
    };

    leer_img.readAsDataURL(event.target.files[0]);
  };*/
  

  window.onload = function () {
    document.getElementById("password1").onchange = validatePassword;
    document.getElementById("password2").onchange = validatePassword;
  };

  function validatePassword() {
    var pass2 = document.getElementById("password2").value;
    var pass1 = document.getElementById("password1").value;
    if (pass1 != pass2)
      document
        .getElementById("password2")
        .setCustomValidity("Las contraseñas no coinciden!!");
    else document.getElementById("password2").setCustomValidity("");
    //empty string means no validation error
  }


