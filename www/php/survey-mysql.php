<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $survey = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'writeMultipleChoice':
                $surveyType = 'multiplechoice';
                $surveyPoints = 50;
                $multipleChoice = $_POST['arguments'][0];
                $statement = $conn -> prepare("INSERT INTO Surveys (surveytype, surveypoints, survey) VALUES (?, ?, ?)");
                $statement -> bind_param('sis', $surveyType, $surveyPoints, $multipleChoice);
                $statement -> execute();
                break;
            case 'writeNumericalScale':
                $surveyType = 'numericalscale';
                $surveyPoints = 50;
                $numericalScale = $_POST['arguments'][0];
                $statement = $conn -> prepare("INSERT INTO Surveys (surveytype, surveypoints, survey) VALUES (?, ?, ?)");
                $statement -> bind_param('sis', $surveyType, $surveyPoints, $numericalScale);
                $statement -> execute();
                break;
            case 'writeShortAnswer':
                $surveyType = 'shortanswer';
                $surveyPoints = 100;
                $shortAnswer = $_POST['arguments'][0];
                $statement = $conn -> prepare("INSERT INTO Surveys (surveytype, surveypoints, survey) VALUES (?, ?, ?)");
                $statement -> bind_param('sis', $surveyType, $surveyPoints, $shortAnswer);
                $statement -> execute();
                break;
            case 'pullSurvey':
                $surveyID = $_POST['arguments'][0];
                $statement = $conn -> prepare("SELECT * FROM Surveys WHERE surveyID=?");
                $statement -> bind_param('i', $surveyID);
                $statement -> execute();
                $result = $statement -> get_result();
                $row = $result -> fetch_row();
                array_push($survey, [$row[0], $row[1], $row[2], $row[3]]);
                $returnVal['result'] = $survey;
                echo json_encode($returnVal);
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>