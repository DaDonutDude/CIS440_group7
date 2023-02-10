"use strict";

let survey;
let surveyID = sessionStorage.getItem('surveyID');
const loadQuestion = document.getElementById('load-question');
const surveyButton = document.getElementById("survey-form-submit");

$.ajax({
    type: "POST",
    url: './php/survey-mysql.php',
    dataType: 'json',
    data: {functionname: 'pullSurvey', arguments: [surveyID]},
    success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                    survey = obj.result[0];
                    switch (survey[1]) {
                        case 'multiplechoice':
                            let splitQuestion = survey[3].split("\n");
                            document.getElementById('survey-field').innerHTML = splitQuestion[0];
                            loadQuestion.innerHTML = '<div class="survey-form-field"><input type="radio" id="5" value="5" name="answer"><label for="5" id="high"></label></div><div class="survey-form-field"><input type="radio" id="4" value="4" name="answer"><label for="4" id="mid-high"></label></div><div class="survey-form-field"><input type="radio" id="3" value="3" name="answer"><label for="3" id="mid-low"></label></div><div class="survey-form-field"><input type="radio" id="2" value="2" name="answer"><label for="2" id="low"></label></div><div class="survey-form-field"><input type="radio" id="1" value="1" name="answer"><label for="1" id="none"></label></div>';
                            document.getElementById('high').innerHTML = splitQuestion[1];
                            document.getElementById('mid-high').innerHTML = splitQuestion[2];
                            document.getElementById('mid-low').innerHTML = splitQuestion[3];
                            document.getElementById('low').innerHTML = splitQuestion[4];
                            document.getElementById('none').innerHTML = splitQuestion[5];
                            break;
                        case 'numericalscale':
                            document.getElementById('survey-field').innerHTML = survey[3];
                            loadQuestion.innerHTML = '<div class="nsradiogroup"><input id="10" type="radio" value="10" name="answer"><label for="10">10</label></div><div class="nsradiogroup"><input id="9" type="radio" value="9" name="answer"><label for="9">9</label></div><div class="nsradiogroup"><input id="8" type="radio" value="8" name="answer"><label for="8">8</label></div><div class="nsradiogroup"><input id="7" type="radio" value="7" name="answer"><label for="7">7</label></div><div class="nsradiogroup"><input id="6" type="radio" value="6" name="answer"><label for="6">6</label></div><div class="nsradiogroup"><input id="5" type="radio" value="5" name="answer"><label for="5">5</label></div><div class="nsradiogroup"><input id="4" type="radio" value="4" name="answer"><label for="4">4</label></div><div class="nsradiogroup"><input id="3" type="radio" value="3" name="answer"><label for="3">3</label></div><div class="nsradiogroup"><input id="2" type="radio" value="2" name="answer"><label for="2">2</label></div><div class="nsradiogroup"><input id="1" type="radio" value="1" name="answer"><label for="1">1</label></div>';
                            break;
                        case 'shortanswer':
                            document.getElementById('survey-field').innerHTML = survey[3];
                            loadQuestion.innerHTML = '<textarea id="text" maxlength="500" style="height:200px;width:500px;font-size:12pt;resize: none;" placeholder="500 character limit..."></textarea><br><br>';
                            break;
                        default:
                            document.getElementById('survey-field').innerHTML = 'Error!';
                            loadQuestion.innerHTML = 'Question failed to load!'
                            break;
                    }
                }
                else {
                    console.log(obj.error);
                }
            }
});

surveyButton.addEventListener("click", (e) => {
    e.preventDefault();

    let answer;

    switch (survey[1]) {
        case 'multiplechoice':
            if (document.getElementById('5').checked) {
                answer = document.getElementById('5').value;
            } else if (document.getElementById('4').checked) {
                answer = document.getElementById('4').value;
            } else if (document.getElementById('3').checked) {
                answer = document.getElementById('3').value;
            } else if (document.getElementById('2').checked) {
                answer = document.getElementById('2').value;
            } else if (document.getElementById('1').checked) {
                answer = document.getElementById('1').value;
            } else {
                alert('Please answer the question before trying to submit.');
            }
            break;
        case 'numericalscale':
            if (document.getElementById('10').checked) {
                answer = document.getElementById('10').value;
            } else if (document.getElementById('9').checked) {
                answer = document.getElementById('9').value;
            } else if (document.getElementById('8').checked) {
                answer = document.getElementById('8').value;
            } else if (document.getElementById('7').checked) {
                answer = document.getElementById('7').value;
            } else if (document.getElementById('6').checked) {
                answer = document.getElementById('6').value;
            } else if (document.getElementById('5').checked) {
                answer = document.getElementById('5').value;
            } else if (document.getElementById('4').checked) {
                answer = document.getElementById('4').value;
            } else if (document.getElementById('3').checked) {
                answer = document.getElementById('3').value;
            } else if (document.getElementById('2').checked) {
                answer = document.getElementById('2').value;
            } else if (document.getElementById('1').checked) {
                answer = document.getElementById('1').value;
            } else {
                alert('Please answer the question before trying to submit.');
            }
            break;
        default:
            if (document.getElementById('text').value != '') {
                answer = document.getElementById('text').value;
            } else {
                alert('Please answer the question before trying to submit.');
            }
            break;
    }
    if (answer != null) {
        sessionStorage.setItem('answer', answer);
        window.location.href = './survey-complete.html';
    }
});