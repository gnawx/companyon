/* Function to Populate Statistical Distribution Table of Search Result */

function distributionfx(result)
{
    //decide on whether to display options
    if (result.length != 0)
    // if (result.length != 0 && result.length < 40) // take out second condition to display at FULL LIST
    {
        $("#resultpanel").css("display","inline-block");       
    }
    else
    {
        $("#resultpanel").css("display","none");
    }

    //sort result based on specialization first
    result.sort(function(a,b){
        if (a.major < b.major)
        {
            return -1;
        }
        else if (a.major > b.major)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    });

    // loop to count number of each category - tbc
    var rlength = result.length;
    var counter = 0;
    if (result.length != 0)
    {
        var currentterm = result[0].major;        
    }
    var pnl = $('#speccontent');
    pnl.append('<p><b>Specialization:</b></p>');
    var itemlist = $('<ul></ul>');
    for (var i = 0; i < result.length; i++)
    {
        if (currentterm == result[i].major)
        {
            counter = counter + 1;
        }
        else
        {
            //append to panel
            itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                        currentterm+'</a> = '+counter+'</li>');
            counter = 1; //reset counter to 1 (first term is alr counted now)
            currentterm = result[i].major;            
        }
    }
    //final update of count after loop (for final category)
    //append to panel
    itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                currentterm+'</a> = '+counter+'</li>');
    itemlist.appendTo(pnl);

    //sort result based on school second
    result.sort(function(a,b){
        if (a.school < b.school)
        {
            return -1;
        }
        else if (a.school > b.school)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    });

    // loop to count number of each category - tbc
    var counter = 0;
    if (result.length != 0)
    {
        var currentterm = result[0].school;        
    }
    var pnl = $('#schoolcontent');
    pnl.append('<p><b>School:</b></p>');
    var itemlist = $('<ul></ul>');
    for (var i = 0; i < result.length; i++)
    {
        if (currentterm == result[i].school)
        {
            counter = counter + 1;
        }
        else
        {
            var pnl = $('#schoolcontent');
            //append to panel
            itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                        currentterm+'</a> = '+counter+'</li>');
            counter = 1; //reset counter to 1 (first term is alr counted now)
            currentterm = result[i].school;            
        }
    }
    //final update of count after loop (for final category)
    //append to panel
    itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                currentterm+'</a> = '+counter+'</li>');
    itemlist.appendTo(pnl);

    //sort result based on address third
    result.sort(function(a,b){
        if (a.state < b.state)
        {
            return -1;
        }
        else if (a.state > b.state)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    });

    // loop to count number of each category - tbc
    var counter = 0;
    if (result.length != 0)
    {
        var currentterm = result[0].state;        
    }
    var pnl = $('#statecontent');
    pnl.append('<p><b>State:</b></p>');
    var itemlist = $('<ul></ul>');
    for (var i = 0; i < result.length; i++)
    {
        if (currentterm == result[i].state)
        {
            counter = counter + 1;
        }
        else
        {
            var pnl = $('#statecontent');
            //append to panel
            itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                        currentterm+'</a> = '+counter+'</li>');
            counter = 1; //reset counter to 1 (first term is alr counted now)
            currentterm = result[i].state;            
        }
    }
    //final update of count after loop (for final category)
    //append to panel
    itemlist.append('<li><a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ currentterm +"'" +', -1)">'+
                currentterm+'</a> = '+counter+'</li>');
    itemlist.appendTo(pnl);
}