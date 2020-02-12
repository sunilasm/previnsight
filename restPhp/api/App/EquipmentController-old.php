<?php
namespace App;
use PDO;
class EquipmentController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
    public function sensor()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "CALL PRIN_SENSOR_PROC(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_sensor_code);
			$stmt->bindParam(2,$input->i_sensor_name);
			$stmt->bindParam(3,$input->i_manufacturer_id);
			$stmt->bindParam(4,$input->i_model_id);
			$stmt->bindParam(5,$input->i_upc);
			$stmt->bindParam(6,$input->i_city);
			$stmt->bindParam(7,$input->i_addr1);	
			$stmt->bindParam(8,$input->i_addr2);
			$stmt->bindParam(9,$input->i_addr3);
			$stmt->bindParam(10,$input->i_addr4);
			$stmt->bindParam(11,$input->i_machinary_id);
            $stmt->bindParam(12,$input->i_parameter_id);
			$stmt->bindParam(13,$input->i_parameter_name);
			$stmt->bindParam(14,$input->i_value_range);
			$stmt->bindParam(15,$input->i_value);
			$stmt->bindParam(16,$input->i_value_measure);
			$stmt->bindParam(17,$input->i_description);
			$stmt->bindParam(18,$input->i_last_updated_by);
			$stmt->bindParam(19,$input->i_last_updated_date);
			$stmt->bindParam(20,$input->i_sensor_unique_id);
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function machinery()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "CALL PRIN_MACHINERY_PROC(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_machinery_code);
			$stmt->bindParam(2,$input->i_name);
			$stmt->bindParam(3,$input->i_city);
			$stmt->bindParam(4,$input->i_addr1);	
			$stmt->bindParam(5,$input->i_addr2);
			$stmt->bindParam(6,$input->i_addr3);
			$stmt->bindParam(7,$input->i_addr4);
			$stmt->bindParam(8,$input->i_sensor_code);
			$stmt->bindParam(9,$input->i_description);
			$stmt->bindParam(10,$input->i_last_updated_by);
			$stmt->bindParam(11,$input->i_last_updated_date);
			$stmt->bindParam(12,$input->i_last_cleaned);
			$stmt->bindParam(13,$input->i_last_calibrated);
			$stmt->bindParam(14,$input->i_image);
            $stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function parameter()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "CALL PRIN_PARAMETER_PROC(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_parameter_code);
			$stmt->bindParam(2,$input->i_Name);
			$stmt->bindParam(3,$input->i_Type);
			$stmt->bindParam(4,$input->i_SUB_TYPE);
			$stmt->bindParam(5,$input->i_UNIT);
			$stmt->bindParam(6,$input->i_MIN);
			$stmt->bindParam(7,$input->i_MAX);
			$stmt->bindParam(8,$input->i_TARGET);
			$stmt->bindParam(9,$input->i_DEFINITION_ATTRIBUTE1);
			$stmt->bindParam(10,$input->i_DEFINITION_ATTRIBUTE2);
			$stmt->bindParam(11,$input->i_DEFINITION_ATTRIBUTE3);
			$stmt->bindParam(12,$input->i_DEFINITION_ATTRIBUTE4);
			$stmt->bindParam(13,$input->i_DEFINITION_ATTRIBUTE5);
			$stmt->bindParam(14,$input->i_DEFINITION_ATTRIBUTE6);
			$stmt->bindParam(15,$input->i_DEFINITION_ATTRIBUTE7);
			$stmt->bindParam(16,$input->i_DEFINITION_ATTRIBUTE8);
			$stmt->bindParam(17,$input->i_DEFINITION_ATTRIBUTE9);
			$stmt->bindParam(18,$input->i_DEFINITION_ATTRIBUTE10);
			$stmt->bindParam(19,$input->i_DEFINITION_ATTRIBUTE11);
			$stmt->bindParam(20,$input->i_DEFINITION_ATTRIBUTE12);
			$stmt->bindParam(21,$input->i_DEFINITION_ATTRIBUTE13);
			$stmt->bindParam(22,$input->i_DEFINITION_ATTRIBUTE14);
			$stmt->bindParam(23,$input->i_DEFINITION_ATTRIBUTE15);
			$stmt->bindParam(24,$input->i_DEFINITION_ATTRIBUTE16);
			$stmt->bindParam(25,$input->i_DEFINITION_ATTRIBUTE17);
			$stmt->bindParam(26,$input->i_DEFINITION_ATTRIBUTE18);
			$stmt->bindParam(27,$input->i_DEFINITION_ATTRIBUTE19);
			$stmt->bindParam(28,$input->i_DEFINITION_ATTRIBUTE20);
			$stmt->bindParam(29,$input->i_LAST_UPDATED_BY);
			$stmt->bindParam(30,$input->i_LAST_UPDATED_DATE);
			$stmt->bindParam(31,$input->i_SENSOR_CODE);
			$stmt->bindParam(32,$input->i_THRESHOLD);
			$stmt->bindParam(33,$input->i_DESCRIPTION);
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function listSensors(){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT sensor_name FROM PRIN_SENSOR";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			//echo json_encode($data);
					
			/*$implode = array();
			$multiple = json_decode($json, true);*/
			foreach($data as $single)
			$implode[] = '"'.implode(', ', $single).'"';

			echo implode(', ', $implode);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function listManufacturer(){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT Manufacturer_id,Manufacturer_Code from PRIN_MANUFACTURER";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function listModel($manfc_id){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT 	Model_id,Model_Number from PRIN_MODEL WHERE Manufacturer_id=" . $manfc_id;
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function listMachinery(){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT machinery_id,MACHINERY_CODE from PRIN_MACHINERY";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function listParameter(){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT Parameter_ID,Parameter_code,PARAMETER_NAME from PRIN_PARAMETER";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function getSensercode(){
		$sql = "SELECT Sensor_id FROM PRIN_SENSOR ORDER BY Sensor_id DESC LIMIT 0 , 1";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if(empty($data)) {
				echo '[{"Sensor_id":"001"}]';
				exit;
			}
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getParametercode(){
		$sql = "SELECT PARAMETER_ID FROM PRIN_PARAMETER ORDER BY PARAMETER_ID DESC LIMIT 0 , 1";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function checkParameternameexits($name){
		$sql = "SELECT count(*) FROM PRIN_PARAMETER WHERE PARAMETER_NAME= '".$name."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getTargetValue($param_id){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT TARGET,UNIT,TYPE,SUB_TYPE,attribute_value1,attribute_value2,attribute_value3,attribute_value4,attribute_value5,attribute_value6,attribute_value7,attribute_value8,attribute_value9,attribute_value10,attribute_value11,attribute_value12 from PRIN_PARAMETER WHERE PARAMETER_ID=" . $param_id;
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetch(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getSenserlibrary(){
		$sql = "SELECT a.sensor_id,a.sensor_code,a.sensor_name,a.last_updated_date,b.city,g.site_name,f.model_number,e.manufacturer_code,UPC,parameter_name, value, value_measure,d.machinery_code,c.wo_number from PRIN_LOCATION b,PRIN_MACHINERY d,PRIN_MANUFACTURER e,PRIN_MODEL f,PRIN_SITE g,PRIN_SENSOR a LEFT OUTER JOIN PRIN_WORKORDER c ON a.work_order_id=c.work_order_id WHERE a.location_id=b.location_id AND a.machinery_id=d.machinery_id AND a.manufacturer_id=e.manufacturer_id AND a.model_id=f.model_id AND a.site_id=g.site_id";
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

	public function getSenserlibrarybyId($Id){
		$sql = "select a.sensor_code,a.sensor_name,a.sensor_unique_id,a.last_updated_date,b.city,g.site_name,f.model_id,f.model_number,e.manufacturer_id,e.manufacturer_code,d.machinery_id,UPC,a.parameter_name,a.parameter_id,a.value,a.description,
p.SUB_TYPE,p.attribute_value1,p.attribute_value2,p.attribute_value3,
p.attribute_value4,p.attribute_value5,p.attribute_value6,
p.attribute_value7,p.attribute_value8,p.attribute_value9,
p.attribute_value10,p.attribute_value12,p.attribute_value12,
value, value_measure,d.machinery_code,c.wo_number
from PRIN_LOCATION b,PRIN_MACHINERY d,PRIN_MANUFACTURER e,PRIN_MODEL f,
PRIN_PARAMETER p,PRIN_SITE g,PRIN_SENSOR a
LEFT OUTER JOIN PRIN_WORKORDER c ON a.work_order_id=c.work_order_id
WHERE a.location_id=b.location_id
AND a.machinery_id=d.machinery_id
AND a.manufacturer_id=e.manufacturer_id
AND a.model_id=f.model_id
AND a.site_id=g.site_id
AND a.parameter_id = p.parameter_id AND a.SENSOR_ID=".$Id;
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
	public function getParameterlibrary(){
	
		$sql = "SELECT a.parameter_id,a.parameter_code,a.parameter_name,a.threshold,a.sensor_id,a.sensor_code FROM PRIN_PARAMETER a";
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
	public function getMachinerylibrary(){
	
		$sql = "SELECT MACHINERY_ID,name,location_id,site_id,sensor_id,last_cleaned,last_calibrated,last_work_order FROM PRIN_MACHINERY";
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
	public function getMachinerylibrarybyId($id){
	
		$sql = "SELECT MACHINERY_ID,MACHINERY_CODE,name,location_id,site_id,sensor_id,SENSOR_CODE,last_cleaned,last_calibrated,last_work_order,description FROM PRIN_MACHINERY WHERE MACHINERY_ID=".$id;
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
	public function getParameterlibrarybyId($id){
	
		$sql = "SELECT parameter_id,parameter_code,parameter_name,type,sub_type,description,target,threshold,sensor_id,sensor_code,machinery_id FROM PRIN_PARAMETER WHERE parameter_id=".$id;
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
	public function getLocations(){
	
		$sql = "SELECT location_id,address_line1,address_line2,address_line3,address_line4,city,state,country FROM PRIN_LOCATION";
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
}