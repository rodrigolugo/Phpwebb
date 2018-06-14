/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
"use strict";
function aseguraRespuestaCorrecta(xhr) {
  if (xhr.status < 300) {
    return true;
  } else {
    var respuesta = xhr.responseText;
    if (respuesta.indexOf("rickamr-error:") >= 0) {
      evtError.dispara(respuesta.substring("rickamr-error:".length));
      return false;
    }
  }
  evtError.dispara(xhr.statusText);
  return false;
}
function getFecha(fecha) {
  return fecha ? fecha.substr(0, 10) : fecha;
}
function getHora(fecha) {
  return fecha ? fecha.substr(11, 5): fecha;
}
function getFechaYHora(fecha) {
  return fecha ? fecha.substr(0, 16) : null;
}