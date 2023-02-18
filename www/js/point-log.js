"use strict"

let user = sessionStorage.getItem('token');
var point_log = [user];
var survey_log = [user];
sessionStorage.setItem('point_log', JSON.stringify(point_log));
sessionStorage.setItem('survey_log', JSON.stringify(survey_log));