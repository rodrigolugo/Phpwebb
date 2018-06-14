/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
function ColumnaAncla(pagina, id, campo) {
  this.pagina = codificaHtml(pagina);
  this.id = id;
  this.campo = campo;
}
ColumnaAncla.prototype.html = function(renglon, modelo) {
  return "<a href='" + this.pagina + "#" + modelo["id"] + "'>"
      + codificaHtml(modelo[this.campo]) + "</a>";
};
function ColumnaAnclaTelefono(encabezado, campo) {
  this.encabezado = encabezado;
  this.campo = campo;
}
ColumnaAnclaTelefono.prototype.html = function(renglon, modelo) {
  var valor = modelo[this.campo];
  var telefono = codificaHtml(valor ? valor.toString() : "");
  return "<a href='tel:" + telefono + "' target='_top'>" + telefono + "</a>";
};
function ColumnaTexto(encabezado, campo) {
  this.encabezado = encabezado;
  this.campo = campo;
}
ColumnaTexto.prototype.html = function(renglon, modelo) {
  var valor = modelo[this.campo];
  return codificaHtml(valor ? valor.toString() : "");
};