// svg nominal area
var svgWidth = 1000;
var svgHeight = 750;

// margin arounbd chart area
var margin = {
    top: 80,
    right: 80,
    bottom: 80,
    left: 80
};

// define chart dimensions inside margin
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// append svg area to the 'scatter' div and make chart responsive
var svg = d3.select('#scatter')
    .append('svg')
    .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

// append group area with margins
var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);  

d3.csv('data/CSV_RPI_Data_Clean.csv').then( rpiData => {

    // log the rpiData
    console.log(rpiData);

    // cast strings to number
    rpiData.forEach( d => {
        d.YEAR = +d.YEAR;
        d.FOOD = +d.FOOD;
        d.CLOTHING = +d.CLOTHING;
        d.HOUSING = +d.HOUSING;
        d.HOUSEHOLD_EQUIPMENT_OPERATION = +d.HOUSEHOLD_EQUIPMENT_OPERATION;
        d.TRANSPORTATION = +d.TRANSPORTATION;
        d.TOBACCO_ALOCOHOL = +d.TOBACCO_ALOCOHOL;
        d.HEALTH_PERSONAL_CARE = +d.HEALTH_PERSONAL_CARE;
        d.RECREATION_EDUCATION = +d.RECREATION_EDUCATION;
        d.ALL_GROUPS = +d.ALL_GROUPS;
    });

    // x-scale - 5% padding left & right
    var xLinearScale = d3.xLinearScale()
        .domain([
            d3.min( rpiData, d => d.YEAR ) * 0.95,
            d3.max( rpiData, d => d.YEAR ) * 1.05
        ])
        .range([chartWidth])
        .nice();
    
    // y-scale - 5% padding top & bottom
    var yLinearScale = d3.yLinearScale()
        .domain([
            d3.min( rpiData, d => d.ALL_GROUPS ) * 0.95,
            d3.max( rpiData, d => d.ALL_GROUPS ) * 1.05
        ])
        .range([chartHeight, 0])
        .nice();
    
    // chart axes relative to x/y scale
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // // tooltip for mouse hover
    // var d3Tip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([40, -65])
    //     .html( d => `
    //         <b>${d.TOWN_LOCALITY}</b><br>
    //         `)
    
    // append SVG circles
    chartGroup.selectAll('circle')
        .data(rpiData)
        .enter()
        .append('circle')
        .attr('class', 'stateCircle ')

})