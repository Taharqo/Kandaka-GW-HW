var tablebody = d3.select('#main-table')
var button = d3.select('#filter-btn');
button.on('click', runtablefilter);

function buildtable(tableinfo){
    var row = tablebody.append('tr')
    var sightingvalues = Object.values(tableinfo)
    sightingvalues.forEach(sightingvalue => {
       var cell = row.append('td')
       cell.text(sightingvalue)
   }); 
};

function runtablefilter(){
    tablebody.html("");

    var dateElement = d3.select('#datetime')
    var dateValue = dateElement.property('value')
    if (dateValue !="") {
        data = data.filter(sighting => sighting.datetime == dateValue)
    }

    var cityElement = d3.select('#city')
    var cityValue = cityElement.property('value')
    if (cityValue !=""){
        data = data.filter(sighting => sighting.city == cityValue)
    }

    var stateElement = d3.select('#state')
    var stateValue = stateElement.property('value')
    if (stateValue != ""){
        data = data.filter(sighting => sighting.state == stateValue)
    }

    var shapeElement = d3.select('#shape')
    var shapeValue = shapeElement.property('value')
    if (shapeValue != ""){
        data = data.filter(sighting => sighting.shape == shapeValue)
    }
    
    data.forEach(buildtable)

};

data.forEach(sightingobjects => {
    buildtable(sightingobjects)
});



