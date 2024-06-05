const temy = JSON.parse(document.getElementById('temy').textContent);
const odbory = JSON.parse(document.getElementById('odbory').textContent);
const ucitelia = JSON.parse(document.getElementById('ucitelia').textContent)
const studenti = JSON.parse(document.getElementById('studenti').textContent)
let filter_test = document.getElementById("filter_test")
let table = document.getElementById("items")

draw_table();

filter_test.addEventListener("change",draw_table)
odbory.forEach(odbor => {
    let opt = document.createElement('option');
    opt.value = odbor.id;
    opt.textContent = `${odbor.cislo} - ${odbor.nazov}`;
    filter_test.appendChild(opt);
});

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

function draw_table() {
    if(table.childElementCount != 0) {
        while (table.firstChild) {
            table.removeChild(table.lastChild);
        }
    }
        
    temy.forEach(tema => {
        if(tema.odbor_id == filter_test.value) {
            draw(tema);

        } else if(filter_test.value == "") {
            draw(tema);
        } 
    });
};
draw_table();