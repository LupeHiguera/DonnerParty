document.addEventListener('DOMContentLoaded', function () {

    // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    var radius = Math.min(width, height) / 2 - margin

    let children = 0;
    let adults = 0;
    let elders = 0;

    Promise.all([d3.csv('Data/donner_party_full_data.csv')])
    .then(function (values) {
        //console.log('loaded Donner Party data');
        //console.log(values.at(0).Age);
        for(let x = 0; x < 89; x++){
          //console.log(values.at(x));
            if(values[0].at(x).Age <= 18){
                children++;
        //console.log(children);
            }else if(values[0].at(x).Age <= 65){
                adults++;
        //console.log(adults);
            }else{
                elders++;
        //console.log(elders);
            }
        }
    });

    var svg = d3.select("#SVG1")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var data = {a: children, b: adults, c:elders}
    
    var color = d3.scaleOrdinal()
      //.domain(data)
      .range(["#98abc5", "#8a89a6", "#7b6888"])
    
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(Object.entries(data))
    
    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(100)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
    
    });