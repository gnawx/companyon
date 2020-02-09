/* Function to Filter Current Result if a 2 Letter keyword
   that matches one of the States available is detected.
   
    num determines whether to INCLUDE (1) or EXCLUDE (2)
    state results.

   REPLACED BY autofilter, which is a MORE GENERIC version*/

function statefilter(num){
    var stateitem = [];
    var nonstateitem = [];
    for (var i = 0; i < emps.length; i++)
    {
        if (emps[i].state == twolword)
        {
            stateitem.push(emps[i]);
        }
        else
        {
            nonstateitem.push(emps[i]);
        }
    }
    if (num == 0) //state query
    {
        emps = stateitem; //pump updated emps for checkcheck.js

        //update hitcount
        $('#hitcount').empty();
    	hitcount = stateitem.length;
    	var hitphrase = $('<p></p>');
    	hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
    	hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
    	$('<hr>').appendTo($('#hitcount'));
    	hitphrase.appendTo($('#hitcount'));
        $('#hitcount').css("display","inline-block");
        
        // update table data
        if (emps.length != 0)
        {
            $("#tbody-emps").empty();
            
            // create employee list
            createtable(stateitem);
        }
        else
        {
            //NO RESULTS FORMATTING
            $("#tbody-emps").empty();
            $("#heading").empty();
            $("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
        }
    }
    else if (num == 1) //other query
    {
        //update hitcount
        $('#hitcount').empty();
        hitcount = nonstateitem.length;
        var hitphrase = $('<p></p>');
        hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
        hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
        $('<hr>').appendTo($('#hitcount'));
        hitphrase.appendTo($('#hitcount'));
        $('#hitcount').css("display","inline-block");

        //update table data
        if (emps.length != 0)
        {
            $("#tbody-emps").empty();
            
            // create employee list
            createtable(nonstateitem)
        }
        else
        {
            //NO RESULTS FORMATTING
            $("#tbody-emps").empty();
            $("#heading").empty();
            $("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
        }
    }
    //hide alert box
    $('#statequery').css("display", "none");

    //redo Additional Search Details
    $('#speccontent').empty();
    $('#schoolcontent').empty();
    $('#statecontent').empty();
    
    distributionfx(emps);
    
    //re-run checkcheck function if any of the checkboxes are selected
    if (document.getElementById("cspecs").checked || 
    document.getElementById("cschool").checked || 
    document.getElementById("cstate").checked)
	{
        checkcheck(emps);
    }
}