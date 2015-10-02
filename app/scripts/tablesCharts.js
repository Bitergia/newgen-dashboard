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

    // Organization
    var table_org = new TableWidget('tableOrg', org_dim, org_grp, 'table', 'Organizations');
    filter_dic.tables.org['widget'] = table_org;

    // Author
    var table_auth = new TableWidget('tableAuth', auth_dim, auth_grp, 'table', 'Authors');
    filter_dic.tables.auth['widget'] = table_auth;
}
// When click otrher chart, the table must be update.
function table_update(type) {
    // If click MORE on the tables(repo, org, auth)
    if (type == 'more') {
        // Need to see if the table have more entries.
        for (var i=5; i>0; i--) {
            if ((filter_dic.tables.repo.widget.group.top(Infinity).length - filter_dic.tables.repo.widget.getTable().size()) >= i) {
                filter_dic.tables.repo.widget.getTable().size(filter_dic.tables.repo.widget.getTable().size()+i);
                break;
            }
        }
        for (var i=5; i>0; i--) {
            if ((filter_dic.tables.org.widget.group.top(Infinity).length - filter_dic.tables.org.widget.getTable().size()) >= i) {
                filter_dic.tables.org.widget.getTable().size(filter_dic.tables.org.widget.getTable().size()+i);
                break;
            }
        }
        for (var i=5; i>0; i--) {
            if ((filter_dic.tables.auth.widget.group.top(Infinity).length - filter_dic.tables.auth.widget.getTable().size()) >= i) {
                filter_dic.tables.auth.widget.getTable().size(filter_dic.tables.auth.widget.getTable().size()+i);
                break;
            }
        }
    }
    // Update and redraw the tables.
    filter_dic.tables.repo['widget'].update();
    filter_dic.tables.org['widget'].update();
    filter_dic.tables.auth['widget'].update();
}

// Draw main table when the messages is ready
function draw_messages_table () {
    var date_dim = ndx.dimension(function (d) {
        return d.date;
    });
    var table = new MainTableWidget ('table', date_dim, '', 'commitsTable');
    filter_dic.tables.main['widget'] = table;
    dc.renderAll('commitsTable');
}
