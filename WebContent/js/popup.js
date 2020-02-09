/* Pop Up Window Toggle Script */

/* Function takes the id of current employee as an argument, concat it with targetid,
   and send it back to toggle the popup window. */

function popupF(eventid) {
    var targetid = "popupM";
    targetid = targetid.concat(eventid);
    var popup = document.getElementById(targetid);
    if (popup.innerHTML != "")
    {
        popup.classList.toggle("show");
    }
}

/* Function for Pop Up Checkbox How-to-Use Information */
function infoPop() {
    var info = document.getElementById("info");
    info.classList.toggle("show");
}