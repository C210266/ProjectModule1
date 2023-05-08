function toggleHeart(heart) {
  heart.classList.toggle("far");
  heart.classList.toggle("fas");
}

function showLogin() {
  var loginDiv = document.querySelector(".login");
  if (loginDiv.style.display === "none") {
    loginDiv.style.display = "block";
  } else {
    loginDiv.style.display = "none";
  }
}
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function showModal() {
  document.getElementById("id01").style.display = "block";
  document.getElementById("id01").style.zIndex = "1000000000000";
}
function showModalRegister() {
  document.getElementById("id02").style.display = "block";
  document.getElementById("id02").style.zIndex = "1000000000000";
}

// Order details

let items = document.querySelectorAll(".item img");

let image = "";
if (localStorage.getItem("image")) {
  image = JSON.parse(localStorage.getItem("image"));
}

items.forEach(function (item) {
  item.addEventListener("click", function (e) {
    localStorage.setItem("image", JSON.stringify(item.src));
    image = item.src;
  });
});

let rating = document.querySelector(".rating");
let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let currentCart = [];
if (localStorage.getItem("currentCart")) {
  currentCart = JSON.parse(localStorage.getItem("currentCart"));
}

let itemsContents = [];
if (localStorage.getItem("itemsContents")) {
  itemsContents = JSON.parse(localStorage.getItem("itemsContents"));
}

let itemChild = document.querySelectorAll(".item");

// itemChild.forEach((item) => {
//   let imgSrc = item.querySelector("img").src;

  
//   let itemContent = itemsContents.find((content) => content.tourImg === imgSrc);
  
//   if (itemContent) {
//     item.querySelector("#title").innerText = itemContent.tourName;

//     item.querySelector("#address").innerText = itemContent.touraddress;
//     item.querySelector("#rating").innerText = itemContent.rating;
//     item.querySelector("#price").innerText = itemContent.price;
//   }
// });
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

itemChild.forEach(function (item) {
  item.addEventListener("click", function (e) {
    let id = e.currentTarget.getAttribute("data-id");
    let name = e.currentTarget.getAttribute("data-name");
    let address = e.currentTarget.getAttribute("data-address");
    let price = e.currentTarget.getAttribute("data-price");
    let rating = e.currentTarget.getAttribute("data-rating");

    let itemIndex = cart.findIndex((item) => item.id === id);

    currentCart = {
      id: id,
      name: name,
      address: address,
      img: image,
      date: "",
      price: price,
      rating: rating,
      quantity: 1,
    };

    if (itemIndex === -1) {
      cart.push(currentCart);
    } else {
      cart[itemIndex].quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("currentCart", JSON.stringify(currentCart));
    localStorage.setItem("users", JSON.stringify(users));
  });
});

// Khi đã đăng nhập thành công

// Đã khai báo loginUser ở trên
let isLoginUserExist = loginUser !== null;
let loginBlock = document.querySelector(".login");
let userinfo = document.querySelector("#userinfo");
let user_img = document.querySelector(".user-img");

let register = document.querySelector("#register");
let login = document.querySelector("#login");

if (isLoginUserExist) {
  let messageSpan = document.createElement("span");
  messageSpan.innerText = "Bạn đã đăng nhập thành công";
  register.replaceWith(messageSpan);
  login.href = "#";
  login.innerText = "Đăng xuất";

  let imgSmall = document.createElement("img");
  imgSmall.src = "images/profile/profile.png";
  user_img.replaceWith(imgSmall);
  imgSmall.style.width = "30px";
} else {
  register.href = "./page-register.html";
  register.innerHTML = "Đăng kí";
  login.href = "./page-login.html";
  login.innerHTML = "Đăng nhập";
}

login.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  register.href = "./page-register.html";
  register.innerHTML = "Đăng kí";
  login.href = "./page-login.html";
  login.innerHTML = "Đăng nhập";
});

userinfo.onclick = function (e) {
  if (isLoginUserExist) {
    let messageSpan = document.createElement("span");
    messageSpan.innerText = "Bạn đã đăng nhập thành công";
    register.replaceWith(messageSpan);
    login.href = "#";
    login.innerText = "Đăng xuất";
    let imgSmall = document.createElement("img");
    imgSmall.src = "images/profile/profile.png";
    user_img.replaceWith(imgSmall);
    user_img.style.width = "100px";
  }
};

// Thanh tim kiếm
function findIndex() {
  let search = document.querySelector(".header-search input");
  console.log(search);
  let searchText = search.value.toLowerCase();
  let searchItems = document.querySelectorAll(".item");
  let searchItem = [];
  searchItems.forEach((item) => {
    let itemText = item.querySelector("#title").textContent.toLowerCase();
    if (itemText.includes(searchText)) {
      searchItem.push(item.dataset.id);
    }
  });
  return searchItem;
}

function displayItems(itemIds) {
  let items = document.querySelectorAll(".item");
  items.forEach((item) => {
    if (itemIds.includes(item.dataset.id)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

let search = document.querySelector(".header-search input");
search.addEventListener("keyup", () => {
  let itemIds = findIndex();
  displayItems(itemIds);
});

// Slider

// let item = document.querySelectorAll('.item')
let carousel = document.querySelector(".carousel-item.active");
let li = carousel.querySelectorAll("li");
let liContainer = [];
li.forEach((liItem) => {
  liItem.addEventListener("click", () => {
    let itemText = liItem.querySelector("p").innerText;
    let contentItems = document.querySelectorAll(".item");
    let itemIds = [];
    contentItems.forEach((contentItem) => {
      let itemAddress = contentItem.querySelector("#address").innerText;
      if (itemAddress.includes(itemText)) {
        itemIds.push(contentItem.dataset.id);
      }
    });
    displayItems(itemIds);
  });
});

// Footer
document.querySelector(".upHead").onclick = function (e) {
  e.preventDefault();
  let position = window.pageYOffset;
  let interval = setInterval(() => {
    if (position > 0) {
      position -= 50;
      window.scrollTo(0, position);
    } else {
      clearInterval(interval);
    }
  }, 16.67);
};

// Lấy tất cả item

// Đã localStorage itemsContents
let itemsContent = document.querySelectorAll(".item");
itemsContent.forEach((item) => {
  let tourName = item.querySelector("#title").innerText;
  let tourImg = item.querySelector("img").src;
  let touraddress = item.querySelector("#address").innerText;
  let rating = item.querySelector("#rating").innerText;
  let price = item.querySelector("#price").innerText;

  itemsContents.push({
    tourName: tourName,
    tourImg: tourImg,
    touraddress: touraddress,
    rating: rating,
    price: price,
  });
});
localStorage.setItem("itemsContents", JSON.stringify(itemsContents));
