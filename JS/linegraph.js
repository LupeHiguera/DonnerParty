var baseData; // represents base data
var data = []; // represents working data, basically the months

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('Data/DonnerPartyDeaths.csv')])
        .then(function (values) {
            var holder = values[0];
            for (var i = 0; i < holder.length; i++) {
                var person = holder[i];
                person.Age = parseInt(person.Age);
                person.DeathDate = new Date(person.DeathDate);
            }
            baseData = holder;
            data = holder;
            //console.log(baseData);
        })
});

function LineGraphDrawGraph() {
    console.log("Graphing Line Chart")
    LineGraphSetData(); // data is readied (based off of options user selected) in global variable data

    var yMin = 0;
    var yMax = data[10].Deaths;

    let yScale = d3.scaleLinear().domain([yMax + 2, yMin]).range([0, 390]);
    let axisLeft = d3.axisLeft(yScale);

    let xScale = d3.scaleTime()
        .domain([new Date("1846-05-1"), new Date("1847-03-1")])
        .range([0, 520]);
    let axisBottom = d3.axisBottom(xScale);

    const svg = d3.select('#SVG3');
    svg.selectAll("*").remove();

    const g = svg.append('g')
        .attr('transform', 'translate(' + 25 + ', ' + 25 + ')');

    g.append('g').call(axisLeft).attr('transform', 'translate(' + 5 + ', ' + 0 + ')');;
    g.append('g').call(axisBottom).attr('transform', 'translate(' + 5 + ', ' + 390 + ')');

    var sumstat = d3.group(data, d => d["grouping"]);

    //console.log(sumstat)

    svg.selectAll('.line')
        .attr("class", "line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("d", function (d) {
            return d3.line()
                .x(function (d) { return xScale(d.Month); })
                .y(function (d) { return yScale(d.Deaths); })
                (d[1])
        })
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 3)
        .attr('transform', 'translate(' + 28 + ', ' + 26 + ')')
}

function LineGraphSetData() {
    console.log("getting select data");
    data = [
        { Month: new Date("1846-05-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-06-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-07-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-08-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-09-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-10-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-11-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1846-12-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1847-01-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1847-02-1"), Deaths: 0, groupId: "grouping" },
        { Month: new Date("1847-03-1"), Deaths: 0, groupId: "grouping" },
    ];
    var gender = document.getElementById("LineGraphDataSelectGender").value;
    var ageGroup = document.getElementById("LineGraphDataSelectAge").value;
    var deathReason = document.getElementById("LineGraphDataSelectDeathReason").value;
    var deathOutcome = document.getElementById("LineGraphDataSelectDeathOutcome").value;

    for (var i = 0; i < baseData.length; i++) {
        var holder = baseData[i];
        if (LineGraphCheckOption(gender, holder.Gender)) {
            if (LineGraphCheckAge(ageGroup, holder.Age)) {
                if (LineGraphCheckOption(deathReason, holder.DeathReason)) {
                    if (LineGraphCheckOption(deathOutcome, holder.DeathOutcome)) {
                        LineGraphIncrementMonthCount(holder);
                    }
                }
            }
        }
    }

    for (var i = 1; i < data.length; i++) {
        var prevTotalDeathCount = data[i - 1].Deaths;
        data[i].Deaths = prevTotalDeathCount + data[i].Deaths;
    }
    //console.log(data)
}

function LineGraphIncrementMonthCount(person) {
    switch (person.DeathDate.getMonth()) {
        case 4:
            data[0].Deaths = data[0].Deaths + 1
            break;
        case 7:
            data[3].Deaths = data[3].Deaths + 1;
            break;
        case 9:
            data[5].Deaths++;
            break;
        case 11:
            data[7].Deaths++;
            break;
        case 0:
            data[8].Deaths++;
            break;
        case 1:
            data[9].Deaths++;
            break;
        case 2:
            data[10].Deaths++;
            break;
        default:
        // code block
    }
}

function LineGraphCheckOption(selectOption, personAttribute) {
    if (selectOption == "All") {
        return true;
    }
    else if (selectOption == personAttribute) {
        return true;
    }
    else {
        return false;
    }
}

function LineGraphCheckAge(selectOption, personAttribute) {
    if (selectOption == "All") {
        return true;
    }
    else if (0 < personAttribute && personAttribute <= 18 && selectOption == "AgeGroup1") {
        return true;
    }
    else if (19 <= personAttribute && personAttribute <= 30 && selectOption == "AgeGroup2") {
        return true;
    }
    else if (31 <= personAttribute && personAttribute <= 50 && selectOption == "AgeGroup3") {
        return true;
    }
    else if (50 < personAttribute && selectOption == "AgeGroup4") {
        return true;
    }
    else {
        return false;
    }
}