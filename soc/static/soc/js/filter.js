const filters = document.getElementById("filters")
const filter_odbor = document.getElementById("filter_odbor")
const filter_konzultant = document.getElementById("filter_konzultant")
const filter_dostupnost = document.getElementById("filter_dostupnost")
const filter_nazov = document.getElementById("filter_nazov")
const items = document.querySelectorAll("#item")

console.log(items)

function filter() {
    const odbor = filter_odbor.value;
    const konzultant = filter_konzultant.value;
    const dostupnost = filter_dostupnost.value;
    const nazov = filter_nazov.value.toLowerCase().trim();
    items.forEach(item => {
        const match_odbor = odbor === "" || odbor === item.querySelector('#odbor').dataset.id;
        const match_konzultant = konzultant === "" || konzultant === item.querySelector('#konzultant').dataset.id;
        const match_dostupnost = dostupnost === "" || dostupnost === item.querySelector('#dostupnost').dataset.id;
        const match_nazov = nazov.length === 0 || item.querySelector('#nazov').textContent.toLowerCase().trim().includes(nazov)
        
        if(match_odbor && match_konzultant && match_dostupnost && match_nazov){
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    })
};

filters.addEventListener("change",filter)
filter_nazov.addEventListener("input",filter)
