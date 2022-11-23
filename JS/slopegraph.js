var SlopeGraphData = [];

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
            }
            SlopeGraphData = holder;

            var holder = values[1];
            console.log(holder)
            for(var i = 0; i < holder.length; i++){
                var person = holder[i];
                if(person.Survived == "1"){
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
    SlopeGraphSetData();

    //let leftScale = d3.scaleLinear().domain([0, 5]).range([0, 1350]);
    let leftScale = d3.scaleBand().domain(leftScaleBand).range([0,1350]);
    let axisLeft = d3.axisLeft(leftScale);

    let rightScale = d3.scaleBand().domain(rightScaleBand).range([0, 1350]);
    let axisRight = d3.axisRight(rightScale);

    const svg = d3.select('#SVG4');
    svg.selectAll("*").remove();

    const g = svg.append('g')
        .attr('transform', 'translate(' + 0 + ', ' + 0 + ')');

    g.append('g').call(axisLeft).attr('transform', 'translate(' + 250    + ', ' + 50 + ')');;
    g.append('g').call(axisRight).attr('transform', 'translate(' + 900 + ', ' + 50 + ')');

    g.selectAll(".deadLine")
        .data(SlopeGraphData)
        .enter()
        .append('line')
        .attr('class', 'deadLine')
        .attr('id', d => console.log((d["Name"])))
        .attr('x1', 250)
        .attr('y1', d => leftScale(d["Name"])-9)
        .attr('x2', 900)
        .attr('y2', d => rightScale(d["TotalOutcome"]) + 10)
        //.attr('y2', d => rightScale(d["DeathReason"])+96)
        .attr('transform', 'translate(' + 0 + ', ' + 66 + ')')
        .style('stroke', 'black')
}

function SlopeGraphSetData() {

}

function SlopeGraphGenerateRightScaleBand(){
    var dCauses = ["Illness", "Non-Firearm Homicide", "Firearm Homicide", "Starvation", "Hypothermia", "Unknown"];
    var dOutcomes = ["Buried", "Cannibalized", "Left behind", "Unknown"];

    for(var i = 0; i < dCauses.length; i++){
        for(var j = 0; j < dOutcomes.length; j++){
            rightScaleBand.push(dCauses[i] + ", " + dOutcomes[j])
        }
    }

    rightScaleBand.push("Survived");
}