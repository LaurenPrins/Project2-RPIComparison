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

d3.json("/api/v1.0/rpi_comp").then(function(data) {

    // log the rpiData
    console.log(data);

    // cast strings to number
    data.forEach( d => {
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
});
