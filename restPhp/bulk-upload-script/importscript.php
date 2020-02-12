<?php
//load the database configuration file
//include("db.php");
$con=mysqli_connect("localhost","previna","Welcome02","altenprevin");
if (isset($_POST['importSubmit'])) {
	$qstring='';
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
               INTO TABLE PRIN_WORKORDER  CHARACTER SET utf8 FIELDS TERMINATED BY ','
               OPTIONALLY ENCLOSED BY '\"' IGNORE 1 LINES (WORK_ORDER_ID,WO_NUMBER, RECIPE_NAME, RECIPE_ID, TARGET_MATERIAL, DATE_PROCESSED, USER_OPERATOR, TOTAL_LOT_AMOUNT, UOM, LOT_NO, OPERATOR_NAME, ACTUAL_YIELD, VALUE, DESCRIPTION, ITEM_NUMBER, QUANTITY_REQUESTED, QUANTITY_MADE, STATUS, MATERIAL_NUMBER, AMOUNT_REQUESTED, AMOUNT_MADE, QUANTITY_UNITS, INVENTORY_CODE, INVENTORY_ID, CREATION_DATE, LAST_UPDATED_DATE, CREATED_BY, LAST_UPDATED_BY);
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