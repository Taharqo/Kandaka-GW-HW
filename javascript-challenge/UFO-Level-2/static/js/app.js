
var tbody = d3.select('#main-table')

var filterbutton = d3.select('#filter-btn');
filterbutton.on('click', runtablefilter);

var clearbutton = d3.select('#clear-filter-btn')
clearbutton.on('click', runclearfilter)

function runclearfilter(){
    tbody.html("");
    data.forEach(buildtable)
    document.getElementById("my-form").reset();
    filtereddata = []
   }

function buildtable(tableinfo){
    var row = tbody.append('tr')
    var sightingvalues = Object.values(tableinfo)
    sightingvalues.forEach(sightingvalue => {
       var cell = row.append('td')
       cell.text(sightingvalue)
   }); 
   
};

function runtablefilter(){
    tbody.html("");
    var filtereddata = data

    var dateElement = d3.select('#datetime')
    var dateValue = dateElement.property('value')  
    if (dateValue !="") {
        filtereddata = filtereddata.filter(sighting => sighting.datetime == dateValue)
    }

    var cityElement = d3.select('#city')
    var cityValue = cityElement.property('value')
    if (cityValue !=""){
        filtereddata = filtereddata.filter(sighting => sighting.city == cityValue)
    }

    var stateElement = d3.select('#state')
    var stateValue = stateElement.property('value')
    if (stateValue != ""){
        filtereddata = filtereddata.filter(sighting => sighting.state == stateValue)
    }

    var shapeElement = d3.select('#shape')
    var shapeValue = shapeElement.property('value')
    if (shapeValue != ""){
        filtereddata = filtereddata.filter(sighting => sighting.shape == shapeValue)
    }
    
    filtereddata.forEach(buildtable)
   console.log(`after filter func: ${filtereddata.length}`)//debug
};


data.forEach(sightingobjects => {
  buildtable(sightingobjects)
});