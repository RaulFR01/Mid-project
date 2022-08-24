const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

function validateForm() {
  const fullName = document.getElementById("full-name").value;
  if (fullName === "ironhack" || fullName.includes("ironhack")) {
    alert("You can not be Ironhack, because I am Ironhack.");
    return false;
  }
  return true;
}

function suscribeGreetings() {
  const email = document.getElementById("email").value;

  if (email === "") {
    alert("¡Introduce un email porfavor!");
    return false;
  } else {
    alert("¡Gracias por suscribirte!");
  }
  return true;
}

async function doIt(url, page) {
  try {
    const API = await fetch(url);
    const JSON = await API.json();
    if (page === "2") {
      writeProject(JSON);
    }
    writeOtherProjects(JSON, page);
  } catch (error) {
    console.log(error);
  }
}

function writeProject(data) {
  const id = getProjectId();

  const proyecto = data.filter((proyecto) => proyecto.uuid === id);

  if (proyecto.length === 0) {
    redirection404();
  }

  for (elementos of proyecto) {
    document.getElementById("simplifyTitle").innerHTML = elementos.name;
    document.getElementById("uITitle").innerHTML = elementos.description;
    document.getElementById("dateProject").innerHTML = elementos.completed_on;
    document.getElementById("parrafoSimplify").innerHTML = elementos.content;
    const image = document.createElement("img");
    image.setAttribute("src", elementos.image);
    image.setAttribute("alt", "imagen de simplify");
    const claseImagen = document.getElementById("imagenSimplify");
    claseImagen.appendChild(image);
    const image2 = document.createElement("img");
    image2.setAttribute("src", elementos.image);
    image2.setAttribute("alt", "imagen2 de simplify");
    const claseImagen2 = document.getElementById("imagenSimplifyBlurred");
    claseImagen2.appendChild(image2);
  }
}

function getPageNumber() {
  const pageNumber = document.getElementById("page").innerHTML;
  return pageNumber;
}

function writeOtherProjects(jsonData, numberPage) {
  const id = getProjectId();

  const jsonProject = jsonData
    .sort((a, b) => Math.random() - 0.5)
    .filter((project) => project.uuid !== id)
    .slice(0, 3);

  const JsonHomePage = jsonData.sort((a, b) => a.uuid - b.uuid).slice(0, 3);

  let stringTemplate = ``;

  if (numberPage === "2") {
    for (elements of jsonProject) {
      stringTemplate = `
    <div class="fichas">
          <img src="${elements.image}" alt="image of ${elements.name}" />
          <div class="oPTextContent">
            <div>
              <p id="sub4">${elements.name}</p>
              <p id="sub5">${elements.description}</p>
            </div>
            <a href="./project.html?id=${elements.uuid}">Learn more</a>
          </div>
    </div>`;
      document.getElementById("projectsLearnMore").innerHTML += stringTemplate;
    }
  } else if (numberPage === "1") {
    for (elements of JsonHomePage) {
      stringTemplate = `
    <div class="fichas">
          <img src="${elements.image}" alt="image of ${elements.name}" />
          <div class="oPTextContent">
            <div>
              <p id="sub4">${elements.name}</p>
              <p id="sub5">${elements.description}</p>
            </div>
            <a href="./projects/project.html?id=${elements.uuid}">Learn more</a>
          </div>
    </div>`;
      document.getElementById("projectsLearnMore").innerHTML += stringTemplate;
    }
  }
}

function toogleMenu() {
  const menuIcon = document.getElementById("nav-menu");
  if (menuIcon.style.display === "block") {
    menuIcon.style.display = "none";
  } else {
    menuIcon.style.display = "block";
  }
}

function getProjectId() {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const id = query.get("id");
  return id;
}

function redirection404() {
  window.location.href = "./../404.html";
}

const resultado = getPageNumber();
doIt(API_URL, resultado);
