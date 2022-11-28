var totalData = [
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
          DrawBarChart();
      })
});

function DrawBarChart() {

      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;
      var donutWidth = 75;

      var svg = d3.select('#PieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + 
          ',' + (height / 2) + ')');

      var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
        
      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var path = svg.selectAll('path')
        .data(pie(totalData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr("stroke", "white")
        .attr("fill", "#AFE1AF");

}