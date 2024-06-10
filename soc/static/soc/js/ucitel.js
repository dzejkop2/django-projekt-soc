import { kontroly_dots } from "./kontroly.js";

const items = document.querySelectorAll("#item");
console.log(items)

items.forEach(item => {
    if(item.querySelector('#buttons') != null) {
        const cont = item.querySelector('#buttons');
        const kontroly = item.querySelector("#kontroly")
        const kontroly_input = item.querySelector("#kontroly_input")
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
            kontroly.dataset.id = counter;
            kontroly_input.value = counter;
        });
        kontroly.dataset.id = counter;
        kontroly_input.value = counter;
    }
});
