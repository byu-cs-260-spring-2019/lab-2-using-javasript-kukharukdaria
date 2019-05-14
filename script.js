window.onload = function()
{
	document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
		event.preventDefault();
		const value = document.getElementById("weatherInput").value;
		if (value === "")
		return;
		console.log(value);

		const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=e8cecc95b145b5818f59285a02cc26d9";
        
        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=e8cecc95b145b5818f59285a02cc26d9";

        var response2 = await fetch(url2);
        console.log("responce2: ",response2);
        const json2 = await response2.json();
        console.log("json2: ", json2);
		try{
			//tryign to do something that might fail
			const response = await fetch(url);

			//console.log("responce: ",response);

			const json = await response.json();
			//console.log("json: ", json);

            let results = "";
			results += '<h2>Weather in ' + json.name + "</h2>";
            results += "<section id='mainID'>";
			results += '<h3 id="current">Current</h2>';
			for (let i=0; i < json.weather.length; i++) {
				results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
			}
			results += '<h2>' + json.main.temp + " &deg;F</h2>"
			results += "<p id='description'>"
			for (let i=0; i < json.weather.length; i++) {
				results += json.weather[i].description;
				if (i !== json.weather.length - 1)
					results += ", ";
			}
            results += "</p>";
            results += "</section>";
			document.getElementById("weatherResults").innerHTML = results;


            //NEW STUFF
            fetch(url2)
                .then(function(response) {
                return response.json();
                }).then(function(json) {
                console.log(json);
                let forecast = "";
                for (let i=0; i < json.cnt; ) {
                    var dayCount = moment(json.list[i].dt_txt).format('Do');
                    console.log(dayCount);
                    forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
                    forecast += "<table 'id=tables'><tr>";
                    
                    while(i < 40 && dayCount == moment(json.list[i].dt_txt).format('Do')){
                        forecast += "<td id='table'>";
                        forecast += "<h2 id='centerMe'>" + moment(json.list[i].dt_txt).format('h a') + "</h2>";
                        forecast += "<p id='centerMe'>Temperature: " + json.list[i].main.temp + "</p>";
                        forecast += "<p id='centerMe'>Wind speed: " + json.list[i].wind.speed + "</p>";
                        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
                        forecast += "</td>";
                        console.log(dayCount, " ", moment(json.list[i].dt_txt).format('Do'));
                        i++;
                    }
                    forecast += "</tr></table>";
                }
                console.log(document.getElementById("forecastResults"));
                document.getElementById("forecastResults").innerHTML = forecast;
                });


		}catch(err){
			console.log(err);
		}
	});
};