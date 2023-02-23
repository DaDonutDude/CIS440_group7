<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $survey = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
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
            case 'writeSurvey':
                $surveyID = $_POST['arguments'][0];
                $username = $_POST['arguments'][1];
                $question = $_POST['arguments'][2];
                $answer = $_POST['arguments'][3];
                $statement = $conn -> prepare("INSERT INTO CompletedSurveys (surveyID, username, question, answer) VALUES (?, ?, ?, ?)");
                $statement -> bind_param('isss', $surveyID, $username, $question, $answer);
                $statement -> execute();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>