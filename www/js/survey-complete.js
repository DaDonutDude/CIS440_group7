"use strict"

let points;
let survey_complete_div = document.getElementById('survey_complete_div');
let user_points_div = document.getElementById('user_points_div');
let error_div = document.getElementById('error_div');
let home_div = document.getElementById('to_home_div');

survey_complete_div.style.visibility = 'hidden';
user_points_div.style.visibility = 'hidden';
error_div.style.visibility = 'hidden';
home_div.style.visibility = 'hidden';

//swap 'type' for survey[1] which should access the type of survey from survey-page.js line 16
function set_survey_type(type) {
    switch (type) {
        case 'multiplechoice':
            points = 50;
            break;
        case 'numericalscale':
            points = 50;
            break;
        case 'shortanswer':
            points = 100;
            break;
        default:
            points = 0;
            break;
        }


    error_div.style.visibility = 'hidden';
    console.log("You have earned " + points + " points");
    total_points += points;
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
    let log = JSON.parse(sessionStorage.getItem('point_log'));
    log.push(points);
    sessionStorage.setItem('point_log', JSON.stringify(log));
    console.log(JSON.parse(sessionStorage.getItem('point_log')));
    update_database();
}

//this needs pushed to database
function update_database() {
    sessionStorage.setItem("total_points", total_points);
}

function take_me_home() {
    window.location.href = "./user-home.html";
}