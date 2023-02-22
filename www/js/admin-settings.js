'use strict';

let surveys;
let csv = [];
let user;
const username = document.getElementById('username');
const password = document.getElementById('new-password');
const downloadButton = document.getElementById('download-surveys');
const changePasswordButton = document.getElementById('new-pw-submit');

downloadButton.addEventListener('click', (e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: './php/admin-settings-mysql.php',
        dataType: 'json',
        data: { functionname: 'getSurveys' },
        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                surveys = obj.result;
                if (surveys.length > 0) {
                    alert(csv);
                    csv.push(['SurveyID', 'Answer'] + '\n');
                    alert(csv);
                    surveys.forEach(function (row) {
                        alert(row);
                        csv.push(row + '\n');
                    });
                    alert(csv);
                    const download = new Blob(csv, { type: 'text/csv' });
                    const url = window.URL.createObjectURL(download);
                    const elem = document.createElement('a');
                    elem.setAttribute('href', url);
                    elem.setAttribute('download', 'Completed Surveys.csv');
                    elem.click();
                }
            }
            else {
                console.log(obj.error);
            }
        }
    });
});

changePasswordButton.addEventListener('click', (e) => {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: './php/admin-settings-mysql.php',
        dataType: 'json',
        async: false,
        data: { functionname: 'getUser', arguments: [username.value] },
        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                user = obj.result;
            }
            else {
                console.log(obj.error);
            }
        }
    });
    if (user.length != 0) {
        $.ajax({
            type: "POST",
            url: './php/admin-settings-mysql.php',
            dataType: 'json',
            async: false,
            data: { functionname: 'changeUserPassword', arguments: [username.value, password.value] },
            complete: function (obj, textstatus) {
                alert('User password updated correctly.');
                username.value = '';
                password.value = '';
            }
        });
    } else {
        alert('Username not found.');
    }
});