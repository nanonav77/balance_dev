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