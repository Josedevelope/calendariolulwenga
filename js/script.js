const weekDays = ['Nkenge', 'Mpangala', 'Nsona', 'Mbala', 'Konzo', 'Ndele', 'Nkandu'];
let ano = null;
const weekDaysP = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const dayMandombe = [
    "dia-01.svg", "dia-02.svg", "dia-03.svg", "dia-04.svg", "dia-05.svg",
    "dia-06.svg", "dia-07.svg", "dia-08.svg", "dia-09.svg", "dia-10.svg",
    "dia-11.svg", "dia-12.svg", "dia-13.svg", "dia-14.svg", "dia-15.svg",
    "dia-16.svg", "dia-17.svg", "dia-18.svg", "dia-19.svg", "dia-20.svg",
    "dia-21.svg", "dia-22.svg", "dia-23.svg", "dia-24.svg", "dia-25.svg",
    "dia-26.svg", "dia-27.svg", "dia-28.svg", "dia-29.svg", "dia-30.svg",
    "dia-31.svg"
];

//const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const monthG = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
let meses = [
    'Kintombo',
    'Kyela',
    'Lwanza',
    'Sivu',
    'Lunkyesa',
    'Mbangala',
    'Senze Kyamasanza',
    'Masanza',
    'Kundi',
    'Ntomoni',
    'Kyanza',
    'Manisa'
];

console.log(meses);

const daysInMonthG = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const data = {
    0: [3, 15, 26, 32, 37, 43, 54, 60, 65, 71, 82, 88, 93, 99, 110, 116, 121, 127, 138, 144, 149, 155],
    1: [4, 9, 16, 21, 27, 38, 44, 49, 55, 66, 72, 77, 83, 94, 100, 105, 111, 122, 128, 133, 139, 150, 156],
    2: [10, 22, 28, 33, 39, 50, 56, 61, 67, 78, 84, 89, 95, 106, 112, 117, 123, 134, 140, 145, 151],
    3: [0, 5, 11, 17, 23, 34, 40, 45, 51, 62, 68, 73, 79, 90, 96, 101, 107, 118, 124, 129, 135, 146, 152, 157],
    4: [6, 12, 18, 24, 29, 35, 46, 52, 57, 63, 74, 80, 85, 91, 102, 108, 113, 119, 130, 136, 141, 147, 158],
    5: [1, 7, 13, 19, 30, 36, 41, 47, 58, 64, 69, 75, 86, 92, 97, 103, 114, 120, 125, 131, 142, 148, 153, 159],
    6: [2, 8, 14, 20, 25, 31, 42, 48, 53, 59, 70, 76, 81, 87, 98, 104, 109, 115, 126, 132, 137, 143, 154, 160]
};
const codeMonthLulwenga = [6, 2, 5, 0, 2, 4, 0, 2, 4, 6, 1, 4]


let baseDay = 0;

function dayOfWeekBase(year, baseYear, baseWeekday) {
    // Número de anos bissextos entre o ano base e o ano desejado
    const leapYears = Math.floor((year - 1) / 4) - Math.floor((baseYear - 1) / 4);
    const nonLeapYears = (year - baseYear) - leapYears;

    // Dias totais entre o ano base e o ano desejado
    const totalDays = (leapYears * 366) + (nonLeapYears * 365);

    // Dia da semana ajustado a partir do dia da semana base
    return (baseWeekday + totalDays) % 7;
}

function zellerCongruence(year) {
    let K = year % 100;
    let J = Math.floor(year / 100);

    let h = (6 + Math.floor((13 * (4 + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;
    return (h + 5) % 7;
}

function generateCalendar(year) {
    const daysInMonth = [31, 31, 30, 30, 30, 31, 30, 30, 30, 30, 31, 31];

    const calendar = [];
    const baseYear = 1887;
    const numberToFind = year - baseYear;
    const yearToFind = numberToFind + baseYear;

    let baseWeekday = zellerCongruence(year);

    baseDay = baseWeekday;
    ano = numberToFind;

    if (((year + 1) % 4 === 0 && (year + 1) % 100 !== 0) || ((year + 1) % 400 === 0)) {
        daysInMonth[9] = 31; // Fevereiro tem 29 dias em ano bissexto
        daysInMonthG[1] = 29;
        baseDay = 1;
    } else {
        daysInMonth[9] = 30; // Fevereiro tem 29 dias em ano bissexto
        daysInMonthG[1] = 28;
        baseDay = baseWeekday;

    }


    let firstDayOfYear = dayOfWeekBase(year, yearToFind, baseWeekday);

    for (let month = 0; month < 12; month++) {
        const monthDays = [];
        for (let day = 1; day <= daysInMonth[month]; day++) {
            const dow = (firstDayOfYear + day - 1) % 7; // Calcular o dia da semana baseado no primeiro dia do ano
            monthDays.push({ day, dow });
        }
        firstDayOfYear = (firstDayOfYear + daysInMonth[month]) % 7; // Atualiza para o próximo mês
        calendar.push(monthDays);
    }

    return calendar;
}

function printCalendar(year) {
    const calendar = generateCalendar(year);
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    calendar.forEach((monthDays, monthIndex) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        // teste

        const lukongolo = document.getElementById("lukongolo");
        const formula = (ano / 24) - ((ano % 24) / 24) + 1;
        const formula1 = ano < 0 ? (formula * 24) : (formula - 1) * 24;
        lukongolo.textContent = formula1;



        const monthNameG = new Date(year, monthIndex + 3).toLocaleString('pt-BR', { month: 'short' }) + "-" + new Date(year, monthIndex + 4).toLocaleString('pt-BR', { month: 'short' });
        const monthHeaderG = document.createElement('h4');
        monthHeaderG.textContent = `${monthNameG} ${year}`;
        if (monthIndex > 8) {
            monthHeaderG.textContent = `${monthNameG} ${year + 1}`;
        }


        const monthName = meses[monthIndex]
        const monthHeader = document.createElement('h3');
        monthHeader.textContent = `${monthName} - ${year-1887}`;
        if (year - 1887 === 0) {
            monthHeader.textContent = `${monthName} - Ano singini`;
        }
        if (year - 1887 < 0) {
            monthHeader.textContent = `${monthName} - ${(year-1887)*-1} tee.sk`;
        }



        monthDiv.appendChild(monthHeader);
        monthDiv.appendChild(monthHeaderG);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const trP = document.createElement('tr');

        weekDays.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            tr.appendChild(th);
        });



        weekDaysP.forEach(day => {
            const thG = document.createElement('th');
            thG.textContent = day;
            trP.appendChild(thG);
        });

        thead.appendChild(tr);
        thead.appendChild(trP);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let trBody = document.createElement('tr');

        // Preenche os dias vazios no início da primeira semana
        for (let i = 0; i < monthDays[0].dow; i++) {
            const td = document.createElement('td');
            trBody.appendChild(td);
        }

        monthDays.forEach(({ day, dow }) => {
            const td = document.createElement('td');
            const divGregorian = document.createElement('div');
            divGregorian.className = 'tdG';;
            // Verifica se o mês é setembro (8 porque é baseado em 0) e o dia é 12
            if (monthIndex === 8 && day === 12) {
                const div = document.createElement('div');
                div.textContent = '12';
                td.appendChild(div);
            } else {
                //td.textContent = day;
                const imgElement = document.createElement('img');
                imgElement.src = 'source/svg/' + `${dayMandombe[day-1]}`;
                if (dow == 6)
                    imgElement.src = 'source/svg/red-' + `${dayMandombe[day-1]}`;
                // O caminho para o arquivo SVG
                imgElement.width = 32;
                // Anexa o elemento de imagem ao div
                td.appendChild(imgElement);

                if (monthIndex === 0) {
                    let daMandmb = day + 5;
                    if (daMandmb - daysInMonthG[3] > 0) {
                        daMandmb = daMandmb - daysInMonthG[3];
                        divGregorian.textContent = daMandmb + ` ${monthG[3 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[3]}`;
                    }
                }

                // KYELA
                if (monthIndex === 1) {
                    let daMandmb = day + 6;
                    if (daMandmb - daysInMonthG[4] > 0) {
                        daMandmb = daMandmb - daysInMonthG[4];
                        divGregorian.textContent = daMandmb + ` ${monthG[4 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[4]}`;
                    }
                }
                // LANZA
                if (monthIndex === 2) {
                    let daMandmb = day + 6;
                    if (daMandmb - daysInMonthG[5] > 0) {
                        daMandmb = daMandmb - daysInMonthG[5];
                        divGregorian.textContent = daMandmb + ` ${monthG[5 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[5]}`;
                    }
                }
                // SV
                if (monthIndex === 3) {
                    let daMandmb = day + 6;
                    if (daMandmb - daysInMonthG[6] > 0) {
                        daMandmb = daMandmb - daysInMonthG[6];
                        divGregorian.textContent = daMandmb + ` ${monthG[6 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[6]}`;
                    }
                }
                // LKS
                if (monthIndex === 4) {
                    let daMandmb = day + 5;
                    if (daMandmb - daysInMonthG[7] > 0) {
                        daMandmb = daMandmb - daysInMonthG[7];
                        divGregorian.textContent = daMandmb + ` ${monthG[7 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[7]}`;
                    }
                }
                // MBAG
                if (monthIndex === 5) {
                    let daMandmb = day + 4;
                    if (daMandmb - daysInMonthG[8] > 0) {
                        daMandmb = daMandmb - daysInMonthG[8];
                        divGregorian.textContent = daMandmb + ` ${monthG[8 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[8]}`;
                    }
                }
                // snz
                if (monthIndex === 6) {
                    let daMandmb = day + 5;
                    if (daMandmb - daysInMonthG[9] > 0) {
                        daMandmb = daMandmb - daysInMonthG[9];
                        divGregorian.textContent = daMandmb + ` ${monthG[9 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[9]}`;
                    }
                }
                // mansanga
                if (monthIndex === 7) {
                    let daMandmb = day + 4;
                    if (daMandmb - daysInMonthG[10] > 0) {
                        daMandmb = daMandmb - daysInMonthG[10];
                        divGregorian.textContent = daMandmb + ` ${monthG[10 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[10]}`;
                    }
                }
                // knd
                if (monthIndex === 8) {
                    let daMandmb = day + 4;
                    if (daMandmb - daysInMonthG[11] > 0) {
                        daMandmb = daMandmb - daysInMonthG[11];
                        divGregorian.textContent = daMandmb + ` ${monthG[0]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[11]}`;
                    }
                }
                // ntmn
                if (monthIndex === 9) {
                    let daMandmb = day + 3;
                    if (daMandmb - daysInMonthG[0] > 0) {
                        daMandmb = daMandmb - daysInMonthG[0];
                        divGregorian.textContent = daMandmb + ` ${monthG[0 + 1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[0]}`;
                    }
                }
                // kyanza
                if (monthIndex === 10) {
                    let daMandmb = day + 2; // 2 !! 3 v
                    if (baseDay === 1) {
                        daMandmb = day + 3;
                    }

                    if (daMandmb - daysInMonthG[1] > 0) {
                        daMandmb = daMandmb - daysInMonthG[1];
                        divGregorian.textContent = daMandmb + ` ${monthG[1+1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[1]}`;
                    }
                }
                // mansa
                if (monthIndex === 11) {
                    let daMandmb = day + 5;
                    if (daMandmb - daysInMonthG[2] > 0) {
                        daMandmb = daMandmb - daysInMonthG[2];
                        divGregorian.textContent = daMandmb + ` ${monthG[2+1]}`;
                    } else {
                        divGregorian.textContent = daMandmb + ` ${monthG[2]}`;
                    }
                }

            }




            // Adicionando uma classe específica aos finais de semana
            if (dow === 6) {
                td.classList.add('weekend');
            }

            trBody.appendChild(td);
            td.appendChild(divGregorian);

            if (dow === 6) {
                tbody.appendChild(trBody);
                trBody = document.createElement('tr');
            }
        });

        for (let index = monthDays.length + baseDay; index < (7 * ((parseInt((monthDays.length + baseDay) / 7)) + 1)); index++) {
            const td = document.createElement('td');
            trBody.appendChild(td);

        }

        // Append remaining days in the last week
        tbody.appendChild(trBody);
        table.appendChild(tbody);
        monthDiv.appendChild(table);
        calendarDiv.appendChild(monthDiv);
    });
    showMonth(0);
}

function showMonth(monthIndex) {
    const months = document.querySelectorAll('.month');
    months.forEach((month, index) => {
        month.style.display = index === monthIndex ? 'block' : 'none';
    });
}

let currentMonth = 0;
let currentYear = new Date().getFullYear();

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) currentYear--;
    printCalendar(currentYear);
    showMonth(currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear++;
    printCalendar(currentYear);
    showMonth(currentMonth);
});

document.getElementById('generateCalendar').addEventListener('click', () => {
    const yearInput = document.getElementById('year-input').value;
    const year = parseInt(yearInput, 10);

    if (!isNaN(year)) {
        currentYear = year;
        currentMonth = 0;
        printCalendar(year);
    } else {
        alert('Por favor, insira um ano válido.');
    }
});

function printDiv(divId) {
    // Obtém a div
    var divToPrint = document.getElementById(divId);
    var newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write('<html><head><title>CALENDÁRIO MANDOMBE</title>');
    newWindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'); // Adicione seus estilos aqui
    newWindow.document.write('</head><body>');
    newWindow.document.write(divToPrint.innerHTML); // Escreve o conteúdo da div
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print(); // Chama a função de impressão
    // Fecha a janela após a impressão
}
printCalendar(currentYear);