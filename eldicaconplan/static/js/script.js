(function($) {
    "use strict";
    
    var path = window.location.href; 
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

function validateInput() {
    var input = document.getElementById("myInput");
    var errorMessage = document.getElementById("errorMessage");
    
    if (input.value === "") {
      input.classList.add("error");
      errorMessage.innerHTML = "Este campo es obligatorio.";
      errorMessage.classList.remove("hidden");
    } else {
      input.classList.remove("error");
      errorMessage.classList.add("hidden");
    }
  }
  