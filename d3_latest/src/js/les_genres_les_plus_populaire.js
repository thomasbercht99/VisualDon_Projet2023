// La version qu'on veut utiliser de d3 (ici la v3)
const d3 = window.d3v3;
// d pour data

import * as d2 from "../../data/titles.csv";

let genres = {};
for (let i = d2.length - 1; i >= 0; i--) {
  const line = d2[i];
  const genreArr = line.genres
    .slice(2, line.genres.length - 2)
    .split("', '")
    .filter((a) => a != "");

  for (let j = genreArr.length - 1; j >= 0; j--) {
    const genre = genreArr[j];
    const genresTab = genres[genre] || [];
    genresTab.push(line);
    genres = { ...genres, [genre]: genresTab };
  }
}
let data = [];
for (const [key, value] of Object.entries(genres)) {
  data.push({ name: key, value: value.length });
}

console.log("data data", data);

data = data.sort((a, b) => b.value - a.value).slice(0, 10);

/*----------- Dimension du graphe et des axes -----------*/
const margin = {
  top: 0,
  right: 0,
  bottom: 15,
  left: 100,
};

const width = 900 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;

const svg = d3
  .select("#histogram")
  .append("svg")
  .attr("width", "70%")
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "coverH")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scale
  .linear()
  .range([0, width])
  .domain([
    0,
    d3.max(data, function (d) {
      return d.value;
    }),
  ]);

const y = d3.scale
  .ordinal()
  .rangeRoundBands([0, height], 0.3) // Inverse the range here
  .domain(
    data.map(function (d) {
      return d.name;
    })
  );
let yAxis = d3.svg.axis().scale(y).tickSize(0).orient("left");
svg
  .append("g")
  .attr("class", "yAxis")
  .call(yAxis)
  .style("stroke", "white")
  .style("transform", "translateX(-8px)");





window.onDraw = function onDraw(){
  svg.selectAll(".bar").remove();
  d3.selectAll(".text-lab").remove();
  /*----------- Création des barres -----------*/
  const bars = svg.selectAll(".bar").data(data).enter().append("g");

  // Création des barres et labels d'abord
  bars
    .append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
      return y(d.name);
    })
    .style("stroke", "white")
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
      return 0; // initial width is 0 for animation
    });

  bars
    .append("text")
    .attr("class", "label text-lab")
    .style("stroke", "white")
    .attr("y", function (d) {
      return y(d.name) + y.rangeBand() / 2 + 4;
    })
    .attr("x", function (d) {
      return 3; // initial x position is 3 for animation
    })
    .text(function (d) {
      return d.value;
    });

  // Ensuite, nous animons les barres après un court délai
  setTimeout(function () {
    svg
      .selectAll(".bar")
      .transition()
      .duration(800)
      .attr("width", function (d) {
        return x(d.value);
      });

    svg
      .selectAll(".label")
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return x(d.value) + 3;
      });
  }, 100); // délai de 100 millisecondes

  // Animation
  svg
    .selectAll(".bar") // Change "bar" to ".bar"
    .transition()
    .duration(1000)
    .attr("width", function (d) {
      return x(d.value); // Change "d.Value" to "d.value"
    })
    .delay(function (d, i) {
      return i * 100;
    });
}


window.onDraw();



