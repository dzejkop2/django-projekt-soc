function farby() {
    let dost = document.getElementsByClassName("right")
    for (let i = 0; i < dost.length; i++) {
        if(dost[i].textContent == "Zabrané") {
            dost[i].style.backgroundColor = "#c42121";
            dost[i].style.color = "#cfcfcf";
        } else if(dost[i].textContent == "Čakajúce") {
            dost[i].style.backgroundColor = "#bf681b";
            dost[i].style.color = "#cfcfcf";
        }
        else if(dost[i].textContent == "Voľné") {
            dost[i].style.backgroundColor = "#80bb33";
            dost[i].style.color = "white";
        }
    }
}

farby();