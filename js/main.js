import { drawHouse, clear } from './image.js';
import { runAnimation } from './animation.js';

// Инициализация при загрузке страницы
d3.select(document).on("DOMContentLoaded", function () {
  const width = 700;
  const height = 500;

  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  // Начальный рисунок по центру
  const pict = drawHouse(svg);
  pict.attr("transform", `translate(${width / 2}, ${height / 2})`);
});

// Кнопка «Анимировать»
d3.select('#animate-button').on('click', () => {
  runAnimation();
});

// Кнопка «Очистить»
d3.select('#clear-button').on('click', () => {
  const svg = d3.select('svg');
  clear(svg);

  // Перерисовываем домик в центре
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const pict = drawHouse(svg);
  pict.attr("transform", `translate(${width / 2}, ${height / 2})`);
});