var Ripple = {/*definimos un objeto ripple*/
  init: function(selector){/*metodo init que va a recibir como argumento un selector*/
    document.querySelectorAll(selector).forEach(el => this.transform(el));/*buscamos todos los botones que coincidan con el selector y van a tener este efecto*/
  },                                                                      /*a cada uno de ellos vamos a trnasformarlo pasando como argumento el elemento*/
                                                                          /*for each itera todos la lista ducumentquerysel.. y ejecuta la funcion una vez por cada elemento*/
  transform: function(element){/*ejecuta la funcion para que el metodo transfor sea el que se encargue de hacer lo necesario para q el efecto suceda*/
    element.addEventListener('click',function(ev){/*sobre el elemento al hacer click ejecuta la funcion que recibe un evento*/

      element.style.position = 'relative';/*para q nos de la distancia relativa al borde del¡ LA posicion del boton y no del DOM*/

      let coords = {/*son las coordenadas sobre las que pulsa una persona dentro del elemento*/
        x: ev.x,
        y: ev.y
      };
      let rect = element.getBoundingClientRect();/*este metodo nos retorna un objeto q tiene valores relativos a la posicion del elemento en el DOM*/

      let clickPosition = {/*nos da las coordenadas finales donde se da click*/
        x: coords.x - rect.left,/*valor de left esta referido al rect elemento menos orilla de la pagina*/
        y: coords.y - rect.top
      }

      let ripple = document.createElement('span');/*creamos un nuevo nodo q va a ser un elemento span*/
      /*EL SPAN POR DEFECTO SE MUESTA CON DISPLAY INLINE POR ELLO SE MODIFICA LA PROPIEDAD POSITION*/
      /*definimos unos estilos y este es un template string*/
      /*esta parte que sigue de styles es para generar las ondas con circulos q animamos*/
      let styles = `
        width: ${rect.width * 2}px;
        height: ${rect.width * 2}px;
        background-color:white;
        opacity:0.56;
        border-radius:50%;
        position:absolute;
        top: ${clickPosition.y - rect.width}px;
        left: ${clickPosition.x - rect.width}px;
        transform: scale(0);
        transition: all 0.3s cubic-bezier(0.3, 0.0, 0.2, 1);
      `;
      ripple.style.cssText = styles;/*aplicamos estos estilos al ripple*/

      setTimeout(()=>{/*aplicamos un transform al ripple para que crezca y simule la ola pasando del anterior scal(0) a escale(1)*/
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';/*y tambien eliminamos la opacidad cuando ya hemos clicado*/
      },50);

      setTimeout(()=>{
        ripple.remove();
      },350);/*300 mls del transition en styles mas 50 del settimeout*/

      element.appendChild(ripple);/*con el metodo appendchild aplicamos los estilos sobre el boton*/

    })
  }
}
