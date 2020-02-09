/* Add Keyword Script */

/* Function adds clicked term as Keyword for Search WITHOUT removing existing term. */

function addkw(kwterm, id) {
    for (var i = 0; i < avail_entry.length; i++)
    {
        if (kwterm.toLowerCase() == avail_entry[i].label.toLowerCase())
        {
            var kwcat = avail_entry[i].category.toLowerCase();
            if (kwcat == "specialization")
            {
                kwcat = "major";
            }
            else if (kwcat == "gender")
            {
                kwcat = "sex";
            }
        }
    }
    var currentkw = $('input[name="q"]').val().split(","); //extract current keywords into an array
    var newkw = ""; //new empty list of keywords
    var addornot = -1; //add if -1, don't add if i
    var statekw = ""; //store any state kw
    var statenonkw = ""; //stores any 2 letter word that is NOT state
    for (var i = 0; i < currentkw.length; i++)
    {
        currentkw[i] = currentkw[i].replace(/^\s+/,""); //left trim of spaces in keywords with REGEX
        currentkw[i] = currentkw[i].replace(/\s+$/,""); //left trim of spaces in keywords with REGEX
        if (currentkw[i].toLowerCase() == kwterm.toLowerCase()) //check if current list includes clicked keyword
        {
            addornot = i;
        }
        //only add non-empty terms PROVIDED
        //IF kwterm == currentkw, then REMOVE that currentkw
        if (currentkw[i] != "" && addornot != i)
        {
            if (currentkw[i].length == 2) //check if currentkw is a state
            {
                for (var j = 0; j < statecheck.length; j++)
                {
                    /*CASE SENSITIVE ON PURPOSE (AUTOFILTER)
                      CORRECTS CASE DEPENDING ON OPTION SELECTED */
                    if (currentkw[i] == statecheck[j])
                    {
                        statekw = statecheck[j]; //store statekw for 'AND' SQL Query at the end
                    }
                    else if (currentkw[i] == statecheck[j].toLowerCase())
                    {
                        statenonkw = statecheck[j].toLowerCase(); //store statekw for 'AND NOT' SQL Query at the end
                    }
                }
            }
            newkw = newkw.concat(currentkw[i]+", "); //re-add existing terms   
        }
    }
    if (addornot == -1)
    {
        newkw = newkw.concat(kwterm+", "); //add new term if need be
        if (kwterm.length == 2) //check if newkw is a state
        {
            for (var j = 0; j < statecheck.length; j++)
            {
                /*CASE SENSITIVE ON PURPOSE (AUTOFILTER)
                  CORRECTS CASE DEPENDING ON OPTION SELECTED */
                if (kwterm == statecheck[j])
                {
                    statekw = kwterm;
                }
                else if (kwterm == statecheck[j].toLowerCase())
                {
                    statenonkw = statecheck[j].toLowerCase();
                }
            }
        }
    }
    
    //Redo Displayed Data
    var addqueryb = sqlgenerator(newkw)[0];
    var addquery = 'SELECT birthday, city, grad, emp, id, major, school, name, number, sex, state, tel FROM (SELECT * FROM emp LEFT JOIN addr ON emp.id = addr.id LEFT JOIN edu ON addr.id = edu.id) WHERE (';
    addquery = addquery.concat(addqueryb);
    if (statekw != "") //check if clicked word is STATE
    {
        addquery = addquery.concat (" AND (state = '"+statekw+"')"); //MUST BE IN STATE
    }
    else
    {
        addquery = addquery.concat (" AND (state <> '"+statenonkw.toUpperCase()+"')"); //MUST NOT BE IN STATE
    }
    addquery = addquery.concat(" ORDER BY number");
    $('input[name="q"]').val(newkw); //update keywords
    data = alasql(addquery);

    //update hitcount
    $('#hitcount').empty();
    hitcount = data.length;
    var hitphrase = $('<p></p>');
    hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
    hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
    $('<hr>').appendTo($('#hitcount'));
    hitphrase.appendTo($('#hitcount'));

    //redo Additional Search Details
    $('#speccontent').empty();
    $('#schoolcontent').empty();
    $('#statecontent').empty();

    distributionfx(data);

    //update table data
    if (data.length != 0)
    {
        $("#tbody-emps").empty();
        
        // create employee list
        createtable(data);

        //check if data length = 40
        if (data.length < 40)
        {
            $('#hitcount').css("display","inline-block");            
        }
        else
        {
            $('#hitcount').css("display","none");    
        }
        //re-run checkcheck function if any of the checkboxes are selected
        if (document.getElementById("cspecs").checked || 
        document.getElementById("cschool").checked || 
        document.getElementById("cstate").checked)
        {
            checkcheck(data);
        }

        // display popup that was clicked
        if (id != -1)
        {
            var targetid = "popupM";
            targetid = targetid.concat(id);
            var popup = document.getElementById(targetid);
            if (popup.innerHTML != "")
            {
                popup.classList.add("show");
            }
        }
        
        //update emps (just in case)
        emps = data;
    }
    else
    {
        //NO RESULTS FORMATTING
        $("#tbody-emps").empty();
        $("#heading").empty();
        $("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
    }
}