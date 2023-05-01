# Airlines project front end


Sistema para la búsqueda de vuelos, lo primero que verá en pantalla al ingresar en la app será un botón de iniciar la función de este es hacer una peticion a servidor backend el cual generará un token jwt el cual se almacenará en el localstorage y será utilizado para la autenticación de los servicios, este tiene una validez de 5 minutos. Se utilizó un interceptor para verificar las peticiones y regresar al home cuando las peticiones sean de tipo 401 'unauthorized'.


En la sección del formulario se aplicó validación de no datos iguales, solo letras, tres caracteres exactos por input, inputs no vacíos, se agrego el campo 'Tipo de moneda' para definir en qué tipo de moneda se traerán los resultados del servidor backend.


Los resultados de los vuelos se muestran en un componente de tipo acordeón, el cual contiene la información de cada una de las escalas si no es una ruta directa.


## Tecnologías utilizadas


- Angular
- Angular material
- rxjs


## Desarrollador


- nombre: Jerson alexis valencia
- Correo: jersonval1996@gmail.com
