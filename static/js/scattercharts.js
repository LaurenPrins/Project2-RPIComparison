d3.json("/api/v1.0/rpi_comp").then(function(data) {

    // log the rpiData
    console.log(data);

    food=[]
    clothing=[]

    // household_equipment_operation=[]
    // health_personal_care=[]

    // cast strings to number
    data.forEach( d => {
        console.log(d)

        d.YEAR = +d.YEAR;
        d.food = +d.food;
        d.clothing = +d.clothing;
        d.housing = +d.housing;
        d.household_equipment_operation = +d.household_equipment_operation;
        d.transporation = +d.transportation;
        d.TOBACCO_ALOCOHOL = +d.TOBACCO_ALOCOHOL;
        d.health_personal_care = +d.health_personal_care;
        d.RECREATION_EDUCATION = +d.RECREATION_EDUCATION;
        d.ALL_GROUPS = +d.ALL_GROUPS;

                food.push(d.food)
        clothing.push(d.clothing)
    });
    console.log(food)
    var trace1={
        x: food,
        y: clothing,
        mode: "markers", 
        type: "scatter"
    }
    var layout1={
        title: "Food versus Clothing",
        xaxis: {title:{text: "Food"}},
        yaxis: {title:{text: "Clothing"},range:[-100, 100]}
        }

        console.log (trace1)
    Plotly.newPlot("scatter1",[trace1],layout1)



       
        
    
        household_equipment_operation=[]
        health_personal_care=[]
    
       
    household_equipment_operation.push(d.household_equipment_operation)
    health_personal_care.push(d.health_personal_care)

console.log(household_equipment_operation)
var trace1={
    x: household_equipment_operation,
    y: health_personal_care,
    mode: "markers", 
    type: "scatter"
}
var layout1={
    title: "Household Equipment Operation versus Health Personal Care",
    xaxis: {title:{text: "Household Equipment Operation"}},
    yaxis: {title:{text: "Health Personal Care"}}
    }

    console.log (trace1)
Plotly.newPlot("scatter2",[trace1],layout1)
});