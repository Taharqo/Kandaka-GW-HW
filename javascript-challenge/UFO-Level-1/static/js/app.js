
const tablebody = d3.select('#main-table');
const button = d3.select('#filter-btn');

button.on('click', runtablefilter);

function buildtable(objectrow){
    var row = tablebody.append('tr')
    var sightingvalues = Object.values(objectrow)
    sightingvalues.forEach(sightingvalue => {
       var cell = row.append('td')
       cell.text(sightingvalue)
   }); 
};

function runtablefilter(){
    tablebody.html("");
    var inputElement = d3.select('#datetime')
    var inputValue = inputElement.property('value')
    console.log(inputValue)
    filteredData = data.filter(datasighting => datasighting.datetime === inputValue)
    console.log(filteredData)
    filteredData.forEach(buildtable)

};

data.forEach(sighting => {
    buildtable(sighting)
});



