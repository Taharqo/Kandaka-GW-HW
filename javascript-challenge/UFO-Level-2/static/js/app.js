var tbody = d3.select('#main-table');

var filterbutton = d3.select('#filter-btn');
filterbutton.on('click', runtablefilter);

var clearbutton = d3.select('#clear-filter-btn');
clearbutton.on('click', runclearfilter);

//1 - Array generator: array holds ids from html filter fields  
htmlfilterIDs = [];
var formControl = d3.selectAll('.form-control');
var filterLength = formControl._groups[0].length;
for(var i=0; i < filterLength; i++ ){
    filterid = formControl._groups[0][i]['id']
    htmlfilterIDs.push(filterid)
};

//2 - Table generator:
//2.1 - table is unfilterd if the function is passed the data array from the file data.js
//2.2 - table is filtered if function is called from runtablefilter(3) and passed the filtereddata array 
function buildtable(tableinfo){
    var row = tbody.append('tr')
    var sightingvalues = Object.values(tableinfo)
    sightingvalues.forEach(sightingvalue => {
       var cell = row.append('td')
       cell.text(sightingvalue)
   });
};

//3 - Filtered array generator: array objects filtered using array from (1)  
function runtablefilter(){
    tbody.html("");
    var filtereddata = data

    htmlfilterIDs.forEach(iditem => {
        var idElement = d3.select(`#${iditem}`)
        var idValue = idElement.property('value') 
        if (idValue !="") {
            filtereddata = filtereddata.filter(sighting => sighting[`${iditem}`] == idValue) 
        } 
    });      
   
    filtereddata.forEach(buildtable)
}; 

//4 - Tabel reset: clear all filter values and regenerate the table using the data array from the file data.js
function runclearfilter(){
    tbody.html("");
    data.forEach(buildtable)
    document.getElementById("my-form").reset();
    filtereddata = []
};

//5 - unfiltered table Generator. call to build table function (2) using the data array from the file data.js
data.forEach(buildtable)