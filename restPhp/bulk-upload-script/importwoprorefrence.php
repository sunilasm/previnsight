<?php

$con=mysqli_connect("localhost","previna","Welcome02","altenprevin");

$qstring='';
if (isset($_POST['submit_refrence'])) {
    $tmp = $_FILES['file']['tmp_name'];

    $name = $_FILES['file']['name'];

	$rnd=rand(5,15);

	$name =$rnd."_".$name;

    //Can be any full path, just don't end with a /. That will be added in in the path variable

    $uploads_dir ='workorder';

    $path = $uploads_dir.'/'.$name;

    if(move_uploaded_file($tmp, $path)){

        echo "<br><center><p>". $name ."</p></center>";

        //Import uploaded file to Database

        //If the query fails, try LOAD DATA LOCAL INFILE

        $import = "
        LOAD DATA LOCAL INFILE '".$path."'
               INTO TABLE PRIN_WO_PR_REFERNECE  CHARACTER SET utf8 FIELDS TERMINATED BY ','
               OPTIONALLY ENCLOSED BY '\"' IGNORE 1 LINES (WORK_ORDER_ID, MATERIAL, INVENTORY, QUANTITY, METRIC, PARAMETER, PARAMETER_NEW, TARGET, TARGET_NEW, MACHINERY, MACHINERY_NEW, SENSOR, SENSOR_NEW, SENSOR_AMOUNT, ACTION, ACTION_NEW, TYPE, CREATION_DATE, LAST_UPDATED_DATE, CREATED_BY, LAST_UPDATED_BY);
        ";
        mysqli_query($con,$import) or die(mysqli_error($con));
		mysqli_close($con);
        //If you do not want to keep the csv, you can delete it after this point.

        //unlink($path);

	 $qstring = '?status=succ';

    }else{

		$qstring = '?status=invalid_file';

        //echo 'Failed to move uploaded files';

    }
	
}

//redirect to the listing page

header("Location: index.php".$qstring);


?>