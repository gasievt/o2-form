<?php
$formData = json_decode(file_get_contents('php://input'), true);
$errors = [];
echo json_encode($formData);