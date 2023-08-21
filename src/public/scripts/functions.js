function showPassword() {
  var tipo = document.getElementById("password");
  var btnPassword = document.getElementById('btnPassword');

  if (tipo.type == "password") {
      tipo.type = "text";
      btnPassword.innerHTML = '<i class="fa-solid fa-eye"></i>'
  } else {
      tipo.type = "password";
      btnPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
  };
};