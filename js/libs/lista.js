/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
/** @constructor
 * @param {string} id id del elemento ul que hace el listado.
 * @param {type} titulo
 * @param {string} mensajeVacio Mensaje que se despliega cuando la tabla está vacía.
 * @param {Array.<string>} columnas columnas de la tabla.
 * @returns {Lista} */
function Lista(id, titulo, mensajeVacio, columnas) {
  this.id = id;
  this.listado = document.getElementById(id);
  this.titulo = titulo;
  this.mensajeVacio = mensajeVacio;
  this.columnas = columnas;
  this.listado.className = "list inset";
  switch (columnas.length) {
    case 1:
      this.liClass = "list-item-single-line";
      break;
    case 2:
      this.liClass = "list-item-two-lines";
      break;
    default:
      this.liClass = "list-item-multi-line";
      break;
  }
  this.iniciaListado();
  this.listadoTerminado();
}
Lista.prototype.iniciaListado = function() {
  if (this.titulo) {
    this.listadoHtml = "<li class='list-divider'>" + codificaHtml(this.titulo)
        + "</li>";
  } else {
    this.listadoHtml = "";
  }
  this.renglon = 0;
};
Lista.prototype.elementoDeListado = function(modelo) {
  var listadoHtml = "<li class='" + this.liClass + "'>";
  for (var i = 0, columnas = this.columnas, longitud = columnas.length; i < longitud;
      i++) {
    var columna = columnas[i];
    listadoHtml += columna.html(this.renglon, modelo);
  }
  listadoHtml += "</li>";
  this.listadoHtml += listadoHtml;
  this.renglon++;
};
Lista.prototype.listadoTerminado = function() {
  if (this.listadoHtml === "") {
    this.listado.innerHTML =
        "<li class='" + this.liClass + " vacio'>" + codificaHtml(this.mensajeVacio)
        + "</li>";
  } else {
    this.listado.innerHTML = this.listadoHtml;
  }
  this.listadoHtml = null;
};