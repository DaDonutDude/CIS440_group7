<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $user = array();
    $survey = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'getUser':
                $username = $_POST['arguments'][0];
                $statement = $conn -> prepare("SELECT firstName, lastName, points FROM Users WHERE username=?");
                $statement -> bind_param('s', $username);
                $statement -> execute();
                $result = $statement -> get_result();
                $row = $result -> fetch_row();
                array_push($user, [$row[0], $row[1], $row[2]]);
                $returnVal['result'] = $user;
                echo json_encode($returnVal);
                break;
            case 'getCompletedSurveys':
                $username = $_POST['arguments'][0];
                $statement = $conn -> prepare("SELECT surveyID FROM CompletedSurveys WHERE username=?");
                $statement -> bind_param('s', $username);
                $statement -> execute();
                $result = $statement -> get_result();
                while ($row = $result -> fetch_row()) {
                    array_push($survey, [$row[0]]);
                }
                $returnVal['result'] = $survey;
                echo json_encode($returnVal);
                break;
            case 'getSurveys':
                $statement = $conn -> prepare("SELECT surveyID, surveytype FROM Surveys");
                $statement -> execute();
                $result = $statement -> get_result();
                while ($row = $result -> fetch_row()) {
                    array_push($survey, [$row[0], $row[1]]);
                }
                $returnVal['result'] = $survey;
                echo json_encode($returnVal);
                break;
            case 'writeFeedback':
                $feedback = $_POST['arguments'][0];
                $statement = $conn -> prepare("INSERT INTO Feedback (feedback) VALUES (?)");
                $statement -> bind_param('s', $feedback);
                $statement -> execute();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>