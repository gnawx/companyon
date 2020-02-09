/* Generates SQL Search Query based on Formatted String q,
   q MUST BE a STRING of keywords separated by COMMA */

function sqlgenerator(q)
{
	//parse keywords (TO FINE TUNE SYNTAX) - IMPROVE
	var isValid = q.indexOf(',');
	if (isValid != -1)
	{
		$('input[name="q"]').val(q);
		var kw = q.split(","); //splits keywords using ","		
	}
	else
	{
		var kw = q.split(" "); //splits keywords using " "
		q = ""; //reset q
		//then correct q
		for (var i = 0; i < kw.length; i++)
		{
			q = q.concat(kw[i]);
			if (i < kw.length)
			{
				for (var j = 0; j < avail_entry.length; j++)
				{
					var endCheck = 0;
					var tocompare = avail_entry[j]["label"].split(" ");
					var toclength = tocompare.length;
					if (kw[i].toLowerCase() == tocompare[toclength-1].toLowerCase())
					{
						endCheck = 1;
						break;
					}
				}
				if (endCheck == 1)
				{
					q = q.concat(", ");
				}
				else
				{
					q = q.concat(" ");	
				}
			}
		}
		$('input[name="q"]').val(q);
		if (q != " ") //prevent syntax error warning for when last item is removed
		{
			var syntaxalert = $('#syntaxalert');
			var syntaxtext = $('<span></span>');
			syntaxtext.append('WRONG SYNTAX: Separate EACH KEYWORD by COMMA.');
			syntaxtext.append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
			syntaxtext.appendTo(syntaxalert);
			syntaxalert.css("display","inline-block");
		}
	}

	// List of SQL Search Query //
	var squery = 'SELECT birthday, city, grad, emp, id, major, school, name, number, sex, state, tel FROM (SELECT * FROM emp LEFT JOIN addr ON emp.id = addr.id LEFT JOIN edu ON addr.id = edu.id) WHERE (';
	var squeryb = ''; //custom search conditions based on search bar input

	for (var i = 0; i < kw.length; i++) //looping over all keywords
	{
		kw[i] = kw[i].replace(/^\s+/,""); //left trim of spaces in keywords with REGEX
		kw[i] = kw[i].replace(/\s+$/,""); //left trim of spaces in keywords with REGEX
		// if (kw[i] != "")
		// {
		// 	var fz = fuse.search(kw[i]); //fuse fuzzy search
		// 	kw[i] = fz[0].item.label;	
		// }
		if (kw[i].length == 2)
		{
			for (var j in statecheck)
			{
				if (kw[i].toLowerCase() == statecheck[j].toLowerCase())
				{
					statekey = 1;
					twolword = statecheck[j];
				}
			}
		}
	}
    var search_cat = ["number", "name", "sex", "birthday", "tel", "state", "major", "school"];

	for (var i = 0; i < kw.length; i++) //looping over all keywords
	{
		for (var j = 0; j < search_cat.length; j++) //looping over data categories
		{
			if (search_cat[j] == "sex")
			{
				var gid = 0;
				//male is handled as 1, female as 2 in db, ensures all possible permutations are handled
				if (kw[i].toLowerCase() == "male" || kw[i].toLowerCase() == "mal" ||
				kw[i].toLowerCase() == "ma" || kw[i].toLowerCase() == "m")
				{
					gid = 1;
				}
				else if (kw[i].toLowerCase() == "female" || kw[i].toLowerCase() == "femal" ||
				kw[i].toLowerCase() == "fema" || kw[i].toLowerCase() == "fem" ||
				kw[i].toLowerCase() == "fe" || kw[i].toLowerCase() == "f")
				{
					gid = 2;
				}
				var squeryc = search_cat[j]+" = "+gid;
			}
			else if (search_cat[j] == "birthday")
			{
				var bd = new Date(kw[i]); //create a new date object
				//conditions for months and days < 10 - format preservation
				if ((bd.getMonth()+1 < 10) && (bd.getDate() < 10)) //month+1 as getMonth returns 0-11
				{
					var squeryc = search_cat[j]+" = '"+bd.getFullYear()+"-0"+(bd.getMonth()+1)+"-0"+bd.getDate()+"'";
				}
				else if (bd.getMonth()+1 < 10)
				{
					var squeryc = search_cat[j]+" = '"+bd.getFullYear()+"-0"+(bd.getMonth()+1)+"-"+bd.getDate()+"'";
				}
				else if (bd.getDate() < 10)
				{
					var squeryc = search_cat[j]+" = '"+bd.getFullYear()+"-"+(bd.getMonth()+1)+"-0"+bd.getDate()+"'";
				}
				else
				{
					var squeryc = search_cat[j]+" = '"+bd.getFullYear()+"-"+(bd.getMonth()+1)+"-"+bd.getDate()+"'";
				}
			}
			else if (search_cat[j] == "major") //all other data categories
			{
				currentterm = kw[i].split(" ");
				if (currentterm[0].toLowerCase() == "men" || currentterm[0].toLowerCase() == "women")
				{
					var squeryc = search_cat[j]+" LIKE '"+kw[i]+"%'";					
				}
				else
				{
					var squeryc = search_cat[j]+" LIKE '%"+kw[i]+"%'";	
				}
			}
			else
			{
				if (kw[i].toLowerCase() == "male" || kw[i].toLowerCase() == "female")
				{
					var squeryc = search_cat[j]+" LIKE '"+kw[i]+"'";					
				}
				else
				{
					var squeryc = search_cat[j]+" LIKE '%"+kw[i]+"%'";
				}
			}
			if (j < (search_cat.length-1)) //1 less than the last iteration
			{
				squeryc = squeryc.concat(" OR ");
			}
			else
			{
				squeryc = squeryc.concat(")");
			}
			squeryb = squeryb.concat(squeryc);
		}
		if (i < (kw.length-1)) //1 less than last iteration
		{
			squeryb = squeryb.concat(" AND (");
		}
	}
	squery = squery.concat(squeryb);
    squery = squery.concat(" ORDER BY number");
    return [squeryb, squery, kw, twolword];
}