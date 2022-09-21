## Proyecto utilizado para descargar links de [Anime Fenix](https://animefenix.com/)
La idea del proyecto es poder tener links de Anime Fenix de manera sencilla sin ingresar uno por uno a cada capítulo.
Los links se crearán en la carpeta especificada más abajo y en un nombre de archivo .txt generado con el mismo nombre que el animé.
El archivo .txt no se reemplaza, si se ejecuta nuevamente el proceso, los links se crearán más abajo.

### Archivo .env:
```env
LIMIT= # Numero final del archivo 
USER= # Username de AnimeFenix
PASSWORD=  # Password de AnimeFenix
ANIMENAME= # Nombre del anime en la Url de Anime Fenix.
STORAGENAME= # Nombre del storage que se busca descargar [mega, mediafire, zippyshare, fireload, 1fichier, burstcloud]. Valor por defecto: mega
FOLDER=links # Carpeta donde se dejarán los links. Valor por defecto: links
```

## Como encontrar el ANIMENAME

Hay que buscar el animé y luego copiar el nombre que figura en el navegador.

![](/assets/AnimeName.png)

## Como encontrar el LIMIT

Es básicamente el número de capitulo final del cual se busca el número.

![](/assets/Limit.png)

## Cómo ejecutar:

Primero ejecutar

```shell
npm i
```

y luego

```shell
npm start
```
