import { kontroly_dots } from "./kontroly.js";

const cont = document.querySelector('#buttons');
const kontroly = document.querySelector("#kontroly")
const kontroly_input = document.querySelector("#kontroly_input")
let counter = parseInt(kontroly.dataset.id)

cont.addEventListener('click', (event) => {
    if(event.target.id == "plus") {
        if(counter < 3){
            counter += 1;
            kontroly.dataset.id = counter;
            kontroly_dots();
        }
    } else if(event.target.id == "minus") {
        if(counter > 0) {
            counter -= 1;
            kontroly.dataset.id = counter;
            kontroly_dots();
        }
    }
    kontroly_input.value = counter;
});