
//function to draw all chart from all groups
function draw_charts () {

    //object ndx to make the database for charts
    ndx = crossfilter(dc_commits);
    var all = ndx.groupAll();

    //filters for crosffilter, they are like charts without charts
    filter_dic.dims.bot = ndx.dimension(function(d){
        return d.bot;
    });
    filter_dic.dims.bot.filter(0);
    filter_dic.dims.proj = ndx.dimension(function(d){
        return ""+d.proj_name;
    });

    //functions to draw each kind of chart
    draw_pies();
    draw_times();
    draw_tables();

    //special chartCount that counts the entries from ndx
    dc.dataCount('.dc-data-count', 'other')
        .dimension(ndx)
        .group(all)
        .html({
            some:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>',
            all:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>'
        });

    //drawing of all groups of charts
    dc.renderAll('other');
    dc.renderAll('table');
};
