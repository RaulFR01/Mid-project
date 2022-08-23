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
  const email = document.getElementById("email").innerHTML;

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
  const proyecto = data.filter((proyecto) => proyecto.uuid === "1");

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
  const jsonProject = jsonData
    .sort((a, b) => Math.random() - 0.5)
    .filter((project) => project.uuid !== "1")
    .slice(0, 3);

  const JsonHomePage = jsonData
    .sort((a, b) => a.uuid - b.uuid)
    .filter((project) => project.uuid !== "4")
    .slice(0, 3);

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
            <a href="./${elements.uuid}.html">Learn more</a>
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
            <a href="./Projects/${elements.uuid}.html">Learn more</a>
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
const resultado = getPageNumber();
doIt(API_URL, resultado);
