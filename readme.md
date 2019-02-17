# Duendecillos en tu navegador: service workers

En este repositorio están recogidos todos los ejemplos mostrados en nuestra charla realizada en el frontfest 2019.

[Enlace a las demos](https://duendecillosentunavegador.azurewebsites.net/)

[Enlace a las slides](https://docs.google.com/presentation/d/1ZZ7xcWqyCAc76yi3iKA5GAOapy3yVjb_Q183R4iypg8/edit?usp=sharing)

#### Descripción

```
¿Nunca has pensado que sería genial poder contar con una ayuda extra a la hora de que tus aplicaciones trabajaran? Ahora es posible contar con unos pequeños ayudantes en tu navegador, los service workers.

En esta charla pretendemos dar a conocer todas las posibilidades que hay detras de los Services Workers más allá del cacheo de recursos en cliente. Tenemos como objetivo desmitificar lo que se esconde detrás de esta tecnología y mostrar algunas de las muchas posibilidades que ofrece.

Tras una introducción inicial mostraremos algunos ejemplos de como crear tu service workers y las distintas apliciones prácticas que puedes llegar a conseguir.
```

#### Indice de demos

[01 - Blocking ui](./01_blocking_ui/blocking_ui.html)

Demostración de como a través de los web workers es posible realizar procesos pesados en background evitando así que el thread principal del navegador se congele.    

[02 - Basic cache](./02_basic_cache/basic_cache.html)

Típico caso de uso de los SW para el cacheo de recursos de manera que también sea posible continuar navegando por nuestra aplicación aunque nos quedemos sin conexión.

[03 - Caching strategies](./03_caching_strategies/index.html)

Ejemplo de uso de algunas de las principales estrategias de cacheo.

+ **Cache only** - Consiste en cachear recursos para luego mostrarlos siempre desde la cache      
+ **Cache and update** - Consite en mostrar los recursos cacheados para acto seguido actualizar la cache con el recurso remoto. De esta manera siempre tendremos la última versión del recurso aunque será mostrada al usuario cuando recarga la página de nuevo.
+ **Cache, update and refresh** - Una vuelta de tuerca a la estrategia anterior en la que tras actualizar la cache también refrescamos el recurso mostrado al usuario.

[04 - Updating SW and cache](./04_updating_sw_and_cache/updating_sw_and_cache.html)

Demostración del funcionamiento del ciclo de vida de los SW mediante la instalación y actualización de un SW.

[05 - Broken images](./05_broken_images/index.html)

Demostración de las ventajas que nos aporta el mecanismo de `Immediate claim` para mostrar una imagen de placeholder en los casos en los que la imagen solicitada no exista en el servidor remoto.

[06 - Request log](./06_request_log/index.html)

Demostración de la estrategia a seguir a la hora de guardar estado entre sesiones de un SW mediante un log que guarda todas las llamadas que se hacen a través de este.

Los SW no matienen estado entre sesiones por lo que es necesario usar APIs como la de IndexedDB que nos permiten tener una base de datos local consultable.

[07 - Background task](./07_background_task/background_task.html)

Demostración de que el ciclo de vida de un SW depende del navegador y no de la página que lo registra. En esta demo se puede iniciar un proceso en background que continua anque cerremos todas las pestañas de nuestra aplicación y siempre que dejemos el navegador abierto.

[08 - Tab messaging](./08_tab_messaging/tab_messaging.html)

Demostración de como el contexto de un SW es compartirdo por todos los clientes que lo registran. Gracias a esta característica podemos compartir mensajes entre las diferentes pestañas de nuestra app usando el SW.

[09 - Push notifications](./09_push_notifications/push_notifications.html)

Demostración de como se pueden usar los SW para recibir notificaciones push de nuestra aplicación. Esto nos permite mandar notificaciones incluso cuando los usuarios no estan usando nuestra aplicación.

#### Autores

**Paqui Calabria** [Twitter](https://twitter.com/Zurribulle)

**Ismael Navarro** [Twitter](https://twitter.com/ismanapa)