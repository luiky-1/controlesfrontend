const likeTemplate = `
  <svg width="70" height="60" viewBox="0 0 70 60" class="heart">
    <path d="M0 10 L10 10 L10 0 L30 0 L30 10 L40 10 L40 0 L60 0 L60 10 L70 10 L70 30 L60 30 L60 40 L50 40 L50 50 L40 50 L40 60 L30 60 L30 50 L20 50 L20 40 L10 40 L10 30 L0 30 Z" fill="#EC613C" fill-rule="evenodd" />
  </svg>
  `;
  /*al agregar la clase heart le agrega la animacion de css de la linea 11*/
  /*es un elemento svg q es la animacion*/
class LikeMe{
  constructor(selector){/*recibimos el selector del elemento al q podemos dar like*/
    this.el = document.querySelector(selector);/*aqui guardamos el elemento del DOM q queremos seleccionar*/
    this.el.style.position = "relative";

    this.bindEvents();
  }

  bindEvents(){
    this.el.addEventListener("dblclick",(ev)=>{/*existe un evento para doble click: dblclick*/
      this.buildHeart();/*llamamos a la funcion q construye el corazon*/
      this.el.appendChild(this.heart);/*al elemento le insertamos el corazon dentro de él*/
    })
  }

  buildHeart(){/*funcion para construir el corazon*/
    this.heart = document.createElement("div");
    this.heart.style.position = "absolute";/*que coloque el corazon en una pos determinada, con absolute lo podemos manipular abiertammente*/
    this.heart.style.top = "40%";
    this.heart.style.left = "40%";
    this.heart.innerHTML = likeTemplate;/*insertamos el template svg de la pag style que se inserta en este div*/
  }

}
(function(){

  new LikeMe(".card");/*inicializamos la clase y le indicamos que lo haga sobre el elemento card*/
                      /*si le pongo body el corazon apareceria en la pag*/
})();
