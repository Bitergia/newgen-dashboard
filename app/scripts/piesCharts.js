function draw_pies () {
    /*****************************/
    /* All dimensions and groups */
    /*****************************/

    // Organization
    var org_dim = ndx.dimension(function(d){
        return d.org_name;
    });
    var org_grp = org_dim.group();

    // Repository
    var repo_dim = ndx.dimension(function(d){
        return ""+d.repo_name;
    });
    var repo_grp = repo_dim.group();

    // Author
    var auth_dim = ndx.dimension(function(d){
        return ""+d.auth_name;
    });
    var auth_grp = auth_dim.group();

    /**************/
    /* All Charts */
    /**************/
    // Organization
    var org_pie = new PieWidget('compPieChart', org_dim, org_grp, 'other', 10, 'filterComp', filter_dic.activate_filt.orgs);
    var repo_pie = new PieWidget('repoPieChart', repo_dim, repo_grp, 'other', 10, 'filterRepo', filter_dic.activate_filt.repos);
    var auth_pie = new PieWidget('authPieChart', auth_dim, auth_grp, 'other', 10, 'filterDeve', filter_dic.activate_filt.deves);

    filter_dic.charts.org['widget'] = org_pie;
    filter_dic.charts.repo['widget'] = repo_pie;
    filter_dic.charts.auth['widget'] = auth_pie;
/*
	var width_org_chart = document.getElementById("compPieChart").offsetWidth;
    filter_dic.charts.org = dc.pieChart('#compPieChart', 'other');
    filter_dic.charts.org
        .width(width_org_chart)
	    .height((width_org_chart/1.618033))
	    .transitionDuration(1000)
	    .dimension(org_dim)
	    .group(org_grp)
	    .cx((width_org_chart/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });

    filter_dic.charts.org.on("filtered", function(chart,filter) {
        document.dispatchEvent(pie_click_event);
        filters(filter, '#filterComp', filter_dic.activate_filt.orgs);
    });
    
    // Repository
	var width_repo_chart = document.getElementById("repoPieChart").offsetWidth;
    filter_dic.charts.repo = dc.pieChart('#repoPieChart', 'other');
    filter_dic.charts.repo
        .width(width_repo_chart)
	    .height((width_repo_chart/1.618033))
	    .transitionDuration(1000)
	    .dimension(repo_dim)
	    .group(repo_grp)
	    .cx((width_repo_chart/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });

    filter_dic.charts.repo.on("filtered", function(chart,filter) {
        document.dispatchEvent(pie_click_event);
        filters(filter, '#filterRepo', filter_dic.activate_filt.repos);
    });

    // Author
    var width_auth_grp = document.getElementById("authPieChart").offsetWidth;
    filter_dic.charts.auth = dc.pieChart('#authPieChart', 'other');
    filter_dic.charts.auth
        .width(width_auth_grp)
	    .height((width_auth_grp/1.618033))
	    .transitionDuration(1000)
	    .dimension(auth_dim)
	    .group(auth_grp)
	    .cx((width_auth_grp/1.618033))
	    .cap(10)
        .legend(dc.legend().x(0).y(3).itemHeight(20).gap(5))
        .ordering(function (d) { return -d.value; });
    filter_dic.charts.auth.on("filtered", function(chart,filter) {
        document.dispatchEvent(pie_click_event);
        filters(filter, '#filterDeve', filter_dic.activate_filt.deves);
    });
    */
}

// when you click in a part of the pie charts and write a new URL and added the clicked entries.
function filters (filter, div, array) {
    var i = 0;
    if(filter == null){
        array = [];
    }else{
        $(div).empty();
        if(filter.constructor == Array){
            if(array.indexOf("Others ("+filter[0].length+")") == -1){
                array.push("Others ("+filter[0].length+")");
            }else{
                array.splice(array.indexOf("Others ("+filter[0].length+")"),1);
            }
        }else{
            if(filter != "Others"){
                if(array.indexOf(filter) == -1){
                    array.push(filter);
                }else{
                    array.splice(array.indexOf(filter),1);
                }
            }
        }
        for(x = 0; x <= 5; x++){
            if(array[x] != undefined){
                $(div).append('<span class="label label-default" id="filter-'+array[x].replaceAll(" ","0").replaceAll(".","0").replaceAll(",","0").replaceAll("(","0").replaceAll(")","0").replaceAll("?","0").replaceAll("'","0").replaceAll("@","0")+'"> '+array[x]+' </span>');
            }
        }
        if(array.length > 5){
            $(div).append('<span class="label label-default" id="filter-y"> '+(array.length-5)+' More </span>');
        }
    }
    window.history.replaceState("object or string", "Title", writeURL());
}
