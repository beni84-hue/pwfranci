document.addEventListener("DOMContentLoaded", function () {
  /* ==================================================
       ENCABEZADO Y MENÚ COMPARTIDO
    ================================================== */

  const encabezado = document.getElementById("encabezado");

  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  const paginas = [
    { archivo: "index.html", nombre: "Inicio" },
    { archivo: "quienes_somos.html", nombre: "Quiénes somos" },
    { archivo: "oferta_academica.html", nombre: "Oferta académica" },
    { archivo: "historia.html", nombre: "Historía" },
    { archivo: "actividades.html", nombre: "Actividades" },
    { archivo: "contacto.html", nombre: "Contacto" },
  ];

  if (encabezado) {
    const enlacesMenu = paginas
      .map(function (pagina) {
        const claseActiva = paginaActual === pagina.archivo ? "activo" : "";

        const paginaSeleccionada =
          paginaActual === pagina.archivo ? 'aria-current="page"' : "";

        return `
                <li>
                    <a href="${pagina.archivo}"
                       class="${claseActiva}"
                       ${paginaSeleccionada}>
                        ${pagina.nombre}
                    </a>
                </li>
            `;
      })
      .join("");

    encabezado.innerHTML = `
            <div class="barra-superior">
                Educación pública al servicio de la comunidad
            </div>

            <header class="encabezado-principal">
                <div class="contenedor barra-navegacion">

                    <a href="index.html" class="marca">
                       <span class="logo-sello">
                            <img src="img/logo.png" alt="Logo del colegio">
                       </span>

                       <span class="marca-texto">
                            <strong>Instituto Gubernamental República de Francia</strong>
                            <span>Formación académica y tecnológica</span>
                       </span>

                    </a>

                    <button
                        class="boton-menu"
                        type="button"
                        aria-label="Abrir menú"
                        aria-expanded="false"
                        aria-controls="menu-principal">
                        ☰
                    </button>

                    <nav class="menu" id="menu-principal">
                        <ul>
                            ${enlacesMenu}
                        </ul>
                    </nav>

                </div>
            </header>
        `;
  }

  /* ==================================================
       PIE DE PÁGINA COMPARTIDO
    ================================================== */

  const piePagina = document.getElementById("pie-pagina");

  if (piePagina) {
    const anio = new Date().getFullYear();

    piePagina.innerHTML = `
            <footer class="pie-pagina">
                <div class="contenedor">

                    <div class="rejilla-pie">

                        <div>
                            <h3>Instituto Gubernamental República de Francia</h3>

                            <p>
                                Institución comprometida con la formación
                                académica, técnica y humana de los jóvenes.
                            </p>

                            <p>
                                Barrio el Centro, frente a la Secretaria de Salud., Tegucigalpa, Honduras, 504.
                            </p>
                        </div>

                        <div>
                            <h3>Navegación</h3>

                            <ul>
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="quienes_somos.html">Quiénes somos</a></li>
                                <li><a href="oferta_academica.html">Oferta académica</a></li>
                                <li><a href="historia.html">Docentes</a></li>
                                <li><a href="actividades.html">Actividades</a></li>
                                <li><a href="contacto.html">Contacto</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3>Contacto</h3>

                            <ul>
                                <li>Teléfono: +504 98125552</li>
                                <li>Correo: republicafrancia145@gmail.com</li>
                                 <li>
                                  <a
                                    href="https://www.facebook.com/p/IGRep%C3%BAblica-de-Francia-61558809134909/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Facebook
                                  </a>
                                </li>

                                   <li>
                                  <a
                                    href="https://www.tiktok.com/search?q=igr.francia.oficial&t=1787243810400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    TikTok
                                  </a>
                                </li>

                               
                            </ul>
                        </div>

                    </div>

                    <div class="creditos">
                        © ${anio} Instituto Gubernamental República de Francia.
                        Proyecto desarrollado por Oscar Benitez.
                    </div>

                </div>
            </footer>
        `;
  }

  /* ==================================================
       MENÚ PARA TELÉFONOS
    ================================================== */

  const botonMenu = document.querySelector(".boton-menu");
  const menu = document.querySelector(".menu");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      const estaAbierto = menu.classList.toggle("abierto");

      botonMenu.setAttribute("aria-expanded", estaAbierto);

      botonMenu.textContent = estaAbierto ? "✕" : "☰";
    });

    const enlaces = menu.querySelectorAll("a");

    enlaces.forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.textContent = "☰";
      });
    });
  }

  /* ==================================================
       IMÁGENES TEMPORALES
    ================================================== */

  const imagenesConReemplazo = document.querySelectorAll("img[data-fallback]");

  imagenesConReemplazo.forEach(function (imagen) {
    imagen.addEventListener("error", function () {
      const reemplazo = imagen.getAttribute("data-fallback");

      if (reemplazo && imagen.src !== reemplazo) {
        imagen.src = reemplazo;
      }
    });
  });

  /* ==================================================
       CARRUSEL DE LA PÁGINA DE INICIO
    ================================================== */

  const diapositivas = document.querySelectorAll(".diapositiva");
  const botonAnterior = document.querySelector(".anterior");
  const botonSiguiente = document.querySelector(".siguiente");
  const contenedorIndicadores = document.querySelector("[data-indicadores]");

  let indiceActual = 0;
  let intervaloCarrusel;

  if (diapositivas.length > 0) {
    diapositivas.forEach(function (_, indice) {
      const punto = document.createElement("button");

      punto.classList.add("punto-carrusel");
      punto.setAttribute("aria-label", `Mostrar imagen ${indice + 1}`);

      punto.addEventListener("click", function () {
        mostrarDiapositiva(indice);
        reiniciarCarrusel();
      });

      contenedorIndicadores.appendChild(punto);
    });

    const puntos = document.querySelectorAll(".punto-carrusel");

    function mostrarDiapositiva(indice) {
      diapositivas.forEach(function (diapositiva) {
        diapositiva.classList.remove("activa");
      });

      puntos.forEach(function (punto) {
        punto.classList.remove("activo");
      });

      if (indice >= diapositivas.length) {
        indiceActual = 0;
      } else if (indice < 0) {
        indiceActual = diapositivas.length - 1;
      } else {
        indiceActual = indice;
      }

      diapositivas[indiceActual].classList.add("activa");
      puntos[indiceActual].classList.add("activo");
    }

    function siguienteDiapositiva() {
      mostrarDiapositiva(indiceActual + 1);
    }

    function anteriorDiapositiva() {
      mostrarDiapositiva(indiceActual - 1);
    }

    function iniciarCarrusel() {
      intervaloCarrusel = setInterval(siguienteDiapositiva, 5000);
    }

    function reiniciarCarrusel() {
      clearInterval(intervaloCarrusel);
      iniciarCarrusel();
    }

    botonSiguiente.addEventListener("click", function () {
      siguienteDiapositiva();
      reiniciarCarrusel();
    });

    botonAnterior.addEventListener("click", function () {
      anteriorDiapositiva();
      reiniciarCarrusel();
    });

    mostrarDiapositiva(0);
    iniciarCarrusel();
  }

  /* ==================================================
       BOTONES LEER MÁS DE LAS NOTICIAS
    ================================================== */

  const botonesNoticias = document.querySelectorAll(".boton-ampliar");

  botonesNoticias.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const tarjeta = boton.closest(".contenido-noticia");
      const contenido = tarjeta.querySelector(".noticia-ampliada");
      const estaVisible = contenido.classList.toggle("visible");

      boton.textContent = estaVisible ? "Mostrar menos" : "Leer más";

      boton.setAttribute("aria-expanded", estaVisible);
    });
  });

  /* ==================================================
       FORMULARIO DE CONTACTO
    ================================================== */

  const formulario = document.getElementById("formulario-contacto");

  const mensajeExito = document.getElementById("mensaje-exito");

  if (formulario && mensajeExito) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      mensajeExito.hidden = false;
      formulario.reset();

      mensajeExito.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }
});
