/* Javascript Function that Updates Display Data Table
   Based on Source Code by WORKSAP STM Team.
   Simply moved the code out of the index.html page as
   it is frequently used. */

function createtable(dataset)
{
    var tbody = $('#tbody-emps');
	for (var i = 0; i < dataset.length; i++) {
		var data = dataset[i];
		var tr = $('<tr></tr>');
		tr.append('<td><div id="'+data.id+'" class="popup">'+
					'<img height=40 class="img-circle" onclick="popupF('+ data.id +')" src="img/' + data.id + '.jpg">'+
					'<span class="popuptext" id="popupM'+data.id+'"></span>'+
					'</div></td>');
		tr.append('<td><a href="emp.html?id=' + data.id + '">' + data.number + '</a></td>');
		tr.append('<td>' + data.name + '</td>');
		tr.append('<td>' + '<a class="addword" href="javascript:void(0)" onclick="addkw('+"'"+ DB.choice(data.sex) +"'" +', -1)">'+ DB.choice(data.sex) + '</td>');
		tr.append('<td>' + ((Date.now() - new Date(data.birthday))/31557600000).toFixed(0) + '</td>');
		tr.append('<td>' + data.tel + '</td>');
		tr.appendTo(tbody);
	}
}