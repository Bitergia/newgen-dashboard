function TableWidget(div, dim, group, chartGroup, type) {


    //heritage parent object
    this.base = Widget;
    this.base(div, dim, group, chartGroup);

    //type of table
    var type = type;
    //limit of rows
    var min_rows = 3;
    if (this.group.top(Infinity).length < min_rows) {
        min_rows = this.group.top(Infinity).length;
    }

    //order of table, in this case top to bot
    var orderKey = -1;
    var orderValue = -1;

    //the object chart
    var table = dc.dataTable('#'+this.div, this.chartGroup);
    table
        .dimension(this.dim)
        .group(function (d) {return "";})
        .size(min_rows)
        .columns([
            {
		//the colums are make by the type of table
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
		//the commits are in all this kind of tables
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

    //update of table, we have to do it manually because this is a special kind of chart
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

    //function to get the object chart
    this.getTable = function() {
        return table;
    }
    //function to get the object chart
    this.setTable = function(x) {
        table = x;
    }
}

//the heritage
TableWidget.prototype = new Widget;
