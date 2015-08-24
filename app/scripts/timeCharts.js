function draw_times() {

    /* All dimensions and groups*/
    // Commits
    var months_dim = ndx.dimension(function(d){
        return d.month;
    });
    var commits_month = months_dim.group();

    // Hour
    var hours_dim = ndx.dimension(function(d){
        return ""+d.hour;
    });
    var commits_hour = hours_dim.group();

    // Time Zone
    var tz_dim = ndx.dimension(function(d){
        return ""+d.tz;
    });
    var commits_tz = tz_dim.group();

    /*************/
    /* All charts*/
    /*************/
    // Commits
    var commits_chart = new TimeWidget('commitsChart', months_dim, commits_month, 'other', 'commits', 'filterFrom', 'filterTo');
    filter_dic.charts.commits['widget'] = commits_chart;

    // Hour
    var hour_chart = new TimeWidget('commitsHoursChart', hours_dim, commits_hour, 'other', 'hour', '', '');
    filter_dic.charts.hours['widget'] = hour_chart;

    // Time Zone
    var TZ_chart = new TimeWidget('commitsTZChart', tz_dim, commits_tz, 'other', 'TZ', '', '');
    filter_dic.charts.TZ['widget'] = TZ_chart;
}
