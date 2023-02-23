"use strict";

let points;
let total_points;
let log;
let username = sessionStorage.getItem('token');
let survey_complete_div = document.getElementById('survey_complete_div');
let user_points_div = document.getElementById('user_points_div');
let error_div = document.getElementById('error_div');
let home_div = document.getElementById('to_home_div');

survey_complete_div.style.visibility = 'hidden';
user_points_div.style.visibility = 'hidden';
error_div.style.visibility = 'hidden';
home_div.style.visibility = 'hidden';

$.ajax({
    type: "POST",
    url: './php/survey-complete-mysql.php',
    dataType: 'json',
    data: {functionname: 'getPoints', arguments: [username]},
    success: function (obj, textstatus) {
                  if( ('error' in obj) ) console.log(obj.error);
                  total_points = obj.result[0][0];
                  set_survey_type();
            }
});

function set_survey_type() {
    points = sessionStorage.getItem('points');
    sessionStorage.removeItem('points');
    error_div.style.visibility = 'hidden';
    console.log("You have earned " + points + " points");
    total_points = parseInt(total_points) + parseInt(points);
    update_html();
}

function update_html() {
    survey_complete_div.style.visibility = 'visible';
    user_points_div.style.visibility = 'visible';
    home_div.style.visibility = 'visible';
    document.getElementById('points_earned').innerHTML = points;
    document.getElementById('user').innerHTML = username;
    document.getElementById('user_total_points').innerHTML = total_points;
    update_log();
}

function update_log() {
    log = JSON.parse(sessionStorage.getItem('point_log'));
    log.push(points);
    sessionStorage.setItem('point_log', JSON.stringify(log));
    console.log(JSON.parse(sessionStorage.getItem('point_log')));
    update_database();
}

function update_database() {
    $.ajax({
        type: "POST",
        url: './php/survey-complete-mysql.php',
        dataType: 'json',
        data: {functionname: 'updatePoints', arguments: [username, total_points]},
        success: function (obj, textstatus) {
                      if( ('error' in obj) ) console.log(obj.error);
                }
    });
    take_me_home();
}

async function take_me_home() {
    await new Promise(r => setTimeout(r, 5000))
    if (sessionStorage.getItem('admin')) window.location.href = "./admin-home.html";
    else window.location.href = "./user-home.html";
}