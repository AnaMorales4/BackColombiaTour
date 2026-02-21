# BackColombiaTour

API desarrollada con AdonisJS y PostgreSQL para la gestión de usuarios, tours y tiquetes del sistema Colombia Tour.

## Instalación y ejecución
1. Clonar el repositorio:
git clone https://github.com/AnaMorales4/BackColombiaTour.git

2. Ingresar al directorio del proyecto:
cd BackColombiaTour

Instalar dependencias:
npm install

Ejecutar el proyecto en modo desarrollo:
npm run dev

La aplicación estará disponible en:

http://localhost:3333

## Tecnologías utilizadas

- AdonisJS
- PostgreSQL
- Neon (servicio de base de datos en la nube)  
  https://neon.com
- Postman (para pruebas de endpoints)

## Proceso de desarrollo y decisiones tomadas

### 1. Diseño de la base de datos

El desarrollo comenzó con la definición de las tablas necesarias para el funcionamiento del sistema. Las tablas creadas fueron:

- usuarios  
- tours  
- tiquetes  

Cada tabla fue diseñada con sus respectivas columnas, llaves primarias y relaciones necesarias para garantizar la integridad de los datos.

### 2. Configuración de la base de datos

Una vez definida la estructura, se creó la base de datos en Neon (PostgreSQL en la nube).

Posteriormente:

- Se creó el archivo `.env` con las variables de entorno necesarias.
- Se configuró la conexión a la base de datos desde AdonisJS.
- Se agregó la estructura de variables al archivo `.env.example` para mantener buenas prácticas y facilitar la configuración en otros entornos.

### 3. Creación de modelos

Después de configurar la base de datos, se crearon los modelos correspondientes a cada tabla utilizando el comando:

`node ace make:model NombreDelModelo`

Esto permitió estructurar la lógica de acceso a datos de manera organizada y alineada con el ORM de AdonisJS.

### 4. Creación de controladores

Se desarrollaron controladores individuales para cada entidad (usuarios, tours y tiquetes).

En cada controlador se implementaron las siguientes acciones:

- Crear
- Visualizar un registro específico
- Actualizar
- Eliminar

Además, se agregó la lógica necesaria según la funcionalidad de cada entidad.

### 5. Configuración de rutas y pruebas

Posteriormente se configuraron las rutas correspondientes a cada controlador.

Una vez creadas las rutas:

- Se definieron los métodos HTTP necesarios.
- Se realizaron pruebas utilizando Postman.
- Se verificó que cada endpoint funcionara correctamente según lo esperado.

Las pruebas en Postman permitieron validar el correcto funcionamiento de los métodos creados y comprobar la integración con la base de datos.

## Despliegue

El backend fue desplegado utilizando Fly.io, ya que Vercel no soporta de forma adecuada aplicaciones desarrolladas con AdonisJS.

Adicional fly.io genera automaticamente los recursos e imagenes en Docker para hacer el despliegue

Enlace del backend desplegado:

https://bcolombiatour.fly.dev

Para el despliegue se configuró el entorno de producción, las variables de entorno necesarias y la conexión a la base de datos en Neon.
