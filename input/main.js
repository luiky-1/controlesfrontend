class InputMD{
  constructor(selector){/*viene el campo de texto al que aplicaremos esto*/
    this.input = document.querySelector(selector);
    this.bindEvents();/*colocamos unos eventos*/
  }

  bindEvents(){/*indicamos los eventos q van a ocurrir*/
    this.input.addEventListener("keyup",()=>{
      if(this.input.value == "") return this.input.classList.remove("non-empty");/*si el valor del input esta vacio le quitamos la clase no empty*/

      this.input.classList.add("non-empty")/*si el campo no esta vacio agregamos la clase no empty*/
    })
  }
}

(function(){
  new InputMD(".input-form input")/*iniciamiza la clase*/
})()
