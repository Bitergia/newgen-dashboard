
//special table object for an specific case of data
function MainTableWidget (div, dim, group, chartGroup) {

    //heritage parent object
    this.base = Widget;
    this.base(div, dim, group, chartGroup);

    //the object chart, in this case is a table
    var table = dc.dataTable('#'+this.div, this.chartGroup);
    table
        .dimension(this.dim)
        .group(function (d) {return this.group;})
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
MainTableWidget.prototype = new Widget; 
