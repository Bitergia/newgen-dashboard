/*function repo_table() {
    var min_rows_repo = 3;
    if (repo_grp.top(Infinity).length < min_rows_repo){
        min_rows_repo = repo_grp.top(Infinity).length;
    }
    var repoOrderKey = -1;
    var repoOrderValue = -1;

    filter_dic.tables.repo = dc.dataTable('#tableRepo', 'table');
    filter_dic.tables.repo
        .dimension(repo_dim)
        .group(function (d) {return "";})
        .size(min_rows_repo)
        .columns([
            {
            	label: 'Repositories',
                format: function(d){
				    repoOrderKey++;
				    return repo_grp.top(Infinity)[repoOrderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    repoOrderValue++;
				    return repo_grp.top(Infinity)[repoOrderValue].value;
                }
            }
        ]);
    filter_dic.tables.repo.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            filter_dic.charts.repo.widget.getChart().filter($(this).html());
            document.dispatchEvent(pie_click_event);
        });
    });
}

function org_table() {
    var min_rows_org = 3;
    if (org_grp.top(Infinity).length < min_rows_org){
        min_rows_org = org_grp.top(Infinity).length;
    }
    var orderOrgKey = -1;
    var orderOrgVal = -1;

    filter_dic.tables.org = dc.dataTable('#tableOrg', 'table');
    filter_dic.tables.org
        .dimension(org_dim)
        .group(function (d) {return '';})
        .size(min_rows_org)
        .columns([
            {
            label: 'Organizations',
                format: function(d){
                    orderOrgKey++;
				    return org_grp.top(Infinity)[orderOrgKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    orderOrgVal++;
				    return org_grp.top(Infinity)[orderOrgVal].value;
                }
            }
        ]);
    filter_dic.tables.org.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            filter_dic.charts.org.widget.getChart().filter($(this).html());
            document.dispatchEvent(pie_click_event);
        });
    });
}

function auth_table() {
    var min_rows_auth = 3;
    if (auth_grp.top(Infinity).length < min_rows_auth){
        min_rows_auth = auth_grp.top(Infinity).length;
    }
    var authOrderKey = -1;
	var authOrderVal = -1;

    filter_dic.tables.auth = dc.dataTable('#tableAuth', 'table');
    filter_dic.tables.auth
        .dimension(auth_dim)
        .group(function (d) {return '';})
        .size(min_rows_auth)
        .columns([
            {
            label: 'Developers',
                format: function(d){
                    authOrderKey++;
					return auth_grp.top(Infinity)[authOrderKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    authOrderVal++;
					return auth_grp.top(Infinity)[authOrderVal].value;
                }
            }
        ]);
    filter_dic.tables.auth.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            filter_dic.charts.auth.widget.getChart().filter($(this).html())
            document.dispatchEvent(pie_click_event);
        });
    });
}
*/
function draw_tables() {
    /*****************************/
    /* All dimensions and groups */
    /*****************************/
    // Repository
    repo = [];
	repo_dim = ndx.dimension(function (d) {
		if (repo.indexOf(""+d.repo_name) == -1) {
			repo.push(""+d.repo_name);
		}
		var i = repo.indexOf(""+d.repo_name);
	    return repo[i];
	});
	repo_grp = repo_dim.group();
    
    // Organization
    org = [];
	org_dim = ndx.dimension(function (d) {
		if (org.indexOf(""+d.org_name) == -1) {
			org.push(""+d.org_name);
		}
		var i = org.indexOf(""+d.org_name);
	    return org[i];
	});
	org_grp = org_dim.group();

    // Author
    auth = [];
	auth_dim = ndx.dimension(function (d) {
		if (auth.indexOf(d.auth_name) == -1) {
			auth.push(d.auth_name);
		}
		var i = auth.indexOf(d.auth_name);
	    return auth[i];
	});
	auth_grp = auth_dim.group();

    /**************/
    /* All tables */
    /**************/
    // Repository
    var table_repo = new TableWidget('tableRepo', repo_dim, repo_grp, 'table', 'Repositories');
    filter_dic.tables.repo['widget'] = table_repo;
//    repo_table();

    // Organization
    var table_org = new TableWidget('tableOrg', org_dim, org_grp, 'table', 'Organizations');
    filter_dic.tables.org['widget'] = table_org;
//    org_table();

    // Author
    var table_auth = new TableWidget('tableAuth', auth_dim, auth_grp, 'table', 'Authors');
    filter_dic.tables.auth['widget'] = table_auth;
//    auth_table();
}
/*
function repo_update() {
    var repoOrderKey = -1;
	var repoOrderValue = -1;
	filter_dic.tables.repo
        .columns([
            {
            	label: 'Repositories',
                format: function(d){
					repoOrderKey++;
					if (repoOrderKey > filter_dic.tables.repo.size()-1){
						repoOrderKey = 0;
					}
					return repo_grp.top(Infinity)[repoOrderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
					repoOrderValue++;
					if (repoOrderValue > filter_dic.tables.repo.size()-1){
						repoOrderValue = 0;
					}
					return repo_grp.top(Infinity)[repoOrderValue].value;
                }
            }
        ]);

}

function org_update() {
    var orgOrderKey = -1;
	var orgOrderValue = -1;
	filter_dic.tables.org
		.columns([
			{
				label: 'Organizations',
				format: function(d){
					orgOrderKey++;
					if (orgOrderKey > filter_dic.tables.org.size()-1){
						orgOrderKey = 0;
					}
					return org_grp.top(Infinity)[orgOrderKey].key;
				}
			},
			{
				label: 'Commits',
				format: function (d) {
					orgOrderValue++;
					if (orgOrderValue > filter_dic.tables.org.size()-1){
						orgOrderValue = 0;
					}
					return org_grp.top(Infinity)[orgOrderValue].value;
				}
			}
		]);
}

function auth_update() {
    var authOrderKey = -1;
    var authOrderValue = -1;
    filter_dic.tables.auth
        .columns([
            {
                label: 'Authors',
                format: function(d){
                    authOrderKey++;
					if (authOrderKey > filter_dic.tables.auth.size()-1){
						authOrderKey = 0;
					}
                    return auth_grp.top(Infinity)[authOrderKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    authOrderValue++;
					if (authOrderValue > filter_dic.tables.auth.size()-1){
						authOrderValue = 0;
					}
                    return auth_grp.top(Infinity)[authOrderValue].value;
                }
            }
        ]);
}*/
// When click otrher chart, the table must be update.
function table_update(type) {
    // If click MORE on the tables(repo, org, auth)
    if (type == 'more') {
        if (filter_dic.tables.repo.widget.getTable().size() < filter_dic.tables.repo.widget.group.top(Infinity).length) {
            filter_dic.tables.repo.widget.getTable().size(filter_dic.tables.repo.widget.getTable().size()+1);
        }
		if (filter_dic.tables.org.widget.getTable().size() < filter_dic.tables.org.widget.group.top(Infinity).length) {
            filter_dic.tables.org.widget.getTable().size(filter_dic.tables.org.widget.getTable().size()+1);
        }
		if (filter_dic.tables.auth.widget.getTable().size() < filter_dic.tables.auth.widget.group.top(Infinity).length) {
            filter_dic.tables.auth.widget.getTable().size(filter_dic.tables.auth.widget.getTable().size()+1);
        }
    }
    // Update and redraw the tables.
    filter_dic.tables.repo['widget'].update();
//    repo_update();
    filter_dic.tables.org['widget'].update();
//    org_update();
    filter_dic.tables.auth['widget'].update();
//    auth_update();
//    dc.redrawAll('table');
}

// Draw main table when the messages is ready
function draw_messages_table () {
    var date_dim = ndx.dimension(function (d) {
        return d.date;
    });
    filter_dic.tables.main = dc.dataTable('#table', 'commitsTable');
    filter_dic.tables.main
        .dimension(date_dim)
        .group(function (d) {return '';})
        .size(7)
        .columns([
            {
	            label: 'Date',
                format: function(d){
                    return d.date; 
                }
            },
            {
                label: 'Message',
                format: function(d) {
                    return ""+d.message;
                }
            },
            {
                label: 'Developer',
                format: function(d) {
                    return d.auth_name;
                }
            },
			{
				label: 'Organization',
				format: function(d) {
					return d.org_name;
				}
			},
			{
				label: 'Repository',
				format: function(d) {
					return ""+d.repo_name;
				}
			},
            {
                label: 'TZ',
                format: function(d) {
                    return d.tz;
                }
            }
        ])
        .sortBy(function (d) {
            return d.date;
        })
        .order(d3.descending);
    filter_dic.tables.main.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
    });

    dc.renderAll('commitsTable');
}
