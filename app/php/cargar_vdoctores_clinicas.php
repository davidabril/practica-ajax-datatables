<?php

/* Informacion de la base de datos */
include("mysql.php" ); 

/* Vista que vamos a utilizar */
$table = 'vdoctores';
 
/* Clave primaria de la tabla */
$primaryKey = 'id_doctor';
 
/* Array con los datos */
$columns = array(
    array( 'db' => 'id_doctor', 'dt' => 'idDoctor' ),
    array( 'db' => 'nombre',  'dt' => 'nombre' ),
    array( 'db' => 'numcolegiado',   'dt' => 'numcolegiado' ),
    array( 'db' => 'clinicas',     'dt' => 'nombreClinica' ),
    array( 'db' => 'id_clinica',     'dt' => 'idClinica' )
);
 
 
/* Incluimos la clase ssp.class.php */ 
require( 'ssp.class.php' );

/* Devolvemos la representacion como cadena en json de la vista */
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);
