

//const weekDays = ['Nkenge', 'Mpangala', 'Nsona', 'Mbala', 'Konzo', 'Ndele', 'Nkandu'];
//const weekDaysP = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function zellerCongruence(year) {
    let K = year % 100;
    let J = Math.floor(year / 100);

    let h = (6 + Math.floor((13 * (4 + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;
    return (h + 5) % 7;
}

function dayOfWeekBase(year, baseYear, baseWeekday) {
    // Número de anos bissextos entre o ano base e o ano desejado
    const leapYears = Math.floor((year - 1) / 4) - Math.floor((baseYear - 1) / 4);
    const nonLeapYears = (year - baseYear) - leapYears;

    // Dias totais entre o ano base e o ano desejado
    const totalDays = (leapYears * 366) + (nonLeapYears * 365);

    // Dia da semana ajustado a partir do dia da semana base
    return (baseWeekday + totalDays) % 7;
}
ciclo = function(ordem, baseYear, Nlendu) {
    const denomicao = ["Kani", "Mayindo", "M'vita", "Ntambululu", "Kani-nkenge", "Mayindo-nsona", "M'vita-konzo", "Nambululu-nkandu"]
    const tbody = document.getElementById("calendar-body");
    let lastordem = 0;
    let zeller = zellerCongruence(ordem + baseYear);
    let fuku = '';
    let mwini = '';
    let ciclo = '';
    let firsR = '';
    firsR = `
     <tr id="firstRow">
        <td class="vertical-text" rowspan="8">${Nlendu}
        </td>
        <td rowspan="4" class="vertical-text">
            Fuku
        </td>
     <td>1º Ano: </td>
        <td>${denomicao[0]}</td>
        <td>0${ordem}</td>
        <td>1 de Kintombo</td>
        <td>${weekDays[zeller]}</td>
        <td>1º Ano:</td>
        <td>${ordem+baseYear}</td>
        <td>6 de Abril</td>
        <td>${weekDaysP[zeller]}</td>
        </tr>
`;
    fuku += firsR;

    for (let index = 2; index < 5; index++) {
        let day = zellerCongruence((ordem + index - 1) + baseYear);
        fuku += `
    <tr>
    <td>${index}º Ano: </td>
        <td>${denomicao[index-1]}</td>
        <td>0${ordem+index-1}</td>
        <td>1 de Kintombo</td>
        <td>${weekDays[day]}</td>
        <td>${index}º Ano: </td>
        <td>${(ordem+index-1)+baseYear}</td>
        <td>6 de Abril</td>
        <td>${weekDaysP[day]}</td>
        </tr>
`;
    }

    for (let index = 5; index < 9; index++) {
        let day = zellerCongruence((ordem + index - 1) + baseYear);
        mwini += `
    <tr class="mwini">
        ${index === 5 ? '<td rowspan="4" class="vertical-text">Mwini</td>' : ''}
    <td>${index}º Ano: </td>
    <td>${denomicao[index-1]}</td>
        <td>0${ordem+index-1}</td>
        <td>1 de Kintombo</td>
        <td>${weekDays[day]}</td>
        <td>${index}º Ano: </td>
        <td>${(ordem+index-1)+baseYear}</td>
        <td>6 de Abril</td>
        <td>${weekDaysP[day]}</td>
        </tr>
        `;
        lastordem = (ordem + index - 1);
    }
    ciclo = fuku + mwini;
    tbody.innerHTML += ciclo;
    return (lastordem + 1);
}

lunkogulo = function(year, baseYear, nlendu) {
    const ano = year;
    // const formula = (ano / 24) - ((ano % 24) / 24) + 1;
    const formula = 9;
    const ordem = ano < 0 ? (formula * 24) : (formula - 1) * 24;
    const firstCicle = ciclo(ordem, baseYear, nlendu);
    const secondCicle = ciclo(firstCicle, baseYear, nlendu);
    ciclo(secondCicle, baseYear, nlendu);

}
lunkogulo(currentYear, 1887, "Reino Animal");