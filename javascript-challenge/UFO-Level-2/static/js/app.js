var tbody = d3.select('#main-table');

var filterbutton = d3.select('#filter-btn');
filterbutton.on('click', runtablefilter);

var clearbutton = d3.select('#clear-filter-btn');
clearbutton.on('click', runclearfilter);

//build array of filter words pulled from HTML code. 
htmlfilterIDs = [];
var formControl = d3.selectAll('.form-control');
var filterLength = formControl._groups[0].length;
for(var i=0; i < filterLength; i++ ){
    filterid = formControl._groups[0][i]['id']
    htmlfilterIDs.push(filterid)
};

//Generate a table:
//table is unfilterd if the function is passed the data array
//table is filtered if function is called from runtablefilter() and passed the filtereddata array
function buildtable(tableinfo){
    var row = tbody.append('tr')
    var sightingvalues = Object.values(tableinfo)
    sightingvalues.forEach(sightingvalue => {
       var cell = row.append('td')
       cell.text(sightingvalue)
   });
};

//Generate a filtered the filtereddata array based on filter values from the webpage
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

//Resets the table by clearing the filters and regenerating the complete table using the data array
function runclearfilter(){
    tbody.html("");
    data.forEach(buildtable)
    document.getElementById("my-form").reset();
    filtereddata = []
};

data.forEach(buildtable)