function kontroly_dots() {
    const kontroly = document.querySelectorAll("#kontroly");
    kontroly.forEach(kontrola => {
        kontrola.style.fontSize = "24px";
        kontrola.textContent = "";
        for (let i = 0; i < 3; i++) {
            if(i < kontrola.dataset.id) {
                kontrola.textContent += "☑";
            } else {
                kontrola.textContent += "☐";
            }
        }
    });
}

kontroly_dots();
export {kontroly_dots}