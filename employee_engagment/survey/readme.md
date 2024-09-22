Here's a simple employee survey that allows users to select their responses using a 5-point scale (1 to 5). The responses are sent via email using JavaScript for client-side validation and PHP for handling the form submission.

Step 1: HTML Structure
Create an HTML file with the survey form.

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Survey</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h2 {
            text-align: center;
        }
        .question {
            margin-bottom: 20px;
        }
        .question label {
            display: block;
            margin-bottom: 5px;
        }
        .options {
            display: flex;
            justify-content: space-between;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h2>Employee Survey</h2>
    <form id="surveyForm" action="submit_survey.php" method="POST">
        <div class="question">
            <label for="question1">How satisfied are you with your job?</label>
            <div class="options">
                <input type="radio" name="satisfaction" value="1" required> 1
                <input type="radio" name="satisfaction" value="2"> 2
                <input type="radio" name="satisfaction" value="3"> 3
                <input type="radio" name="satisfaction" value="4"> 4
                <input type="radio" name="satisfaction" value="5"> 5
            </div>
        </div>

        <div class="question">
            <label for="question2">How would you rate communication in the workplace?</label>
            <div class="options">
                <input type="radio" name="communication" value="1" required> 1
                <input type="radio" name="communication" value="2"> 2
                <input type="radio" name="communication" value="3"> 3
                <input type="radio" name="communication" value="4"> 4
                <input type="radio" name="communication" value="5"> 5
            </div>
        </div>

        <div class="question">
            <label for="question3">How likely are you to recommend this company to a friend?</label>
            <div class="options">
                <input type="radio" name="recommendation" value="1" required> 1
                <input type="radio" name="recommendation" value="2"> 2
                <input type="radio" name="recommendation" value="3"> 3
                <input type="radio" name="recommendation" value="4"> 4
                <input type="radio" name="recommendation" value="5"> 5
            </div>
        </div>

        <button type="submit">Submit Survey</button>
    </form>

    <script>
        document.getElementById("surveyForm").addEventListener("submit", function(event) {
            const satisfaction = document.querySelector('input[name="satisfaction"]:checked');
            const communication = document.querySelector('input[name="communication"]:checked');
            const recommendation = document.querySelector('input[name="recommendation"]:checked');

            if (!satisfaction || !communication || !recommendation) {
                alert("Please answer all questions before submitting.");
                event.preventDefault();  // Prevent form submission
            }
        });
    </script>
</body>
</html>
Step 2: PHP (Handle Form Submission)
Save this as submit_survey.php.

php
Copy code
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $satisfaction = htmlspecialchars(trim($_POST['satisfaction']));
    $communication = htmlspecialchars(trim($_POST['communication']));
    $recommendation = htmlspecialchars(trim($_POST['recommendation']));

    // Email content
    $to = "youremail@example.com";  // Replace with your email address
    $subject = "Employee Survey Responses";
    $message = "
    Employee Survey Responses:

    Job Satisfaction: $satisfaction
    Communication Rating: $communication
    Likelihood to Recommend: $recommendation
    ";

    $headers = "From: noreply@example.com" . "\r\n" .  // Change to your no-reply email
               "Reply-To: noreply@example.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for your responses!";
    } else {
        echo "There was a problem sending your responses. Please try again.";
    }
}
?>
How It Works:
HTML Form:

The form contains three questions, each with a 5-point rating scale.
Users must select one option per question (using radio buttons).
JavaScript Validation:

The JavaScript checks that all questions are answered before submission.
PHP Backend:

The submit_survey.php script collects the responses and sends them via email.
The email content includes the user's responses to the survey.
Important Notes:
Replace youremail@example.com with the email address where you want to receive the survey responses.
Ensure that your server is configured to send emails using the mail() function.
Consider using a more secure email method (like PHPMailer) for production applications.
This simple survey setup allows employees to provide feedback and ensures that responses are collected efficiently.