### Features

- Crud

# levantar aplicativo sin docker 

1.-clonar el repositorio

con git clone 

2.-cambiar a la rama donde este el codigo actualizado a la ultima version o ultimo commit de ser necesario

3.- instalar dependencias 

`npm install`

4.- correr app 
`npm start`

`HTTP://http://localhost:4200`

# levantar aplicativo con docker

### Codigo

#### comandos 
###### instalacion (seguir en orden)

`git clone https://github.com/kevinm9/crudangulartn.git`

`cd crudangulartn`

`git checkout origin/dockerangular`

`docker build -t kevinm9/angular-app .`

`docker image ls`


###### mensaje por consola

| REPOSITORY  | TAG  |  IMAGE ID | CREATED | SIZE |
| ------------ | ------------ | ------------ | ------------ | ------------ | 
|  kevinm9/angular-app | latest  | caf164fccdff |  18 seconds ago  | 187MB |

###### levantar contenedor

`docker run -d -it -p 4200:80/tcp --name angular-app kevinm9/angular-app:latest`

###### URL
`HTTP://URL de la máquina contenedora:4200`
###### o
`HTTP://http://localhost:4200`

[![captura](https://raw.githubusercontent.com/kevinm9/crudangulartn/dockerangular/foto1.png "captura")](https://raw.githubusercontent.com/kevinm9/crudangulartn/dockerangular/foto1.png "captura")


######  otros comandos

`docker ps`

`docker stop angular-app`



### End
