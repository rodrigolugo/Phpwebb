/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * ctrlConocidos file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
var NOMBRE = "nombre", TELEFONO = "telefono", DIRECCION = "direccion";
var columnas = [new ColumnaAncla("Proveedor.html", "id", "nombre"),
  new ColumnaAnclaTelefono("Teléfono", "telefono")];
var lista = new Lista("listado", "", "No hay contactos registrados.", columnas);
new CtrlListado("Proveedor", lista);