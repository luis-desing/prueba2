async function cargarDatos() {
  const sheetID = "2PACX-1vS5OHUs_LgmCr5AsH1edRA3qCt7cOrXnE7I_UUWfZipbm6OeYtGuAMJ0MVP2ZCG2EqQl62tIkg5ZZUi"; // Reemplaza con tu ID real
  const url = ` https://spreadsheets.google.com/feeds/list/ ${sheetID}/od6/public/values?alt=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const entradas = data.feed.entry;

    // Crear tabla
    let tablaHTML = `
      <table>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Ciudad</th>
        </tr>
    `;

    entradas.forEach(entry => {
      const nombre = entry.gsx$nombre.$t;
      const edad = entry.gsx$edad.$t;
      const ciudad = entry.gsx$ciudad.$t;

      tablaHTML += `
        <tr>
          <td>${nombre}</td>
          <td>${edad}</td>
          <td>${ciudad}</td>
        </tr>
      `;
    });

    tablaHTML += "</table>";

    document.getElementById("tabla-container").innerHTML = tablaHTML;

  } catch (error) {
    console.error("Error al cargar datos:", error);
    document.getElementById("tabla-container").innerText = "Error cargando datos.";
  }
}

cargarDatos();
