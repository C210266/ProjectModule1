let formModal = document.getElementById("formModal");

formModal.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = formModal.username.value;
  let password = formModal.password.value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loginUser = users.find((user) => user.username === username && user.password === password
  );

  if (loginUser) {
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    swal({
      title: "bạn đã đăng nhập thành công!",
      icon: "success",
      timer : 2000
    }).then((value) => {
      window.location.href = "./index.html";
    });

  } else {
    swal(
      "Đăng nhập không thành công",
      "Tên đăng nhập hoặc mật khẩu không đúng.",
      "error"
    );
  }
});

// Check xem dữ liệu nhập vào có trùng vào với dữ liệu data trong local ko
function checkUserLogin(username, password) {
  let loginUser = JSON.parse(localStorage.getItem("users")) || [];
  let result = loginUser.filter(
    (user) => user.username === username && user.password === password
  );
  if (result.length > 0) {
    return true;
  }
  return false;
}
