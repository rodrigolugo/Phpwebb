/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
var evtBuscaModelo = new Evento(), evtModeloEncontrado = new Evento(),
    evtAgregaModelo = new Evento(), evtModificaModelo = new Evento(),
    evtEliminaModelo = new Evento(), evtOperacionRealizada = new Evento(),
    evtAlmacenamientoListo = new Evento();
/** Los hijos deben redefinir : getTitulo(modelo). Pueden redefinir muestraCampo y
 * actualizaCampo.
 * @constructor
 * @param {string} tipo
 * @param {string} urlRegreso
 * @param {Array.<string>} campos
 * @returns {CtrlEdicion} */
function CtrlEdicion(tipo, urlRegreso, campos) {
  this.seleccion = null;
  this.modelo = {};
  this.tipo = tipo;
  this.urlRegreso = urlRegreso;
  this.campos = campos;
  this.hash = location.hash;
  this.h1 = document.getElementById("h1"),
      this.titulo = document.getElementById("titulo");
  this.eliminar = document.getElementById("eliminar");
  this.forma = document.getElementById("forma");
  this.main = document.getElementById("content");
  this.eliminar.agregaEvento("click", CtrlEdicion.prototype.elimina, this);
  this.forma.agregaEvento("submit", CtrlEdicion.prototype.guarda, this);
  if (this.hash.indexOf("#") < 0) {
    this.nuevo = true;
    this.id = null;
    this.eliminar.style["display"] = "none";
  } else {
    this.nuevo = false;
    this.id = this.hash.substring(1);
  }
  evtAlmacenamientoListo.observa(CtrlEdicion.prototype.almacenamientoListo, this);
  evtModeloEncontrado.observa(CtrlEdicion.prototype.modeloEncontrado, this);
  evtOperacionRealizada.observa(CtrlEdicion.prototype.operacionRealizada, this);
}
CtrlEdicion.prototype.almacenamientoListo = function() {
  if (this.nuevo) {
    this.muestra({});
  } else {
    evtBuscaModelo.dispara(this.tipo, this.id);
  }
};
CtrlEdicion.prototype.modeloEncontrado = function(tipo, modelo) {
  if (this.tipo === tipo) {
    this.muestra(modelo);
  }
};
CtrlEdicion.prototype.elimina = function() {
  if (confirm(
      "Confirma la Eliminación\n¡Perderás los datos!")) {
    evtEliminaModelo.dispara(this.tipo, this.id);
  }
};
CtrlEdicion.prototype.muestra = function(original) {
  if (original) {
    this.copiaModelo(original);
    if (!this.nuevo) {
      var titulo = this.getTitulo(this.modelo);
      this.titulo.textContent = titulo;
      this.h1.textContent = titulo;
    }
    this.muestraModelo();
  } else {
    evtError.dispara("Objeto no registrado.");
  }
};
CtrlEdicion.prototype.guarda = function() {
  var campos = this.campos, forma = this.forma, modelo = this.modelo;
  for (var i = 0, longitud = campos.length; i < longitud; i++) {
    var atributo = campos[i];
    this.actualizaCampo(modelo, atributo, forma);
  }
  if (this.nuevo) {
    evtAgregaModelo.dispara(this.tipo, modelo);
  } else {
    evtModificaModelo.dispara(this.tipo, modelo);
  }
};
CtrlEdicion.prototype.operacionRealizada = function(tipo) {
  if (this.tipo === tipo) {
    location.href = this.urlRegreso;
  }
};
CtrlEdicion.prototype.copiaModelo = function(original) {
  this.modelo = {};
  var copia = this.modelo;
  for (var atributo in original) {
    copia[atributo] = original[atributo];
  }
};
CtrlEdicion.prototype.muestraModelo = function() {
  var campos = this.campos, forma = this.forma, modelo = this.modelo;
  for (var i = 0, longitud = campos.length; i < longitud; i++) {
    var atributo = campos[i];
    var valor = modelo[atributo];
    this.muestraCampo(forma, atributo, valor);
  }
};
CtrlEdicion.prototype.muestraCampo = function(forma, atributo, valor) {
  forma[atributo].value = valor ? valor : "";
};
CtrlEdicion.prototype.actualizaCampo = function(modelo, atributo, forma) {
  var valor = forma[atributo].value;
  var valorTrim = valor.trim();
  modelo[atributo] = valorTrim.length === 0 ? undefined : valorTrim;
};
CtrlEdicion.prototype.getId = function(modelo) {
  return parseInt(modelo["id"], 10);
};
