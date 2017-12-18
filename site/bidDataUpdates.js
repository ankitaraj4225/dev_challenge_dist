var allData = [], sortedArray = [], count = 0, sparkMainArr = [];


setInterval(function () {
	sortedArray = [], count += 1;
	if (allData.length > 0) {
		initialFunction(allData);
		createTable(sortedArray);
	}
	if (count >= 6) {
		for (var i = 0; i < sortedArray.length; i++) {
			const columnSparkline = document.getElementById('streamSpan' + [i])
			if(!(columnSparkline === null))
			{
				Sparkline.draw(columnSparkline, sortedArray[i].sparkline)								
			}
		}
	}
}, 5000);

function initialFunction(mainArray) {
	var nameArr = [];
	nameArr = getUniqueNameArray(mainArray);
	dataManipulation(nameArr, mainArray)

	//addStreamlineValuesToSortedArray();
	sortedArray.sort(function (a, b) {
		if (a.lastChangeBid < b.lastChangeBid)
			return 1;
		if (a.lastChangeBid > b.lastChangeBid)
			return -1;
	});

}

function getUniqueNameArray(mainArray) {
	var nameArr = [], i;
	for (i = 0; i < mainArray.length; i++) {
		if (nameArr.indexOf(mainArray[i].name) === -1) {
			nameArr.push(mainArray[i].name);
		}
	}
	return nameArr;

}

function dataManipulation(nameArr, mainArray) {
	var i, j;
	for (i = 0; i < nameArr.length; i++) {
		var currentObj = {}, sparkArr = [], x, y, sparkCount = 0;
		for (j = 0; j < mainArray.length; j++) {
			if (nameArr[i] == mainArray[j].name) {
				x = mainArray[j].bestBid;
				y = mainArray[j].bestAsk;
				sparkArr.push((x + y) / 2);
				sparkCount += 1;
				if (Object.getOwnPropertyNames(currentObj).length === 0) {
					currentObj = mainArray[j];
				} else if (currentObj.lastChangeBid < mainArray[j].lastChangeBid) {
					currentObj = mainArray[j];
				}

			}
		}
		sparkMainArr.push(sparkCount);
		if (count > 6) {
			sparkArr.splice(0, sparkMainArr[0])
			sparkMainArr.splice(0, 1);
		}
		currentObj.sparkline = sparkArr;
		sortedArray.push(currentObj);
	}
}




function createTable(rows) {
	document.getElementById("tableDiv").innerHTML = "";
	var html = "<table border='1|1'>";
	html += "<tr><th>Name</th><th>Current best bid price</th><th>Current best ask price</th><th>Best bid last changed</th><th>Best ask price last changed</th>";
	if (count > 6) {
		html += "<th>Sparkline</th>"
	}
	html += "</tr>";
	for (var i = 0; i < rows.length; i++) {
		html += "<tr>";
		html += "<td>" + rows[i].name + "</td>";
		html += "<td>" + rows[i].bestBid + "</td>";
		html += "<td>" + rows[i].bestAsk + "</td>";
		html += "<td>" + rows[i].lastChangeBid + "</td>";
		html += "<td>" + rows[i].lastChangeAsk + "</td>";
		if (count > 6) {
			html += "<td><span id='streamSpan" + [i] + "'></span></td>";
		}

		html += "</tr>";

	}
	html += "</table>";
	document.getElementById("tableDiv").innerHTML = html;
}
