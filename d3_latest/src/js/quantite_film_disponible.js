
const d3 = window.d3v3;
import * as data1 from "../../data/titles.csv";
import * as disney from "../../data/disney_plus_titles.csv";
import * as amazon from "../../data/amazon_prime_titles.csv";

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
   .ticks(1);

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10000);

var svg = d3.select("#verticalBar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("../../data/titles.csv", function(error, data) {
const total =  disney.length +   amazon.length +  data1.length

const data = [
  {value: disney.length, label: 'Disney', xAxis: 1, color: "yellow"},
  {value: amazon.length, label: 'Amazon', xAxis: 3, color: "blue"},
  {value: data1.length, label: 'Netflix', xAxis: 2, color: "red"},
]

  
x.domain(data.map(function(d) { return d.xAxis; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);


svg.selectAll("bar")
    .data(data)
  .enter().append("rect")
    .style("fill", function(d) { return d.color; })
    .attr("x", function(d) { return x(d.xAxis); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })

   

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + 30 + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("class", "tobereplace")
    .style("fill", "white")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" )
    .text('hdhd')


const colors = ["red", "blue", "yellow"]
const tobereplace = d3.selectAll('.tobereplace')[0]
for (var i = tobereplace.length - 1; i >= 0; i--) {
  tobereplace[i].innerHTML = data[i].label + " "+ ((data[i].value / 1000)).toFixed(1) + "k"
  
}