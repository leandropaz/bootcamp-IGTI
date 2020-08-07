let tabUsers = null;
let tabStats = null;
let inputField = null;
let searchButton = null;
let userInput = "";
let usersFound = 0;
let allUsers = [];
let filteredUsers = [];
let results = [];

window.addEventListener("load", () => {
  console.log("Loaded...");
  tabUsers = document.querySelector("#tabUsers");
  tabStats = document.querySelector("#tabStats");
  inputField = document.querySelector("#inputField");
  searchButton = document.querySelector("#searchButton");
  getUsers();
  inputField.value = "";
  inputField.focus();
  searchButton.disabled = true;
  searchButton.addEventListener("click", getInputFromButton);
  inputField.addEventListener("keyup", getInput);
  render(results);
});

async function getUsers() {
  const response = await fetch("http://localhost:3002/results");
  allUsers = await response.json();
  getTabUsers();
}

function getTabUsers() {
  filteredUsers = allUsers.map((user) => {
    const { name, picture, dob, gender } = user;
    const fullName = `${name.first} ${name.last}`;
    const age = dob.age;
    const photo = picture.thumbnail;

    return {
      fullName,
      photo,
      age,
      gender,
    };
  });
  console.log(filteredUsers);
}

function getInput(e) {
  const size = inputField.value.trim().length;
  if (size > 0) {
    searchButton.disabled = false;
  } else {
    searchButton.disabled = true;
  }
  if (e.code === "Enter" && size > 0) {
    getNames();
  }
}

function getInputFromButton() {
  getNames();
}

function getNames() {
  userInput = inputField.value.toLowerCase();
  results = filteredUsers.filter((res) =>
    res.fullName.toLowerCase().includes(userInput)
  );
  console.log(results);
  render(results);
}

function render(users) {
  const size = users.length;
  if (!users || size === 0) {
    tabUsers.innerHTML = `
      <h3>Nenhum usuário filtrado</h3>
    `;
    tabStats.innerHTML = `
      <h3>Nada a ser exibido</h3>
    `;
  } else {
    tabUsers.innerHTML = `
      <h3>${users.length} usuário(s) encontrado(s)</h3>
      ${users
        .map((user) => {
          return `
          <p><img class="user-picture" src="${user.photo}" alt="foto de ${user.fullName}"> ${user.fullName}, ${user.age} anos</p>
        `;
        })
        .join("")}
    `;
    malesCount = femalesCount = 0;
    users.forEach((user) => {
      user.gender === "female" ? femalesCount++ : malesCount++;
    });
    totalAges = users.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.age;
    }, 0);
    meanAges = (totalAges / size).toFixed(2);
    tabStats.innerHTML = `
    <h3>Estatísticas</h3>
    <p>Sexo masculino: <strong>${malesCount}</strong></p>
    <p>Sexo feminino: <strong>${femalesCount}</strong></p>
    <p>Soma das idades: <strong>${totalAges}</strong></p>
    <p>Média das idades: <strong>${meanAges}</strong></p>   
  `;
  }
}
