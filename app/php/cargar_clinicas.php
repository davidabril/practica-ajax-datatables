<?php
// Datos de conexion para mi base de datos
$dbinfo = "mysql:dbname=datatables;host=localhost";
$user = "root";
$pass = "root";

// Intentamos conectar
try {
    // Conectamos a la BBDD 
    $db = new PDO($dbinfo, $user, $pass);
    // Inicializamos la conexion como utf8 para que coja correctamente caracteres españoles como la ñ
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}


// Preparamos y lanzamos la consulta
$sql = $db->prepare("SELECT id_clinica,nombre FROM clinicas");
/*$sql = $db->prepare("SELECT id_clinica,nombre FROM clinicas,clinica_doctor WHERE clinica.id_clinica=? and clinica.id_clinica=clinica_doctor.id_clinica");*/
$sql->execute();

// Declaramos una variable para almacer si todo fue bien o no, y lo comprobamos asignado

// Recorremos la consulta y devolvemos los options y los valores devueltos en la consulta       
while($okey = $sql->fetch()){
    echo '<option value="'.$okey[0].'">' . $okey[1] . "</option>";
}

// Liberamos recursos (BBDD y consulta)
$sql=null;
$db=null;

?>