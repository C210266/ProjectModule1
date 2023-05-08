// let cart = JSON.parse(localStorage.getItem("newCart"));

let tbody = document.getElementById("tbody");
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

let username = document.querySelector(".username");
let email = document.querySelector(".email");
username.innerHTML = loginUser.username;
email.innerHTML = loginUser.email;
function renderWorks() {
  tbody.innerHTML = "";
  let users = JSON.parse(localStorage.getItem("users"));
  let loginUser = JSON.parse(localStorage.getItem("loginUser"));
  for (let i = 0; i < users.length; i++) {
    if (loginUser.username === users[i].username) {
      for (let j = 0; j < users[i].cartItem.length; j++) {
        tbody.innerHTML += `
                <tr>
                  <td class="col-1">${i + 1}</td>
                  <td class="col-1"><img style="width:100px;height:100px" src="${
                    users[i].cartItem[j].img
                  }" alt=""></td>
                  <td class="col-2">${users[i].cartItem[j].name}</td>
                  <td class="col-1">${users[i].cartItem[j].address}</td>
                  <td class="col-3">${users[i].cartItem[j].date}</td>
                  <td class="col-1"> ${users[i].cartItem[j].price}</td>
                  <td class="col-1">${users[i].cartItem[j].rating}</td>
                  <td class="col-1">
                    <button style="padding:4px; background-color:green;width:60px" class="edit">Edit</button>
                    <button style="padding:4px; background-color:red;width:60px"class='delete'>Delete</button>
                  </td>
                </tr>
              `;
      }
    }
  }
}

renderWorks();

tbody.onclick = function (e) {
  if (e.target.classList.contains("edit")) {
    let tr = e.target.parentElement.parentElement;
    let dateTd = tr.children[4];
    let checkIn = dateTd.dataset.checkin;

    let checkOut = dateTd.dataset.checkout;
    dateTd.innerHTML = `
    <span>Nhập ngày bạn check-in</span>
    <input type="date" value="${checkIn}">
    <br>
    <span>Nhập ngày bạn check-out</span>
    <input type="date" value="${checkOut}">
    `;
    e.target.innerText = "Confirm";
    e.target.classList.remove("edit");
    e.target.classList.add("confirm");
  } else if (e.target.classList.contains("confirm")) {
    let tr = e.target.parentElement.parentElement;
    let index = tr.children[0].innerText - 1;

    let checkInInput = tr.children[4].querySelectorAll("input")[0];
    let checkOutInput = tr.children[4].querySelectorAll("input")[1];
    let newCheckIn = checkInInput.value;
    let newCheckOut = checkOutInput.value;

    let users = JSON.parse(localStorage.getItem("users"));
    let userIndex = users.find((user) => user.username === loginUser.username);

    userIndex.cartItem[index].date = `${newCheckIn} - ${newCheckOut}`;
    localStorage.setItem("users", JSON.stringify(users));

    tr.children[4].dataset.checkin = newCheckIn;
    tr.children[4].dataset.checkout = newCheckOut;
    tr.children[4].innerHTML = `${newCheckIn} - ${newCheckOut}`;

    e.target.innerText = "Edit";
    e.target.classList.remove("confirm");
    e.target.classList.add("edit");
    swal("Bạn đã thay đổi thành công", "", "success");
  } else if (e.target.classList.contains("delete")) {
    let tr = e.target.parentElement.parentElement;
    let index = tr.children[0].innerText - 1;
    let users = JSON.parse(localStorage.getItem("users"));
    users
      .find((user) => user.username === loginUser.username)
      .cartItem.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));
    swal("Bạn đã xóa thành công", "", "success");
    renderWorks(); // Re-render the UI
  }
};

// showLogin
function showLogin() {
  var loginDiv = document.querySelector(".login");
  if (loginDiv.style.display === "none") {
    loginDiv.style.display = "block";
  } else {
    loginDiv.style.display = "none";
  }
}
