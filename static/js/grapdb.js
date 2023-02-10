window.onload = function() {
    // 데이터베이스에 연결:(자바스크립트)
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('ijm.db');
    
    // 데이터검색(자바스크립트)
    var data = [];
    db.each("SELECT * FROM end", function(err, row) {
        data.push(row);
    });
    
    // 데이터형식지정(자바스크립트)
    var xValues = data.map(function(d) { return d.x_value; });
    var yValues = data.map(function(d) { return d.y_value; });
    
    // 데이터 표시
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var line = d3.line()
    .x(function(d) { return x(d.x_value); })
    .y(function(d) { return y(d.y_value); });
    
    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    x.domain(d3.extent(data, function(d) { return d.x_value; }));
    y.domain(d3.extent(data, function(d) { return d.y_value; }));
    
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line);
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
    svg.append("g")
    .call(d3.axisLeft(y));
};
 