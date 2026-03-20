import { drawHouse, clear } from './image.js';
import { runAnimation } from './animation.js';

d3.select(document).on("DOMContentLoaded", () => {
  const width = 700;
  const height = 500;

  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  const pict = drawHouse(svg);
  pict.attr("transform", `translate(${width / 2}, ${height / 2})`);
});

d3.select('#animate-button').on('click', () => {
  runAnimation();
});

d3.select('#clear-button').on('click', () => {
  const svg = d3.select('svg');
  clear(svg);

  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const pict = drawHouse(svg);
  pict.attr("transform", `translate(${width / 2}, ${height / 2})`);
});