// Парабола с ветвями вниз: y = -a*(x - h)^2 + k
// Параметрическая форма: x(t) = t, y(t) = -a*(t-h)^2 + k
// где (h, k) — вершина параболы, a — коэффициент «раскрытости»

export function createParabolaPath(width, height, direction) {
  const data = [];

  // Вершина параболы — верхняя центральная часть SVG
  const h = width / 2;   // x вершины — центр по горизонтали
  const k = 80;          // y вершины — ближе к верху
  const padding = 60;

  // Коэффициент a подбираем так, чтобы парабола при x = padding
  // опускалась примерно до height - padding
  // y(padding) = -a*(padding - h)^2 + k = height - padding
  // => a = (k - (height - padding)) / (padding - h)^2
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

  // Если направление справа налево — переворачиваем массив
  if (direction === 'right') {
    data.reverse();
  }

  return data;
}

export function drawPath(width, height, direction, visible) {
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

export function translateAlong(path) {
  const length = path.getTotalLength();
  return function () {
    return function (t) {
      const { x, y } = path.getPointAtLength(t * length);
      return `translate(${x},${y})`;
    };
  };
}

// Комбинированная интерполяция: перемещение + масштаб + вращение
export function transformAlong(path, scaleFrom, scaleTo, rotateFrom, rotateTo) {
  const length = path.getTotalLength();
  return function () {
    return function (t) {
      const { x, y } = path.getPointAtLength(t * length);
      const currentScale = scaleFrom + (scaleTo - scaleFrom) * t;
      const currentRotate = rotateFrom + (rotateTo - rotateFrom) * t;
      return `translate(${x},${y}) scale(${currentScale}) rotate(${currentRotate})`;
    };
  };
}