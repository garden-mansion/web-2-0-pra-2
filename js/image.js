export const drawHouse = (svg) => {
  const house = svg.append("g")
    .attr("class", "house");

  house.append("rect")
    .attr("x", -30)
    .attr("y", -10)
    .attr("width", 60)
    .attr("height", 45)
    .style("fill", "#e8a87c")
    .style("stroke", "#5d4037")
    .style("stroke-width", 2);

  house.append("polygon")
    .attr("points", "-38,-10 0,-45 38,-10")
    .style("fill", "#d32f2f")
    .style("stroke", "#5d4037")
    .style("stroke-width", 2);

  house.append("rect")
    .attr("x", -8)
    .attr("y", 12)
    .attr("width", 16)
    .attr("height", 23)
    .attr("rx", 3)
    .style("fill", "#795548")
    .style("stroke", "#3e2723")
    .style("stroke-width", 1.5);

  house.append("circle")
    .attr("cx", 4)
    .attr("cy", 24)
    .attr("r", 1.5)
    .style("fill", "#fdd835");

  house.append("rect")
    .attr("x", -26)
    .attr("y", 2)
    .attr("width", 12)
    .attr("height", 12)
    .attr("rx", 1)
    .style("fill", "#bbdefb")
    .style("stroke", "#5d4037")
    .style("stroke-width", 1.5);

  house.append("rect")
    .attr("x", 14)
    .attr("y", 2)
    .attr("width", 12)
    .attr("height", 12)
    .attr("rx", 1)
    .style("fill", "#bbdefb")
    .style("stroke", "#5d4037")
    .style("stroke-width", 1.5);

  return house;
}

export const clear = (svg) => {
  svg.selectAll("*").remove();
}