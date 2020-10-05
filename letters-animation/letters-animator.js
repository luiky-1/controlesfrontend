var LettersAnimator = {/*exportamos el objeto LettersAnimator*/
  /*estilo para las letras*/
  /*con los datos de transform ocultamos sl span en el dom*/
  letterStyle: `
    margin-right:-0.25em;
    transform: scale(0) translateY(-40px);
    display:inline-block;
    transition: all 0.2s cubic-bezier(0.3, 0.0, 0.3, 1);
  `,
  /*estilo para las pañabras*/
  wordStyle: `
    margin-right:0.5em;
  `,

  init: function(selector){/*metodo init q recibe todos los elementos del selector q tenemos que animar*/
    document.querySelectorAll(selector).forEach(el=> this.spanLetters(el));/*a cada uno de ellos,elementos del selector, lo enviamos al metodo spanletters*/
  },
  spanLetters: function(el){/*creamos la funcion spanletters q recibe el elemento*/
    let text = el.innerText;/*obtenemos el texto, nos devuelve el nodo q tiene el texto*/
    el.innerHTML = '';/*nos deshacemos del texto y aparecensolo las letras en el dom*/
    let words = text.split(' ');/*separamos el texto en palabras*/

    let wordsSpan = [];/*obtiene todos los span con cada una de las palabras*/

    for(word_index in words){/*iteramos el arreglo en words para separar las palabras*/
      let word = words[word_index];/*para obtener las palabras pasamos el arreglo*/

      let span = document.createElement('span');/*creamos un nuevo span*/
      span.classList.add('word');/*le agregamos la clase word*/
      span.style.cssText = this.wordStyle;/*aplicamos el css a word definodo en la linea 10*/

      let lettersSpan = [];/*este arrgleo va a contener todas las letras de las palabras*/

      for(character_index in word){/*iteramos cada letra de cada palabra*/
        lettersSpan.push(`<span style='${this.letterStyle}' class='letter'>${word[character_index]}</span>`);
      }/*a este arreglo le agregamos un nuevo elemento span,le agregamos la clase letter y obtenemos cada letra.
        /*cada uno de estos caracteres(lo q esta entre parentesis) es un elemeto dentro de letterspan linea 30*/
        /*añadimos el css con style= letterstyle definido en la linea 3*/
      span.innerHTML = lettersSpan.join(' ');/*para insertarlo dentro del span q contendra toda la palabra,con join convertimos el arreglo en un string y q cada elemento este separado por un espacio*/
      wordsSpan.push(span);/*insertamos en wordspan linea 21 el span creado en linea 26*/
    }

    wordsSpan.forEach(span => el.appendChild(span));/*iteramos el span insertandolo en el elemento original*/

    this.animate(el);/*llamamos al metodo animate y le pasamos el elemento*/
  },
  animate: function(el){/*el metodo animate se encarga del retraso en cada una de las letras*/
    el.querySelectorAll('.letter').forEach((span,index)=>{/*selecciono todos los elementos span que contengan la clase letters*/
                                  /*iteramos el elemento span y la posicion index dentros del arreglo original sobre el que aplicamos la ietacion(el.querySelectorAll(letter))*/
                                  /*para cada uno ellos ejecutamos la funcion st time out*/
      setTimeout(()=>{
        span.style.transform= 'scale(1) translateY(0px)';/*para q el span se vuelva a ver*/
      },100*index);/*nos indica la duracion de la transicion segun la posicion q ocupa(index) contra linea 6*/
    })
  }
}
