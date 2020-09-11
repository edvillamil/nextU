<?php
  	require('./conector.php');
/*enviar los parámertos de conexión mysqli*/
$con = new ConectorBD();
/*Conectarse a la base de datos agenda_db*/
$response['conexion'] = $con->initConexion($con->database);
if($response['conexion'] == 'OK'){
   
    session_destroy ( );
    header("Location: ..\client\index.html");
    exit;


 ?>