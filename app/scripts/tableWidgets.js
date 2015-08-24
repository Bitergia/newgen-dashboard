function TableWidget(div, dim, group, chartGroup, type) {
    Widget.call(this, div, dim, group, chartGroup);

    this.chartGroup = chartGroup;
    this.type = type;
    
    var min_rows_repo = 3;
    if (group.top(Infinity).length < min_rows_repo) {
        min_rows_repo = group.top(Infinity).length;
    }
    var orderKey = -1;
    var orderValue = -1;

    table = dc.dataTable('#'+this.div, this.chartGroup);
    table
        .dimension(dim)
        .group(function (d) {return "";})
        .size(min_rows_repo);

    if (this.type == "repo") {
        table.columns([
            {
            	label: 'Repositories',
                format: function(d){
				    orderKey++;
				    return group.top(Infinity)[orderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    orderValue++;
				    return group.top(Infinity)[orderValue].value;
                }
            }
        ]);
    } else if (this.type == "org") {
        table.columns([
            {
            	label: 'Organizations',
                format: function(d){
				    orderKey++;
				    return group.top(Infinity)[orderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    orderValue++;
				    return group.top(Infinity)[orderValue].value;
                }
            }
        ]);
    } else if (this.type == "auth") {
        table.columns([
            {
            	label: 'Authors',
                format: function(d){
				    orderKey++;
				    return group.top(Infinity)[orderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    orderValue++;
				    return group.top(Infinity)[orderValue].value;
                }
            }
        ]);
    } else {
        table.columns([
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
        ]);
    }
    filter_dic.tables.repo.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            filter_dic.charts.repo.widget.getChart().filter($(this).html());
            document.dispatchEvent(pie_click_event);
        });
    });
}
