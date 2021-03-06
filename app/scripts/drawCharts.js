function draw_charts () {
    ndx = crossfilter(dc_commits);
    var all = ndx.groupAll();

    bot_dim = ndx.dimension(function(d){
        return d.bot;
    });
    bot_dim.filter(0);
    proj_dim = ndx.dimension(function(d){
        return ""+d.proj_name;
    });

    var org_dim = ndx.dimension(function(d){
        return d.org_name;
    });

    var org_grp = org_dim.group();

		var width_org_chart = document.getElementById("compPieChart").offsetWidth;
    org_chart = dc.pieChart('#compPieChart', 'other');
    org_chart
        .width(width_org_chart)
	    .height((width_org_chart/1.618033))
	    .transitionDuration(1000)
	    .dimension(org_dim)
	    .group(org_grp)
	    .cx((width_org_chart/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });
/*
    org_chart.on('renderlet', function(chart) {
	    chart.selectAll('.pie-slice').on("click", function(d) {
    	    document.dispatchEvent(pieClickEvent);
	    });
	});*/

    org_chart.on("filtered", function(chart,filter) {
        document.dispatchEvent(pieClickEvent);
        var i=0;
        if(filter==null){
            compFilters=[]
        }else{
            $("#filterComp").empty()
            if(filter.constructor==Array){
                if(compFilters.indexOf("Others ("+filter[0].length+")")==-1){
                    compFilters.push("Others ("+filter[0].length+")")
                }else{
                    compFilters.splice(compFilters.indexOf("Others ("+filter[0].length+")"),1)
                }
            }else{
                if(filter!="Others"){
                    if(compFilters.indexOf(filter)==-1){
                        compFilters.push(filter)
                    }else{
                        compFilters.splice(compFilters.indexOf(filter),1)
                    }
                }
            }
            for(x=0;x<=5;x++){
                if(compFilters[x]!=undefined){
                    $("#filterComp").append('<span class="label label-default" id="filter-'+compFilters[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+compFilters[x]+' </span>')
                }
            }
            if(compFilters.length>5){
                $("#filterComp").append('<span class="label label-default" id="filter-y"> '+(compFilters.length-5)+' More </span>')
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());
    });
    var repo_dim = ndx.dimension(function(d){
        return ""+d.repo_name;
    });
    var repo_grp = repo_dim.group();

	var width_repo_chart = document.getElementById("repoPieChart").offsetWidth;
    repo_chart = dc.pieChart('#repoPieChart', 'other');
    repo_chart
        .width(width_repo_chart)
	    .height((width_repo_chart/1.618033))
	    .transitionDuration(1000)
	    .dimension(repo_dim)
	    .group(repo_grp)
	    .cx((width_repo_chart/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });

    repo_chart.on("filtered", function(chart,filter) {
        document.dispatchEvent(pieClickEvent);
        var i=0;
        if(filter==null){
            repoFilters=[]
        }else{
            $("#filterRepo").empty()
            if(filter.constructor==Array){
                if(repoFilters.indexOf("Others ("+filter[0].length+")")==-1){
                    repoFilters.push("Others ("+filter[0].length+")")
                }else{
                    repoFilters.splice(repoFilters.indexOf("Others ("+filter[0].length+")"),1)
                }
            }else{
                if(filter!="Others"){
                    if(repoFilters.indexOf(filter)==-1){
                        repoFilters.push(filter)
                    }else{
                        repoFilters.splice(repoFilters.indexOf(filter),1)
                    }
                }
            }
            for(x=0;x<=5;x++){
                if(repoFilters[x]!=undefined){
                    $("#filterRepo").append('<span class="label label-default" id="filter-'+repoFilters[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+repoFilters[x]+' </span>')
                }
            }
            if(repoFilters.length>5){
                $("#filterRepo").append('<span class="label label-default" id="filter-y"> '+(repoFilters.length-5)+' More </span>')
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());
    });

    var auth_dim = ndx.dimension(function(d){
        return ""+d.auth_name;
    });
    var width_auth_grp = document.getElementById("authPieChart").offsetWidth;
    var auth_grp = auth_dim.group();
    auth_chart = dc.pieChart('#authPieChart', 'other');
    auth_chart
        .width(width_auth_grp)
	    .height((width_auth_grp/1.618033))
	    .transitionDuration(1000)
	    .dimension(auth_dim)
	    .group(auth_grp)
	    .cx((width_auth_grp/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });

    auth_chart.on("filtered", function(chart,filter) {
        document.dispatchEvent(pieClickEvent);
        var i=0;
        if(filter==null){
            deveFilters=[]
        }else{
            $("#filterDeve").empty()
            if(filter.constructor==Array){
                if(deveFilters.indexOf("Others ("+filter[0].length+")")==-1){
                    deveFilters.push("Others ("+filter[0].length+")")
                }else{
                    deveFilters.splice(deveFilters.indexOf("Others ("+filter[0].length+")"),1)
                }
            }else{
                if(filter!="Others"){
                    if(deveFilters.indexOf(filter)==-1){
                        deveFilters.push(filter)
                    }else{
                        deveFilters.splice(deveFilters.indexOf(filter),1)
                    }
                }
            }
            for(x=0;x<=5;x++){
                if(deveFilters[x]!=undefined){
                    $("#filterDeve").append('<span class="label label-default" id="filter-'+deveFilters[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+deveFilters[x]+' </span>')
                }
            }
            if(deveFilters.length>5){
                $("#filterDeve").append('<span class="label label-default" id="filter-y"> '+(deveFilters.length-5)+' More </span>')
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());
    });

    var months_dim = ndx.dimension(function(d){
        return d.month;
    });

	var widthcommitsChart = document.getElementById("commitsChart").offsetWidth;
    var commmits_month = months_dim.group();
    var date_min = months_dim.bottom(1)[0].month;
    var date_max = months_dim.top(1)[0].month;
    var commits_chart = dc.barChart('#commitsChart', 'other');
    commits_chart
    	.width(widthcommitsChart)
	    .height(300)
	    .transitionDuration(1000)
	    .margins({top: 10, right: 50, bottom: 25, left: 50})
	    .dimension(months_dim)
	    .group(commmits_month)
	    .x(d3.time.scale().domain([date_min,date_max]))
	    .xUnits(d3.time.months)
	    .elasticY(true)
	    .xAxisLabel("Year");

    commits_chart.on("filtered", function(chart,filter) {
		document.dispatchEvent(timeRangeEvent);
    });

    commits_chart.on("filtered", function(chart,filter) {
        if(filter != null){
            $("#filterFrom").text(" "+filter[0].getFullYear()+'-'+parseInt(filter[0].getMonth()+1)+" //");
            $("#filterTo").text(" "+filter[1].getFullYear()+'-'+parseInt(filter[1].getMonth()+1));
            document.dispatchEvent(timeRangeEvent);
        }else{
            $("#filterFrom").text(date_min.getFullYear()+'-'+parseInt(date_min.getMonth()+1)+" //");
            $("#filterTo").text(" "+date_max.getFullYear()+'-'+parseInt(date_max.getMonth()+1));
        }
    });

    var hours_dim = ndx.dimension(function(d){
        return ""+d.hour;
    });
	var width_hours_chart = document.getElementById("commitsHoursChart").offsetWidth;
    var commits_hour = hours_dim.group();
    var hour_min = 0;
    var hour_max = 23;
    var hours_chart = dc.barChart('#commitsHoursChart', 'other');
    hours_chart
    	.width(width_hours_chart)
    	.height(150)
    	.transitionDuration(1000)
    	.margins({top: 10, right: 10, bottom: 25, left: 50})
    	.dimension(hours_dim)
    	.group(commits_hour)
    	.x(d3.scale.linear().domain([hour_min,hour_max]))
	    .elasticY(true)
	    .xAxisLabel("Hour of the day");
    hours_chart.on("filtered", function(chart,filter) {
		document.dispatchEvent(timeRangeEvent);
    });
    var tz_dim = ndx.dimension(function(d){
        return ""+d.tz;
    });

	var width_tz_chart = document.getElementById("commitsTZChart").offsetWidth;
    var commits_tz = tz_dim.group();
    var tz_min = -12;
    var tz_max = 12;
    var tz_chart = dc.barChart('#commitsTZChart', 'other');
    tz_chart
    	.height(150)
        .width(width_tz_chart)
    	.transitionDuration(1000)
    	.margins({top: 10, right: 10, bottom: 25, left: 50})
    	.dimension(tz_dim)
    	.group(commits_tz)
    	.x(d3.scale.linear().domain([tz_min,tz_max]))
	    .elasticY(true)
	    .xAxisLabel("Time Zone");
    tz_chart.on("filtered", function(chart,filter) {
		document.dispatchEvent(timeRangeEvent);
    });

    repo = [];
	repoDim = ndx.dimension(function (d) {
		if (repo.indexOf(""+d.repo_name) == -1) {
			repo.push(""+d.repo_name);
		}
		var i = repo.indexOf(""+d.repo_name);
	    return repo[i];
	});

    var min_rows_repo = 3;
	repoGrp = repoDim.group();
    if (repoGrp.top(Infinity).length < min_rows_repo){
        min_rows_repo = repoGrp.top(Infinity).length;
    }
    var order = -1;
    var order2 = -1;
    tableRepo = dc.dataTable('#tableRepo', 'table');
    tableRepo
        .dimension(repoDim)
        .group(function (d) {return "";})
        .size(min_rows_repo)
        .columns([
            {
            	label: 'Repositories',
                format: function(d){
				    order++;
				    return repoGrp.top(Infinity)[order].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    order2++;
				    return repoGrp.top(Infinity)[order2].value;
                }
            }
        ]);

    tableRepo.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            repo_chart.filter($(this).html())
            document.dispatchEvent(pieClickEvent);
        });
    });

    org = [];
	orgDim = ndx.dimension(function (d) {
		if (org.indexOf(""+d.org_name) == -1) {
			org.push(""+d.org_name);
		}
		var i = org.indexOf(""+d.org_name);
	    return org[i];
	});

    var min_rows_org = 3;
	orgGrp = orgDim.group();
    if (orgGrp.top(Infinity).length < min_rows_org){
        min_rows_org = orgGrp.top(Infinity).length;
    }
    tableOrg = dc.dataTable('#tableOrg', 'table');
    var orderOrgKey = -1;
    var orderOrgVal = -1;
    tableOrg
        .dimension(orgDim)
        .group(function (d) {return '';})
        .size(min_rows_org)
        .columns([
            {
            label: 'Organizations',
                format: function(d){
                    orderOrgKey++;
				    return orgGrp.top(Infinity)[orderOrgKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    orderOrgVal++;
				    return orgGrp.top(Infinity)[orderOrgVal].value;
                }
            }
        ]);

    tableOrg.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            org_chart.filter($(this).html())
            document.dispatchEvent(pieClickEvent);
        });
    });

    auth = [];
	authDim = ndx.dimension(function (d) {
		if (auth.indexOf(d.auth_name) == -1) {
			auth.push(d.auth_name);
		}
		var i = auth.indexOf(d.auth_name);
	    return auth[i];
	});

    var min_rows_auth = 3;
	authGrp = authDim.group();
    if (authGrp.top(Infinity).length < min_rows_auth){
        min_rows_auth = authGrp.top(Infinity).length;
    }
    tableAuth = dc.dataTable('#tableAuth', 'table');
    var authOrderKey = -1;
	var authOrderVal = -1;

    tableAuth
        .dimension(authDim)
        .group(function (d) {return '';})
        .size(min_rows_auth)
        .columns([
            {
            label: 'Developers',
                format: function(d){
                    authOrderKey++;
					return authGrp.top(Infinity)[authOrderKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    authOrderVal++;
					return authGrp.top(Infinity)[authOrderVal].value;
                }
            }
        ]);

    tableAuth.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            auth_chart.filter($(this).html())
            document.dispatchEvent(pieClickEvent);
        });
    });

    dc.dataCount('.dc-data-count', 'other')
        .dimension(ndx)
        .group(all)
        .html({
            some:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>',
            all:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>'
        });

    dc.renderAll('other');
    dc.renderAll('table');
};
