const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

function validateForm() {
  const fullName = document.getElementById("full-name").value;
  const mail = document.getElementById("mail").value;
  const phone = document.getElementById("phone").value;

  console.log(fullName);

  let errorMessage = "";
  let phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (fullName === "ironhack" || fullName.includes("ironhack")) {
    alert("You can not be Ironhack, because I am Ironhack.");
    return false;
  } else if (!mail.includes("@")) {
    errorMessage = "You must write a valid email address";
    document.getElementById("error-message").innerHTML += errorMessage;
    return false;
  } else if (!phoneRegex.test(phone)) {
    errorMessage = "You must write a valid phone number";
    document.getElementById("error-message").innerHTML += errorMessage;
    return false;
  }
  return true;
}

async function doIt(url) {
  try {
    const page = getPageNumber();
    const API = await fetch(url);
    const JSON = await API.json();
    writeProject(JSON);
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
  const jsonProject = jsonData.sort((a,b) => a.uuid - b.uuid).filter((project) => project.uuid !== "1");
  let stringTemplate = ``;

  for (elements of jsonProject) {
    stringTemplate = `
    <div class="fichas">
          <img src="${elements.image}" alt="image of ${elements.name}" />
          <div class="oPTextContent">
            <div>
              <p id="sub4">${elements.name}</p>
              <p id="sub5">${elements.description}</p>
            </div>
            <a href="">Learn more</a>
          </div>
    </div>
    `
  document.querySelector(".projectsLearnMore").innerHTML += stringTemplate;

  }
}


doIt(API_URL);



