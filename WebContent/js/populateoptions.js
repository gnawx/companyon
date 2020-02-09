/*Populates Options for BOTH autocomplete.js and index.js (fuse fuzzy search)*/
/*Put BEFORE BOTH of them!*/
var sql_auto, statecheck;
sql_auto = alasql('SELECT number, name, major, school, state FROM (SELECT * FROM emp LEFT JOIN addr ON emp.id = addr.id LEFT JOIN edu ON addr.id = edu.id)');
statecheck=[];

var avail_entry = [
    {label: "Male", category: "Gender"},
    {label: "Female", category: "Gender"},    
];
for (var i = 0; i < sql_auto.length; i++)
{
    // split multiple word keywords
    var fullname = sql_auto[i].name.split(" ");

    /* Categorise avail_entry for possible categorisation of autocomplete */
    avail_entry.push({label: sql_auto[i].number, category: "Employee ID"});
    avail_entry.push({label: fullname[0], category: "First Name"});
    avail_entry.push({label: fullname[1], category: "Last Name"});
    avail_entry.push({label: sql_auto[i].name, category: "Full Name"});
    avail_entry.push({label: sql_auto[i].major, category: "Specialization"});
    avail_entry.push({label: sql_auto[i].school, category: "School"});
    avail_entry.push({label: sql_auto[i].state, category: "State"});
    
    statecheck.push(sql_auto[i].state); //push state for checking
}

/* AVAIL_ENTRY FINETUNING */
//sort avail_entry array alphabetically
avail_entry.sort(function(a,b){
    if (a.label < b.label)
    {
        return -1;
    }
    else if (a.label > b.label)
    {
        return 1;
    }
    else
    {
        return 0;
    }
});

//remove duplicates by comparing adjacent entries of sorted array
for (var i = (avail_entry.length - 2); i > -1; i--)
{ 
    if (avail_entry[i].label == avail_entry[i+1].label)
    {
        avail_entry.splice(i, 1);
    }
}

//sort avail_entry array categorically for autocomplete
avail_entry.sort(function(a,b){
    if (a.category < b.category)
    {
        return -1;
    }
    else if (a.category > b.category)
    {
        return 1;
    }
    else
    {
        return 0;
    }
});

/* STATECHECK FINETUNING */
//sort statecheck alphabetically
statecheck.sort(function(a,b){
    if (a < b)
    {
        return -1;
    }
    else if (a > b)
    {
        return 1;
    }
    else
    {
        return 0;
    }
});

//remove duplicates by comparing adjacent entries of sorted array
for (var i = (statecheck.length - 2); i > -1; i--)
{ 
    if (statecheck[i] == statecheck[i+1])
    {
        statecheck.splice(i, 1);
    }
}