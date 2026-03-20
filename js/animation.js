import { drawHouse, clear } from './image.js';
import { drawPath, transformAlong } from './path.js';

export const getEaseFunction = (type) => {
  switch (type) {
    case 'linear':
      return d3.easeLinear;
    case 'ease':
      return d3.easeCubicInOut;
    case 'bounce':
      return d3.easeBounce;
    case 'elastic':
      return d3.easeElastic;
    default:
      return d3.easeCubicInOut;
  }
}

export const runAnimation = () => {
  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const duration = +d3.select('#duration').property('value');
  const animationType = d3.select('#animation-type').property('value');
  const scaleFrom = +d3.select('#scale-from').property('value');
  const scaleTo = +d3.select('#scale-to').property('value');
  const rotateFrom = +d3.select('#rotate-from').property('value');
  const rotateTo = +d3.select('#rotate-to').property('value');
  const showPath = d3.select('#show-path').property('checked');
  const direction = d3.select('#direction').property('value');

  clear(svg);

  const path = drawPath(width, height, direction, showPath);

  const pict = drawHouse(svg);

  const ease = getEaseFunction(animationType);

  pict.transition()
    .duration(duration)
    .ease(ease)
    .attrTween('transform', transformAlong(
      path.node(),
      scaleFrom, scaleTo,
      rotateFrom, rotateTo
    ));
}