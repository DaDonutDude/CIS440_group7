'use strict';

let survey;
let surveyType;
let points;
const submitButton = document.getElementById('survey-create-submit');


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    survey = document.getElementById('survey-text').value;
    if (survey != '') {
        if (document.getElementById('multiplechoice').checked) {
            surveyType = document.getElementById('multiplechoice').value;
            points = 50;
        } else if (document.getElementById('numericalscale').checked) {
            surveyType = document.getElementById('numericalscale').value;
            points = 50;
        } else if (document.getElementById('shortanswer').checked) {
            surveyType = document.getElementById('shortanswer').value;
            points = 100;
        } else {
            alert('Please select type of survey.');
        }
        if (surveyType != null) {
            $.ajax({
                type: "POST",
                url: './php/survey-creation-mysql.php',
                dataType: 'json',
                data: {functionname: 'createSurvey', arguments: [survey, surveyType, points]},
                success: function (obj, textstatus) {
                              if( ('error' in obj) ) console.log(obj.error);
                        }
            });
            window.location.href = './admin-home.html';
        }
    } else {
        alert('Please enter a survey question.');
    }
});