/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
var evtBuscaInstancias = new Evento(),
    evtIniciaListado = new Evento(),
    evtElementoDeListado = new Evento(),
    evtListadoTerminado = new Evento(),
    evtAlmacenamientoListo = new Evento();
/** Los hijos deben redefinir : getTitulo(modelo). Pueden redefinir muestraCampo y
 * actualizaCampo.
 * @constructor
 * @param {string} tipo
 * @param {Listado} lista
 * @returns {CtrlListado} */
function CtrlListado(tipo, lista) {
  this.seleccion = null;
  this.lista = lista;
  this.tipo = tipo;
  this.forma = document.getElementById("forma");
  evtAlmacenamientoListo.observa(CtrlListado.prototype.almacenamientoListo, this);
  evtIniciaListado.observa(CtrlListado.prototype.iniciaListado, this);
  evtElementoDeListado.observa(CtrlListado.prototype.elementoDeListado, this);
  evtListadoTerminado.observa(CtrlListado.prototype.listadoTerminado, this);
}
CtrlListado.prototype.almacenamientoListo = function() {
  evtBuscaInstancias.dispara(this.tipo);
};
CtrlListado.prototype.iniciaListado = function(tipo) {
  if (this.tipo === tipo) {
    this.lista.iniciaListado();
  }
};
CtrlListado.prototype.elementoDeListado = function(tipo, modelo) {
  if (this.tipo === tipo) {
    this.lista.elementoDeListado(modelo);
  }
};
CtrlListado.prototype.listadoTerminado = function(tipo) {
  if (this.tipo === tipo) {
    this.lista.listadoTerminado();
  }
};
