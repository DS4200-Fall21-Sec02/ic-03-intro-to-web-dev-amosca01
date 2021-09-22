function makeBold() {

    //select element and get classes 
    let title = document.getElementById("title");
    
    //toggle un-bold
    title.classList.toggle("un-bold"); 

    //using add/remove
    // if (title.classList.contains("un-bold")) {
    //     title.classList.remove("un-bold");
    // } else {
    //     title.classList.add("un-bold"); 
    // }
}

//d3 chart from first tutorial (hardcoded)

(function() {
    var ds = [1,2,3,7,6,9,10];
       var width = 300,
          scaleFactor = 20,
          barHeight = 30;

    var graph = d3.select("#barchart-container")
       .append("svg")
       .attr("width", width)
       .attr("height", barHeight * ds.length);

    var bar = graph.selectAll("g") 
       .data(ds)
       .enter()
       .append("g")
       .attr("transform", function(d, i) {
          return "translate(0," + i * barHeight + ")";
       });

    bar.append("rect")
       .attr("width", function(d) {
          return d * scaleFactor;
       })
       .attr("height", barHeight - 1);

    bar.append("text")
       .attr("x", function(d) { return (d*scaleFactor); })
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .text(function(d) { return d; });
})(); 

//d3 chart from second reference (reading csv) 
// Note: python simple server is required

(function() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width  = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;         

    //set ranges 
    var xScale = d3.scaleBand().range([0, width]).padding(0.4);
    var yScale = d3.scaleLinear().range([height, 0]);

    //append svg
    var svg = d3.select("#barchart-container2").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

    //get data 
    d3.csv("data.csv").then(function(data) {
        //scale 
        xScale.domain(data.map(function(d) {return d.Shape; }));
        yScale.domain([0, d3.max(data, function(d) {return d.Coolness;})]);

        //append bars
        svg.selectAll(".bar")
                .data(data)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {return xScale(d.Shape); })
                .attr("width", xScale.bandwidth())
                .attr("y", function(d) {return yScale(d.Coolness); })
                .attr("height", function(d) {return height - yScale(d.Coolness); });

        //append x-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        //append y-axis
        svg.append("g")
            .call(d3.axisLeft(yScale)); 

        //add x-axis title
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 10)
            .text("Shape");

        //add y-axis title
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .text("Coolness");
    });

})(); 





