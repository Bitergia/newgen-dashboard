// (div, dimension, group, chart_group, <commits, hour, TZ>, <filter_from>, <filter_to>)
function TimeWidget(div, dim, group, chartGroup, type, from, to) {
    this.base = Widget;
    this.base(div, dim, group, chartGroup);
    this.type = type;
    this.widthSize = document.getElementById(this.div).offsetWidth;

    var x_min;
    var x_max;
    if (this.type == 'commits') {
        x_min = this.dim.bottom(1)[0].month;
        x_max = this.dim.top(1)[0].month;
    } else if (this.type == 'hour') {
        x_min = 0;
        x_max = 23;
    } else if (this.type == 'TZ') {
        x_min = -12;
        x_max = 12;
    }

    var chart = dc.barChart('#'+this.div, this.chartGroup);
    chart
    	.width(this.widthSize)
        .height(this.widthSize/1.618033/2.5)
	    .transitionDuration(1000)
	    .margins({top: 10, right: 50, bottom: 25, left: 50})
	    .dimension(this.dim)
	    .group(this.group)
	    .x(d3.time.scale().domain([x_min, x_max]))
	    .elasticY(true);
    
    if (this.type == 'commits') {
        chart.xAxisLabel("Year");
        chart.xUnits(d3.time.months);
        chart.on("filtered", function(chart, filter) {
            if(filter != null){
                $("#"+from).text(" "+filter[0].getFullYear()+'-'+parseInt(filter[0].getMonth()+1)+" //");
                $("#"+to).text(" "+filter[1].getFullYear()+'-'+parseInt(filter[1].getMonth()+1));
                document.dispatchEvent(time_range_event);
            }else{
                $("#"+from).text(x_min.getFullYear()+'-'+parseInt(x_min.getMonth()+1)+" //");
                $("#"+to).text(" "+x_max.getFullYear()+'-'+parseInt(x_max.getMonth()+1));
            }
        });
    } else if (this.type == 'hour') {
        chart.xAxisLabel("Hour of the day");
        chart.x(d3.scale.linear().domain([x_min, x_max]));
        chart.on("filtered", function(chart, filter) {
		    document.dispatchEvent(time_range_event);
        });
    } else if (this.type == 'TZ') {
        chart.xAxisLabel('Time Zone');
        chart.x(d3.scale.linear().domain([x_min, x_max]));
        chart.on("filtered", function(chart, filter) {
		    document.dispatchEvent(time_range_event);
        });
    }

    this.getChart = function() {
        return chart;
    }
   
    this.setChart = function(x) {
        chart = x;
    }
}
TimeWidget.prototype = new Widget;
