function repo_table() {
    var min_rows_repo = 3;
    if (repo_grp.top(Infinity).length < min_rows_repo){
        min_rows_repo = repo_grp.top(Infinity).length;
    }
    var repoOrderKey = -1;
    var repoOrderValue = -1;
    tableRepo = dc.dataTable('#tableRepo', 'table');
    tableRepo
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

    tableRepo.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            repo_chart.filter($(this).html())
            document.dispatchEvent(pie_click_event);
        });
    });
}

function org_table() {
    var min_rows_org = 3;
    if (org_grp.top(Infinity).length < min_rows_org){
        min_rows_org = org_grp.top(Infinity).length;
    }
    tableOrg = dc.dataTable('#tableOrg', 'table');
    var orderOrgKey = -1;
    var orderOrgVal = -1;
    tableOrg
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

    tableOrg.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            org_chart.filter($(this).html())
            document.dispatchEvent(pie_click_event);
        });
    });
}

function auth_table() {
    var min_rows_auth = 3;
    if (auth_grp.top(Infinity).length < min_rows_auth){
        min_rows_auth = auth_grp.top(Infinity).length;
    }
    tableAuth = dc.dataTable('#tableAuth', 'table');
    var authOrderKey = -1;
	var authOrderVal = -1;

    tableAuth
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

    tableAuth.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            auth_chart.filter($(this).html())
            document.dispatchEvent(pie_click_event);
        });
    });
}

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
    repo_table();

    // Organization
    org_table();

    // Author
    auth_table();
}

function repo_update() {
    var repoOrderKey = -1;
	var repoOrderValue = -1;
	tableRepo
        .columns([
            {
            	label: 'Repositories',
                format: function(d){
					repoOrderKey++;
					if (repoOrderKey > tableRepo.size()-1){
						repoOrderKey = 0;
					}
					return repo_grp.top(Infinity)[repoOrderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
					repoOrderValue++;
					if (repoOrderValue > tableRepo.size()-1){
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
	tableOrg
		.columns([
			{
				label: 'Organizations',
				format: function(d){
					orgOrderKey++;
					if (orgOrderKey > tableOrg.size()-1){
						orgOrderKey = 0;
					}
					return org_grp.top(Infinity)[orgOrderKey].key;
				}
			},
			{
				label: 'Commits',
				format: function (d) {
					orgOrderValue++;
					if (orgOrderValue > tableOrg.size()-1){
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
    tableAuth
        .columns([
            {
                label: 'Authors',
                format: function(d){
                    authOrderKey++;
					if (authOrderKey > tableAuth.size()-1){
						authOrderKey = 0;
					}
                    return auth_grp.top(Infinity)[authOrderKey].key;
                }
            },
            {
                label: 'Commits',
                format: function (d) {
                    authOrderValue++;
					if (authOrderValue > tableAuth.size()-1){
						authOrderValue = 0;
					}
                    return auth_grp.top(Infinity)[authOrderValue].value;
                }
            }
        ]);
}
// When click otrher chart, the table must be update.
function table_update(type) {
    // If click MORE
    if (type == 'more') {
        if (tableRepo.size() < repo_grp.top(Infinity).length) {
            tableRepo.size(tableRepo.size()+1);
        }
		if (tableOrg.size() < org_grp.top(Infinity).length) {
            tableOrg.size(tableOrg.size()+1);
        }
		if (tableAuth.size() < auth_grp.top(Infinity).length) {
            tableAuth.size(tableAuth.size()+1);
        }
    }

    repo_update();
    org_update();
    auth_update();	
}

// Draw main table when the messages its ready
function draw_messages_table () {
    var date_dim = ndx.dimension(function (d) {
        return d.date;
    });
    table = dc.dataTable('#table', 'commitsTable');
    table
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

    table.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
    });

    dc.renderAll('commitsTable');
}
