let formModal = document.querySelector("#form_modal");
let usernameInput = document.querySelector("#username_signup");
let emailInput = document.querySelector("#email_signup");
let passwordInput = document.querySelector("#password_signup");

let users = [];
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}
let submitButton = formModal.querySelector(".btn-modal");

formModal.addEventListener("submit", function (event) {
  event.preventDefault();

  if (event.target.contains(submitButton)) {
    let isUsernameExist = users.some(
      (user) => user.username === usernameInput.value
    );
    if (isUsernameExist) {
      swal("Username đã có vui lòng nhập lại", " ", "error");
    } else if (usernameInput.value && emailInput.value && passwordInput.value) {
      let user = {
        id: Math.floor(Math.random() * 10000000),
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        cartItem: [],
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      formModal.reset();
      swal({
        title: "bạn đã đăng kí thành công!",
        icon: "success",
        timer : 2000
      }).then((value) => {
        window.location.href = "./page-login.html";
      });
    } else {
      if (event.target.nodeName !== "INPUT") {
        swal("Vui lòng nhập đủ thông tin", " ", "error");
      }
    }
  }
});
