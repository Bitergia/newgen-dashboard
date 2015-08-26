function PieWidget(div, dim, group, chartGroup, cap, divFilter, array) {
        
    //Widget.call(this, div, dim, group, chartGroup);
    
    this.base = Widget;
    this.base(div, dim, group, chartGroup)
    
    this.cap = cap; 
    this.withSize = document.getElementById(this.div).offsetWidth;

    var divFilter = divFilter;
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


           

    chart.on("filtered", function(chart, filter) {

        document.dispatchEvent(pie_click_event);

        var i = 0;
        if(filter == null) {
            array = [];
        } else {
            $("#"+divFilter).empty();
            if(filter.constructor == Array) {
                if(array.indexOf("Others ("+filter[0].length+")") == -1) {
                    array.push("Others ("+filter[0].length+")");
                } else {
                    array.splice(array.indexOf("Others ("+filter[0].length+")"),1);
                }
            } else {
                if(filter != "Others") {
                    if(array.indexOf(filter) == -1) {
                        array.push(filter);
                    } else {
                        array.splice(array.indexOf(filter),1);
                    }
                }
            }
            for(x = 0; x <= 5; x++){
                if(array[x] != undefined){
                    $("#"+divFilter).append('<span class="label label-default" id="filter-'+array[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+array[x]+' </span>');
                }
            }
            if(array.length > 5) {
                $("#"+divFilter).append('<span class="label label-default" id="filter-y"> '+(array.length-5)+' More </span>');
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());

    });

    this.getChart = function() {
        return chart;
    }
   
    this.setChart = function(x) {
        chart = x;
    }
}

PieWidget.prototype= new Widget;
