# Airlines project front end

Sistema para la busqueda de vuelos, lo primero que vera en pantalla al ingresar en la app sera un boton de iniciar la funcion de este es hacer una peticion a servidor backend el cual generara un token jwt el cual se almacenara en el localstorage y sera utilizado para la autenticacion de los servicios, este tiene una validez de 5 minutos. Se utilizo un interceptor para verificar las peticiones y regresar al home cuando las peticiones sean de tipo 401 'unauthorized'.

En la seccion del formulario se aplico validacion de no datos iguales, solo letras, tres caracteres exactos por input, inputs no vacios, se agrego el campo 'Tipo de moneda' para definir en que tipo de moneda se traeran los resultados del servidor backend.

Los resultados de los vuelos se muestran en un componente de tipo acordeon, el cual contiene la informacion de cada una de las escalas si no es una ruta directa. 

## Tecnologias utilizadas

- Angular
- Angular material
- rxjs

## Desarrollador

nombre: Jerson alexis valencia
Correo: jersonval1996@gmail.com


