var SlopeGraphData = [];
var NonSurvivorsSlopeGraphData = [];
var NonSurvivorsLeftScaleBand = [];
var leftScaleBand = [];
var rightScaleBand = [];

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('Data/DonnerPartyDeaths.csv'), d3.csv('Data/donner_party_full_data.csv')])
        .then(function (values) {
            var holder = values[0];
            for (var i = 0; i < holder.length; i++) {
                var person = holder[i];
                person.Age = parseInt(person.Age);
                person.DeathDate = new Date(person.DeathDate);
                person.TotalOutcome = person.DeathReason + ", " + person.DeathOutcome;
                leftScaleBand.push(person.Name);
                NonSurvivorsLeftScaleBand.push(person.Name);
                NonSurvivorsSlopeGraphData.push(person);
            }
            SlopeGraphData = holder;
            //NonSurvivorsSlopeGraphData = holder;

            var holder = values[1];
            console.log(holder)
            for (var i = 0; i < holder.length; i++) {
                var person = holder[i];
                if (person.Survived == "1") {
                    person.Age = parseInt(person.Age);
                    person.TotalOutcome = "Survived";
                    person.Gender = person.Sex;
                    leftScaleBand.push(person.Name);
                    SlopeGraphData.push(person)
                }
            }

            console.log(SlopeGraphData)

            SlopeGraphGenerateRightScaleBand();
            SlopeGraphDrawGraph();
        })
});


function SlopeGraphDrawGraph() {
    console.log("drawing left graph")

    var leftScaleOffset;
    var rightScaleOffset;

    var leftScaleBandDomain;
    var dataSetHolder;

    var selectResult = document.getElementById("SlopeGraphSelect").value;
    console.log(selectResult);
    if (selectResult === "ShowSurvivors") {
        leftScaleBandDomain = leftScaleBand;
        dataSetHolder = SlopeGraphData;
        leftScaleOffset = 8;
        rightScaleOffset = 11;
    }
    else {
        leftScaleBandDomain = NonSurvivorsLeftScaleBand;
        dataSetHolder = NonSurvivorsSlopeGraphData;
        leftScaleOffset = 0;
        rightScaleOffset = 11;
    }

    var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

    //let leftScale = d3.scaleLinear().domain([0, 5]).range([0, 1350]);
    let leftScale = d3.scaleBand().domain(leftScaleBandDomain).range([0, 1350]);
    let axisLeft = d3.axisLeft(leftScale);

    let rightScale = d3.scaleBand().domain(rightScaleBand).range([0, 1350]);
    let axisRight = d3.axisRight(rightScale);

    const svg = d3.select('#SVG4');
    svg.selectAll("*").remove();

    const g = svg.append('g')
        .attr('transform', 'translate(' + 0 + ', ' + 0 + ')');

    g.append('g').call(axisLeft).attr('transform', 'translate(' + 150 + ', ' + 50 + ')');;
    g.append('g').call(axisRight).attr('transform', 'translate(' + 750 + ', ' + 50 + ')');

    g.selectAll(".deadLine")
        .data(dataSetHolder)
        .enter()
        .append('line')
        .attr('class', 'deadLine')
        //.attr('id', d => console.log((d["Name"])))
        .attr('x1', 150)
        .attr('y1', d => leftScale(d["Name"]) - leftScaleOffset)
        .attr('x2', 750)
        .attr('y2', d => rightScale(d["TotalOutcome"]) + rightScaleOffset)
        //.attr('y2', d => rightScale(d["DeathReason"])+96)
        .attr('transform', 'translate(' + 0 + ', ' + 66 + ')')
        .style('stroke', 'black')
        .attr("stroke-width", 2)
        .style("opacity", .25)
        .on('mouseover', function (event, d) {
            d3.select(this)
                .transition()
                .duration(250)
                .style("opacity", 1)

            div.transition()
                .duration(1)
                .style("opacity", 1);
            var string = d.Name + "<br />" + "Age: " +d.Age;
            string = string + "<br />" + "Gender: " +d.Gender;
            string = string + "<br />" + "Outcome: " +d.TotalOutcome;
            div.html(string)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 35) + "px");

        })
        .on('mouseout', function (event, d) {
            d3.select(this)
                .transition()
                .duration(250)
                .style("opacity", .25)

            div.transition()
                .duration(1)
                .style("opacity", 0);
        })
}

function SlopeGraphGenerateRightScaleBand() {
    var dCauses = ["Illness", "Non-Firearm Homicide", "Firearm Homicide", "Starvation", "Hypothermia", "Unknown"];
    var dOutcomes = ["Buried", "Cannibalized", "Left behind", "Unknown"];

    for (var i = 0; i < dCauses.length; i++) {
        for (var j = 0; j < dOutcomes.length; j++) {
            rightScaleBand.push(dCauses[i] + ", " + dOutcomes[j])
        }
    }

    rightScaleBand.push("Survived");
}