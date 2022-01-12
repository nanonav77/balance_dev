<?php
 
    // ESTE CODIGO PHP CONECTA A LA BASE DE DATOS PARA AGREGAR UN NUEVO CLIENTE
    
    include '../db_conexion.php';

    $nombre_ingresado = $_GET['nombre_ingresado'];
    $apellido_ingresado = $_GET['apellido_ingresado'];
    $telefono_ingresado = $_GET['telefono_ingresado'];
    $fecha_ingresado = $_GET['fecha_ingresado'];
    $rol_ingresado = $_GET['rol_ingresado'];
    $estado_ingresado = $_GET['estado_ingresado'];
    $direccion_ingresado = $_GET['direccion_ingresado'];
    
    $conn = new mysqli( $servidor, $usuario, $password , $basededatos);

    // Check connection1
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "INSERT INTO balance_clientes (nombre,apellidos,fecha_pago,telefono,rol_asistencia,estado,direccion)
    values ('$nombre_ingresado','$apellido_ingresado','$fecha_ingresado','$telefono_ingresado','$rol_ingresado','$estado_ingresado','$direccion_ingresado')";

    if ($conn->query($sql) === TRUE) {
       
        echo mysqli_affected_rows($conn);
        
    } else {
        echo '0';
       
    }

    $conn->close();

?>