/// ESTE CÓDIGO CONTIENE LAS FUNCIONALIDADES RELACIONADA LOS CLIENTES ///

/// --- 1. LISTAR LA BASE DE LOS CLIENTES ---

function obtenerListaClientes(){

    //$("#table_update_colaboradores").find("tr:gt(0)").remove(); // Limpiamos la tabla para obtener los datos según los filtros  
       
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','../logicaDatos/clientes/db_get_clientes_totales.php',true);
    
    xhttp.send();
    
    xhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                let datos = JSON.parse(this.responseText);
           
                for(let item of datos){
                    
                    // Obtenemos el resultado de la consulta y la mostramos en la tabla respectiva
                    
                    var table = document.getElementById("table_lista_clientes"); // Referencia a la tabla de lista de colaboradores que se desean actualizar
                    {
                        var row = table.insertRow(1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);                        
                      
                        cell1.innerHTML = item.nombre;      
                        cell2.innerHTML = item.apellidos;
                        cell3.innerHTML = item.telefono;
                        cell4.innerHTML = item.fecha_pago;                                       
                        
                        // VALIDAMOS EL ESTADO DEL CLIENTE
                        if(item.estado == 1){
                            cell5.innerHTML = "<td><span class='badge badge-success'>Activo</span></td>"; 
                            cell6.innerHTML = "<td class='text-center'><div class='list-icons'><div class='dropdown'><a href='#' class='list-icons-item' data-toggle='dropdown'><i class='icon-menu9'></i></a><div class='dropdown-menu dropdown-menu-right'><a href='#' class='dropdown-item'><i class='icon-user-minus'></i> Inactivar</a><a href='#' class='dropdown-item'><i class='icon-pencil'></i> Editar</a></div></div></div></td>";
                        }
                        else{
                            cell5.innerHTML = "<td><span class='badge badge-danger'>Inactivo</span></td>"; 
                            cell6.innerHTML = "<td class='text-center'><div class='list-icons'><div class='dropdown'><a href='#' class='list-icons-item' data-toggle='dropdown'><i class='icon-menu9'></i></a><div class='dropdown-menu dropdown-menu-right'><a href='#' class='dropdown-item'><i class='icon-user-check'></i> Activar</a><a href='#' class='dropdown-item'><i class='icon-pencil'></i> Editar</a></div></div></div></td>";
                        }                      

                    }   
                  
                }
                
            }
            
    }
}

/// --- 2. FUNCION PARA ALMACENAR LOS CLIENTES ---

document.querySelector('#buttonIngresarInfoClientes').addEventListener('click', insertarClientes); // BOTON EJECUTA LA FUNCIÓN

function insertarClientes(){
    
    var nombre = document.getElementById("campoNombreCliente").value;
    var apellidos = document.getElementById("campoApellidosCliente").value;
    var fechaIngreso = document.getElementById("campoFechaIngresoCliente").value;
    var telefono = document.getElementById("campoTelefonoCliente").value;
    var rolAsistencia = document.getElementById("campoRolAsistenciaCliente").value;
    var estado = document.getElementById("campoEstadoCliente").value;
    var direccion = document.getElementById("campoDireccionCliente").value;

    /// Ajustar el formato de la fecha tal y como le necesita la BD
    let current_datetime = new Date(fechaIngreso);
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();

    if(nombre.length == 0 || apellidos.length == 0 || telefono.length == 0 || direccion.length == 0){        
        document.getElementById("buttonNotificarVacio").click();
    }

    else{
        
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET','../logicaDatos/clientes/db_set_clientes.php?nombre_ingresado='+nombre+'&apellido_ingresado='+apellidos
        +'&telefono_ingresado='+telefono+'&fecha_ingresado='+formatted_date+'&rol_ingresado='+rolAsistencia
        +'&estado_ingresado='+estado+'&direccion_ingresado='+direccion,true);

        xhttp.send();
        
        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){

                    var validacion_existencia = this.responseText; // variable trae el valor de php donde 0 ya está creado y 1 que se puede crear como nuevo registro
                    
                    if (validacion_existencia == 0){
                        
                        document.getElementById('buttonNotificarExistencia').click();
                        
                    }
                    else{                        
                        document.getElementById("buttonNotificarInsercion").click();
                        
                        document.getElementById('campoNombreCliente').value = " ";
                        document.getElementById('campoApellidosCliente').value = " ";
                        document.getElementById('campoFechaIngresoCliente').value = " ";
                        document.getElementById('campoTelefonoCliente').value = " ";
                        document.getElementById('campoRolAsistenciaCliente').value = " ";
                        document.getElementById('campoEstadoCliente').value = " ";
                        document.getElementById('campoDireccionCliente').value = " ";
                    }
                    
                }
                
        } 
        
    }
}
