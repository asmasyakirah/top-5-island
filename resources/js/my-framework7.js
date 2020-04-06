var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Top 5 Island',
  // App id
  id: 'com.top5island',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/',
      url: 'index.php',
    },
    // Default route, match to all pages (e.g. 404 page)
    {
      path: '(.*)',
      url: './404.html',
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');
var $$ = Dom7;

var selectedDate = null;

var dateVisit = app.calendar.create({
  inputEl: '#date-visit',
  value: [new Date(2017, 2, 1)],
  dateFormat: 'yyyy-mm-dd',
  minDate: '2017-02-28',
  maxDate: '2017-03-07',
  on: {
      calendarDayClick: function (c, e, y, m, d) 
      {
        selectedDate = new Date(y, m, d);
        getTop5();
        dateVisit.close();
      }
  }
});

// Run for first load
selectedDate = new Date(2017, 2, 1);
getTop5();


function getTop5()
{
  // Initialize
  var searchResult = document.getElementById("search-result");
  var searchResultTop5 = document.getElementById("search-result-top5");

  // Reset popup details
  searchResult.innerHTML = "";
  searchResultTop5.innerHTML = "";
  document.getElementById('search-result-chart').innerHTML = "";

  // Get popup details
  var data = {"function": "getTop5ByDate"};
  data['visit_date'] = getDateDatabase(selectedDate); //.value; //'2017-03-01';
  // console.log(data);

  // Call API
  $.ajax({
    url: 'api.php',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data), 
    success: function(response)
    {
      // Stringify as JSON text 
      var json = JSON.stringify(response);
      console.log(json);

      // Create an array from JSON text
      var array = JSON.parse(json);
      // alert(array);       

      if (array.message) 
      {
        searchResult.innerHTML = array.message;

        if (array.result && array.result.length>0) 
        {
          var chartName = [];
          var chartData = [];

          for (var i = 0; i < array.result.length; i++) 
          {
            console.log(array.result[i]);
            var i2 = i+1;
            searchResultTop5.innerHTML = searchResultTop5.innerHTML + '<li>'+
                  '<div class="item-content">'+
                    '<div class="item-media"><img src="./resources/images/'+i2+'.jpg" width="44"/></div>'+
                    '<div class="item-inner">'+
                      '<div class="item-title-row">'+
                        '<div id="island-name" class="item-title">'+array.result[i].island_name+'</div>'+
                      '</div>'+
                      '<div id="visit-count" class="item-subtitle">'+array.result[i].visit_count+' visits</div>'+
                    '</div>'+
                  '</div>'+
                '</li>';

                chartName.push(array.result[i].island_name);
                chartData.push(array.result[i].visit_count);
          }

          var ctx = document.getElementById('search-result-chart').getContext('2d');
          var myBarChart = new Chart(ctx, {
              type: 'horizontalBar',
              data: {
                  labels: chartName, //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                  datasets: [{
                      data: chartData, //[12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                          'rgba(89, 211, 222)',
                          'rgba(204, 214, 63)',
                          'rgba(237, 113, 121)',
                          'rgba(254, 164, 68)',
                          'rgba(151, 27, 90)'
                      ],
                      borderColor: [
                          'rgba(89, 211, 222)',
                          'rgba(204, 214, 63)',
                          'rgba(237, 113, 121)',
                          'rgba(254, 164, 68)',
                          'rgba(151, 27, 90)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {        
                legend: {
                  display: false
                }
              }
          });
        }
      }
      else
      {
        searchResult.innerHTML = 'An error seems to occur. Please try again';
      }
    },
    error: function(e)
    { 
      console.log('Error: ' + e.message);
      searchResult.innerHTML = 'An error seems to occur. Please try again';
    }
  });
}

function getDateDatabase(myDate)
{
  var newDate = new Date(myDate);  
  return [newDate.getFullYear(), 
          ((newDate.getMonth()+1)<10? '0'+(newDate.getMonth()+1) : (newDate.getMonth()+1)),
          ((newDate.getDate())<10? '0'+(newDate.getDate()) : (newDate.getDate()))].join('-');
}