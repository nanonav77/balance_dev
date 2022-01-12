<?php

    // ESTE CODIGO PHP CONECTA A LA BASE DE DATOS PARA OBTENER LOS CLIENTES TOTALES

    include '../db_conexion.php';
       
    $return_arr = array();
	
	// creación de la conexión a la base de datos con mysql_connect()
	$conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
	// Selección del a base de datos a utilizar
	$db = mysqli_select_db( $conexion, $basededatos ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
	// establecer y realizar consulta. guardamos en variable.
    $consulta = "SELECT * FROM balance_clientes";
	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

   if ($conexion)
   {
       while($row = mysqli_fetch_array($resultado)){
          $row_array['id'] = $row['id'];
          $row_array['nombre'] = $row['nombre'];
          $row_array['apellidos'] = $row['apellidos'];
          $row_array['telefono'] = $row['telefono'];
          $row_array['fecha_pago'] = $row['fecha_pago'];
          $row_array['rol_asistencia'] = $row['rol_asistencia'];
          $row_array['estado'] = $row['estado'];
          array_push($return_arr,$row_array);
       }  
   }

    mysqli_close($conexion);

    echo json_encode($return_arr);

?>