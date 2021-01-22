// Calculate chart width and height
const svgWidth = 1200;
const svgHeight = 600;

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
const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
             
// Append SVG group
const chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Load data from API
d3.json("/api/v1.0/rpi_comp").then(function(data) {

  town = []
  region = []
  year=[]
  food=[]
  clothing=[]
  tobacco_alcohol=[]
  household_equipment_operation=[]
  health_personal_care=[]
  housing =[]
  transportation = []
  recreation_education = []
  all_groups = []
  latitude = []
  longitude = []


  // Format the date and cast the miles value to a number
  data.forEach(d => {
      d.TOWN = +d.TOWN
      d.REGION = +d.REGION
      d.YEAR = +d.YEAR;
      d.FOOD = +d.FOOD;
      d.CLOTHING = +d.CLOTHING;
      d.TOBACCO_ALCOHOL = +d.TOBACCO_ALCOHOL;
      d.HOUSEHOLD_EQUIPMENT_OPERATION = +d.HOUSEHOLD_EQUIPMENT_OPERATION;
      d.HEALTH_PERSONAL_CARE = +d.HEALTH_PERSONAL_CARE;
      d.HOUSING = +d.HOUSING;
      d.TRANSPORTATION = +d.TRANSPORTATION;
      d.RECREATION_EDUCATION = +d.RECREATION_EDUCATION;
      d.ALL_GROUPS = +d.ALL_GROUPS;
      d.LATITUDE = +d.LATITUDE;
      d.LONGITUDE = +d.LONGITUDE;
    
      town.push(d.TOWN)
      region.push(d.REGION)
      year.push(d.YEAR)
      food.push(d.FOOD)
      clothing.push(d.CLOTHING)
      tobacco_alcohol.push(d.TOBACCO_ALCOHOL)
      household_equipment_operation.push(d.HOUSEHOLD_EQUIPMENT_OPERATION)
      health_personal_care.push(d.HEALTH_PERSONAL_CARE)
      housing.push(d.HOUSING)
      transportation.push(d.TRANSPORTATION)
      recreation_education.push(d.RECREATION_EDUCATION)
      all_groups.push(d.ALL_GROUPS)
      latitude.push(d.LATITUDE)
      longitude.push(d.LONGITUDE)

  
    });

    var trace3 = [{
      type: 'violin',
      x: year,
      // Y variable has to come from drop down menu
      y: chosenYaxis,
      points: 'none',
      box: {
        visible: true
      },
      line: {
        color: 'green',
      },
      meanline: {
        visible: true
      },
      transforms: [{
        type: 'groupby',
        groups: year,
        styles: [  
        {target: '2000', value: {line: {color: 'blue'}}},
        {target: '2007', value: {line: {color: 'orange'}}},
        {target: '2011', value: {line: {color: 'green'}}},
        {target: '2013', value: {line: {color: 'grey'}}},
        {target: '2015', value: {line: {color: 'red'}}},
        {target: '2017', value: {line: {color: 'pink'}}},
        {target: '2019', value: {line: {color: 'brown'}}}
       ]
      }]
    }]
    
    var layout = {
      title: "Multiple Traces Violin Plot",
      yaxis: {
        zeroline: false
      }
    }
    
    Plotly.newPlot('violinplot', trace3, layout)

  });
 

  // Initial params
  var chosenXaxis = "YEAR";
  var chosenYaxis = "FOOD";


  // function used for updating yAxis const upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    const leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
      .duration(1000)
      .call(leftAxis);

    return yAxis;
  }


  // function used for updating y-scale const upon click on axis label
  function yScale(rpiData, chosenYaxis) {
      // create scales
      const yLinearScale = d3.scaleLinear()
        .domain([d3.min(rpiData, d=>d[chosenYaxis])*1.5, d3.max(rpiData, d=>d[chosenYaxis])*1.1 ])
        .range([height, 0]);
      return yLinearScale;
  }

  // function used for updating tooltip for circles group
  // function updateToolTip(chosenXaxis, chosenYaxis, circlesGroup){
  //   let xLabel = "YEAR"
  //   let yLabel = ""
  //   if (chosenYaxis === "FOOD"){
  //     yLabel = "food";
  //   }
  //   else if (chosenYaxis === "CLOTHING"){
  //     yLabel = "Clothing";
  //   }
  //   else if (chosenYaxis === "TOBACCO_ALCOHOL"){
  //     yLabel = "Tobacco & Alcohol";
  //   }
  //   else if (chosenYaxis === "HOUSEHOLD_EQUIPMENT_OPERATION"){
  //     ylabel = "Household Equiment Operation";
  //   }
  //   else if (chosenYaxis === "HEALTH_PERSONAL_CARE"){
  //     ylabel = "Health & Personal Care";
  //   }
  //   else if (chosenYaxis === "HOUSING"){
  //     ylabel = "Housing";
  //   }
  //   else if (chosenYaxis === "TRANSPORTATION"){
  //     ylabel = "Transportation";
  //   } 
  //   else if (chosenYaxis === "RECREATION_EDUCATION"){
  //     ylabel = "Recreation & Education";
  //   }
  //   else{
  //     yLabel = "AllGroups";
  //   }
  
  // Retrieve data from the API and execute everything below
  (async function(){
      const rpiData = await d3.json("/api/v1.0/rpi_comp");
  
      // parse data to interger from string
      rpiData.forEach(function(data){
        data.TOWN = +data.TOWN;
        data.REGION = +data.REGION;
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

      // xLinearScale function after API import
      // let xLinearScale = xScale(rpiData, chosenXaxis);
  
      // yLinearScale function after csv import
      let yLinearScale = yScale(rpiData, chosenYaxis)

      // Create initial axis functions
      const bottomAxis = d3.axisBottom(xLinearScale);
      // const leftAxis = d3.axisLeft(yLinearScale);
  
      // append X-axis
      // let xAxis = chartGroup.append("g")
      //                     .classed("x-axis", true)
      //                     .attr("transform", `translate(0, ${height})`)
      //                     .call(bottomAxis)
  
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

      //  Create Group of Y labels
      const FOODLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 20)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "food")
                                  .classed("active", true)
                                  .classed("aText", true)
                                  .text("food");

      const CLOTHINGLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 40)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Clothing")
                                  .classed("inactive", true)
                                  .classed("aText", true)
                                  .text("Clothing");
      
      const TOBACCO_ALCOHOLLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 60)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Tobacco & Alcohol")
                                  .classed("inactive", true)
                                  .classed("aText", true)
                                  .text("Tobacco & Alcohol");
                                  
      const HOUSEHOLD_EQUIPMENT_OPERATIONLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 60)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Household Equiment Operation")
                                  .classed("inactive", true)
                                  .classed("aText", true)
                                  .text("Household Equiment Operation");
                                  
      const HEALTH_PERSONAL_CARELabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 60)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Health & Personal Care")
                                  .classed("inactive", true)
                                  .classed("aText", true)
                                  .text("Health & Personal Care");
                                  
      const HOUSINGLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 60)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Housing")
                                  .classed("inactive", true)
                                  .classed("aText", true)
                                  .text("Housing");
      const TRANSPORTATIONLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 20)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Transportation")
                                  .classed("active", true)
                                  .classed("aText", true)
                                  .text("Transportation");
        const RECREATION_EDUCATIONLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 20)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "Recreation & Education")
                                  .classed("active", true)
                                  .classed("aText", true)
                                  .text("Recreation & Education");
          const ALL_GROUPSLabel = ylabelsGroup.append("text")
                                  .attr("y", 0 - 20)
                                  .attr("x", 0)
                                  .attr("transform", "rotate(-90)")
                                  .attr("dy", "1em")
                                  .attr("value", "All Groups")
                                  .classed("active", true)
                                  .classed("aText", true)
                                  .text("All Groups");
                                 

      // "/api/v1.0/rpi_comp"


    //   // x axis labels event listener
    //   xlabelsGroup.selectAll("text")
    //   .on("click", function() {
    //   // get value of selection
    //   const value = d3.select(this).attr("value");
    //   console.log(`${value} click`)
    //   if (value !== chosenXaxis) {

    //       // replaces chosenXAxis with value
    //       chosenXaxis = value;
    //       console.log(chosenXaxis)

    //       // functions here found above csv import
    //       // updates x scale for new data
    //       xLinearScale = xScale(rpiData, chosenXaxis);

    //       // updates x axis with transition
    //       xAxis = renderXAxes(xLinearScale, xAxis);

    //       // updates circles with new x values
    //       circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

    //        // updates texts with new x values
    //       txtGroup = renderTexts(txtGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

    //       // changes classes to change bold text
    //       if (chosenXaxis === "YEAR") {
    //           YEARLabel
    //               .classed("active", true)
    //               .classed("inactive", false);
    //           RECREATION_EDUCATIONLabel
    //               .classed("active", false)
    //               .classed("inactive", true);
    //           FOODLabel
    //               .classed("active", false)
    //               .classed("inactive", true);
    //       }
    //       else if (chosenXaxis === "RECREATION_EDUCATION"){
    //         YEARLabel
    //             .classed("active", false)
    //             .classed("inactive", true);
    //         RECREATION_EDUCATIONLabel
    //             .classed("active", true)
    //             .classed("inactive", false);
    //         FOODLabel
    //             .classed("active", false)
    //             .classed("inactive", true);
    //       }
    //       else{
    //         YEARLabel
    //               .classed("active", false)
    //               .classed("inactive", true);
    //           RECREATION_EDUCATIONLabel
    //               .classed("active", false)
    //               .classed("inactive", true);
    //           FOODLabel
    //               .classed("active", true)
    //               .classed("inactive", false);  
    //       }
    //     // update tooltip with new info after changing x-axis 
    //     circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup); 
    // }})

// Y axis Labels event listener

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

   // updates texts with new y values
  txtGroup = renderTexts(txtGroup, xLinearScale, yLinearScale, chosenYaxis);

  // changes classes to change bold text
  if (chosenYaxis === "Food") {
    FOODLabel
          .classed("active", true)
          .classed("inactive", false);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Clothing"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", true);
    CLOTHINGLabel
          .classed("active", true)
          .classed("inactive", false);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Tobacco & Alcohol"){
    FOODLabel
          .classed("active", true)
          .classed("inactive", false);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", true)
          .classed("inactive", false);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Household Equiment Operation"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", true);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Health & Personal Care"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", true);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", true)
          .classed("inactive", false);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Housing"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", true);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", true)
          .classed("inactive", false);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Transportation"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", false);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", true)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else if (chosenYaxis === "Recreation & Education"){
    FOODLabel
          .classed("active", false)
          .classed("inactive", true);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", true)
          .classed("inactive", false);
    ALLGROUPSLabel
          .classed("active", false)
          .classed("inactive", true);
  }
  else{
    FOODLabel
          .classed("active", false)
          .classed("inactive", false);
    CLOTHINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TOBACCO_ALCOHOLLabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSEHOLD_EQUIPMENT_OPERATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    HEALTH_PERSONAL_CARELabel
          .classed("active", false)
          .classed("inactive", true);
    HOUSINGLabel
          .classed("active", false)
          .classed("inactive", true);
    TRANSPORTATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    RECREATION_EDUCATIONLabel
          .classed("active", false)
          .classed("inactive", true);
    ALLGROUPSLabel
          .classed("active", true)
          .classed("inactive", false);
}
}})
  })