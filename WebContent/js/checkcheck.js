/* Pop Up Checkboxes Option Function */
/* Function detects if checkbox item is checked, and appends information to pop up window
   accordingly */
function checkcheck(dataset){
	if (document.getElementById("cspecs").checked)
	{
        for (var i = 0; i < dataset.length; i++)
        {
            if($('[id="spec"]').length < dataset.length)
            {
                var span = $("#popupM"+dataset[i].id);
                var para = $('<p style="margin: 0;" id="spec"></p>');
                para.append('Specialization = <a class="popupfont" href="javascript:void(0)" onclick="addkw('+"'"+
                    dataset[i].major +"'" +', '+ dataset[i].id +')">'+dataset[i].major+'</a>');
                para.appendTo(span);
            }
        }
    }
    else
    {
        $('p[id="spec"]').remove();
    } 
    if (document.getElementById("cschool").checked)
    {
        for (var i = 0; i < dataset.length; i++)
        {
            if($('[id="school"]').length < dataset.length)
            {
                var span = $("#popupM"+dataset[i].id);
                var para = $('<p style="margin: 0;" id="school"></p>');
                para.append('School = <a class="popupfont" href="javascript:void(0)" onclick="addkw('+"'"+
                    dataset[i].school +"'" +', '+ dataset[i].id +')">'+dataset[i].school+'</a>');
                para.appendTo(span);    
            }
        }
    }
    else 
    {

        $('p[id="school"]').remove();
    }
    if (document.getElementById("cstate").checked)
    {
        for (var i = 0; i < dataset.length; i++)
        {
            if($('[id="state"]').length < dataset.length)
            {
                var span = $("#popupM"+dataset[i].id);
                var para = $('<p style="margin: 0;" id="state"></p>');
                para.append('State = <a class="popupfont" href="javascript:void(0)" onclick="addkw('+"'"+
                            dataset[i].state +"'" +', '+ dataset[i].id +')">'+dataset[i].state+'</a>');
                para.appendTo(span);
            }
        }
    }
    else
    {
        $('p[id="state"]').remove();
    }
    for (var i = 0; i < dataset.length; i++)
    {
        var tocheck = document.getElementById("popupM"+dataset[i].id);
        if (tocheck.innerHTML == "")
        {
            tocheck.classList.remove("show");
        }
    }
};