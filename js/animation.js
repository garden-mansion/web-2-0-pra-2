import { drawHouse, clear } from './image.js';
import { drawPath } from './path.js';

function getEaseFunction(type) {
  switch (type) {
    case 'linear': return d3.easeLinear;
    case 'ease': return d3.easeCubicInOut;
    case 'bounce': return d3.easeBounce;
    case 'elastic': return d3.easeElastic;
    default: return d3.easeCubicInOut;
  }
}

export function runAnimation() {
  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const duration = +d3.select('#duration').property('value');
  const animationType = d3.select('#animation-type').property('value');
  const scaleFrom = +d3.select('#scale-from').property('value');
  const scaleTo = +d3.select('#scale-to').property('value');
  const rotateFrom = +d3.select('#rotate-from').property('value');
  const rotateTo = +d3.select('#rotate-to').property('value');

  clear(svg);

  const path = drawPath(width, height);
  const pathNode = path.node();
  const pathLength = pathNode.getTotalLength();

  const pict = drawHouse(svg);
  const ease = getEaseFunction(animationType);

  d3.timer(function (elapsed) {
    let t = elapsed / duration;
    if (t > 1) t = 1;

    const easedT = ease(t);

    const point = pathNode.getPointAtLength(easedT * pathLength);

    const scale = scaleFrom + (scaleTo - scaleFrom) * easedT;
    const rotate = rotateFrom + (rotateTo - rotateFrom) * easedT;

    pict.attr("transform",
      `translate(${point.x}, ${point.y}) scale(${scale}) rotate(${rotate})`
    );

    if (t >= 1) return true;
  });
}