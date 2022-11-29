document.addEventListener('DOMContentLoaded', function () {
    Promise.all([d3.csv('Data/donner_party_full_data.csv')])
     .then(function (values) {
      var holder = values[0];
      for (var i = 0; i < holder.length; i++) {
       var person = holder[i];
       person.Group = parseInt(person.Group)
      }
      baseData = holder;

      // https://sylhare.github.io/2020/05/21/Node-network-graph-d3.html
      // Followed some from here
      let svg = d3.select("#something")
      let nodes = svg.append("g")
          .selectAll("nodes")
          .data(baseData)
          .enter()
      var simulation = d3.forceSimulation(baseData)
          .force("collide", d3.forceCollide(3)) // 9 = 8 [radius] + 1
          .force('center', d3.forceCenter(600 / 2, 400 / 2))
          .on('tick', ticked);

         function ticked() {
             var u = d3.select('#bubblechart')
                 .selectAll('circle')
                 .data(baseData)
                 .join('circle')
                 .attr('r', 5)
                 .style("stroke", "black")
                 .style("fill", function(baseData){
                     if (baseData.Group === 1)
                         return "blue"
                     else if(baseData.Group === 2)
                         return "red"
                     else if(baseData.Group === 3)
                         return "green"
                     else if(baseData.Group === 4)
                         return "orange"
                     else if(baseData.Group === 5)
                         return "purple"
                     else if(baseData.Group === 6)
                         return "yellow"
                     else if(baseData.Group === 7)
                         return "black"
                     else if(baseData.Group === 8)
                         return "pink"
                     else if(baseData.Group === 9)
                         return "cyan"
                     else if(baseData.Group === 10)
                         return "gold"
                     else if(baseData.Group === 11)
                         return "maroon"
                     else if(baseData.Group === 12)
                         return "white"
                 })
                 .attr('cx', function(d) {
                     return d.x
                 })
                 .attr('cy', function(d) {
                     return d.y
                 });
         }
     })

});
