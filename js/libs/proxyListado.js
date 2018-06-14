/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
function ProxyListado(tipo, url, reviver) {
  this.tipo = tipo;
  this.url = url;
  this.reviver = reviver;
}
ProxyListado.prototype.inicia = function() {
  evtBuscaInstancias.observa(ProxyListado.prototype.buscaInstancias, this);
  evtAlmacenamientoListo.dispara();  
};
ProxyListado.prototype.buscaInstancias = function() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url+ "?host=", false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
    if (aseguraRespuestaCorrecta(xhr)) {
      evtIniciaListado.dispara(this.tipo);
      var arr = JSON.parse(xhr.responseText, this.reviver);
      for (var i = 0, longitud = arr.length; i < longitud; i++) {
        var modelo = arr[i];
        evtElementoDeListado.dispara(this.tipo, modelo);
      }
      evtListadoTerminado.dispara(this.tipo);
    }
  } catch (e) {
    this.error(e);
  }
};
ProxyListado.prototype.error = function(e) {
  evtError.dispara(e.message);
};