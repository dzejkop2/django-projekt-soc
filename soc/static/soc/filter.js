const temy = JSON.parse(document.getElementById('temy').textContent);
const odbory = JSON.parse(document.getElementById('odbory').textContent);
const ucitelia = JSON.parse(document.getElementById('ucitelia').textContent);
const studenti = JSON.parse(document.getElementById('studenti').textContent);
const dostupnost = JSON.parse(document.getElementById('dostupnost').textContent);
let filters = document.getElementById("filters")
let filter_odbor = document.getElementById("filter_odbor")
let filter_konzultant = document.getElementById("filter_konzultant")
let filter_dostupnost = document.getElementById("filter_dostupnost")
let filter_nazov = document.getElementById("filter_nazov")
let table = document.getElementById("items")

console.log(temy)
console.log(dostupnost)

odbory.forEach(odbor => {
    let opt = document.createElement('option');
    opt.value = odbor.id;
    opt.textContent = `${odbor.cislo} - ${odbor.nazov}`;
    filter_odbor.appendChild(opt);
});

ucitelia.forEach(ucitel => {
    let opt = document.createElement("option");
    opt.value = ucitel.id;
    opt.textContent = `${ucitel.meno} ${ucitel.priezvisko}`;
    filter_konzultant.appendChild(opt)
});

dostupnost.forEach(dost => {
    let opt = document.createElement('option');
    opt.value = dost.id;
    opt.textContent = dost.nazov;
    filter_dostupnost.appendChild(opt)
});

filters.addEventListener("change", draw_table);
filter_nazov.addEventListener("input",draw_table);


function draw(tema) {
    let konzultant_meno, student_meno, odbor_nazov;
    ucitelia.forEach(ucitel => {
        if(ucitel.id == tema.conzultant_id){
            konzultant_meno = `${ucitel.meno} ${ucitel.priezvisko}`
        } 
    });
    studenti.forEach(student => {
        if(tema.student_id !== null)
        {   
            if(student.id == tema.student_id){
                student_meno = `${student.meno} ${student.priezvisko} ${student.trieda}`
            } 
        }
        else {
            student_meno = null;
        }
    });
    odbory.forEach(odbor => {
        if(odbor.id == tema.odbor_id){
            odbor_nazov = `${odbor.cislo} - ${odbor.nazov}`
        } 
    });

    let detail = document.createElement('details');
    let left = document.createElement('summary');
    let right = document.createElement('p');
    let info = document.createElement('ul')
    let popis = document.createElement("li")
    let konzultant = document.createElement("li")
    let student = document.createElement("li")
    let odbor = document.createElement("li")
    let kontroly = document.createElement("li")
    let dost;
    dostupnost.forEach(element => {
        if(element.id == tema.dostupnost_id) {
            dost = tema.dostupnost_id - 1;    
        }
    });
    left.className = "left";
    left.textContent = tema.nazov;
    right.className = "right";
    right.textContent = dostupnost[dost].nazov;
    popis.textContent = `Popis: ${tema.popis}`;
    konzultant.textContent = `Konzultant: ${konzultant_meno}`;
    odbor.textContent = `Odbor: ${odbor_nazov}`;
    kontroly.textContent = `Kontroly: ${tema.kontroly} / 3`;

    table.appendChild(detail);
    detail.appendChild(left);
    left.appendChild(right);
    detail.appendChild(info);
    info.appendChild(popis);
    info.appendChild(konzultant);
    if(student_meno !== null) {
        student.textContent = student_meno;
        info.appendChild(student);
    }
    info.appendChild(odbor);
    info.appendChild(kontroly);

}

function filter_odbor_func() {
    let arr = Array();
    temy.forEach(tema => {
        if(tema.odbor_id == filter_odbor.value) {
            arr.push(temy.indexOf(tema));
        } else if(filter_odbor.value == "") {
            arr.push(temy.indexOf(tema));
        } 
    });
    return arr;
};

function filter_konzultant_func() {
    let arr = Array();
    temy.forEach(tema => {
        if(tema.conzultant_id == filter_konzultant.value) {
            arr.push(temy.indexOf(tema));
        } else if(filter_konzultant.value == "") {
            arr.push(temy.indexOf(tema));
        } 
    });
    return arr;
}

function filter_dostupnost_func() {
    let arr = Array();
    temy.forEach(tema => {
        if(tema.dostupnost == filter_dostupnost.value) {
            arr.push(temy.indexOf(tema));
        } else if(filter_dostupnost.value == "") {
            arr.push(temy.indexOf(tema));
        } 
    });
    return arr;
}

function filter_nazov_func() {
    let arr = Array();
    const filterText = filter_nazov.value.toLowerCase();
    temy.forEach(tema => {
        let text = tema.nazov.toLowerCase();
        if (text.includes(filterText)) {
            arr.push(temy.indexOf(tema))
        }
    });
    return arr;
}

function fin_arr(...arrays) {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];
    return arrays[0].filter(item =>
        arrays.every(array => array.includes(item))
    )
}

function draw_table() {
    if(table.childElementCount != 0) {
        while (table.firstChild) {
            table.removeChild(table.lastChild);
        }
    }
    let arr_odbory = filter_odbor_func();
    let arr_konzultanti = filter_konzultant_func();
    let arr_dostupnost = filter_dostupnost_func();
    let arr_nazov = filter_nazov_func();
    fin_arr(arr_odbory,arr_konzultanti,arr_dostupnost,arr_nazov).forEach(tema => {
        draw(temy[tema]);
    });
    let dost = document.getElementsByClassName("right")
    console.log(dost)
    for (let i = 0; i < dost.length; i++) {
        if(dost[i].textContent == "Zabrané") {
            dost[i].style.backgroundColor = "#c42121";
        } else if(dost[i].textContent == "Čakajúce") {
            dost[i].style.backgroundColor = "#bf681b";
        }
        else if(dost[i].textContent == "Voľné") {
            dost[i].style.backgroundColor = "#5dbf11";
        }
    }
}
draw_table();