 $(function(){
    getDatos();
    $('#formSucursal').submit(function(){
        addDatos();
        return false;
    })
 })


 //jalamos los datos
 const getDatos = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }; 
      fetch("http://192.168.1.100/proPaintersBE/api/Sucursales/GetSucursalesByEmpresa/1", requestOptions)
        .then(response => response.json())
        .then(result => {
            $('#tbody').html(null);

            result.forEach(element => {
                var tr = ` <tr>
                <td>${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.direccion}</td>
                <td>${element.telno}</td>
              </tr>`;
              $('#tbody').append(tr);
            });
        })
        .catch(error => console.log('error', error));
 }


//ingresamos datos

 const addDatos = () => {
    const nombre = $('#nombre').val();
    const direccion = $('#direccion').val();
    const telno = $('#telno').val();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var data = JSON.stringify(
        {
            "nombre": nombre,
            "direccion": direccion,
            "telno": telno,
            "estado": 1,
            "idEmpresa": 1
        }
    );
    var options = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    }
    fetch("http://192.168.1.100/proPaintersBE/api/Sucursales/AddSucursal", options)
    .then(response => response.json())
    .then(result => {
        alert(result.descripcionResult);
    })
    .catch(error => console.log('error', error));

}
