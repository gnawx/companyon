// parse request params
var q = $.url().param('q');

//Fuse.js Options Setup
// var options = {
// 	shouldSort: true,
// 	includeScore: true,
// 	threshold: 0.6,
// 	location: 0,
// 	distance: 100,
// 	maxPatternLength: 32,
// 	minMatchCharLength: 1,
// 	keys: [
// 	  "label",
// 	]
// };

// var fuse = new Fuse(avail_entry, options);

var emps; //stores alasql result
var src; //boolean for whether a non-blank search kw is input

var statekey = 0; //check if state is in kw
var twolword = ""; //stores that state kw (from sqlgenerator)

var hitcount = 0; //count number of search hit

if (q)
{
	var sqlparam = sqlgenerator(q);
	var squeryb = sqlparam[0];
	var squery = sqlparam[1];
	var kw = sqlparam[2];
	twolword = sqlparam[3];
	src = 1; //there are keywords input
	emps = alasql(squery, []); // read data from database
	//display hit count
	hitcount = emps.length;
	var hitphrase = $('<p></p>');
	hitphrase.append('<span style="font-size: larger"><b>Hit Count: </b></span>');
	hitphrase.append('<span style="font-size: x-large;"><b>'+hitcount+'</b></span>/40');
	hitphrase.appendTo($('#hitcount'));
	$('#hitcount').css("display","inline-block");
} 
else 
{
	src = 0; //no keyword input
	emps = alasql('SELECT birthday, city, grad, emp, id, major, school, name, number, sex, state, tel FROM (SELECT * FROM emp LEFT JOIN addr ON emp.id = addr.id LEFT JOIN edu ON addr.id = edu.id) ORDER BY number', []); // read data from database
}

// Two Letter Keyword Alert
if (statekey == 1)
{
	var filtercat = 'state';
	var statequery = $('#statequery');
	var question = $('<span></span>');
	question.append('Did you mean to search for people ');
	question.append('<a class="alertfont" href="javascript:void(0)" onclick="autofilter(twolword, emps, filtercat, 1)">'+
					'living in '+twolword+'</a>');
	question.append(' or ');
	question.append('<a class="alertfont" href="javascript:void(0)" onclick="autofilter(twolword, emps, filtercat, 2)">'+
	'with entry fields containing "'+twolword+'"</a>?');
	question.append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
	question.appendTo(statequery);
	statequery.css("display","inline-block");
}

// create employee list
if (emps.length != 0)
{
	createtable(emps);
}
else
{
	//NO RESULTS FORMATTING
	$("#heading").empty();
	$("#heading").append("<th style='text-align: center'>NO RESULTS FOUND</th>");
}

//Additional Search Details Function
if (src == 1 && kw[0] != "")
{
	var dquery = 'SELECT major, state, school FROM (SELECT * FROM emp LEFT JOIN addr ON emp.id = addr.id LEFT JOIN edu ON addr.id = edu.id) WHERE (';
    dquery = dquery.concat(squeryb);
    var indexresult = alasql(dquery);
	distributionfx(indexresult);
}
else
{
	distributionfx(emps);
}

//enable pop-up by default
if (document.getElementById("cspecs").checked || 
document.getElementById("cschool").checked || 
document.getElementById("cstate").checked)
{
	checkcheck(emps);
}