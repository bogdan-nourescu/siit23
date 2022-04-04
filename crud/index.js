let state = {
  list: [
    {
      title: "Google",
      url: "https://google.com",
      difficulty: "2",
      tags: ["JS", "HTML"],
    },
  ],
  idxEdit: null,
  difficulty: {
    "": "",
    0: "Entry Level",
    1: "Easy",
    2: "Medium",
    3: "Hard",
    4: "Hacker",
  },
};

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
}

function edit(idx) {
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
function addTag(event) {
  //pentru ca click pe buton dadea submit la formular;
  if (event !== undefined && event !== null) {
    event.preventDefault();
  }

  let button = document.querySelector("#addTagBtn");
  button.parentElement.insertAdjacentHTML(
    "beforeend",
    `<br/><input type="text" placeholder="Tag" name="tags" />`
  );
}
