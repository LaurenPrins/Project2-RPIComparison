const svgWidth = 900;
const svgHeight = 800;

const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// Calculate chart width and height
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
const svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

// Append SVG group
const chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Initial params
var chosenXaxis = "YEAR";
var chosenYaxis = "ALL_GROUPS";

// function used for updating xAxis const upon click on axis label
function renderXAxes(newXScale, xAxis) {
  const bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}
// function used for updating yAxis const upon click on axis label
function renderYAxes(newYScale, yAxis) {
  const leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d=>newYScale(d[chosenYAxis]));
  return circlesGroup;
}
function renderTexts(txtGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

  txtGroup.transition()
    .duration(1000)
    .attr("x", d=>newXScale(d[chosenXAxis]))
    .attr("y", d=>newYScale(d[chosenYAxis]))
  return txtGroup;
}

// function used for updating x-scale const upon click on axis label
function xScale(rpiData, chosenXaxis) {
    // create scales
    const xLinearScale = d3.scaleLinear()
      .domain([d3.min(rpiData, d => d[chosenXaxis])*0.9995,d3.max(rpiData, d => d[chosenXaxis])*1.0005
      ])
      .range([0, width]);
    return xLinearScale;
}
function yScale(rpiData, chosenYaxis) {
    // create scales
    const yLinearScale = d3.scaleLinear()
      .domain([d3.min(rpiData, d=>d[chosenYaxis])*1.5, d3.max(rpiData, d=>d[chosenYaxis])*1.1 ])
      .range([height, 0]);
    return yLinearScale;
}

// function used for updating tooltip for circles group
function updateToolTip(chosenXaxis, chosenYaxis, circlesGroup){
  let xLabel = ""
  let yLabel = ""
  if (chosenXaxis === "YEAR"){
    xLabel = "Year: ";
  }
  else if (chosenXaxis === "RECREATION_EDUCATION"){
    xLabel = "Recreation Education: ";
  }
  else{
    xLabel = "Food: ";
  }
  if (chosenYaxis === "ALL_GROUPS"){
    yLabel = "All Group: "
  }
  else if (chosenYaxis === "TRANSPORTATION"){
    yLabel = "Transportation: "
  }
  else{
    yLabel = "Health Personal Care: "
  }
  const toolTip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([80, -60])
                    .html(function(d){
                      if (chosenYaxis === "TRANSPORTATION" || chosenYaxis === "HEALTH_PERSONAL_CARE") {
                        if (chosenXaxis === "YEAR"){
                          return(`${d.TOWN_LOCALITY}, ${d.REGIONS}<br>${xLabel}${d[chosenXaxis]}<br>${yLabel}${d[chosenYaxis]}%`)
                        }
                        return(`${d.TOWN_LOCALITY}, ${d.REGIONS}<br>${xLabel}${d[chosenXaxis]}<br>${yLabel}${d[chosenYaxis]}%`)
                      }
                      else if (chosenXaxis === "YEAR"){
                        return(`${d.TOWN_LOCALITY}, ${d.REGIONS}<br>${xLabel}${d[chosenXaxis]}<br>${yLabel}${d[chosenYaxis]}%`)
                      }
                      else{
                        return(`${d.TOWN_LOCALITY}, ${d.REGIONS}<br>${xLabel}${d[chosenXaxis]}<br>${yLabel}${d[chosenYaxis]}%`)
                      }  
                    })
  
  circlesGroup.call(toolTip);
  circlesGroup.on("mouseover", function(data){
    toolTip.show(data, this);
    d3.select(this).style("stroke", "black");
    
  })
  circlesGroup.on("mouseout", function(data, index){
    toolTip.hide(data, this)
    d3.select(this).style("stroke", "white");
  })
  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
(async function(){
    const rpiData = await d3.csv("static/data/data.csv");

    // parse data to interger from string
    rpiData.forEach(function(data){
      data.TOWN = +data.TOWN
      data.REGION = +data.REGION
      data.YEAR = +data.YEAR;
      data.FOOD = +data.FOOD;
      data.CLOTHING = +data.CLOTHING;
      data.TOBACCO_ALCOHOL = +data.TOBACCO_ALCOHOL;
      data.HOUSEHOLD_EQUIPMENT_OPERATION = +data.HOUSEHOLD_EQUIPMENT_OPERATION;
      data.HEALTH_PERSONAL_CARE = +data.HEALTH_PERSONAL_CARE;
      data.HOUSING = +data.HOUSING;
      data.TRANSPORTATION = +data.TRANSPORTATION;
      data.RECREATION_EDUCATION = +data.RECREATION_EDUCATION;
      data.ALL_GROUPS = +data.ALL_GROUPS;
      data.LATITUDE = +data.LATITUDE;
      data.LONGITUDE = +data.LONGITUDE;
    })

    // xLinearScale function after csv import
    let xLinearScale = xScale(rpiData, chosenXaxis);

    // yLinearScale function after csv import
    let yLinearScale = yScale(rpiData, chosenYaxis)

    // Create initial axis functions
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    // append X-axis
    let xAxis = chartGroup.append("g")
                        .classed("x-axis", true)
                        .attr("transform", `translate(0, ${height})`)
                        .call(bottomAxis)
    
    let yAxis = chartGroup.append("g")
                        .classed("y-axis", true)
                        .call(leftAxis)
    
    let crlTxtGroup = chartGroup.selectAll("mycircles")
                      .data(rpiData)
                      .enter()
                      .append("g")
    
    let circlesGroup = crlTxtGroup.append("circle")
                            .attr("cx", d=>xLinearScale(d[chosenXaxis]))
                            .attr("cy", d=>yLinearScale(d[chosenYaxis]))
                            .classed("stateCircle", true)
                            .attr("r", 8)
                            .attr("opacity", "1");

    let txtGroup = crlTxtGroup.append("text")
                              .text(d=>d.abbr)
                              .attr("x", d=>xLinearScale(d[chosenXaxis]))
                              .attr("y", d=>yLinearScale(d[chosenYaxis])+3)
                              .classed("stateText", true)
                              .style("font-size", "7px")
                              .style("font-weight", "800")

     // Create group for  3 x- axis labels
     const xlabelsGroup = chartGroup.append("g")
                                .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);
    
    // Create group for  3 y- axis labels
    const ylabelsGroup = chartGroup.append("g")
                                .attr("transform", `translate(${0-margin.left/4}, ${height/2})`);

    const YEARLabel = xlabelsGroup.append("text")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("value", "YEAR") // value to grab for event listener
                                .classed("active", true)
                                .classed("aText", true)
                                .text("YEAR");

    const RECREATION_EDUCATIONLabel = xlabelsGroup.append("text")
                                .attr("x", 0)
                                .attr("y", 20)
                                .attr("value", "RECREATION_EDUCATION") // value to grab for event listener
                                .classed("inactive", true)
                                .classed("aText", true)
                                .text("RECREATION_EDUCATION");

    const FOODLabel = xlabelsGroup.append("text")
                                .attr("x", 0)
                                .attr("y", 40)
                                .attr("value", "FOOD") // value to grab for event listener
                                .classed("inactive", true)
                                .classed("aText", true)
                                .text("FOOD");
    
    const ALL_GROUPSLabel = ylabelsGroup.append("text")
                                .attr("y", 0 - 20)
                                .attr("x", 0)
                                .attr("transform", "rotate(-90)")
                                .attr("dy", "1em")
                                .attr("value", "ALL_GROUPS")
                                .classed("active", true)
                                .classed("aText", true)
                                .text("ALL_GROUPS");
    
    const smokeLabel = ylabelsGroup.append("text")
                                .attr("y", 0 - 40)
                                .attr("x", 0)
                                .attr("transform", "rotate(-90)")
                                .attr("dy", "1em")
                                .attr("value", "TRANSPORTATION")
                                .classed("inactive", true)
                                .classed("aText", true)
                                .text("TRANSPORTATION");
                                
    const HEALTH_PERSONAL_CARELabel = ylabelsGroup.append("text")
                                .attr("y", 0 - 60)
                                .attr("x", 0)
                                .attr("transform", "rotate(-90)")
                                .attr("dy", "1em")
                                .attr("value", "HEALTH_PERSONAL_CARE")
                                .classed("inactive", true)
                                .classed("aText", true)
                                .text("HEALTH_PERSONAL_CARE");

     // updateToolTip function after csv import
     circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        const value = d3.select(this).attr("value");
        console.log(`${value} click`)
        if (value !== chosenXaxis) {

            // replaces chosenXAxis with value
            chosenXaxis = value;
            console.log(chosenXaxis)

            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(rpiData, chosenXaxis);

            // updates x axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

             // updates texts with new x values
            txtGroup = renderTexts(txtGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

            // changes classes to change bold text
            if (chosenXaxis === "YEAR") {
                YEARLabel
                    .classed("active", true)
                    .classed("inactive", false);
                RECREATION_EDUCATIONLabel
                    .classed("active", false)
                    .classed("inactive", true);
                FOODLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXaxis === "RECREATION_EDUCATION"){
              YEARLabel
                  .classed("active", false)
                  .classed("inactive", true);
              RECREATION_EDUCATIONLabel
                  .classed("active", true)
                  .classed("inactive", false);
              FOODLabel
                  .classed("active", false)
                  .classed("inactive", true);
            }
            else{
              YEARLabel
                    .classed("active", false)
                    .classed("inactive", true);
                RECREATION_EDUCATIONLabel
                    .classed("active", false)
                    .classed("inactive", true);
                FOODLabel
                    .classed("active", true)
                    .classed("inactive", false);  
            }
          // update tooltip with new info after changing x-axis 
          circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup); 
      }})
// y axis labels event listener
ylabelsGroup.selectAll("text")
.on("click", function() {
// get value of selection
const value = d3.select(this).attr("value");
console.log(`${value} click`)
if (value !== chosenYaxis) {

    // replaces chosenXAxis with value
    chosenYaxis = value;
    console.log(chosenYaxis)

    // functions here found above csv import
    // updates x scale for new data
    yLinearScale = yScale(rpiData, chosenYaxis);

    // updates x axis with transition
    yAxis = renderYAxes(yLinearScale, yAxis);

    // updates circles with new x values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

     // updates texts with new x values
    txtGroup = renderTexts(txtGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

    // changes classes to change bold text
    if (chosenYaxis === "ALL_GROUPS") {
      ALL_GROUPSLabel
            .classed("active", true)
            .classed("inactive", false);
      smokeLabel
            .classed("active", false)
            .classed("inactive", true);
      HEALTH_PERSONAL_CARELabel
            .classed("active", false)
            .classed("inactive", true);
    }
    else if (chosenYaxis === "TRANSPORTATION"){
      ALL_GROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
      smokeLabel
          .classed("active", true)
          .classed("inactive", false);
      HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    }
    else{
      ALL_GROUPSLabel
            .classed("active", false)
            .classed("inactive", true);
      smokeLabel
            .classed("active", false)
            .classed("inactive", true);
      HEALTH_PERSONAL_CARELabel
            .classed("active", true)
            .classed("inactive", false);  
    }
     // update tooltip with new info after changing y-axis 
     circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup); 
  }})

})()