
//Object widget. This object is the base of other widgets like Pie or Tables.
function Widget (div, dim, group, chartGroup){

    //div where is located the widget
    this.div = div;
    //dimension of crossfilter for the widget
    this.dim = dim;
    //agroup to show the metrics
    this.group = group;

    //chart group to draw it in a group of widgets
    if (this.chartGroup == undefined) {
        this.chartGroup = "";
    } else {
        this.chartGroup = chartGroup;
    }

    //function to redraw all widgets of chartGroup
    this.draw = function() {
        dc.renderAll(this.chartGroup);
    }
}
