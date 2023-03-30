window.addEventListener('load', function () {
  let password = document.querySelector("#password");
  let togglePassword = document.querySelector("#togglePassword");

  togglePassword.addEventListener("click", function () {

    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle("bi-eye");
  });

})