//written by Vincent Sin

//needed to run this apparently, even though i didnt use the data, i just needed for the js to run the drawBubbleMap() function
document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('Data/donner_party_full_data.csv')])
        .then(function (values) {
            console.log(values[0]);
            const data = values[0];
            let holder;
            for (let i = 0; i < data.length; i++) {
                holder = data[i];
                if (Number(holder["Age"]) <= 18) {
                  totalData[0].value++;
                }
                else if (Number(holder["Age"]) >= 19 &&
                Number(holder["Age"]) <= 64) {
                  totalData[1].value++;
                }
                else {
                  totalData[2].value++;
                }
            }
            console.log(totalData);
            drawBubbleMap();
        })
  });

function drawBubbleMap() {
   
    // adds to the svg5 because there was something weird with svg4 that i didn't want to mess up
    const svg = d3.select('#BubbleMap');
    svg.select('g').remove();
    var g = svg.append("g").attr("transform", "translate(0,0)")
    
    //adds the usa map
    g.append("svg:image")
    .attr('x', '-350')
    .attr('y', '-100')
    .attr('width', '1750')
    .attr('height', '750')
    .attr('xlink:href', "Pictures/US-Blank-map.jpg");

    // Kansas circle
    g.append("circle")
    .attr('cx', '525')
    .attr('cy', '290')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .style('opacity', '0.5')

    // Utah circle
    g.append("circle")
    .attr('cx', '245')
    .attr('cy', '210')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .style('opacity', '0.5')

    //on Donner lake
    g.append("circle")
    .attr('cx', '80')
    .attr('cy', '210')
    .attr('r', '100')
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .style('opacity', '0.5')

    //to the right of the lake
    g.append("circle")
    .attr('cx', '100')
    .attr('cy', '210')
    .attr('r', '12')
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .style('opacity', '0.5')



}

















































































