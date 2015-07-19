/*
 *
 */

function Pies(){
    drawPie('#compPieChart','#filterComp','company');
    drawPie('#authPieChart','#filterDeve','name');
    drawPie('#repoPieChart','#filterRepo','repo');
}

/*
 * Draws the actual pie using
 * @param {string} pie_id - HTML tag
 * @param {string} filter_id - HTML tag
 * @param {string} key - key used to get the dimension
 *
 */
function drawPie(pie_id, filter_id, key){
    pie = dc.piechart(pie_id);

    var dim = ndx.dimension(function(d){
        return d[key];
    });

    var grp = dim.group();

    pie
    .width(350)
    .height(250)
    .dimension(dim)
    .group(grp)
    .cx(225)
    .cap(10)
    .legend(dc.legend().x(0).y(3).itemHeight(13).gap(5))
    .ordering(function (d) { return -d.value; });

    pie.on('renderlet', function(chart) {
        chart.selectAll('.pie-slice').on("click", function(d) {
            document.dispatchEvent(pieClickEvent);
        });
    });

    pie.on("filtered", function(chart,filter) {
        if(filter === null){
            compFilters=[];
            $(filter_id).empty();
        }else if(filter!="Others"){
            if(filter.constructor==Array){
                filter[0].forEach(function(element){
                    if(compFilters.indexOf(element)==-1){
                        $(filter_id).append('<span id="filter-' + formatElement(element) + '"> '+element+' </span>');
                        compFilters.push(element);
                    }else{
                        $('#filter-' + (formatElement(element))).remove();
                        compFilters.splice(compFilters.indexOf(element),1);
                    }
                });
            }else{
                if(compFilters.indexOf(filter)==-1){
                    $(filter_id).append('<span id="filter-' + formatElement(filter) + '"> ' + filter + ' </span>');
                    compFilters.push(filter);
                }else{
                    $('#filter-' + (formatElement(filter))).remove();
                    compFilters.splice(compFilters.indexOf(filter),1);
                }
            }
        }
        window.history.replaceState("object or string", "Title", writeURL());
    });
}

/*
 * Returns string with some characters replaced by 0
 * @param {string} mystring - input string
 */
function formatElement(mystring){
    return mystring.replaceAll(" ","0").
                    replaceAll(".","0").
                    replaceAll(",","0").
                    replaceAll("(","0").
                    replaceAll(")","0").
                    replaceAll("?","0").
                    replaceAll("'","0").
                    replaceAll("@","0");
}
