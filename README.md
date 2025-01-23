# Sitio Web Hospital San Itario (v3)
Repositorio que contiene la capa de front-end del sitio web del Hospital San Itario. Esta versión se desarrolló usando el framework React.

## Alumno
Felipe Cárdenas Molina

## Despliegue local
Para desplegar el sitio en su ambiente local, se debe realizar lo siguiente:

1. Clonar el repositorio del sitio web:
```
git clone git@github.com:pipecm/adalid-frontend-hospital-2025.git
```

2. Acceder a la carpeta recientemente descargada:
```
cd adalid-frontend-hospital-2025
```

3. Ejecutar el comando para instalar las dependencias de Bootstrap:
```
npm install
```

4. Ejecutar el comando para levantar localmente el sitio web:
```
npm run dev
```

5. Abrir un browser y acceder al sitio del hospital por medio de la siguiente URL:
```
http://localhost:5173
```

Si todo lo anterior se realizó correctamente, se debería visualizar el sitio web como en la imagen siguiente:

![Sitio web](images/website_react.png "Sitio web")

## Ejercicio técnico Nº2 - Módulo 4
### Manejo del DOM virtual en ReactJS
Para la renderización eficiente de la información en la aplicación, se usa el hook `useEffect()` con el fin de modificar en el DOM real sólo los elementos que fueron modificados en el DOM virtual. Ello se usó para obtener los datos de doctores y servicios médicos (`App.jsx`)

### Creación y uso de referencias en React
En el componente `SearchComponent` se implementaron aspectos como la creación y uso de referencias, con el fin de controlar un campo de un formulario de búsqueda y llamar a un callback en caso de ingresar un valor incorrecto (en el ejemplo sólo se permiten letras en la barra de búsqueda).

### Uso de fragmentos y contexto en React
Para el uso de fragmentos se utilizaron los componentes `DoctorCard` y `ServiceCard`, los cuales consisten en las "tarjetitas" con la información de servicios y doctores. Por otro lado, se utilizó `Context` para gestionar una lista de especialidades médicas, las cuales se muestran inmediatamente debajo de la barra de búsqueda.

### Verificación de tipos con PropTypes
Se implementó el uso de `PropTypes` para procesar las listas e ítemes relativos a doctores y servicios médicos. Particularmente, en la lista de doctores se envía un doctor con información incompleta, lo cual gatilla mensajes de error visibles en la consola, haciendo referencia a campos marcados con `isRequired`.

### Uso de componentes de orden superior (HOC) y Portales
Para la implementación de los modales para ver mayores detalles de servicios y doctores, se usó `React.createPortal`. Asimismo, tales modales consisten en HOCs, los cuales son "enriquecidos" con una función que añade una imagen al componente informativo (`withPhoto.jsx`) 

### Optimización de rendimiento y Profiler
Finalmente, se implementó el uso de un `Profiler` en el componente que muestra la lista de especialidades obtenidas desde el `Context`mencionado anteriormente. Asimismo, para optimizar el renderizado de dicho componente se implementó mediante `React.memo()` el componente `SpecialtyView`.

## Ejercicio técnico Nº3 - Módulo 4
### Implementación de Vistas Complejas con ReactJS
Para las vistas complejas se implementó un `Context`, el cual tiene por objeto almacenar el valor de la vista actual, la cual está seteada por defecto para la vista `Home`.

### Optimización del DOM Virtual y Uso de Fragmentos
En la aplicación se usaron fragmentos en varios de los componentes que eventualmente podría implicar el uso de etiquetas `div` innecesarias, como por ejemplo `CurrentView`.

### Uso de Referencias y Callbacks
En el componente `AppointmentForm` se añadió foco al campo del nombre del usuario, el cual corresponde al primer campo que aparece en el formulario, desde arriba hacia abajo.

### Manejo de Datos con API REST Simulada
Para simular una llamada a una API REST se utilizaron archivos JSON con información "en duro", de manera de poder procesarlos asíncronamente mediante `fetch()` y `useEffect()`.

### Optimización de Rendimiento y Uso de Profiler
Se implementó el uso del `Profiler` en los componentes que procesan las listas de médicos y servicios, con ello se logró optimizar su rendimiento con respecto a un commit anterior en la rama de desarrollo correspondiente a esta tarea.

### Comprobación de Tipos con PropTypes
Se comprueban los tipos de datos tal como se hizo con la tarea anterior, lo cual implica que se imprime un mensaje de error en la consola en caso de encontrar un error de datos relativo a PropTypes.

