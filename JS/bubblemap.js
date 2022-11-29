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
            drawBubbleMap();
        })
});

function drawBubbleMap() {
    // hover followed from
    // https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2

    // adds to the svg5 because there was something weird with svg4 that i didn't want to mess up
    const svg = d3.select('#BubbleMap');
    svg.select('g').remove();
    const g = svg.append("g").attr("transform", "translate(0,0)");

    var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

    // also followed from here
    //https://d3-graph-gallery.com/graph/interactivity_tooltip.html#template

    const Tooltip = d3.select("#tooltip-bubble")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    const Mouseover = function (d) {
        Tooltip
            .html("Number of deaths is " + d.value)
            .style("top", (d3.mouse(this)[1]) + "px")
            .style("left", (d3.mouse(this)[0] + 70) + "px")
    }

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }

    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    //adds the usa map
    g.append("svg:image")
        .attr('x', '-350')
        .attr('y', '-100')
        .attr('width', '1750')
        .attr('height', '750')
        .attr('xlink:href', "Pictures/US-Blank-map.jpg");

    // should be 1 death out of 40
    // Kansas circle
    g.append("circle")
        .attr('cx', '525')
        .attr('cy', '290')
        .attr('r', '3')
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .style('opacity', '0.5')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'pink');
            div.transition()
                .duration(1)
                .style("opacity", 1);
            var string = "Kansas" + "<br />" + "1 Death(s)"
            div.html(string)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 35) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'red');
            div.transition()
                .duration(50)
                .style("opacity", '0');
            Tooltip
                .style("opacity", 0)
        })

    // should be 1 death out of 40
    // Utah circle
    g.append("circle")
        .attr('cx', '245')
        .attr('cy', '210')
        .attr('r', '3')
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .style('opacity', '0.5')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'pink');
            div.transition()
                .duration(1)
                .style("opacity", 1);
            var string ="Utah" + "<br />" + "1 Death(s)"
            div.html(string)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 35) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'red');
            div.transition()
                .duration(50)
                .style("opacity", '0');
        })

    // should be 36 deaths out of 40
    //on Donner lake
    g.append("circle")
        .attr('cx', '80')
        .attr('cy', '210')
        .attr('r', '16')
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .style('opacity', '0.5')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'pink');
            div.transition()
                .duration(1)
                .style("opacity", 1);
            var string = "Donner Lake" + "<br />" +"36 Death(s)"
            div.html(string)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 35) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'red');
            div.transition()
                .duration(50)
                .style("opacity", '0');
        })

    // About 2 deaths out of 40
    //to the right of the lake
    g.append("circle")
        .attr('cx', '100')
        .attr('cy', '210')
        .attr('r', '5')
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .style('opacity', '0.5')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'pink');
                div.transition()
                .duration(1)
                .style("opacity", 1);
            var string ="Nevada" + "<br />" + "2 Death(s)"
            div.html(string)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 35) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('fill', 'red');
            div.transition()
                .duration(50)
                .style("opacity", '0');
        })

}

















































































