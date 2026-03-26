export function createParabolaPath(width, height) {
  const data = [];
  const h = width / 2;
  const k = 80;
  const padding = 60;
  const a = (k - (height - padding)) / Math.pow(padding - h, 2);

  const steps = 200;
  const xStart = padding;
  const xEnd = width - padding;
  const dx = (xEnd - xStart) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = xStart + i * dx;
    const y = -a * Math.pow(x - h, 2) + k;
    data.push({ x, y });
  }

  return data;
}

export function drawPath(width, height) {
  const dataPoints = createParabolaPath(width, height);

  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveBasis);

  const svg = d3.select("svg");

  const path = svg.append('path')
    .attr('class', 'trajectory')
    .attr('d', line(dataPoints))
    .attr('stroke', 'none')
    .attr('fill', 'none');

  return path;
}

export function translateAlong(path, scaleFrom, scaleTo, rotateFrom, rotateTo) {
  const length = path.getTotalLength();
  return function () {
    return function (t) {
      const { x, y } = path.getPointAtLength(t * length);
      const scale = scaleFrom + (scaleTo - scaleFrom) * t;
      const rotate = rotateFrom + (rotateTo - rotateFrom) * t;
      return `translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`;
    }
  }
}