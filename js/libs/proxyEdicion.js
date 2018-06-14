/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
/**
 * @constructor 
 * @param {string} tipo
 * @param {string} urlBusca
 * @param {string} urlAgrega
 * @param {string} urlModifica
 * @param {string} urlElimina
 * @param {type} reviver
 * @param {type} reemplazador
 * @returns {ProxyEdicion} */
function ProxyEdicion(tipo, urlBusca, urlAgrega, urlModifica, urlElimina, reviver,
    reemplazador) {
  this.tipo = tipo;
  this.urlBusca = urlBusca;
  this.urlAgrega = urlAgrega;
  this.urlModifica = urlModifica;
  this.urlElimina = urlElimina;
  this.reviver = reviver;
  this.reemplazador = reemplazador;
  evtBuscaModelo.observa(function(tipoDelEvento, id) {
    if (tipoDelEvento === this.tipo) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.urlBusca + "?id=" + encodeURIComponent(id), false);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
        this.controlaBusca(xhr);
      } catch (e) {
        this.error(e);
      }
    }
  }, this);
  evtEliminaModelo.observa(function(tipoDelEvento, id) {
    if (tipoDelEvento === this.tipo) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.urlElimina + "?id=" + encodeURIComponent(id), false);
        xhr.send();
        this.controlaOperacion(xhr);
      } catch (e) {
        this.error(e);
      }
    }
  }, this);
  evtAgregaModelo.observa(function(tipoDelEvento, modelo) {
    if (tipoDelEvento === this.tipo) {
      this.enviaModelo(this.urlAgrega, modelo);
    }
  }, this);
  evtModificaModelo.observa(function(tipoDelEvento, modelo) {
    if (tipoDelEvento === this.tipo) {
      this.enviaModelo(this.urlModifica, modelo);
    }
  }, this);
  evtAlmacenamientoListo.dispara();
}
ProxyEdicion.prototype.enviaModelo = function(url, modelo) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(modelo, this.reemplazador));
    this.controlaOperacion(xhr);
  } catch (e) {
    this.error(e);
  }
};
ProxyEdicion.prototype.controlaOperacion = function(xhr) {
  if (aseguraRespuestaCorrecta(xhr)) {
    evtOperacionRealizada.dispara(this.tipo);
  }
};
ProxyEdicion.prototype.controlaBusca = function(xhr) {
  if (aseguraRespuestaCorrecta(xhr)) {
    var modelo = JSON.parse(xhr.responseText, this.reviver);
    evtModeloEncontrado.dispara(this.tipo, modelo ? modelo : undefined);
  }
};
ProxyEdicion.prototype.error = function(e) {
  evtError.dispara(e.message);
};