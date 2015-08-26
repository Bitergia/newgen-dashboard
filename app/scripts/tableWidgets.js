function TableWidget(div, dim, group, chartGroup, type) {
    this.base = Widget;
    this.base(div, dim, group, chartGroup);

    var type = type;
    
    var min_rows = 3;
    if (this.group.top(Infinity).length < min_rows) {
        min_rows = this.group.top(Infinity).length;
    }
    var orderKey = -1;
    var orderValue = -1;

    var table = dc.dataTable('#'+this.div, this.chartGroup);
    table
        .dimension(this.dim)
        .group(function (d) {return "";})
        .size(min_rows)
        .columns([
            {
            	label: type,
                format: function(d){
				    orderKey++;
                    if (orderKey > min_rows-1) {
                        orderKey = 0;
                    }
				    return group.top(Infinity)[orderKey].key;
                }
            },
            {
            	label: 'Commits',
                format: function(d){
				    orderValue++;
                    if (orderValue > min_rows-1) {
                        orderValue = 0;
                    }
				    return group.top(Infinity)[orderValue].value;
                }
            }
        ]);
    table.on('renderlet', function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
        table.selectAll(".dc-table-column._0").on("click", function(d){
            if (type == "Repositories") {
                filter_dic.charts.repo.widget.getChart().filter($(this).html());
            } else if (type == "Organizations") {
                filter_dic.charts.org.widget.getChart().filter($(this).html());
            } else if (type == "Authors") {
                filter_dic.charts.auth.widget.getChart().filter($(this).html());
            }
            document.dispatchEvent(pie_click_event);
        });
    });

    this.update = function () {
        var orderKey = -1;
	    var orderValue = -1;
        table.columns([
            {
            	label: type,
                format: function(d){
			        orderKey++;
			        if (orderKey > table.size()-1){
				        orderKey = 0;
			        }
                    if (type == 'Repositories') {
				        return filter_dic.tables.repo.widget.group.top(Infinity)[orderKey].key;
                    } else if (type == 'Organizations') {
                        return filter_dic.tables.org.widget.group.top(Infinity)[orderKey].key;
                    } else if (type == 'Authors') {
                        return filter_dic.tables.auth.widget.group.top(Infinity)[orderKey].key;
                    }
                }
            },
            {
            	label: 'Commits',
                format: function(d){
			        orderValue++;
			        if (orderValue > table.size()-1){
				        orderValue = 0;
			        }
                    if (type == 'Repositories') {
    			        return filter_dic.tables.repo.widget.group.top(Infinity)[orderValue].value;
                    } else if (type == 'Organizations') {
                        return filter_dic.tables.org.widget.group.top(Infinity)[orderValue].value;
                    } else if (type == 'Authors') {
                        return filter_dic.tables.auth.widget.group.top(Infinity)[orderValue].value;
                    }
                }
            }
        ]);
    }

    this.getTable = function() {
        return table;
    }
   
    this.setTable = function(x) {
        table = x;
    }
}
TableWidget.prototype = new Widget;
