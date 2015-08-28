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
    var org_pie = new PieWidget('compPieChart', org_dim, org_grp, 'other', 10, 'filterComp', "org");
    // Repository
    var repo_pie = new PieWidget('repoPieChart', repo_dim, repo_grp, 'other', 10, 'filterRepo', "repo");
    // Author
    var auth_pie = new PieWidget('authPieChart', auth_dim, auth_grp, 'other', 10, 'filterDeve', "auth");

    filter_dic.charts.org['widget'] = org_pie;
    filter_dic.charts.repo['widget'] = repo_pie;
    filter_dic.charts.auth['widget'] = auth_pie;
}

