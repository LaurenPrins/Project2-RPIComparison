function getYear(){
    var selYear = d3.select('#Year');
    let chosenYear = selYear.node().value;
    alert(chosenYear);
};

let form = d3.select('#searchYear');
form.on('submit', getYear);

d3.json("/api/v1.0/rpi_comp").then(function(data) {

    // log the rpiData
    console.log(data);



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

    // cast strings to number
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

    
    var trace2={
        x: all_groups,
        y: housing,
        mode: "markers", 
        type: "scatter"
    }   
    var layout2={
        title: "All_Grous vs Housing",
        xaxis: {title:{text: "all_groups"}},
        yaxis: {title:{text: "housing"},range:[-100, 100]}
        }

        console.log (trace1)
    Plotly.newPlot("scatter2",[trace2],layout2)

});
    
       
//household_equipment_operation.push(d.household_equipment_operation)
//health_personal_care.push(d.health_personal_care)
//console.log(household_equipment_operation)
//var trace1={
//    x: household_equipment_operation,
//    y: health_personal_care,
//    mode: "markers", 
//    type: "scatter"
// }
//var layout1={
//    title: "Household Equipment Operation versus Health Personal Care",
//    xaxis: {title:{text: "Household Equipment Operation"}},
//    yaxis: {title:{text: "Health Personal Care"}}
//    }

//    console.log (trace1)
//Plotly.newPlot("scatter2",[trace1],layout1)
//});