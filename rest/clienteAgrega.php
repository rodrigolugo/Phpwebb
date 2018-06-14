<?php

/* Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
$json = json_decode($HTTP_RAW_POST_DATA);
try {
  include_once './conexion.php';
  $stm = $gbd->prepare("INSERT INTO cliente (nombre, telefono, email) "
          . "VALUES (:nombre, :telefono, :email)");
  $stm->execute(array(":nombre" => $json->nombre, ":telefono" => $json->telefono,
      ":email" => $json->email));
  print "OK";
  $gbd = null;
} catch (PDOException $e) {
  print "rickamr-error:" . $e->getMessage();
}