<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $survey = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'createSurvey':
                $surveyType = $_POST['arguments'][1];
                $surveyPoints = $_POST['arguments'][2];
                $survey = $_POST['arguments'][0];
                $statement = $conn -> prepare("INSERT INTO Surveys (surveytype, surveypoints, survey) VALUES (?, ?, ?)");
                $statement -> bind_param('sis', $surveyType, $surveyPoints, $survey);
                $statement -> execute();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>