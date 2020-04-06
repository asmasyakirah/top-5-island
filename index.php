<?php

// Create Session
session_start();

// Call config and functions settings
require('resources/config.php');
require('resources/function.php');

// Set timezone. Call from config.
date_default_timezone_set($config['timezone']);

// var_dump(getTop5ByDate("2017-03-01"));

?>

<!DOCTYPE html>
<html class="ios">
  <head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">

    <!-- Color theme for statusbar Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="black">

    <!-- Your app title -->
    <title><?php echo $config["project"] ?></title>
    
    <!-- Page Favicon -->
    <link rel="shortcut icon" href="resources/images/favicon.ico" type="image/x-icon"/>

    <!-- PWA -->
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default"> 
    <meta name="apple-mobile-web-app-title" content='<?php echo $config["project"] ?>'>
    <link rel="apple-touch-icon" href="resources/images/icons/icon-152x152.png">
    <meta name="msapplication-TileImage" content="resources/images/icons/icon-144x144.png">
    <meta name="msapplication-TileColor" content="black">

    <!-- Fonts -->
    <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
    <link href="resources/fonts/material-design-icons/material-icons.css" rel="stylesheet">
    <link href="resources/library/framework7/css/framework7-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap" rel="stylesheet">

    <!-- Styles -->
    <!-- <link rel="stylesheet" href="resources/library/bootstrap-4.1/bootstrap.min.css" media="all"> -->
    <link rel="stylesheet" href="resources/library/font-awesome-5/css/fontawesome-all.min.css" media="all">
    <link rel="stylesheet" href="resources/library/framework7/css/framework7.bundle.min.css">
    <!-- Path to your custom app styles-->
    <link rel="stylesheet" href="resources/css/framework7-modified.css">

    <!-- Chart.js -->
    <link rel="stylesheet" href="resources/library/chartjs/Chart.css">
    <script type="text/javascript" src="resources/library/chartjs/Chart.js"></script>

    <!-- Javascript -->
    <script type="text/javascript" src="resources/library/jquery/1.9.1/jquery.min.js"></script>

  </head>
  <body>
    <!-- App root element -->
    <div id="app">
      <!-- Statusbar overlay -->
      <div class="statusbar"></div>

      <!-- Your main view, should have "view-main" class -->
      <div class="view view-main">

        <!-- Initial Page, "data-name" contains page name -->
        <div id="my-page" class="page page-with-subnavbar">

          <!-- Top Navbar -->
          <div class="navbar">
            <div class="navbar-inner">

              <!-- Logo at the title -->
              <div id="page-name" class="title">Top 5 Island</div>

              <!-- No right logo -->
              <!-- <div class="right">
                <img src="resources/images/logo.png" height="30px"/>
                <div class="md-only" style="margin-right: 5px;">
                </div>
              </div> -->
            </div>
          </div>

          <div class="page-content">
          <div class="block no-hairlines">

            <div class="block-title text-align-center">
              <img src="resources/images/logo.png" width="100%" style="max-width: 300px"/>
              <br>
              This app shows the top 5 visited island based on date of visit. Select a date and see the list and graph result.
            </div>
            <div class="block-title">Date of visit</div>
            <div class="list">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <input type="text" placeholder="Select date" readonly="readonly" id="date-visit"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="block-title" id="search-result"></div>

            <div class="list accordion-list">
              <ul>
                <li class="accordion-item accordion-item-opened"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                      <div class="item-title"><i class="f7-icons">list_bullet</i>List</div>
                    </div></a>
                  <div class="accordion-item-content">
                    <div class="block">
                      <div id="search-result" class="list media-list">
                        <ul id="search-result-top5">
                          <!-- <li>
                            <div class="item-content">
                              <div class="item-media"><img src="./resources/images/one.png" width="44"/></div>
                              <div class="item-inner">
                                <div class="item-title-row">
                                  <div id="island-name" class="item-title">Island Name</div>
                                </div>
                                <div id="visit-count" class="item-subtitle">Visit Count</div>
                              </div>
                            </div>
                          </li> -->
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="accordion-item"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                      <div class="item-title"><i class="f7-icons">chart_bar_alt_fill</i> Graph</div>
                    </div></a>
                  <div class="accordion-item-content">
                    <div class="block">
                      <canvas id="search-result-chart" width="400px" height="300px"></canvas>
                    </div>
                  </div>
                </li>
              </ul>
            </div>        

          </div>          
          </div>   

        </div>

      </div>
    </div>

    <!-- Path to PWA config -->
    <script type="text/javascript" src="resources/js/my-pwa.js" async></script>

    <!-- Path to Framework7 Library Bundle JS-->
    <script type="text/javascript" src="resources/library/framework7/js/framework7.bundle.min.js"></script>    

    <!-- Path to Framework7 app js-->
    <script type="text/javascript" src="resources/js/my-framework7.js"></script>
  
  </body>
</html>