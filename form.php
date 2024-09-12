<?php
$formData = [
	"email" => null,
	"phone" => null,
	"phone-additional" => null,
	"second-name" => null,
	"name" => null,
	"patronymics" => null,
	"day-of-birth" => null,
	"month-of-birth" => null,
	"year-of-birth" => null,
	"gender" => null
];
$errors = [];
$formDataRequest = json_decode(file_get_contents('php://input'), true);
if (isSameArrays(array_keys($formData), array_keys($formDataRequest))){
	$errors = array_keys($formDataRequest, null);
}
$errors = array_flip($errors);
foreach($errors as $key => &$el){
	if($key === 'phone-additional' || $key === 'patronymics'){
		unset($errors[$key]);
	}
	$el = 'Это поле обязательное для заполнения.';
}
file_put_contents('test.txt', print_r($errors, true), FILE_APPEND);
function isSameArrays($a, $b){
   sort($a);
   sort($b);
   return $a == $b;
}