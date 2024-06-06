const temy = JSON.parse(document.getElementById('temy').textContent);
const odbory = JSON.parse(document.getElementById('odbory').textContent);
const ucitelia = JSON.parse(document.getElementById('ucitelia').textContent)
const studenti = JSON.parse(document.getElementById('studenti').textContent)
let filters = document.getElementById("filters")
let filter_odbor = document.getElementById("filter_odbor")
let filter_konzultant = document.getElementById("filter_konzultant")
let filter_dostupnost = document.getElementById("filter_dostupnost")
let filter_nazov = document.getElementById("filter_nazov")
let table = document.getElementById("items")

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

filters.addEventListener("change", draw_table)
filter_nazov.addEventListener("input",draw_table)

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
    let summary = document.createElement('summary');
    let left = document.createElement('p');
    let right = document.createElement('p');
    let info = document.createElement('ul')
    let popis = document.createElement("li")
    let konzultant = document.createElement("li")
    let student = document.createElement("li")
    let odbor = document.createElement("li")
    let kontroly = document.createElement("li")

    left.className = "left";
    left.textContent = tema.nazov;
    right.className = "right";
    right.textContent = tema.dostupnost;
    popis.textContent = `Popis: ${tema.popis}`;
    konzultant.textContent = `Konzultant: ${konzultant_meno}`;
    odbor.textContent = `Odbor: ${odbor_nazov}`;
    kontroly.textContent = `Kontroly: ${tema.kontroly} / 3`;

    table.appendChild(detail);
    detail.appendChild(summary);
    detail.appendChild(info);
    summary.appendChild(left);
    summary.appendChild(right);
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
}
draw_table();