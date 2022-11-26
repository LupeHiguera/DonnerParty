var demoData1 = [
  { key: "totalKids", value: 0 },
  { key: "totalAdults", value: 0 },
  { key: "totalElders", value: 0 },
]


document.addEventListener('DOMContentLoaded', function () {
  Promise.all([d3.csv('Data/donner_party_full_data.csv')])
      .then(function (values) {
          console.log(values[0]);
          const data = values[0];
          let holder;
          for (let i = 0; i < data.length; i++) {
              holder = data[i];
              if (Number(holder["Age"]) <= 18) {
                  demoData1[0].value++;
              }
              else if (Number(holder["Age"]) >= 19) {
                  demoData1[1].value++;
              }
              else {
                  demoData1[2].value++;
              }
          }
          console.log(demoData1);
          DrawBarChart();
      })
});

function DrawBarChart() {
  const svg = d3.select('#SVG1');
  svg.select('g').remove();
  var g = svg.append("g").attr("transform", "translate(0,0)")

  g.append('text')
      .attr('x', '65')
      .attr('y', '50')
      .text("Age Distributions")
      .style("font-size", "20px")


  var x1 = d3.scaleBand()
      .domain(demoData1.map(function (d) { return d.key; }))
      .range([0, 3])
      .padding(2);

  var xAxis1 = d3.axisBottom(x1);

  var y1 = d3.scaleLinear()
      .domain([65, 0])
      .range([0, 250])
  var yAxis1 = d3.axisLeft(y1);

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
}