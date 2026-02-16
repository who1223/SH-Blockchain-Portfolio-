<?php
if(isset($_POST['name'], $_POST['message'])){
    $name = $_POST['name'];
    $message = $_POST['message'];
    $filename = "";

    // ফাইল আপলোড
    if(isset($_FILES['file']) && $_FILES['file']['name'] != ""){
        $uploads_dir = "uploads";
        if(!is_dir($uploads_dir)) mkdir($uploads_dir);
        $filename = basename($_FILES['file']['name']);
        move_uploaded_file($_FILES['file']['tmp_name'], "$uploads_dir/$filename");
    }

    // পোস্ট সংরক্ষণ
    $post_line = $name."||".$message."||".$filename."\n";
    file_put_contents("posts.txt", $post_line, FILE_APPEND);

    // রিডাইরেক্ট করে index.html এ
    header("Location: index.html");
    exit();
}
?>
