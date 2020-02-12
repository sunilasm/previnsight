<?php
//load the database configuration file
include("db.php");

if(!empty($_GET['status'])){
    switch($_GET['status']){
        case 'succ':
            $statusMsgClass = 'alert-success';
            $statusMsg = 'CSV file record has been inserted successfully.';
            break;
        case 'err':
            $statusMsgClass = 'alert-danger';
            $statusMsg = 'Some problem occurred, please try again.';
            break;
        case 'invalid_file':
            $statusMsgClass = 'alert-danger';
            $statusMsg = 'Please upload a valid CSV file.';
            break;
        default:
            $statusMsgClass = '';
            $statusMsg = '';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bulk Import WorkOrder CSV File Data into Database </title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style type="text/css">
    .panel-heading a{float: right;}
    #importFrm{margin-bottom: 20px;display: block;}
    #importFrm input[type=file] {display: inline;}
	.impclass{margin:10px;}
  </style>
</head>
<body>
<div class="container">
    <h2>Bulk Import WorkOrder CSV File Data</h2>
    <?php if(!empty($statusMsg)){
        echo '<div class="alert '.$statusMsgClass.'">'.$statusMsg.'</div>';
    } ?>
    <div class="panel panel-default">
        <div class="panel-heading">
           Import CSV
            <!--<a href="javascript:void(0);" onclick="$('#importFrm').slideToggle();">Import CSV</a>-->
        </div>
        <div class="panel-body">
           <?php /*?> <form action="importData.php" method="post" enctype="multipart/form-data" id="importFrm">
                <input type="file" name="file" />
                <input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT WORK ORDER">
            </form>
            <?php */?>
			
			<table class="table table-bordered">
                <thead>
                    <tr>
                      <th>PRIN_WORKORDER TABLE</th>
                      <th>PRIN_WO_PRODUCT_PROFILE TABLE</th>
                      <th>PRIN_WO_PR_REFERNECE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td> <form action="importscript.php" method="post" enctype="multipart/form-data" id="importFrm">
                <input type="file" class="impclass" name="file" /><br/>
                <input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT PRIN_WORKORDER">
            </form></td>
                      <td> <form action="importwoproduct.php" method="post" enctype="multipart/form-data" id="importFrm">
                <input type="file" class="impclass" name="file" /><br/>
                <input type="submit" class="btn btn-primary" name="submit_product" value="IMPORT PRIN_WO_PRODUCT_PROFILE">
            </form></td>
                      <td> <form action="importwoprorefrence.php" method="post" enctype="multipart/form-data" id="importFrm">
                <input type="file" class="impclass" name="file" /><br/>
                <input type="submit" class="btn btn-primary" name="submit_refrence" value="IMPORT PRIN_WO_PR_REFERNECE">
            </form></td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    </div>
</div>

</body>
</html>