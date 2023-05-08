// let loginUser = JSON.parse(localStorage.getItem("loginUser")) ?? {};
let tbody = document.getElementById("tbody");
let users = JSON.parse(localStorage.getItem("users")) ?? [];

let itemsContents = JSON.parse(localStorage.getItem("itemsContents"));
function renderWorks() {
  let thead = document.getElementById("thead");
  thead.innerHTML = `
  <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Img</th>
                                                <th>Address</th>
                                                <th>Rating</th>
                                                <th>Price</th>
                                                <th>Active</th>
                                            </tr>
`;
  tbody.innerHTML = "";
  for (let i = 0; i < itemsContents.length; i++) {
    tbody.innerHTML += `
            <tr>
            <td>
            ${i + 1}
          </td>
              
              <td>${itemsContents[i].tourName}</td>
              <td><img width="35" src="${itemsContents[i].tourImg}" alt=""></td>
              <td><span>${itemsContents[i].touraddress}</span></td>
              <td><span>${itemsContents[i].rating}</span></td>
              <td><span>${itemsContents[i].price}</span></td>
              <td><button class="badge badge-success">Sửa</button></td>
              <td><button class="badge badge-warning">Xóa</button></td>
            </tr>
          `;
  }

  let editBtns = document.querySelectorAll(".badge-success");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let tr = btn.parentElement.parentElement;
      let nameTd = tr.querySelector("td:nth-child(2)");
      let imgTd = tr.querySelector("td:nth-child(3)");
      let addressTd = tr.querySelector("td:nth-child(4)");
      let ratingTd = tr.querySelector("td:nth-child(5)");
      let priceTd = tr.querySelector("td:nth-child(6)");

      let name = nameTd.textContent;
      nameTd.innerHTML = `<input type="text" value="${name}">`;

      let address = addressTd.textContent;
      addressTd.innerHTML = `<input type="text" value="${address}">`;

      let rating = ratingTd.textContent;
      ratingTd.innerHTML = `<input type="text" value="${rating}">`;

      let price = priceTd.textContent;
      priceTd.innerHTML = `<input type="text" value="${price}">`;

      let saveBtn = document.createElement("button");
      saveBtn.classList.add("badge", "badge-primary");
      saveBtn.textContent = "Lưu";
      tr.querySelector(".badge-success").replaceWith(saveBtn);

      saveBtn.addEventListener("click", function () {
        let newName = nameTd.querySelector("input").value;

        let newAddress = addressTd.querySelector("input").value;
        let newRating = ratingTd.querySelector("input").value;
        let newPrice = priceTd.querySelector("input").value;

        // Update data in itemsContents
        let index = Array.from(tr.parentNode.children).indexOf(tr);
        itemsContents[index].tourName = newName;

        itemsContents[index].touraddress = newAddress;
        itemsContents[index].rating = newRating;
        itemsContents[index].price = newPrice;

        localStorage.setItem("itemsContents", JSON.stringify(itemsContents));

        // Re-render table
        renderWorks();
      });
    });
  });

  // Add event listener for Xóa button
  let deleteBtns = document.querySelectorAll(".badge-warning");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let tr = btn.parentElement.parentElement;
      let index = Array.from(tr.parentNode.children).indexOf(tr);

      // Remove data from itemsContents
      itemsContents.splice(index, 1);

      // Save updated data to local storage
      localStorage.setItem("itemsContents", JSON.stringify(itemsContents));

      // Re-render table
      renderWorks();
    });
  });
}

renderWorks();

function Tourcheck() {
  return renderWorks();
}

function Userscheck() {
  let thead = document.getElementById("thead");
  thead.innerHTML = `
        <tr>
          <th>#</th>
          <th>Img</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>Active</th>
        </tr>
      `;
  tbody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${i + 1}</td>
          <td>
            <div class="round-img">
              <a href=""><img width="35" src="./images/avatar/1.png" alt=""></a>
            </div>
          </td>
          <td class="username">${user.username}</td>
          <td class="email"><span>${user.email}</span></td>
          <td class="password"><span>${user.password}</span></td>
          <td><button class="badge badge-success edit-btn">Sửa</button></td>
          <td><button class="badge badge-warning delete-btn">Xóa</button></td>
        `;
    tbody.appendChild(tr);
  }

  // Add event listener for edit button
  let editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let tr = btn.parentElement.parentElement;
      let usernameTd = tr.querySelector(".username");
      let username = usernameTd.textContent;
      usernameTd.innerHTML = `<input type="text" value="${username}">`;

      let emailTd = tr.querySelector(".email");
      let email = emailTd.textContent;
      emailTd.innerHTML = `<input type="text" value="${email}">`;

      let passwordTd = tr.querySelector(".password");
      let password = passwordTd.textContent;
      passwordTd.innerHTML = `<input type="text" value="${password}">`;

      let saveBtn = document.createElement("button");
      saveBtn.classList.add("badge", "badge-primary", "save-btn");
      saveBtn.textContent = "Lưu";
      tr.querySelector(".edit-btn").replaceWith(saveBtn);

      saveBtn.addEventListener("click", function () {
        let newUsername = usernameTd.querySelector("input").value;
        let newEmail = emailTd.querySelector("input").value;
        let newPassword = passwordTd.querySelector("input").value;
        let index = users.findIndex((user) => user.username === username);
        users[index].username = newUsername;
        users[index].email = newEmail;
        users[index].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        swal("Bạn đã sửa thành công", "", "success");

        Userscheck();
      });
    });
  });

  let deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let tr = btn.parentElement.parentElement;
      let usernameTd = tr.querySelector(".username");
      let username = usernameTd.textContent;
      let index = users.findIndex((user) => user.username === username);
      if (index !== -1) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        swal("Bạn đã xóa thành công", "", "success");
        Userscheck();
      }
    });
  });
}
