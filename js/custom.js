let arrayCatalogo = new Array();
let numPage;
let parametrosURL = new URLSearchParams(location.search);

if (
  parseInt(parametrosURL.get("page")) == 1 ||
  parametrosURL.get("page") == null
) {
  numPage = 1;
} else {
  numPage = parseInt(parametrosURL.get("page"));
}

console.log("Estamos en la pagina " + numPage);

fetch("productos.json")
  .then((respuesta) => respuesta.json())
  .then((objeto) => {
    arrayCatalogo = objeto;
    cargarCatalogo(numPage);
  });

function cargarCatalogo(pagina) {
  let filaCatalogo = document.querySelector("#catalogo");

  let inicio = (pagina - 1) * 8 + 1;
  let final;
  let tmpfinal = pagina * 8;

  if (arrayCatalogo.length < tmpfinal) {
    final = arrayCatalogo.length;
  } else {
    final = tmpfinal;
  }

  for (let index = inicio; index <= final; index++) {
    let nuevoElemento = document.createElement("div");
    let precio = arrayCatalogo[index].price;
    let oferta = arrayCatalogo[index].offer * 100;
    let precioFinal = precio - (precio * oferta) / 100;
    nuevoElemento.innerHTML = `
     <picture>
    <img src="image/recursos/TP614EL1AHUOLLPE.webp" />
  </picture>;

          <h3>${arrayCatalogo[index].name}</h3>
          <p>
            <span class="precioOriginal">S/${precio}</span
            ><span class="precioFinal">S/ ${oferta}</span>
          </p>
          <button class="botonMenu">Agregar al Carrito</button>
    `;
    filaCatalogo.append(nuevoElemento);
  }
}
