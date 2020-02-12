<?php
namespace App;
use PDO;
class WorkorderController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
    public function AuWorkorder()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$qut="";
		for($i=0;$i<248;$i++){
			$qut .= "?,";
		}
		$quts=rtrim($qut,',');
		$sql = "CALL PRIN_WORK_ORDER_PROC(".$quts.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_WO_NUMBER);
			$stmt->bindParam(2,$input->i_OPERATOR_NAME);
			$stmt->bindParam(3,$input->i_RECIPE_NAME);
            $stmt->bindParam(4,$input->i_RECIPE_ID);
			$stmt->bindParam(5,$input->i_TARGET_MATERIAL);
			$stmt->bindParam(6,$input->i_ACTUAL_YIELD);
			$stmt->bindParam(7,$input->i_VALUE);
			$stmt->bindParam(8,$input->i_DESCRIPTION);	
			$stmt->bindParam(9,$input->i_QUANTITY_REQUESTED);
			$stmt->bindParam(10,$input->i_QUANTITY_MADE);
			$stmt->bindParam(11,$input->i_STATUS);
			$stmt->bindParam(12,$input->i_QUANTITY_UNITS);
			$stmt->bindParam(13,$input->i_INVENTORY_CODE);
			$stmt->bindParam(14,$input->i_INVENTORY_ID);
			$stmt->bindParam(15,$input->i_CREATION_DATE);
			$stmt->bindParam(16,$input->i_LAST_UPDATED_DATE);
            $stmt->bindParam(17,$input->i_LAST_UPDATED_BY);
			$stmt->bindParam(18,$input->i_CREATED_BY);
			$para = 19;
			for($i=1;$i<=10;$i++){
				$workorder_id = "i_WO_PR_ID_".$i;
				$material = "i_MATERIAL_".$i;
				$inventory = "i_INVENTORY_".$i;
                $quantity = "i_QUANTITY_".$i;
                $metric = "i_METRIC_".$i;
				$parameter = "i_PARAMETER_".$i;
				$parameter_new = "i_PARAMETER_NEW_".$i;
				$target = "i_TARGET_".$i;
				$target_new = "i_TARGET_NEW_".$i;
				$machinery = "i_MACHINERY_".$i;
				$machinery_new = "i_MACHINERY_NEW_".$i;
				$sensor = "i_SENSOR_".$i;
				$sensor_new = "i_SENSOR_NEW_".$i;
                $sensor_amount ="i_SENSOR_AMOUNT_".$i;
				$action = "i_ACTION_".$i;
				$action_new = "i_ACTION_NEW_".$i;
				$type_para = "i_TYPE_PR_".$i;
				
				$stmt->bindParam($para,$input->$workorder_id);
				$para = $para+1;
				
				
				$stmt->bindParam($para,$input->$material);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$inventory);
				$para = $para+1;
				
                $stmt->bindParam($para,$input->$quantity);
				$para = $para+1;
				
                $stmt->bindParam($para,$input->$metric);
				$para = $para+1;
				
                
				$stmt->bindParam($para,$input->$parameter);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$parameter_new);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$target);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$target_new);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$machinery);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$machinery_new);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$sensor);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$sensor_new);
				$para = $para+1;
                
                $stmt->bindParam($para,$input->$sensor_amount);
				$para = $para+1;
				
				
				$stmt->bindParam($para,$input->$action);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$action_new);
				$para = $para+1;
				
				$stmt->bindParam($para,$input->$type_para);
				$para = $para+1;

			}
			for($j=1;$j<=10;$j++){
			
				$work_order_id = "i_WO_PR_ID_".$i;
				$stmt->bindParam($para,$input->$work_order_id);
				$para = $para+1;
				
				$pro_para = "i_PRODUCT_PARAMETER_".$j;
				$stmt->bindParam($para,$input->$pro_para);
				$para = $para+1;
				$pro_thres = "i_THRESHOLD_".$j;
				$stmt->bindParam($para,$input->$pro_thres);
				$para = $para+1;
				$pro_target = "i_TARGET_WO_".$j;
				$stmt->bindParam($para,$input->$pro_target);
				$para = $para+1;
				$pro_criticality = "i_CRITICALITY_".$j;
				$stmt->bindParam($para,$input->$pro_criticality);
				$para = $para+1;
				$pro_type = "i_TYPE_".$j;
				$stmt->bindParam($para,$input->$pro_type);
				$para = $para+1;
			}
			//print_r($stmt);
			//exit;
			$stmt->execute();
			$response_array['status'] = 'success';
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getWorkorderlibrary(){
		$sql = "SELECT * FROM PRIN_WORKORDER ORDER BY WORK_ORDER_ID DESC";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getWorkorderlibrarybyId($Id){
		$sql = "SELECT * FROM PRIN_WORKORDER WHERE WORK_ORDER_ID=".$Id;
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getWorkorderProductReferencebyId($Id){
		$sql = "SELECT * FROM PRIN_WO_PR_REFERNECE WHERE WORK_ORDER_ID=".$Id." ORDER BY WO_PR_ID";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getOperators(){
		$sql = "SELECT * FROM PRIN_OPERATORS";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function workorderDelete($workorder_id)
    {
		$tables = array("PRIN_WORKORDER","PRIN_WO_PR_REFERNECE","PRIN_WO_PRODUCT_PROFILE");
		$db = getDB();
		try{
			foreach($tables as $table) {
				$deleteSql = "DELETE FROM $table WHERE WORK_ORDER_ID='$workorder_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			}
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public static function createSample()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$quotes = InventoryController::proc_qoutes($input);
		$sql = "CALL PRIN_WO_SAMPLE_PROC(".$quotes.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		$i=1;
		try{
			foreach($input as $key => $value){
				//echo $i ."," .$key."<br>";
				
				$stmt->bindParam($i,$input->$key);
				
				$i++;
				
			}
			
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
    
    
    public static function getWorkorderSamplesById($Id){
		$sql = "SELECT * FROM PRIN_WO_SAMPLES WHERE WORK_ORDER_ID=".$Id." ORDER BY SAMPLE_ID";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
    public static function getWorkorderParameterSamplesById($Id){
		$sql = "SELECT * FROM PRIN_WO_SAMPLE_PARAMTERS WHERE SAMPLE_ID=".$Id."";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
   public function getSampleDataById($Id){
		$sql = "SELECT * FROM PRIN_WO_SAMPLES WHERE SAMPLE_ID=".$Id." ORDER BY SAMPLE_ID";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function woSampleDelete($sample_id)
    {
		$tables = array("PRIN_WO_SAMPLES","PRIN_WO_SAMPLE_PARAMTERS");
		$db = getDB();
		try{
			foreach($tables as $table) {
				$deleteSql = "DELETE FROM $table WHERE SAMPLE_ID='$sample_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			}
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
	
}