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
		$sql = "CALL PRIN_SENSOR_PROC(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_sensor_code);
			$stmt->bindParam(2,$input->i_sensor_name);
			$stmt->bindParam(3,$input->i_manufacturer_id);
			$stmt->bindParam(4,$input->i_model_id);
			$stmt->bindParam(5,$input->i_upc);
			$stmt->bindParam(6,$input->i_country);
			$stmt->bindParam(7,$input->i_city);
			$stmt->bindParam(8,$input->i_addr1);	
			$stmt->bindParam(9,$input->i_addr2);
			$stmt->bindParam(10,$input->i_addr3);
			$stmt->bindParam(11,$input->i_addr4);
			$stmt->bindParam(12,$input->i_machinary_id);
            $stmt->bindParam(13,$input->i_parameter_id);
			$stmt->bindParam(14,$input->i_parameter_name);
			$stmt->bindParam(15,$input->i_value_range);
			$stmt->bindParam(16,$input->i_value);
			$stmt->bindParam(17,$input->i_value_measure);
			$stmt->bindParam(18,$input->i_description);
			$stmt->bindParam(19,$input->i_last_updated_by);
			$stmt->bindParam(20,$input->i_last_updated_date);
			$stmt->bindParam(21,$input->i_sensor_unique_id);
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function sensorDelete($sensor_id)
    {
		$deleteSql = "DELETE FROM PRIN_SENSOR WHERE SENSOR_ID = ".$sensor_id;
		$db = getDB();
		$stmt = $db->prepare($deleteSql);
		try{
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function proc_qoutes($input) {
		$qts = "";
		foreach($input as $key) {
			$qts .= "?,";
		}
		return rtrim($qts,",");
	}
	public function machinery()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		//$input=$this->insert_after($input, 'i_country',1, 'i_name');
		/*$data = $input->i_image;
		$code = $input->i_machinery_code;
		$input->i_image = $this->storeImages('machinery',$data,$code);*/
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_MACHINERY_PROC(".$quotes.")";
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
	function insert_after($var, $key, $value, $after){
    $new_object = array();
    foreach((array) $var as $k => $v){
       $new_object[$k] = $v;
       if ($after == $k){
           $new_object[$key] = $value;
       }
    }
    $new_object = (object) $new_object;
    return $new_object;
	}
	public function machineryDelete($mech_id)
    {
		$deleteSql = "DELETE FROM PRIN_MACHINERY WHERE MACHINERY_ID = ".$mech_id;
		$db = getDB();
		$stmt = $db->prepare($deleteSql);
		try{
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
	public function parameterDelete($param_id)
    {
		$deleteSql = "DELETE FROM PRIN_PARAMETER WHERE PARAMETER_ID = ".$param_id;
		$db = getDB();
		$stmt = $db->prepare($deleteSql);
		try{
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
		$sql = "SELECT sensor_id, sensor_name FROM PRIN_SENSOR";
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
		$sql = "SELECT machinery_id,NAME AS MACHINERY_CODE from PRIN_MACHINERY";
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
		$attributes ="";
		for($i=1;$i<=20;$i++){
			$attributes .= ',ATTRIBUTE_VALUE'.$i;
		}
		$sql = "SELECT Parameter_ID,Parameter_code,PARAMETER_NAME,THRESHOLD,SUB_TYPE,UNIT,MIN,MAX,TARGET".$attributes.",CREATION_DATE,LAST_UPDATED_DATE from PRIN_PARAMETER";
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
	public function listMaterial(){
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT MATERIAL_ID,	MATERIAL_CODE,MATERIAL_NAME from PRIN_MATERIAL";
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
			if(empty($data)) {
				echo '[{"PARAMETER_ID":"001"}]';
				exit;
			}
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
		$sql = "SELECT a.sensor_id,a.sensor_code,a.sensor_name,a.last_updated_date,a.description,b.country,b.city,b.address_line1,b.address_line2,b.address_line3,b.address_line4,g.site_name,f.model_number,e.manufacturer_code,a.UPC,parameter_name,a.value, value_measure,ifnull(d.machinery_code,'Not Available') machinery_code,c.wo_number from 
PRIN_SENSOR a left outer join PRIN_MACHINERY d on a.machinery_id=d.machinery_id 
LEFT OUTER JOIN PRIN_WORKORDER c ON a.work_order_id=c.work_order_id
LEFT OUTER JOIn PRIN_LOCATION b on a.location_id=b.location_id 
LEFT OUTER JOIN PRIN_MANUFACTURER e on a.manufacturer_id=e.manufacturer_id 
LEFT OUTER JOIN PRIN_MODEL f on a.model_id=f.model_id 
LEFT OUTER JOIN PRIN_SITE g on a.site_id=g.site_id";
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
		$sql = "SELECT a.sensor_id,a.sensor_code,a.sensor_name,a.sensor_unique_id,a.last_updated_date,b.country,b.city,b.address_line1,b.address_line2,b.address_line3,b.address_line4,g.site_name,f.model_number,e.manufacturer_code,a.UPC,parameter_name,a.manufacturer_id,a.manufacturer_id,a.model_id,a.value, value_measure,ifnull(d.machinery_id,'Not Available') machinery_id,a.parameter_name,a.parameter_id,a.description,c.wo_number from 
PRIN_SENSOR a left outer join PRIN_MACHINERY d on a.machinery_id=d.machinery_id 
LEFT OUTER JOIN PRIN_WORKORDER c ON a.work_order_id=c.work_order_id
LEFT OUTER JOIn PRIN_LOCATION b on a.location_id=b.location_id 
LEFT OUTER JOIN PRIN_MANUFACTURER e on a.manufacturer_id=e.manufacturer_id 
LEFT OUTER JOIN PRIN_MODEL f on a.model_id=f.model_id 
LEFT OUTER JOIN PRIN_SITE g on a.site_id=g.site_id where a.sensor_id=".$Id;
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
	
		$sql = "SELECT A.PARAMETER_ID,A.PARAMETER_CODE AS parameter_code,A.PARAMETER_NAME as parameter_name,A.DESCRIPTION as description,A.THRESHOLD,GROUP_CONCAT(B.SENSOR_ID) AS sensor_id,GROUP_CONCAT(B.SENSOR_CODE) as sensor_code1,IFNULL(GROUP_CONCAT(B.SENSOR_NAME),'Not Available') as sensor_code FROM PRIN_PARAMETER A LEFT OUTER JOIN PRIN_SENSOR B ON A.PARAMETER_ID=B.PARAMETER_ID GROUP BY A.PARAMETER_ID";
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
		$sql = "SELECT a.MACHINERY_ID,a.name,a.location_id,a.site_id,b.country,b.city,a.sensor_code,a.last_cleaned,a.last_calibrated,a.last_work_order,a.image,a.description FROM PRIN_MACHINERY a INNER JOIN PRIN_LOCATION b on a.location_id=b.location_id";
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
		$sql = "SELECT a.MACHINERY_ID,a.MACHINERY_CODE,a.name,a.location_id,a.site_id,a.sensor_id,a.SENSOR_CODE as SENSOR_CODE,a.SENSOR_CODE as sensor_name,a.last_cleaned,a.last_calibrated,a.last_work_order,a.description,a.image,b.country,b.city,b.address_line1,b.address_line2,b.address_line3,b.address_line4 FROM PRIN_MACHINERY a INNER JOIN PRIN_LOCATION b on a.location_id=b.location_id AND MACHINERY_ID=".$id;
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
		$sql = "SELECT parameter_id,parameter_code,parameter_name,type,sub_type,description,target,threshold,sensor_id,sensor_code,machinery_id, unit, max,min, target, attribute_value1, attribute_value2, attribute_value3, attribute_value4, attribute_value5, attribute_value6, attribute_value7, attribute_value8, attribute_value9, attribute_value10, attribute_value11, attribute_value12, attribute_value13, attribute_value14, attribute_value15, attribute_value16, attribute_value17, attribute_value18, attribute_value19, attribute_value20 FROM PRIN_PARAMETER WHERE parameter_id=".$id;
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
	public function storeImages($equipement_name,$imageData,$code){
		list($type, $imageData) = explode(';', $imageData);
		list(,$extension) = explode('/',$type);
		list(,$imageData)      = explode(',', $imageData);
		$iData = base64_decode($imageData);
		$fileName = './../../Previn_images/'.$equipement_name.'/'.$code.'.'.$extension;
		file_put_contents($fileName, $iData);
		return 'Previn_images/'.$equipement_name.'/'.$code.'.'.$extension;
	}
    public function checkSensornameexits($name){
		$sql = "SELECT count(*) FROM PRIN_SENSOR WHERE SENSOR_NAME= '".base64_decode($name)."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			//print_r($data);
			echo $data;
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    public function checkMachinerynameexits($name){
		$sql = "SELECT count(*) FROM PRIN_MACHINERY WHERE NAME= '".base64_decode($name)."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			//print_r($data);
			echo $data;
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    public function checkParameternameexits($name){
		$sql = "SELECT count(*) FROM PRIN_PARAMETER WHERE PARAMETER_NAME= '".base64_decode($name)."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			//print_r($data);
			echo $data;
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}