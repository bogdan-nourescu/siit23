let state = {
  list: [
    {
      title: "google",
      url: "https://google.com",
      difficulty: "3",
      tags: ["JS", "HTML"],
    },
    {
      title: "Google2",
      url: "https://google.com",
      difficulty: "1",
      tags: ["JSasd", "HTML"],
    },
    {
      title: "Google3",
      url: "https://google.com",
      difficulty: "4",
      tags: ["js", "HTML"],
    },
    {
      title: "Google4",
      url: "https://google.com",
      difficulty: "0",
      tags: ["HTML", "JS"],
    },
  ],
  idxEdit: null,
  sortColumn: null,
  sortDirection: 1, //1 e asc, -1 e desc

  difficulty: {
    "": "",
    0: "Entry Level",
    1: "Easy",
    2: "Medium",
    3: "Hard",
    4: "Hacker",
  },
};

function sortTable(th, column) {
  //persoana.nume
  //persoana["nume"]
  //persoana[coloana]
  //persoana["pre"+"nume"]
  //persoana["varsta"+i]
  let sortDirectionSpans = document.querySelectorAll(".sortDirection");
  for (let span of sortDirectionSpans) {
    span.innerText = "";
  }

  if (state.sortColumn === column) {
    state.sortDirection = -state.sortDirection;
  } else {
    state.sortDirection = 1;
  }
  state.sortColumn = column;

  // if (state.sortDirection === 1) {
  //   th.querySelector(".sortDirection").innerHTML = "&darr;";
  // } else {
  //   th.querySelector(".sortDirection").innerHTML = "&uarr;";
  // }

  th.querySelector(".sortDirection").innerHTML =
    state.sortDirection === 1 ? "&darr;" : "&uarr;";

  state.list.sort(function (a, b) {
    let columnA = a[column];
    let columnB = b[column];
    if (columnA instanceof Array) {
      columnA = columnA.join();
    }
    if (columnB instanceof Array) {
      columnB = columnB.join();
    }
    columnA = columnA.toLowerCase();
    columnB = columnB.toLowerCase();

    if (a[column] < b[column]) {
      return -1 * state.sortDirection;
    } else if (a[column] > b[column]) {
      return 1 * state.sortDirection;
    } else {
      return 0;
    }
  });

  draw();
}

//O functie "compare" care primeste 2 parametrii si
//returneaza -1 daca primul e mai mic ca al doilea, <<returneaza mai mic decat 0>>
//0 daca sunt egale si
//1 daca primul e mai mare ca al doilea <<returneaza mai mare decat 0>>
function compare(a, b) {
  return a - b;
}

function draw() {
  let table = document.querySelector("#list tbody");
  let str = "";
  for (let i = 0; i < state.list.length; i++) {
    let elem = state.list[i];
    str += `
            <tr>
                <td><a href="${elem.url}" target="_blank">${elem.title}</a></td>
                <td>${state.difficulty[elem.difficulty]}</td>
                <td>${elem.tags.join(", ")}</td>
                <td>
                    <button onclick="del(${i})">Delete</button>
                    <button onclick="edit(${i})">Edit</button>
                </td>
            </tr>
        `;
  }
  table.innerHTML = str;
  showTable();
}

function edit(idx) {
  showForm();

  let elem = state.list[idx];
  document.querySelector("[name='title']").value = elem.title;
  document.querySelector("[name='url']").value = elem.url;
  document.querySelector("[name='difficulty']").value = elem.difficulty;

  let tagsInputs = document.querySelectorAll("[name='tags']");
  for (let i = tagsInputs.length; i < elem.tags.length; i++) {
    addTag();
  }
  tagsInputs = document.querySelectorAll("[name='tags']");
  for (let i = 0; i < elem.tags.length; i++) {
    tagsInputs[i].value = elem.tags[i];
  }
  state.idxEdit = idx;
}

function del(idx) {
  if (
    confirm(`Esti sigur ca vrei sa stergi linkul: ${state.list[idx].title}?`)
  ) {
    state.list.splice(idx, 1);
    draw();
  }
}
function adauga(event) {
  event.preventDefault();
  let title = document.querySelector("[name='title']").value.trim();
  let url = document.querySelector("[name='url']").value.trim();
  let difficulty = document.querySelector("[name='difficulty']").value.trim();
  let tagInputs = document.querySelectorAll("[name='tags']");
  let tags = [];
  for (let input of tagInputs) {
    if (input.value.trim() !== "") {
      tags.push(input.value.trim());
    }
  }
  if (state.idxEdit === null) {
    //vreau sa adaug un element nou in lista
    state.list.push({
      title: title,
      url: url,
      difficulty: difficulty,
      tags: tags,
    });
  } else {
    //aici sunt in timpul editarii
    state.list[state.idxEdit] = {
      title: title,
      url: url,
      difficulty: difficulty,
      tags: tags,
    };
    state.idxEdit = null;
  }
  document.querySelector("form").reset();
  draw();
}
function addTag() {
  let button = document.querySelector("#addTagBtn");
  button.parentElement.insertAdjacentHTML(
    "beforeend",
    `<br/><input type="text" placeholder="Tag" name="tags" />`
  );
}

function showTable() {
  document.querySelector("#list").classList.remove("hidden");
  document.querySelector("#form").classList.add("hidden");
}
function showForm() {
  document.querySelector("#list").classList.add("hidden");
  document.querySelector("#form").classList.remove("hidden");
}
function resetForm() {
  document.querySelector("#form").reset();
  //delete the extra tag inputs
  let tagInputs = document.querySelectorAll("[name='tags']");
  for (let i = 1; i < tagInputs.length; i++) {
    tagInputs[i].remove();
  }
  //and all the BRs
  let brs = tagInputs[0].parentElement.querySelectorAll("br");
  for (let br of brs) {
    br.remove();
  }

  state.idxEdit = null;
  showForm();
}
