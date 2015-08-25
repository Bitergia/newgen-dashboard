// use to download the corret JSON files from the selected path
var db = "";

// use to download JSON files
var getting_commits;
var getting_orgs;
var getting_auths;
var getting_repos;
var getting_configuration;
var getting_messages;

// use to create crossfilter variable
var dc_commits = [];
var dc_commits_month = [];
var ndx;

/* this variable is a dictionary where we save all changes and charts in our program */
var filter_dic = {'activate_filt': {'repos': [], 'deves': [], 'orgs': [], 'projs': [], 'entriesdb': []}, 
                  'charts': {'repo': {}, 'org': {}, 'auth': {}, 'commits': {}, 'hours': {}, 'TZ': {}},
                  'tables': {'repo': {}, 'org': {}, 'auth': {}, 'main': {}},
                  'dims': {'bot': {}, 'proj': {}}
};

// the object for each charts
var org_names = {};
var auth_names = {};
var repo_names = {};
var proj_names = {};
var bots = {};
var messages_text = {};

var repo_array = [];
var auth_array = [];
var org_array = [];
var proj_array = ['All'];

// trigger for click in the pie charts
var pie_click_event = new Event('table');
var time_range_event = new Event('time');

// push in dc_commits the format for use crossfilter
function load_commits (commits, orgs, repos, auths) {
    orgs.values.forEach(function (value) {
	    org_names[value[0]] = value[1];
        org_array.push(value[1]);
        filter_dic.activate_filt.entriesdb.push(value[1]);
    });
    repos.values.forEach(function (value) {
        repo_names[value[0]] = value[1];
        repo_array.push(value[1]);
        proj_names[value[0]] = value[3];
        if (proj_array.indexOf(value[3]) == -1) {
            proj_array.push(value[3]);
        }
        filter_dic.activate_filt.entriesdb.push(value[1]);
    });
    auths.values.forEach(function (value) {
        auth_names[value[3]] = value[1];
        bots[value[1]] = value[2];
        auth_array.push(value[1]);
        filter_dic.activate_filt.entriesdb.push(value[1]);
    });
    commits.values.forEach(function (value) {
	    var record = {}
	    commits.names.forEach(function (name, index) {
	        if (name == "date") {
		        var date = new Date(value[index]*1000);
		        record[name] = date;
		        record.month = new Date(date.getFullYear(), date.getMonth(), 1);
		        record.hour = date.getUTCHours();
	        } else if (name == "org") {
		        record[name] = value[index];
		        record.org_name = org_names[value[index]];
            } else if (name == 'repo') {
                record[name] = value[index];
                record.repo_name = repo_names[value[index]];
                record.proj_name = proj_names[value[index]];
            } else if (name == 'author') {
                record[name] = value[index];
                record.auth_name = auth_names[value[index]];
                record.bot = bots[record.auth_name];
	        } else if (name == 'tz') {
                record[name] = value[index];
            } else {
        		record[name] = value[index];
	        }
	    });
	    dc_commits.push(record);
    });
};

function load_messages (messages) {
    messages.values.forEach(function (value) {
        messages_text[value[0]] = value[1];
    });
    dc_commits.forEach(function (d) {
        d.message = messages_text[d.id];
    });
}

document.addEventListener('table', function (e) {
	table_update('click');
	dc.redrawAll('other');
    dc.redrawAll('table');
    dc.redrawAll('commitsTable');
}, false);

document.addEventListener('time', function (e) {
	table_update('time');
	dc.redrawAll('other');
    dc.redrawAll('table');
    dc.redrawAll('commitsTable');
}, false);

$('#commitsTableMore').on('click', function () {
    filter_dic.tables.main.size(filter_dic.tables.main.size()+4);
    dc.redrawAll('commitsTable');
});

$('#tablesMore').on('click', function() {
    table_update('more');
    dc.redrawAll('table');
});

$(".checkbox").change(function() {
    if (this.checked) {
        filter_dic.dims.bot.filterAll();
    } else {
        filter_dic.dims.bot.filter(0);
    }
    dc.redrawAll('commitsTable');
    dc.redrawAll('other');
    dc.redrawAll('table');
});

String.prototype.replaceAll = function(str1, str2, ignore){
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2) == "string")?str2.replace(/\$/g,"$$$$"):str2);
}
/**************** Generate URL by filters *****************/

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function writeURL(type){

    if (type == 'reset') {
        var result = "";
    } else {
        var dic = {};
        filter_dic.activate_filt.repos.forEach(function(element){
	        if (dic["repo="] == undefined){
		        dic["repo="] = [];
	        }
	        dic["repo="].push(element);
        });
        filter_dic.activate_filt.orgs.forEach(function(element){
            if (dic["comp="] == undefined){
	            dic["comp="] = [];
	        }
	        dic["comp="].push(element);
        });
        filter_dic.activate_filt.deves.forEach(function(element){
            if (dic["deve="] == undefined){
		        dic["deve="] = [];
	        }
	        dic["deve="].push(element)
        });

        if (db != ""){
	        dic["db="] = [];
	        dic["db="].push(db);
        }

	    var result = "?";

	    Object.keys(dic).forEach(function(element){
		    result += element;
		    dic[element].forEach(function(element2){
			    if (dic[element].indexOf(element2) == 0){
				    result += element2;
			    } else {
				    result += "+"+element2;
			    }
		    });

		    result += "&";
	    });
    }
	return result;

}

/****************************** Read DB ******************************/

function readDB(){
    var arrayStrURL=document.URL.split("?");
    if ((arrayStrURL.length != 1 ) && (arrayStrURL[1] != "")){
	    if (arrayStrURL[1].split("db=").length != 1){
		    db = arrayStrURL[1].split("db=")[1].split("&")[0].split("+")[0]
	    } else {
		    db = "";
	    }
    }
}

/********************** Read generated URL ****************************/
function readURL(){
    var arrayStrURL = document.URL.split("?");
    if ((arrayStrURL.length != 1 )&& (arrayStrURL[1] != "")){
        var reset = false;
        var repoStrUrl;

	if (arrayStrURL[1].split("repo=").length != 1){
		repoStrUrl = arrayStrURL[1].split("repo=")[1].split("&")[0].split("+");
	} else {
		repoStrUrl = [];
	}
        var compStrUrl;
	if (arrayStrURL[1].split("comp=").length != 1){
		compStrUrl = arrayStrURL[1].split("comp=")[1].split("&")[0].split("+");
	} else {
		compStrUrl = [];
	}

	var deveStrUrl;
	if (arrayStrURL[1].split("deve=").length != 1){
		deveStrUrl = arrayStrURL[1].split("deve=")[1].split("&")[0].split("+");
	} else {
		deveStrUrl = [];
	}
    //    var projStrUrl=arrayStrURL[1].split("proj=")[1].split("&")[0].split("+")
        if (repoStrUrl.length != 0){
            repoStrUrl.forEach(function(element){
                if(element.split("Others%20").length == 2){
                    reset = true;
                }else{
                    filter_dic.charts.repo.widget.getChart().filter(unescape(element));
                }
            });
        }
        if (compStrUrl.length != 0){
            compStrUrl.forEach(function(element){
                if(element.split("Others%20").length == 2){
                    reset = true;
                }else{
                    filter_dic.charts.org.widget.getChart().filter(unescape(element));
                }
            });
        }
        if (deveStrUrl[0] != ""){
            deveStrUrl.forEach(function(element){
                if(element.split("Others%20").length == 2){
                    reset = true;
                }else{
                    filter_dic.charts.auth.widget.getChart().filter(unescape(element));
                }
            });
        }
    /*    if(projStrUrl[0]!=""){
            dimProj.filter(unescape(projStrUrl[0]))
            $("#projectForm").val(unescape(projStrUrl[0]))
        }*/
        table_update();
        if(reset){
            alert("We are sorry. The filter Others does not work now. We are working to solve it.");
            reset();
        }
        dc.redrawAll('commitsTable');
        dc.redrawAll('other');
        dc.redrawAll('table');
    }
}

$("#searchForm").autocomplete({
    source: filter_dic.activate_filt.entriesdb,
    minLength: 0
}).on('focus', function() { $(this).keydown(); });

$('#searchForm').keyup(function(e){
    if(e.keyCode == 13){
        var entrie = this.value;
        if(entrie != ""){
            if(org_array.indexOf(entrie) != -1){
                this.value = "";
                filter_dic.charts.org.filter(entrie);
                document.dispatchEvent(pie_click_event);
            }else if(auth_array.indexOf(entrie) != -1){
                this.value = "";
                filter_dic.charts.auth.filter(entrie);
                document.dispatchEvent(pie_click_event);
            }else if(repo_array.indexOf(entrie) != -1){
                this.value = "";
                filter_dic.charts.repo.filter(entrie);
                document.dispatchEvent(pie_click_event);
            }else{
                alert('No exist. Try again');
            }
        }
    }
});

$("#projectForm").autocomplete({
    source: proj_array,
    minLength: 0
}).on('focus', function() { $(this).keydown(); });

$("#projectForm").keyup(function(e){
    if(e.keyCode == 13){
        var entrie = this.value;
        if(entrie != ""){
            this.value = "";
            if (entrie == 'All') {
                filter_dic.dims.proj.filterAll();
            } else {
                filter_dic.dims.proj.filter(entrie);
            }
            document.dispatchEvent(pie_click_event);
        }
    }
});

function reset(){
    $.when(
        filter_dic.dims.bot.filter(0),
        filter_dic.dims.proj.filterAll(),
        dc.filterAll('other'),
        dc.redrawAll('table'),
        dc.filterAll('commitsTable')
    ).done(function(){
        document.getElementById("checkbox").checked = false;
        table_update('reset');
        dc.redrawAll('commitsTable');
        dc.redrawAll('other');
        dc.redrawAll('table');
        $("#filterComp").empty();
        $("#filterDeve").empty();
        $("#filterRepo").empty();
        //filter_dic.activate_filt.repos = [];
        //filter_dic.activate_filt.orgs = [];
        //filter_dic.activate_filt.deves = [];
        //filter_dic.activate_filt.projs = [];
        var url = document.URL.split('db=')[1];
        window.history.replaceState("string", "title", "dashboard.html?db="+url);
    });
}

$(document).ready(function(){

    $.when(readDB()).done(function(){
        // download the JSON files from repository indicated in db
		if (db!="") {
			getting_commits =  $.getJSON('json/'+db+'/scm-commits.json');
			getting_orgs = $.getJSON('json/'+db+'/scm-orgs.json');
			getting_auths = $.getJSON('json/'+db+'/scm-persons.json');
			getting_repos = $.getJSON('json/'+db+'/scm-repos.json');
			getting_configuration = $.getJSON('json/'+db+'/config.json');
		} else {
			getting_commits =  $.getJSON('json/scm-commits.json');
			getting_orgs = $.getJSON('json/scm-orgs.json');
			getting_auths = $.getJSON('json/scm-persons.json');
			getting_repos = $.getJSON('json/scm-repos.json');
			getting_configuration = $.getJSON('json/config.json');
		}
	    $.when(getting_commits, getting_orgs, getting_repos, getting_auths, getting_configuration).done(function (commits, orgs, repos, auths, configuration) {
            load_commits(commits[0], orgs[0], repos[0], auths[0]);		    
            ndx = crossfilter(dc_commits);

            // share twitter
            $('#shareOnTW').click(function() {
              window.location.href = 'https://twitter.com/share?url='+encodeURIComponent(document.URL)+'&text='+configuration[0]['project_name']+'dashboard&hashtags=development,metrics&via=bitergia';
            });
            // share URL
            $('shareUrl').click(function() {
              window.prompt('Copy to clipboard: CTRL+C / CMD+C, Enter', document.URL);
            });            

	        $("#companyName").text(configuration[0]["project_name"]);

	        $.when(draw_charts()).done(function(){
		        $('.relojito').remove();
	        });
            if(db != ""){
		        getting_messages = $.getJSON('json/'+db+'/scm-messages.json');
            } else {
                getting_messages = $.getJSON('json/scm-messages.json');
            }
	        $.when(getting_messages).done(function (messages) {
	            $("body").css("cursor", "default");
	            $("#repoPieChart").css("background", "");
	            load_messages(messages);
	            draw_messages_table(ndx);
	        });
	        readURL();
	        $(':input:not(textarea)').keypress(function(event) {
	            return event.keyCode != 13;
	        });
	    });
    });
});
