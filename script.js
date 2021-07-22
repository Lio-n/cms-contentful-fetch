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
    let idImage = r.fields.image.sys.id; //id de la imagen a buscar
    let urlImage = getUrlImage(arrContentful.includes.Asset, idImage); //Retorna la 'URL de la imagen'
    return new work(
      r.fields.title,
      r.fields.description,
      r.fields.link,
      urlImage
    );
  });
  return newArr;
};

//Recive un 'Array de Objects' y lo deplega en el 'Document'
const createCardsOnDocument = (newArr) => {};

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
      console.log("NewArray::", newArr);
      console.timeEnd();
      return newArr;
    });
  // .then((e) => {
  //   createCardsOnDocument(e); //Recive un 'Array de Objects' y lo deplega en el 'Document'
  //   console.timeEnd();
  // });
}
main();

// .then((e) => {
//     let h2 = (document.querySelector(".title").textContent = e[0].title),
//       p = (document.querySelector(".description").textContent =
//         e[0].description),
//       a = (document.querySelector(".link").textContent = e[0].link);
// });
