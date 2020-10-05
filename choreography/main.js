class Dim{
  static getWidth(el){/*METODO ESTATICO QUE RECIBE EL ELEMENTO EL Y RETORNA EL ELEMENTO*/
    let style = el.currentStyle = window.getComputedStyle(el);

    return el.offsetWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);/*OFFSETWIDTH ES ANCHO MAS PADDING*/
  }                         /*NOS DEVULEVE EL MARGEN A ALA DERECHA*/ /*Y A LA IZAUIERDA*/
}

class Choreography{

  constructor(container_selector, item_selector){
    this.container = document.querySelector(container_selector);/*padre*/
    this.elements = this.container.querySelectorAll(item_selector);/*hijos selcciono solo los que estan dentro del  container con this.*/

    this.elements.forEach(el =>{
       el.style.opacity = 0;
     });
      /*que al ppio aparezcan ocultos los elementos*/

    this.setDelay();
  }

  setDelay(){/*marca el retraso de los elementos con la animacion, los ultimos aparecen al final*/
    let itemWidth = Dim.getWidth(this.elements[0]);/*NOS DA EL ANCHO MAS EXACTO OBTENIDO EN LA FILA 5 PARA VER CUANTOS ELEMENTOS ENTRAN*/
    let itemsPerRow = Math.floor(this.container.clientWidth / itemWidth);/*mathfloor para redondear por abajo.cuantos items hay por fila,dividimos el ancho entre los items*/
    for (var i = 0; i < this.elements.length; i+= itemsPerRow) {          /*clientwidth no tiene en cuenta el margen por eso creamos la clase DIM*/

      for (var j = i; j < (i + itemsPerRow); j++) {/*ITERAMOS LA MATRIZ DE ELEMNTOS CON UN CICLO FOR ANIDADO,VAMOS A IR SUMANDO POR LOS ELEMENTOS DE LA FILA*/
        let xPosition = parseInt(i / itemsPerRow);
        let yPosition = j -i;

        let positionSum = xPosition + yPosition;/*SUMA DE LAS COORDENADAS*/



        this.elements[i+(j-i)].style.animationDelay = (positionSum*50)+"ms";/*RETRASO DE 50MS MULTIPLICADO POR LA PSICION Q OCUPA.ASI APARECEN A DISTINTO TIEMPO*/

      }
    }

    this.elements.forEach(el => el.classList.add("zoomIn"));/*COGEMOS CADA UNO DE LOS ELEMNTOS Y LE ASIGNAMOS LA CLASE ZOOMIN PARA Q INGRESE CON ESTE EFECTO*/
  }

}


(function(){
  new Choreography(".row",".card")/*mandamos llamar a la clase choreography ejecuta la funcion(padre,hijo)*/
})()
