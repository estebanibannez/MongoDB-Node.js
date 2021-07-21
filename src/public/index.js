/* obtengo el formulario */
// const click = document.querySelector('buscar');
const boton = document.getElementById("buscar");
const cantidad = document.getElementById("cantidad");

boton.addEventListener("click", (event) => {
  debugger;
  event.preventDefault();

  fetch(`/api/productos/vista-test/${cantidad.value}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    // body: JSON.stringify("A"),
    // body: JSON.stringify(parseInt(cantidad.value)),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      document.getElementById("registros").innerHTML = generateTable(
        productos.data,
      );
      console.log(productos.data);
      debugger;
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
});

function generateTable(data) {
  let res = "";
  if (data.length) {
    res += data
      .map(
        (producto) => `
            <tr>
                <th scope="row">${producto.id}</th>
                <td>${producto.name}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.code}</td>
                <td>$ ${producto.precio}</td>
                <td><img width="30" src="${producto.image}" alt="not found"></td>
                <td>${producto.stock}</td>
            </tr>
    `,
      )
      .join(" ");
  }
  return res;
}
// <tr>
// <th scope="row">1</th>
// <td>Mark</td>
// <td>Otto</td>
// <td>@mdo</td>
// </tr>
