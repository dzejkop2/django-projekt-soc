google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw_grafy);

function draw_grafy() {
    const zabrane = parseInt(document.getElementById('zabrane').textContent);
    const volne = parseInt(document.getElementById('volne').textContent);
    const cakajuce = parseInt(document.getElementById('cakajuce').textContent);

    const ucitelia_s_temamy = parseInt(document.getElementById('ucitelia_s_temamy').textContent);
    const ucitelia_bez_temy = parseInt(document.getElementById('ucitelia_bez_temy').textContent);

    const studenti_s_temamy = parseInt(document.getElementById('studenti_s_temamy').textContent);
    const studenti_bez_temy = parseInt(document.getElementById('studenti_bez_temy').textContent);

    let data_temy = google.visualization.arrayToDataTable([
        ['Typ', 'Pocet'],
        ['Zabrané', zabrane],
        ['Voľné', volne],
        ['Čakajúce', cakajuce]
    ]);

    var options_temy = {
        title: 'Témy'
    };

    var graf_temy = new google.visualization.PieChart(document.getElementById('graf_temy'));
    graf_temy.draw(data_temy, options_temy);

    var data_ucitelia = google.visualization.arrayToDataTable([
        ['Type', 'Count'],
        ['S témou', ucitelia_s_temamy],
        ['Bez témy', ucitelia_bez_temy]
    ]);

    var options_ucitelia = {
        title: 'Učitelia'
    };

    var graf_ucitelia = new google.visualization.PieChart(document.getElementById('graf_ucitelia'));
    graf_ucitelia.draw(data_ucitelia, options_ucitelia);

    var data_ziaci = google.visualization.arrayToDataTable([
        ['Type', 'Count'],
        ['S témou', studenti_s_temamy],
        ['Bez témy', studenti_bez_temy]
    ]);

    var options_ziaci = {
        title: 'Žiaci'
    };

    var chart_ziaci = new google.visualization.PieChart(document.getElementById('graf_studenti'));
    chart_ziaci.draw(data_ziaci, options_ziaci);
}