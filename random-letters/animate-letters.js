var Animator = {/*creamos un objeto animator*/
  animate: function(options){/*pasamos una funcion animate*/


    options.stagger = options.stagger || 200;/*retraso por cada letra para iniciar la animacion el valor que nos den o 200 si no nos dan ninguno*/
    options.staggerPerLetter = options.staggerPerLetter || 50;/*retraso entre cada cambio de fotograma*/

    let el = document.querySelector(options.selector);/*selector del elemento q vamos a animar*/

    let text = el.innerText;/*obtenemos el texto del elemento de la fila 8*/
    el.innerText = "";/*guardamos el texto en una variable para luego borrar el texto del contenido*/

    for(letter_index in text){/*iteramops con un ciclo for in para ir separando el texto por letra*/

      let letter = text[letter_index];/*obtenemos cada una de las letras del texto utilizando el index*/
      console.log(letter);
      let span = document.createElement('span');/*creamos un span para cada una de estas letras para q los separemos y los animemos uno por uno*/
      span.innerText = ' ';/*pasamos un string vacio al span*/
      el.appendChild(span);/*lo agregamos hacia el elemento*/


      setTimeout(()=>{/*para q despues de cierto tiempo ejecute la animacion*/
        this.animateLetter({/*pasamos un json con una serie de opciones*/
          element: span,/*el elemento q contiene la letra*/
          letter: letter,/*la letra q queremos que se muestre al finalizar la animacion*/
          stagger: options.staggerPerLetter/*velocidad del cambio en las letras*/
        })/*tanto el retraso por letra linea 27 como el retraso para iniciar la animacion linea 28 lo pasamos por el json de opciones*/
      },options.stagger*letter_index)/*lineas 4 y 5 utilizamos los valores de esas lineas*/

    }
  },
  animateLetter: function(options,contador = 0){/* a aprte del jeson de opciones genero un contador q por defecto su valor es cero*/
    /*metodo q va a generar la animacion el contador indica cuando terminar*/
    if(contador > 20) return options.element.innerText = options.letter;/*
/*si el contador es mayor a 20 iteraciones agregamos al elemento(span q recibimos en el json de opciones con la clave element linea 24) le añadimos el valor final de la letra linea 25*/
  /*quiere decir que ejecutamos 20 cambios antes de colocar la letra final*/
    contador++;/*incrementamos el valor en 1 para que no se cicle nuestra animacion*/

    setTimeout(()=>{/*volvemos a llamar a la funcion(animateletter) pero con el valor contador incrementado*/
      /*asi aumentamos de uno en uno hasta llegar a 20 y saber que no hay que hacerlo más*/
      options.element.innerText = this.generateRandomChar();/*insertamos en el elemento un caracter aleatorio*/
      this.animateLetter(options,contador);/*llamamos de nuevo a esta funcion animateletter conlos mismos argumentos*/
    },options.stagger)
  },
  generateRandomChar: function(){/*funcion para generar letras al azar*/
    return Math.random().toString(36).substr(2,1);/*mathrandom nos devuelve un valor,tostring nos devuelve una cadena de la que seleccionamos a partir de la posicion 2 el primer elemento*/
  }
}
