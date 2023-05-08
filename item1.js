function showLogin() {
  var loginDiv = document.querySelector(".login");
  if (loginDiv.style.display === "none") {
    loginDiv.style.display = "block";
  } else {
    loginDiv.style.display = "none";
  }
}

// Item1

let today = new Date().toISOString().split("T")[0];
let inputs = document.getElementsByClassName("inputData");
Array.from(inputs).forEach(function (input) {
  input.defaultValue = today;
});

// Tăng giảm cộng trừ
const minusBtns = document.querySelectorAll("#minus-btn");
const plusBtns = document.querySelectorAll("#plus-btn");

let adultQuantity = 0;
let childQuantity = 0;
let babyQuantity = 0;

let client = [];
if (localStorage.getItem("client")) {
  client = JSON.parse(localStorage.getItem("client"));
}

minusBtns.forEach((minusBtn) => {
  minusBtn.addEventListener("click", (event) => {
    let target = event.target;
    let result = document.querySelector("#result");
    let childName = event.target
      .closest(".user-item")
      .querySelector(".user-option-childName");

    let parent = event.target.parentElement.previousElementSibling;
    let quantityElement = target.nextElementSibling;
    let quantity = parseInt(quantityElement.innerText);

    if (quantity > 1) {
      quantity -= 1;
      quantityElement.innerText = quantity;
    }
    if (childName.innerText === "Người lớn") {
      adultQuantity = quantity;
    } else if (childName.innerText === "Trẻ em") {
      childQuantity = quantity;
    } else {
      babyQuantity = quantity;
    }

    client = {
      adult: adultQuantity,
      child: childQuantity,
      baby: babyQuantity,
    };
    localStorage.setItem("client", JSON.stringify(client));
    if (adultQuantity > 0 || childQuantity > 0) {
      let totalQuantity = adultQuantity + childQuantity;

      let resultText = totalQuantity + " khách";
      if (adultQuantity > 0) {
        resultText += " (" + adultQuantity + " người lớn";
        if (childQuantity > 0) {
          resultText += ", " + childQuantity + " trẻ em)";
        } else {
          resultText += ")";
        }
      } else {
        resultText += " (" + childQuantity + " trẻ em)";
      }
      let result = document.querySelector("#result");
      result.innerHTML = resultText;
    } else if (babyQuantity > 0) {
      result.innerHTML = babyQuantity + " Em bé";
    } else {
      result.innerHTML = "";
    }
  });
});

plusBtns.forEach((plusBtn) => {
  plusBtn.addEventListener("click", (event) => {
    let childName = event.target
      .closest(".user-item")
      .querySelector(".user-option-childName");
    let target = event.currentTarget;
    let quantityElement = target.previousElementSibling;
    let quantity = parseInt(quantityElement.innerText);
    let result = document.querySelector("#result");
    quantity += 1;
    quantityElement.innerText = quantity;

    if (childName.innerText === "Người lớn") {
      adultQuantity = quantity;
    } else if (childName.innerText === "Trẻ em") {
      childQuantity = quantity;
    } else {
      babyQuantity = quantity;
    }
    // Lấy dữ liệu client cho vào localStorage

    client = {
      adult: adultQuantity,
      child: childQuantity,
      baby: babyQuantity,
    };
    localStorage.setItem("client", JSON.stringify(client));

    if (adultQuantity > 0 || childQuantity > 0) {
      let totalQuantity = adultQuantity + childQuantity;

      let resultText = totalQuantity + " khách";
      if (adultQuantity > 0) {
        resultText += " (" + adultQuantity + " người lớn";
        if (childQuantity > 0) {
          resultText += ", " + childQuantity + " trẻ em)";
        } else {
          resultText += ")";
        }
      } else {
        resultText += " (" + childQuantity + " trẻ em)";
      }
      let result = document.querySelector("#result");
      result.innerHTML = resultText;
    } else if (babyQuantity > 0) {
      result.innerHTML = babyQuantity + " Em bé";
    } else {
      result.innerHTML = "";
    }
  });
});
// Check cart
let currentCart = [];
if (localStorage.getItem("currentCart")) {
  currentCart = JSON.parse(localStorage.getItem("currentCart"));
}

let money_cart = document.getElementById("money");
money_cart.innerHTML = currentCart.price;
let service_money = document.getElementById("service_money");
let clear_money = document.getElementById("clear_money");
let result_text = document.getElementById("result-text");
let sum_money = document.getElementById("sum_money");

let inputData = document.getElementsByClassName("inputData");
let form = document.getElementById("extra-room");
let total = document.getElementById("total");

let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let item_img = document.querySelector(".main-img");
item_img.src = currentCart.img;
let name = document.getElementById("name");
name.innerHTML = currentCart.name;
let rating = document.getElementsByClassName("rating");
for (let i of rating) {
  i.innerHTML = currentCart.rating;
}
let address = document.getElementById("address");
address.innerHTML = currentCart.address;

form.onsubmit = function (event) {
  event.preventDefault();
  //   Lấy dữ liệu inputDate và outputDate cho vào localStorage
  let inputDataDate = [];
  if (localStorage.getItem("inputDataDate")) {
    inputDataDate = JSON.parse(localStorage.getItem("inputDataDate"));
  }
  let outputDataDate = [];
  if (localStorage.getItem("outputDataDate")) {
    outputDataDate = JSON.parse(localStorage.getItem("outputDataDate"));
  }

  let inputDate = new Date(form.themngay1.value);
  let outputDate = new Date(form.themngay2.value);
  inputDataDate = {
    day: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  outputDataDate = {
    day: outputDate.getDate(),
    month: outputDate.getMonth() + 1,
    year: outputDate.getFullYear(),
  };
  localStorage.setItem("inputDataDate", JSON.stringify(inputDataDate));
  localStorage.setItem("outputDataDate", JSON.stringify(outputDataDate));

  let newCart = [];
  if (localStorage.getItem("newCart")) {
    newCart = JSON.parse(localStorage.getItem("newCart"));
  }

  newCart = [...cart];
  newCart.forEach(function (item) {
    item.date = inputDate + " - " + outputDate;
  });
  localStorage.setItem("newCart", JSON.stringify(newCart));

  let timeDiff = Math.abs(outputDate.getTime() - inputDate.getTime());
  let diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24));

  let button = form.querySelector("button");
  let warning= document.getElementById("result-tex")
  if (diffDay > 0 && button.innerText !== "Đặt phòng") {
    service_money.innerText = 40 + "$";
    clear_money.innerText = 20 + "$";
    swal("Hiện tại vẫn còn phòng trống", "", "success");

    let btn_upload = document.createElement("button");
    btn_upload.innerText = "Đặt phòng";
    btn_upload.classList.add("w-100", "p-2", "mt-3");
    btn_upload.style.backgroundColor = "#FF385C";
    btn_upload.style.color="white"
    btn_upload.style.border="none"
    btn_upload.id = "btn_set";
    warning.style.display="block"
    button.parentNode.replaceChild(btn_upload, button);

    total.innerText =
      "$60 " +
      "/" +
      "đêm" +
      " * " +
      diffDay +
      "đêm" +
      " =" +
      parseInt(money_cart.innerText) * diffDay +
      "$";
    sum_money.innerText =
      parseInt(money_cart.innerText) * diffDay +
      parseInt(service_money.innerText) +
      parseInt(clear_money.innerText) +
      "$";

    let sum = [];
    if (localStorage.getItem("sum")) {
      sum = JSON.parse(localStorage.getItem("sum"));
    }
    let sumMoneyValue = parseFloat(sum_money.innerText);

    localStorage.setItem("sum", sumMoneyValue);

    let service_fee = [];
    if (localStorage.getItem("service_fee")) {
      service_fee = JSON.parse(localStorage.getItem("service_fee"));
    }
    let serviceMoneyValue =
      parseFloat(service_money.innerText) + parseFloat(clear_money.innerText);

    localStorage.setItem("service_fee", serviceMoneyValue);

    // Các loại tiền khi check xong
    let total_money = [];
    if (localStorage.getItem("total_money")) {
      total_money = localStorage.getItem("total_money");
    }
    total_money = {
      count_1dem: parseInt(money_cart.innerText),
      diffDays: diffDay,
      total_no_fee: parseInt(money_cart.innerText) * diffDay,
    };
    localStorage.setItem("total_money", JSON.stringify(total_money));
  } else if (diffDay > 0 && button.innerText === "Đặt phòng") {
    swal({
      title: "Bạn đã đặt phòng thành công!",
      icon: "success",
      timer: 5000,
    }).then((value) => {
      window.location.href = "checkcart.html";
    });

    let newCart = JSON.parse(localStorage.getItem("newCart"));
    let users = JSON.parse(localStorage.getItem("users"));
    let loginUser = JSON.parse(localStorage.getItem("loginUser"));
    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < users.length; i++) {
      if (
        loginUser.username === users[i].username &&
        loginUser.password === users[i].password
      )
        if (!users[i].cartItem.some((item) => item.id === newCart[0].id)) {
          users[i].cartItem.push(...newCart);
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("newCart", "");
    localStorage.setItem("cart", "");
  } else {
    swal("Chọn ngày sai rồi bạn ơi ", "Chọn lại đi bro", "error");
  }
};

let arrowUp = document.getElementById("arrow-up");
let userOption = document.querySelector(".user-option");

// Thay đổi hướng của Arrow
function toggleArrow() {
  let arrow = document.querySelector("#arrow-up");
  if (arrow.classList.contains("fa-arrow-up")) {
    arrow.classList.remove("fa-arrow-up");
    arrow.classList.add("fa-arrow-down");
  } else {
    arrow.classList.remove("fa-arrow-down");
    arrow.classList.add("fa-arrow-up");
  }
}
arrowUp.addEventListener("click", (e) => {
  toggleArrow();
  userOption.classList.toggle("hidden");
});

document.addEventListener("mousedown", (e) => {
  if (!userOption.contains(e.target) && e.target !== arrowUp) {
    userOption.classList.add("hidden");
    arrowUp.classList.remove("fa-arrow-down");
    arrowUp.classList.add("fa-arrow-up");
  }
});
