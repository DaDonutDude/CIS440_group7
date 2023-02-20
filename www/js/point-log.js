"use strict"

let user = sessionStorage.getItem('token');
var point_log = [user];
sessionStorage.setItem('point_log', JSON.stringify(point_log));