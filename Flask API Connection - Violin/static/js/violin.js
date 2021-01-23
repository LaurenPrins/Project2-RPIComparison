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
    

    var trace3 = [{
          type: 'violin',
          x: "Year",
          // Y variable has to come from drop down menu
          y: all_groups,
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
          zeroline: true
          }

    }
    Plotly.newPlot('violinplot', trace3, layout)
    
})});
    