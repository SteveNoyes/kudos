Here’s an example of a form that allows users to submit a photo for your website. The form accepts only JPG, PNG, and JPEG file formats. JavaScript is used for client-side validation, while PHP handles the file upload and storage.

HTML (Form + JavaScript)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Your Photo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        form {
            width: 400px;
            margin: 0 auto;
            padding: 1em;
            background: #f9f9f9;
            border-radius: 5px;
        }
        input, label, button {
            width: 100%;
            padding: 0.7em;
            margin-bottom: 1em;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h2>Submit Your Photo!</h2>
    <form id="photoForm" action="upload_photo.php" method="POST" enctype="multipart/form-data">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="photo">Select Photo (JPG, PNG, JPEG):</label>
        <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" required>

        <button type="submit">Upload Photo</button>
    </form>

    <script>
        // JavaScript validation for file type
        document.getElementById("photoForm").addEventListener("submit", function(event) {
            var photoInput = document.getElementById("photo");
            var filePath = photoInput.value;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

            if (!allowedExtensions.exec(filePath)) {
                alert("Please upload a file having extensions .jpg, .jpeg, or .png only.");
                photoInput.value = ''; // Clear the input
                event.preventDefault();  // Prevent form submission
            }
        });
    </script>
</body>
</html>
PHP (File Upload Handling)
Save this as upload_photo.php.

php
Copy code
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $targetDir = "uploads/"; // Make sure this directory exists and is writable
    $targetFile = $targetDir . basename($_FILES["photo"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if the file is an actual image
    $check = getimagesize($_FILES["photo"]["tmp_name"]);
    if ($check === false) {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check file size (5MB limit)
    if ($_FILES["photo"]["size"] > 5000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png") {
        echo "Sorry, only JPG, JPEG, and PNG files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        // Try to upload the file
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFile)) {
            echo "The file " . htmlspecialchars(basename($_FILES["photo"]["name"])) . " has been uploaded successfully.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?>
How It Works:
HTML Form:

The form includes fields for the contributor's name, email, and photo upload.
The enctype="multipart/form-data" attribute is required for file uploads.
JavaScript Validation:

The JavaScript checks if the uploaded file has the correct extensions (JPG, JPEG, PNG) before submission.
PHP Backend:

The upload_photo.php script processes the file upload.
It checks if the uploaded file is an image, its size, and its format.
If everything is valid, it moves the file to the uploads/ directory. Ensure this directory exists and has the correct permissions.
Important Notes:
Make sure to create an uploads/ directory on your server and set permissions to allow file uploads.
Adjust the file size limit as needed.
Ensure your server supports file uploads and that the PHP file_uploads directive is enabled.