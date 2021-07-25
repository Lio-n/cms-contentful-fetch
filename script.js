//Recibe un ID y devuelve una URL
//Le doy 'donde' buscar y 'que' buscar
const getUrlImage = (arrIncludes, idImg) => {
  for (const item of arrIncludes) {
    if (item.sys.id.includes(idImg)) {
      return "https:" + item.fields.file.url;
    }
  }
};

//Devuelve un 'Array de Objetos' con las 'Keys'(title,description,link,urlImg)
//createArrayOfContentful
const createArrayOfObjectsFromContentful = (arrContentful) => {
  class work {
    constructor(title, description, link, urlImg) {
      (this.title = title),
        (this.description = description),
        (this.link = link),
        (this.urlImg = urlImg);
    }
  }
  //newArr tendra las 'Keys'(title, description, link(URL) y image(URL))
  let newArr = arrContentful.items.map((r) => {
    let idImg = r.fields.image.sys.id; //id de la imagen a buscar
    let urlImg = getUrlImage(arrContentful.includes.Asset, idImg); //Retorna la 'URL de la imagen'
    return new work(
      r.fields.title,
      r.fields.description,
      r.fields.link,
      urlImg
    );
  });
  return newArr;
};

//Recibe un 'Array de Objects' y lo deplega en el 'Document'
const createCardsOnDocument = (newArr) => {
  let $container_cards = document.querySelector(".container_cards"), //Le agrego los Items desde el Template
    $templateEl = document.querySelector("template").content, //El Template
    $fregment = document.createDocumentFragment(); //Se crea un objeto DocumentFragment vacio

  //(title, description, link(URL) y urlImg(URL))
  newArr.forEach((item) => {
    $templateEl.querySelector(".title").textContent = item.title;
    $templateEl.querySelector(".descrip").textContent =
      item.description + "...";
    $templateEl.querySelector(".ver_mas").textContent = "Ver más";
    $templateEl.querySelector("a").setAttribute("href", item.link);
    $templateEl.querySelector("img").setAttribute("src", item.urlImg);
    let $clone = document.importNode($templateEl, true);
    $fregment.appendChild($clone);
  });

  $container_cards.appendChild($fregment);
};

function main() {
  console.time();
  fetch(
    "https://cdn.contentful.com/spaces/xo3l694rmh5a/environments/master/entries?access_token=VDXqvqCnfteEs1G-4Qkx3cx2TEC4Npeb2FVM85Fj67A"
  )
    .then((e) => {
      return e.json();
    })
    .then((e) => {
      let newArr = createArrayOfObjectsFromContentful(e); //Devuelve un 'Array de Objetos' con las 'Keys'(title,description,link,urlImg)
      createCardsOnDocument(newArr);
      console.timeEnd();
    });
}
main();
