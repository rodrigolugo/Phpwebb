/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
/** Clase evento.
 * @constructor
 * @returns {Evento} */
function Evento() {
  this.oyentes = new Array();
}
Evento.prototype.observa = function(funcion, objeto) {
  this.oyentes.push({"funcion": funcion, "objeto": objeto ? objeto : null});
};
Evento.prototype.dispara = function() {
  var oyentes = this.oyentes;
  for (var i = 0, longitud = oyentes.length; i < longitud; i++) {
    var oyente = oyentes[i];
    /* Invoca la función sin enlazarla a ningún objeto y con los parámetros recibidos
     * por la función dispara, que se encuentran en el arreglo "arguments". */
    oyente["funcion"].apply(oyente["objeto"], arguments);
  }
};