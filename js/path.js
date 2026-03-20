// Парабола с ветвями вниз: y = -a*(x - h)^2 + k
// Параметрическая форма: x(t) = t, y(t) = -a*(t-h)^2 + k
// где (h, k) — вершина параболы, a — коэффициент раскрытости параборы

export const createParabolaPath = (width, height, direction) => {
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

  if (direction === 'right') {
    data.reverse();
  }

  return data;
}

export const drawPath = (width, height, direction, visible) => {
  const dataPoints = createParabolaPath(width, height, direction);

  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveBasis);

  const svg = d3.select("svg");

  const path = svg.append('path')
    .attr('class', 'trajectory')
    .attr('d', line(dataPoints))
    .attr('stroke', visible ? '#999' : 'none')
    .attr('stroke-width', visible ? 2 : 0)
    .attr('stroke-dasharray', visible ? '8,4' : '0')
    .attr('fill', 'none');

  return path;
}

export const translateAlong = (path) => {
  const length = path.getTotalLength();
  return () => {
    return (t) => {
      const { x, y } = path.getPointAtLength(t * length);
      return `translate(${x},${y})`;
    };
  };
}

export const transformAlong = (path, scaleFrom, scaleTo, rotateFrom, rotateTo) => {
  const length = path.getTotalLength();
  return () => {
    return (t) => {
      const { x, y } = path.getPointAtLength(t * length);
      const currentScale = scaleFrom + (scaleTo - scaleFrom) * t;
      const currentRotate = rotateFrom + (rotateTo - rotateFrom) * t;
      return `translate(${x},${y}) scale(${currentScale}) rotate(${currentRotate})`;
    };
  };
}