<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Ìcono de la página. -->
     <link rel="shortcut icon" sizes="48x48" href="imagenes/ico.png">

    <!-- Configuración del acceso directo en Chrome. -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="manifest" href="manifest.json">

    <!-- Configuración del acceso directo en Safari. -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
 
    <link rel="apple-touch-icon-precomposed" sizes="128x128"
          href="img/form_128px.png">

    <meta name="msapplication-TileImage" content="img/form_128px.png">

        <script src="js/libs/webcomponentsjs/webcomponents-loader.js"></script>
        <script src="js/libs/require.js/require.min.js"></script>
        <script src="js/libs/Util.js"></script>
        <link rel="import" href="cmp/formas-navegacion.html">
        <link rel="import" href="cmp/formas-footer.html">
        <link rel="import" href="cmp/galeria.html">
        <link rel="stylesheet" href="css/estilos.css">
        <script src="js/libs/codificaHtml.js"></script>
        <script src="js/libs/lista.js"></script>
        <script src="js/libs/columnas.js"></script>
        <script src="js/libs/evento.js"></script>
        <script src="js/libs/ctrlError.js"></script>
        <script src="js/libs/ctrlListado.js"></script>
        <script src="js/libs/proxyComun.js"></script>
        <script src="js/libs/proxyListado.js"></script>
        
        <link rel="stylesheet" href="css/estilos.css">
        <link rel="stylesheet" href="css/Registro.css">
        <link rel="stylesheet" href="css/Header.css">
        <title>Dstaka</title>
    </head>
    <body>
          <formas-navegacion></formas-navegacion>
         
        <div>
            <galeria></galeria>
            <main role="main"></main>
        </div>
          <formas-footer></formas-footer>
          <script>
    "use strict";
    document.addEventListener("WebComponentsReady", () => {
      const main = document.querySelector("main");
      window.addEventListener("hashchange", cambioDeHash);
      cambioDeHash();
    });
  </script>
    </body>
</html>
