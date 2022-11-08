var demoData1 = [
    { key: "totalMales", value: 0 },
    { key: "totalFemales", value: 0 },
]

var demoData2 = [
    { key: "totalMarried", value: 0 },
    { key: "totalSingle", value: 0 },
]

var demoData3 = [
    { key: "maleMarried", value: 0 },
    { key: "maleSingle", value: 0 },
    { key: "femaleMarried", value: 0 },
    { key: "femaleSingle", value: 0 },
]

document.addEventListener('DOMContentLoaded', function () {
    // reads data into countryList
    Promise.all([d3.csv('Data/donner_party_full_data.csv')])
        .then(function (values) {
            //console.log(values[0]);
            var data = values[0];
            var holder;
            for (var i = 0; i < data.length; i++) {
                holder = data[i];
                if (holder["Sex"] == "M") {
                    demoData1[0].value++; // total males
                    if (holder["Marital Status"] == "M") {
                        demoData3[0].value++; // male married
                        demoData2[0].value++; // total married
                    }
                    else if (holder["Marital Status"] == "S") {
                        demoData3[1].value++; // male single
                        demoData2[1].value++; // total single
                    }
                }
                else if (holder["Sex"] == "F") {
                    demoData1[1].value++; // total females
                    if (holder["Marital Status"] == "M") {
                        demoData3[2].value++; // female married
                        demoData2[0].value++; // total married
                    }
                    else if (holder["Marital Status"] == "S") {
                        demoData3[3].value++; // male single
                        demoData2[1].value++; // total single
                    }
                }
            }
            //console.log(demoData1);
            //console.log(demoData2);
            //console.log(demoData3);
            DrawBarCharts();
        })
});

function DrawBarCharts() {
    // selects the svg2 and clears it
    const svg = d3.select('#SVG2');
    svg.select('g').remove();
    var g = svg.append("g").attr("transform", "translate(0,0)")

    // adds graph title
    g.append('text')
        .attr('x', '65')
        .attr('y', '50')
        .text("Male and Female Totals")
        .style("font-size", "20px")

    g.append('text')
        .attr('x', '110')
        .attr('y', '100')
        .text("56")
        .style("font-size", "20px")

    g.append('text')
        .attr('x', '205')
        .attr('y', '195')
        .text("33")
        .style("font-size", "20px")


    // creates xScale for demoData1
    var x1 = d3.scaleBand()
        .domain(demoData1.map(function (d) { return d.key; }))
        .range([0, 200])
        .padding(0.2);

    var xAxis1 = d3.axisBottom(x1);

    // creates yScale for demoData1
    var y1 = d3.scaleLinear()
        .domain([65, 0])
        .range([0, 250])
    var yAxis1 = d3.axisLeft(y1);

    // appends xAxis1 and yAxis1 to g
    g.append('g').call(xAxis1).attr('transform', 'translate(' + 70 + ', ' + 340 + ')').style("font-size", "14px");
    g.append('g').call(yAxis1).attr('transform', 'translate(' + 70 + ', ' + 90 + ')').style("font-size", "14px");

    var rects1 = g.selectAll("bar")
        .data(demoData1)
        .enter().append("rect")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .attr("x", function (d) { return x1(d.key); })
        .attr("y", function (d) { return y1(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) { return 250 - y1(d.value); })
        .attr('transform', 'translate(' + 70 + ', ' + 90 + ')').style("font-size", "14px")
        .attr("fill", "#761A24")


    // GRAPHS CHART 2
    g.append('text')
        .attr('x', '300')
        .attr('y', '50')
        .text("Married and Single Totals")
        .style("font-size", "20px")

    g.append('text')
        .attr('x', '375')
        .attr('y', '230')
        .text("25")
        .style("font-size", "20px")

    g.append('text')
        .attr('x', '460')
        .attr('y', '90')
        .text("62")
        .style("font-size", "20px")

    var x2 = d3.scaleBand()
        .domain(demoData2.map(function (d) { return d.key; }))
        .range([0, 200])
        .padding(0.2);

    var xAxis2 = d3.axisBottom(x2);

    var y2 = d3.scaleLinear()
        .domain([65, 0])
        .range([0, 250])
    var yAxis2 = d3.axisLeft(y2);

    g.append('g').call(xAxis2).attr('transform', 'translate(' + 330 + ', ' + 340 + ')').style("font-size", "14px");
    g.append('g').call(yAxis2).attr('transform', 'translate(' + 330 + ', ' + 90 + ')').style("font-size", "14px");

    var rects2 = g.selectAll("bar")
        .data(demoData2)
        .enter().append("rect")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .attr("x", function (d) { return x2(d.key); })
        .attr("y", function (d) { return y2(d.value); })
        .attr("width", x2.bandwidth())
        .attr("height", function (d) { return 250 - y2(d.value); })
        .attr('transform', 'translate(' + 330 + ', ' + 90 + ')').style("font-size", "14px")
        .attr("fill", "#6495ED")

    // GRAPHS CHART 3

    g.append('text')
    .attr('x', '600')
    .attr('y', '50')
    .text("Married/Single and Male/Female Totals")
    .style("font-size", "20px")

    g.append('text')
    .attr('x', '625')
    .attr('y', '275')
    .text("13")
    .style("font-size", "20px")

    g.append('text')
    .attr('x', '720')
    .attr('y', '160')
    .text("43")
    .style("font-size", "20px")

    g.append('text')
    .attr('x', '815')
    .attr('y', '280')
    .text("12")
    .style("font-size", "20px")

    g.append('text')
    .attr('x', '910')
    .attr('y', '255')
    .text("19")
    .style("font-size", "20px")

    var x3 = d3.scaleBand()
        .domain(demoData3.map(function (d) { return d.key; }))
        .range([0, 400])
        .padding(0.2);

    var xAxis3 = d3.axisBottom(x3);

    var y3 = d3.scaleLinear()
        .domain([65, 0])
        .range([0, 250])
    var yAxis3 = d3.axisLeft(y3);

    g.append('g').call(xAxis3).attr('transform', 'translate(' + 580 + ', ' + 340 + ')').style("font-size", "14px");
    g.append('g').call(yAxis3).attr('transform', 'translate(' + 580 + ', ' + 90 + ')').style("font-size", "14px");

    var rects3 = g.selectAll("bar")
        .data(demoData3)
        .enter().append("rect")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .attr("x", function (d) { return x3(d.key); })
        .attr("y", function (d) { return y3(d.value); })
        .attr("width", x3.bandwidth())
        .attr("height", function (d) { return 250 - y3(d.value); })
        .attr('transform', 'translate(' + 580 + ', ' + 90 + ')').style("font-size", "14px")
        .attr("fill", "#AFE1AF")
}