function TimeWidget(div, dim, group, chartGroup, type) {
    Widget.call(this, div, dim, group, chartGroup);

    this.chartGroup = chartGroup;
    this.withSize = document.getElementById(this.div).offsetWidth;

    var divFilter = divFilter;
    var chart = dc.pieChart('#'+this.div, this.chartGroup);

    var width_commits_chart = document.getElementById(this.div).offsetWidth;
    var date_min = months_dim.bottom(1)[0].month;
    var date_max = months_dim.top(1)[0].month;
    var chart = dc.barChart('#'+this.div, this.chartGroup);
    chart
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
    chart.on("filtered", function(chart, filter) {
		document.dispatchEvent(time_range_event);
    });
    if (type == 'commit') {
        chart.on("filtered", function(chart, filter) {
            if(filter != null){
                $("#filterFrom").text(" "+filter[0].getFullYear()+'-'+parseInt(filter[0].getMonth()+1)+" //");
                $("#filterTo").text(" "+filter[1].getFullYear()+'-'+parseInt(filter[1].getMonth()+1));
                document.dispatchEvent(time_range_event);
            }else{
                $("#filterFrom").text(date_min.getFullYear()+'-'+parseInt(date_min.getMonth()+1)+" //");
                $("#filterTo").text(" "+date_max.getFullYear()+'-'+parseInt(date_max.getMonth()+1));
            }
        });
    }
}
