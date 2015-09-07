// (div, dimension, group, chart_group, cap, div_filter, type)
function PieWidget(div, dim, group, chartGroup, cap, divFilter, type) {

    //heritage parent object
    this.base = Widget;
    this.base(div, dim, group, chartGroup)
    //limit of the legend
    this.cap = cap;
    // with of chart by the div
    this.withSize = document.getElementById(this.div).offsetWidth;
    //type of pie
    var type= type;

    //list of filters of the div
    var divFilter = divFilter;
    //the object chart
    var chart = dc.pieChart('#'+this.div, this.chartGroup);
    chart
        .width(this.withSize)
        .height((this.withSize/1.618033))
        .transitionDuration(1000)
        .dimension(this.dim)
        .group(this.group)
        .cx((this.withSize/1.618033))
        .cap(this.cap)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });

    //event of filered to add the filters to the diccionary
    chart.on("filtered", function(chart, filter) {

	//here we activate the event
        document.dispatchEvent(pie_click_event);
	var dbFilt={};
	
	//we see what is the kind of pie to save the filters in the right dicctionary
	if(type=="org"){
		dbFilt.filter= filter_dic.activate_filt.orgs
	}else if(type=="repo"){
		dbFilt.filter= filter_dic.activate_filt.repos 
	}else if(type=="auth"){
		dbFilt.filter= filter_dic.activate_filt.deves
	}

	//we write in the filters zone and the dicctionary
        var i = 0;
        if(filter == null) {
            dbFilt.filter = [];
        } else {
            $("#"+divFilter).empty();
            if(filter.constructor == Array) {
                if(dbFilt.filter.indexOf("Others ("+filter[0].length+")") == -1) {
                   dbFilt.filter.push("Others ("+filter[0].length+")");
                } else {
                    dbFilt.filter.splice(dbFilt.filter.indexOf("Others ("+filter[0].length+")"),1);
                }
            } else {
                if(filter != "Others") {

                    if(dbFilt.filter.indexOf(filter) == -1) {
                        dbFilt.filter.push(filter);
                    } else {
                        dbFilt.filter.splice(dbFilt.filter.indexOf(filter),1);
                    }
                }
            }
            for(x = 0; x <= 5; x++){
                if(dbFilt.filter[x] != undefined){
                    $("#"+divFilter).append('<span class="label label-default" id="filter-'+dbFilt.filter[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+dbFilt.filter[x]+' </span>');
                }
            }
            if(dbFilt.filter.length > 5) {
                $("#"+divFilter).append('<span class="label label-default" id="filter-y"> '+(dbFilt.filter.length-5)+' More </span>');
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());

    });

    //function to get the object chart
    this.getChart = function() {
        return chart;
    }
   
    //function to get the object chart
    this.setChart = function(x) {
        chart = x;
    }

}

//the heritage
PieWidget.prototype = new Widget;
