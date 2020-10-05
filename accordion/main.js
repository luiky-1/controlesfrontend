class Accordion{/*agregamos una clase accordeon*/
  constructor(selector, multiple=true){/*vamos a tener un constructor con el selector del acordeon*/
                      /*con multiple se abren los distintos items al mismo tiemoi*/
    this.accordion = document.querySelector(selector);/*guardamos ese elemento en una propiedad acordeon*/
    this.multiple = multiple;
    this.bindEvents();/*ejecutamos los diseños de los eventos*/
  }

  bindEvents(){
    this.accordion.querySelectorAll(".item header").forEach(itemHeader =>{/*seleccionamos todos los encabezados del item y a cada uno de ellos*/
    /*asi solo selcciona los items hijos de acordeon(.item y .accordion linea 3)*/
      itemHeader.addEventListener("click",()=>{/*agregamos un listener al click para abrir o cerrar el elemento*/
        let item = itemHeader.parentNode;
        this.validateMultiple(item);/*llamamos a la funcion validatemultiple*/
        item.classList.toggle("active");/*colocamos la clase active que abre o cierra el item con el click*/
      })

    });
  }
  validateMultiple(selectedItem){
    if(this.multiple) return;/*si la funcion multiple esta activa regresa y no hace nada mas*/

    this.accordion.querySelectorAll(".item").forEach(item => {/* si es falso, seleccionamos todos los items y para cada uno de ellos*/
      if(selectedItem == item) return;/*si el item que validamos es el mismo que el que seleccionamos no habria que hacerle mas*/
      item.classList.remove("active");/*le quitamos la clase active*/
    })
  }
}

(function(){
  new Accordion(".accordion")/*inicializamos la clase acordeon*/
/*si ponemos "a.accordion", false)solo despliega uno de cada vez,sino ponemos nada por defecto supone que es true*/
})()
