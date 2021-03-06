
document.getElementById('copyYear').innerHTML = new Date().getFullYear();


var tally = {
	"intelligence":[0,0],
	"wizardry":[0,0],
	"flying":[0,0]
}

var chartData = [];


$('fieldset').each(function(){
	var totalInputs = $(this).find('label').last().index();
	var points = 1 / totalInputs;
	$(this).find('input:checkbox').attr('data-pts', points.toPrecision(2));
	$(this).find('input:radio').attr('data-pts', function(n){
		n++;
		N = n * points.toPrecision(2);
		if (N == 0.99){
			N = Math.round(N);
		}
		return N;
	});
	tally[$(this).attr('data-comp')][1]++;
	$(this).prepend( '<p><i>Competency: ' + $(this).attr('data-comp') + '</i></p>' );
});


$('input:submit').on('click',function(e){
	e.preventDefault();
	$('fieldset').each(function(){
		var tallyKey = $(this).attr('data-comp');
		$(this).find('input:checked').each(function(){
			score = parseFloat( $(this).attr('data-pts') );
			tally[tallyKey][0] += score;
			tally[tallyKey][0] = parseFloat(tally['flying'][0].toPrecision(2));
		});
	});
	$.each(tally, function(index, value){
		value = value.join(',').replace(',',' / ');
		$('#results ul').append( '<li>' + index + ': ' + value + ' points.</li>');
	});
	$('form').hide();
	$('#results').fadeIn('fast');


	for ( i=0; i<Object.keys(tally).length; i++ ) {
		chartData[i] = tally[Object.keys(tally)[i]][0];
	}



// MAKING A CHART

//var myChart = new Chart({  });
var ctx = $("#myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(tally),
        datasets: [{
            label: 'self-assessment results',
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options:{
	    title: {
	    	'display': true,
	    	'fontSize': 20,
	    	'text': 'Your Results'
	    }
	}
});


});//submit