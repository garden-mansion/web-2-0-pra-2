export const drawHouse = (svg) => {
  const house = svg.append("g")
    .attr("class", "house");

  // 1. Стена дома (прямоугольник)
  house.append("rect")
    .attr("x", -30)
    .attr("y", -10)
    .attr("width", 60)
    .attr("height", 45)
    .style("fill", "#e8a87c")
    .style("stroke", "#5d4037")
    .style("stroke-width", 2);

  // 2. Крыша (треугольник)
  house.append("polygon")
    .attr("points", "-38,-10 0,-45 38,-10")
    .style("fill", "#d32f2f")
    .style("stroke", "#5d4037")
    .style("stroke-width", 2);

  // 3. Дверь
  house.append("rect")
    .attr("x", -8)
    .attr("y", 12)
    .attr("width", 16)
    .attr("height", 23)
    .attr("rx", 3)
    .style("fill", "#795548")
    .style("stroke", "#3e2723")
    .style("stroke-width", 1.5);

  // 4. Ручка двери
  house.append("circle")
    .attr("cx", 4)
    .attr("cy", 24)
    .attr("r", 1.5)
    .style("fill", "#fdd835");

  // 5. Левое окно
  house.append("rect")
    .attr("x", -26)
    .attr("y", 2)
    .attr("width", 12)
    .attr("height", 12)
    .attr("rx", 1)
    .style("fill", "#bbdefb")
    .style("stroke", "#5d4037")
    .style("stroke-width", 1.5);

  // 6. Правое окно
  house.append("rect")
    .attr("x", 14)
    .attr("y", 2)
    .attr("width", 12)
    .attr("height", 12)
    .attr("rx", 1)
    .style("fill", "#bbdefb")
    .style("stroke", "#5d4037")
    .style("stroke-width", 1.5);

  // 7. Труба
  house.append("rect")
    .attr("x", 15)
    .attr("y", -40)
    .attr("width", 10)
    .attr("height", 20)
    .style("fill", "#8d6e63")
    .style("stroke", "#5d4037")
    .style("stroke-width", 1.5);

  // 8. Дым из трубы
  house.append("circle")
    .attr("cx", 20)
    .attr("cy", -47)
    .attr("r", 5)
    .style("fill", "#bdbdbd")
    .style("opacity", 0.7);

  house.append("circle")
    .attr("cx", 24)
    .attr("cy", -55)
    .attr("r", 7)
    .style("fill", "#bdbdbd")
    .style("opacity", 0.5);

  return house;
}

export function clear(svg) {
  svg.selectAll("*").remove();
}