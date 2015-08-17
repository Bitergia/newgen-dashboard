function draw_charts () {
    ndx = crossfilter(dc_commits);
    var all = ndx.groupAll();

    bot_dim = ndx.dimension(function(d){
        return d.bot;
    });
    bot_dim.filter(0);
    proj_dim = ndx.dimension(function(d){
        return ""+d.proj_name;
    });

    draw_pies();
    draw_times();
    draw_tables();

    dc.dataCount('.dc-data-count', 'other')
        .dimension(ndx)
        .group(all)
        .html({
            some:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>',
            all:'<span style="font-size:110%"><strong>%filter-count</strong> commits out of <strong>%total-count</strong>'+
            ' <button type="button" class="btn btn-primary btn-sm" onclick="reset()">Reset all filters</button></span>'
        });

    dc.renderAll('other');
    dc.renderAll('table');
};
