function draw_times() {

    /* All dimensions and groups*/
    // Commits
    var months_dim = ndx.dimension(function(d){
        return d.month;
    });
    var commmits_month = months_dim.group();

    // Hour
    var hours_dim = ndx.dimension(function(d){
        return ""+d.hour;
    });
    var commits_hour = hours_dim.group();

    // Time Zone
    var tz_dim = ndx.dimension(function(d){
        return ""+d.tz;
    });
    var commits_tz = tz_dim.group();

    /*************/
    /* All charts*/
    /*************/
    // Commits
	var width_commits_chart = document.getElementById("commitsChart").offsetWidth;
    var date_min = months_dim.bottom(1)[0].month;
    var date_max = months_dim.top(1)[0].month;
    filter_dic.charts.commits = dc.barChart('#commitsChart', 'other');
    filter_dic.charts.commits
    	.width(width_commits_chart)
	    .height(300)
	    .transitionDuration(1000)
	    .margins({top: 10, right: 50, bottom: 25, left: 50})
	    .dimension(months_dim)
	    .group(commmits_month)
	    .x(d3.time.scale().domain([date_min,date_max]))
	    .xUnits(d3.time.months)
	    .elasticY(true)
	    .xAxisLabel("Year");
    filter_dic.charts.commits.on("filtered", function(chart,filter) {
		document.dispatchEvent(time_range_event);
    });
    filter_dic.charts.commits.on("filtered", function(chart,filter) {
        if(filter != null){
            $("#filterFrom").text(" "+filter[0].getFullYear()+'-'+parseInt(filter[0].getMonth()+1)+" //");
            $("#filterTo").text(" "+filter[1].getFullYear()+'-'+parseInt(filter[1].getMonth()+1));
            document.dispatchEvent(time_range_event);
        }else{
            $("#filterFrom").text(date_min.getFullYear()+'-'+parseInt(date_min.getMonth()+1)+" //");
            $("#filterTo").text(" "+date_max.getFullYear()+'-'+parseInt(date_max.getMonth()+1));
        }
    });

    // Hour
	var width_hours_chart = document.getElementById("commitsHoursChart").offsetWidth;
    var hour_min = 0;
    var hour_max = 23;
    filter_dic.charts.hours = dc.barChart('#commitsHoursChart', 'other');
    filter_dic.charts.hours
    	.width(width_hours_chart)
    	.height(150)
    	.transitionDuration(1000)
    	.margins({top: 10, right: 10, bottom: 25, left: 50})
    	.dimension(hours_dim)
    	.group(commits_hour)
    	.x(d3.scale.linear().domain([hour_min,hour_max]))
	    .elasticY(true)
	    .xAxisLabel("Hour of the day");
    filter_dic.charts.hours.on("filtered", function(chart,filter) {
		document.dispatchEvent(time_range_event);
    });

    // Time Zone
	var width_tz_chart = document.getElementById("commitsTZChart").offsetWidth;
    var tz_min = -12;
    var tz_max = 12;
    filter_dic.charts.tz = dc.barChart('#commitsTZChart', 'other');
    filter_dic.charts.tz
    	.height(150)
        .width(width_tz_chart)
    	.transitionDuration(1000)
    	.margins({top: 10, right: 10, bottom: 25, left: 50})
    	.dimension(tz_dim)
    	.group(commits_tz)
    	.x(d3.scale.linear().domain([tz_min,tz_max]))
	    .elasticY(true)
	    .xAxisLabel("Time Zone");
    filter_dic.charts.tz.on("filtered", function(chart,filter) {
		document.dispatchEvent(time_range_event);
    });
}
