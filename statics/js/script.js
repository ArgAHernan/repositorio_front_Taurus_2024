//declaracion de variables//
const btnLeft = document.querySelector(".btn-left"),
    btnRight = document.querySelector(".btn-right"),
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section");
//------//

btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

//inicializacion de variables//
let operacion = 0;
counter = 0;
widthImg = 100 / sliderSection.length;

//funciones//
/*Nota: la variable sliderSection contiene las imagenes del Slider.
    La misma tiene un 100% de tamaño, al contener 3 imagenes, como en este caso,
    cada una medirá un 33.3(periodico).
*/
function moveToRight() {
    if (counter >= sliderSection.length - 1) {  //si el contador es mayor al tamañoñ del sliderSection (100%=2)//
        counter = 0;   //el contador vuelve a 0//
        operacion = 0; //operacion vuelve a 0//
        slider.style.transform = `translate(-${operacion}%)`; // aqui se traslada a la posicion 0, o sea a la primer imagen del slider.//
        slider.style.transition ="none" // al pasar de la imagen numero 2 a la 0 (img=0,1,2), no se realiza el efecto de transicion.//
        return; //sale del ciclo.//
    } 
    //si el contador No es mayor al 100%=2  (puede contener los valores 1 o 2)//    
    counter++ ; //el contador se incrementa en 1 (counter++ = counter=counter+1)//
    operacion = operacion + widthImg; //operacion se incrementa un 33,3%//
    slider.style.transform = `translate(-${operacion}%)`; //aqui se traslada a la posicion 1 o 2 de imagen.//
    slider.style.transition = "all ease .6s" //efecto de transicion.//
    }
   

function moveToLeft() {
    counter--; //el contador se decrementa en -1 (counter-- = counter=counter-1)//
    if (counter < 0 ) {  //si el contador es menor que 0//
        counter = sliderSection.length-1; //el contador pasa a tener como valor el numero 2 en este caso (img 3)//
        operacion = widthImg * (sliderSection.length-1) // operacion pasa a calcular el valor del widthImg (33,3%) * la posicion de la img.//
        slider.style.transform = `translate(-${operacion}%)`; // aqui se traslada a la posicion 2, o sea a la última imagen del slider.//
        slider.style.transition ="none" //al pasar de la imagen numero 0 a la 2 (img=0,1,2), no se realiza el efecto de transicion.// 
        return; //sale del ciclo.//
    } 
    operacion = operacion - widthImg; //operacion se decrementa un -33,3%//
    slider.style.transform = `translate(-${operacion}%)`; //aqui se traslada a la posicion 1 o 0 de imagen.//
    slider.style.transition = "all ease .6s" //efecto de transicion.//
    }

