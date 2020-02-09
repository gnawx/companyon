/* General Autofilter Function */
/* Takes in any keyword, which is to be used to
   filter the data argument based on the cat argument which is
   the keyword's category.
   num determines whether to INCLUDE (1) or EXCLUDE (2) kw */
   
function autofilter(kw, data, cat, num){
    
    var op1 = []; //first option array
    var op2 = []; //second option array

    //sort existing data based on options
    for (var i = 0; i < data.length; i++)
    {
        if (data[i][cat] == kw)
        {
            op1.push(data[i]);
        }
        else
        {
            op2.push(data[i]);
        }
    }
    
    if (num == 1) //first option
    {
        data = op1; //pump updated data for checkcheck.js

        //update hitcount
        $('#hitcount').empty();
    	hitcount = op1.length;
    	var hitphrase = $('<p></p>');
    	hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
    	hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
    	$('<hr>').appendTo($('#hitcount'));
    	hitphrase.appendTo($('#hitcount'));
        $('#hitcount').css("display","inline-block");
        
        // update table data
        if (data.length != 0)
        {
            $("#tbody-emps").empty();
            
            // create employee list
            createtable(op1);
        }
        else
        {
            //NO RESULTS FORMATTING
            $("#tbody-emps").empty();
            $("#heading").empty();
            $("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
        }

        //update keywords (CAPITALIZE TWOLETTER TO INDICATE STATE)
        var currentkw = $('input[name="q"]').val().split(","); //extract current keywords into an array
        var updatekw = ""; //new empty list of keywords
        for (var i = 0; i < currentkw.length; i++)
        {
            currentkw[i] = currentkw[i].replace(/^\s+/,""); //left trim of spaces in keywords with REGEX
            currentkw[i] = currentkw[i].replace(/\s+$/,""); //left trim of spaces in keywords with REGEX
            if (currentkw[i].toLowerCase() == kw.toLowerCase()) //check if current list matches kw
            {
                currentkw[i] = currentkw[i].toUpperCase(); //CAPITALIZE if yes
            }
            if (currentkw[i] != "")
            {
                updatekw = updatekw.concat(currentkw[i]+", "); //re-add existing terms
            }
        }
        $('input[name="q"]').val(updatekw); //update keywords
    }
    else if (num == 2) //2nd option
    {
        data = op2; //pump updated data for checkcheck.js

        //update hitcount
        $('#hitcount').empty();
        hitcount = op2.length;
        var hitphrase = $('<p></p>');
        hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
        hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
        $('<hr>').appendTo($('#hitcount'));
        hitphrase.appendTo($('#hitcount'));
        $('#hitcount').css("display","inline-block");

        //update table data
        if (data.length != 0)
        {
            $("#tbody-emps").empty();
            
            // create employee list
            createtable(op2)
        }
        else
        {
            //NO RESULTS FORMATTING
            $("#tbody-emps").empty();
            $("#heading").empty();
            $("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
        }

        //update keywords (CAPITALIZE TWOLETTER TO INDICATE STATE)
        var currentkw = $('input[name="q"]').val().split(","); //extract current keywords into an array
        var updatekw = ""; //new empty list of keywords
        for (var i = 0; i < currentkw.length; i++)
        {
            currentkw[i] = currentkw[i].replace(/^\s+/,""); //left trim of spaces in keywords with REGEX
            currentkw[i] = currentkw[i].replace(/\s+$/,""); //left trim of spaces in keywords with REGEX
            if (currentkw[i].toLowerCase() == kw.toLowerCase()) //check if current list matches kw
            {
                currentkw[i] = currentkw[i].toLowerCase(); //LOWER CASE if yes
            }
            if (currentkw[i] != "")
            {
                updatekw = updatekw.concat(currentkw[i]+", "); //re-add existing terms
            }
        }
        $('input[name="q"]').val(updatekw); //update keywords
    }
    //hide alert box
    $('#statequery').css("display", "none");

    //redo Additional Search Details
    $('#speccontent').empty();
    $('#schoolcontent').empty();
    $('#statecontent').empty();
    
    distributionfx(data);

    //update main index.js variables (done here because fx is called onclick)
    emps = data;
    keptresult = op1;
    filtered = op2;
    
    //re-run checkcheck function if any of the checkboxes are selected
    if (document.getElementById("cspecs").checked || 
    document.getElementById("cschool").checked || 
    document.getElementById("cstate").checked)
	{
        checkcheck(data);
    }
}