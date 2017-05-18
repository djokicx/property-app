var svg = d3.select("svg"),
    margin = {top: 100, right: 30, bottom: 30, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    profit;

var x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(1);

var y = d3.scaleLinear()
  .range([height, 0]);

var line = d3.line()
  .x(function(d) { return x(d.month); })
  .y(function(d) { return y(d.num); });

var profitArea = d3.area()
  .x(function(d, i) { return x(d.month); })
  .y0(function(d) { return y(d.Costs); })
  .y1(function(d) { return y(d.Rent); });

var mortArea = d3.area()
  .x(function(d, i) { return x(d.month); })
  .y0(function(d) { return y(0); })
  .y1(function(d) { return y(d.Costs); });

d3.tsv("data.tsv", type, function(error, data) {
  var min = Math.min(d3.min(data, function(d) { return d.Rent; }), d3.min(data, function(d) { return d.Costs; }));
  var max = Math.max(d3.max(data, function(d) { return d.Rent; }), d3.max(data, function(d) { return d.Costs; }));

  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, max]);

  lines = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {month: d.month, num: d[id]};
      })
    };
  });

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("x", -40)
      .attr("y", 0)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .style("fill", "000")
      .style("font", "14px sans-serif")
      .text("$$");

  g.append("text")
    .attr("transform", function(d) { return "translate(" + (width/2-75) + "," + -50 + ")"; })
    .attr("x", 3)
    .style("font", "25px sans-serif")
    .style("fill", "000")
    .text("Profit Margin");

  g.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("fill-opacity", 0.7)
    .style("fill", "79d279")
    .attr("d", profitArea);

  g.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("fill-opacity", 0.7)
    .style("fill", "999999")
    .attr("d", mortArea);

  var paths = g.selectAll(".paths")
    .data(lines)
    .enter().append("g")
      .attr("class", "path")

  paths.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", "none")
    .style("fill", "none");

  paths.append("text")
    .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) {
      return "translate(" + x(d.value.month) + "," + y(d.value.num) + ")"; })
    .attr("x", 3)
    .attr("dy", "0.75em")
    .style("font", "14px sans-serif")
    .style("fill", function(d) {
      if (d.id == 'Rent')
        return "79d279";
      return "999999";
    })
    .text(function(d) { 
      if (d.id == 'Rent')
        return "Profit";
      return d.id; });
  
});

function type(d) {
  d.Rent = +d.Rent;
  d.Costs = +d.Costs;
  return d;
}