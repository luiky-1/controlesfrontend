const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

class Calendar{/*recibimos como constructor de nuestra clase options*/
  constructor(options){
    this.date = options.date || new Date();/*fecha en que queremos que inicie y si no indicamos una se pasa a la otra parte del operados or y coge en la que estemos, la fecha actual*/
                /*si ésta primera (.options) parte tiene datos no pasa a la segunda new Date*/
    this.container = options.container;/*el contenedor lo asociamos como propiedad de la clase*/

    // TO DO: Manejo botones

    this.calendarTable = null;/*la tabla es vacía porque si se ponen datos hay que hacer una para cada mes y año*/
    this.onselect = options.onselect;/*donde guardamos la propiedad onselect*/

    this.buildTable();/*metodo que construye la tabla*/
    this.bindEvents();/*evento que va a encajar los eventos de los botones*/
    this.updateTable();
  }

  updateTable(){/*actualizamos la tabal al mes que queramos ver y obtenemos ese dato de la variable thi.date fila 6*/
    this.calculateDates();

    let firstDayInWeek = this.monthStart.getDay();/*primer dia del mes,metodo getday nos devuleve un entero entre el 0 y el 6, el dia de la semana con la que empieza*/

    let trs = this.calendarTable.querySelectorAll('tr');/*cogemos todas la filas que hay en la tabla, busca (querysel...) dentro de (calendartable)*/

    for (var i = 0; i <= 5; i++) {
      let tr = trs[i];/*obtenemos filas, hace referencia a lassemanas*/

      let tds = tr.querySelectorAll('td');/*por cada una de las filas buscamos las celdas,con el selector td nos devuelve todaslas filas*/
      for (var j = 0; j < 7; j++) {
        let td = tds[j];/*obtenemos cada una de las celdas*/
        let day = (i*7) + j;/*obtenemos el dia para colocarlo dentro de la celda*/

        if(day >= firstDayInWeek && (day-firstDayInWeek) < this.monthLength){
          td.innerHTML = day - firstDayInWeek + 1;/*coloca los dias delmes empezando en el 1*/
          td.style.borderStyle = 'solid';/*las celdas que tienen datos con borde solido*/
          td.dataset.day = day - firstDayInWeek + 1;/*guardamos el dia en que estamos*/
        }else{
          td.style.borderStyle = 'none';/*para q desaparezaca el borde en las celdas vacias*/
          td.innerHTML = '';/*si la celda no se cumple nada de lo anterior,le marcamos un string vacio para que la celda este vacia*/
          td.removeAttribute('data-day');/*para q las celdas vacias no asuman la propiedad dataset del dia en q estamos*/
        }
      }

      // table.appendChild(tr);
    }

    this.container.querySelector('header').innerHTML = `${months[this.date.getMonth()]} - ${this.date.getFullYear()}`;
    /*buscamos dentro de container el elemento header y lo insertaos con innerHTML = obtenemos mes y año*/
                                                      /*operador de interpolacion disponible en los string template*/

  }

  bindEvents(){
    this.buttons = {};/*creamos un objeto vacio*/

    this.buttons.prev = document.createElement('button');/*creamos los botones*/
    this.buttons.next = document.createElement('button');

    this.buttons.prev.innerHTML = 'Anterior';/*añadimos texto al interior de los botones*/
    this.buttons.next.innerHTML = 'Siguiente';

    this.container.querySelector('.body').appendChild(this.buttons.prev);/*dentro del contenedor buscamos el elemento body y le agrgamos el boton previous*/
    this.container.querySelector('.body').appendChild(this.buttons.next);

    this.buttons.prev.addEventListener('click',()=> this.prev());/*agregamos el evento q cuando le demos click avance o retroceda*/
    this.buttons.next.addEventListener('click',()=> this.next());
  }

  calculateDates(){/*metodo que nos indica cuando empieza el mes, cuando termina y cuandos dias tiene*/
    this.monthStart = new Date(this.date.getFullYear(),this.date.getMonth(),1);/*obtenemos el primer dia del mes*/
    this.monthEnd = new Date(this.date.getFullYear(),this.date.getMonth() + 1,1);/*obtenemos el mes siguiente y el primer dia del mes siguiente*/

    this.monthLength = Math.floor((this.monthEnd - this.monthStart) / (1000 * 60 * 60 * 24));/*el valor q nos devolvia era en milisegundos por ello se hace la conversion*/
                      /*mathfloor redondea el resultado hacia abajo*/
  }

  next(){/*creamos metodo para mover los botones de mes en mes*/
    let month = this.date.getMonth();/*obtenemos el mes a traves de getmonth*/

    if(month == 11){/*si el mes es diciembre*/
      this.date = new Date(this.date.getFullYear()+ 1, 0,1);/*obtenemos una nueva fecha donde obtenemos el año completo actual y le aumentamos un añi, mes enero,dia 1*/
    }else{
      this.date = new Date(this.date.getFullYear(),month + 1,1);/*sabemos el mes por la variable month y le aumentamos 1 mes*/
    }

    this.updateTable();/*actualizamos la tabla*/
  }

  prev(){
    let month = this.date.getMonth();

    if(month == 0){/*si es enero*/
      this.date = new Date(this.date.getFullYear()- 1,11,1);/*le restamos 1 q es diciembre*/
    }else{
      this.date = new Date(this.date.getFullYear(),month - 1,1);/*si no es enero solo le restamos 1 al mes*/
    }

    this.updateTable();
  }

  select(el){
    if(!el.dataset.day) return;/*si no tiene un valor valido en el atributo datadate retornamos sin hacer nada*/ 
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), el.dataset.day);/*obtenemos el dia que seleccionamos*/

    this.onselect(date);/*manadamos la fecha anterior a la funcion onselect q guardamos en la linea 13*/
  }

  buildTable(){/*creamos la tabla*/
    let table = document.createElement('table');/*creamos un nodo o etiqueta table*/
    let thead = document.createElement('thead');/*creamos el encabezado*/

    for (var i = 0; i < 7; i++) {/*como son siete dias creamos un ciclo for que comienza a contar la linea 1*/
          /* vamos del 0 (domingo) al numero menor que 7(sabado)*/
      let td = document.createElement('td');/*creamos una celda*/
      td.innerHTML = days[i];/*ponemos dentro de la celda el dia al que corresponde,arreglo days e ndex i que recorre obteniendo los dia que declaramos en la constante de arriba*/
      thead.appendChild(td);/*insertamos la columna. appanchild inserta el nodo td dentro de del nodo thead al final de todos sus hijos*/
    }

    for (var i = 0; i <= 5; i++) {/*es una fila cantidad de semanas del mes*/
      let tr = document.createElement('tr');/*por cada semana creamos una fila, tr es el cuerpo de la tabla*/
      for (var j = 0; j < 7; j++) {/*cambiamos la variable para que no haya problemas con la anterior i*//*es una columna,cantidad del dias*/
        let td = document.createElement('td');/*creamos las celdas,td es el head de la tabla*/
        td.addEventListener('click',(ev)=> this.select(ev.currentTarget));/*para q cuando se le di click mande a llamar al metodo select
        tr.appendChild(td);/*las celdas las insertamos en cada una de las filas*/
      }

      table.appendChild(tr);/*al final agregamos a la tabala las filas q hemos ido generando*/
    }

    this.calendarTable = table;
    table.appendChild(thead);/*insertamos el thead en la tabla*/

    let body = document.createElement('div');/*creamos el div q llamamos body*/
    body.classList.add('body');/*agregamos la clase body a body*/
    body.appendChild(table);/*a body le agregamos la tabla*/

    this.container.classList.add('facilito-calendar');/*añadimos clase al contaier para que los estilos css no se mezclen con otros que pueda tener la pagina*/

    this.container.appendChild(document.createElement('header'));/*agregamos un encabezado*/
    this.container.appendChild(body);/*al contenedor le añadimos un hijo q tenga un div*/




  }
}
