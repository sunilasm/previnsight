<?php
namespace App;
use PDO;
class RecipeController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
    public function AuRecipe()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		/*$imageData = $input->i_IMAGE;
		$code = $input->i_RECIPE_ID;
	    $checkImage = $this->checkBase64Images($imageData);
		echo $checkImage;
		$deleteImage = "";
		if($checkImage == false) {
		  $deleteImage = $imageData;
		}
		if(empty($input->i_RECIPE_ID)){
		$code = uniqid();
		}
	
		$input->i_IMAGE = $this->storeImages('recipe',$imageData,$code,$deleteImage);*/
		$qut="";
		for($i=0;$i<224;$i++){
			$qut .= "?,";
		}
		$quts=rtrim($qut,',');
		$sql = "CALL PRIN_RECIPE_PROC(".$quts.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_RECIPE_NAME);
			$stmt->bindParam(2,$input->i_RECIPE_TYPE);
			$stmt->bindParam(3,$input->i_ITEM_ID);
            $stmt->bindParam(4,$input->i_TARGET_MATERIAL);
			$stmt->bindParam(5,$input->i_RECIPE_ID);
			$stmt->bindParam(6,$input->i_EXPECTED_UOM);
			$stmt->bindParam(7,$input->i_EXPECTED_VALUE);
			$stmt->bindParam(8,$input->i_DESCRIPTION);
			$stmt->bindParam(9,$input->i_RECIPE_PROCESS);	
			$stmt->bindParam(10,$input->i_CREATED_BY);
			$stmt->bindParam(11,$input->i_CREATION_DATE);
			//$stmt->bindParam(11,$input->i_PARAMETER_TARGET);
			$stmt->bindParam(12,$input->i_LAST_UPDATED_DATE);
            $stmt->bindParam(13,$input->i_LAST_UPDATED_BY);
			$stmt->bindParam(14,$input->i_IMAGE);
			$para = 15;
			for($i=1;$i<=30;$i++){
				$recipe_param_id = "i_RECIPE_PARAM_ID_".$i;
				$parameter = "i_PRODUCT_PARAMETER_".$i;
				$thresh = "i_THRESHOLD_".$i;
				$target = "i_TARGET_".$i;
				$critical = "i_CRITICALITY_".$i;
				$uom = "i_UOM_".$i;
				$type = "i_TYPE_".$i;
				$stmt->bindParam($para,$input->$recipe_param_id);
				$para = $para+1;
				//echo $para.$parameter.'<br>';
				$stmt->bindParam($para,$input->$parameter);
				$para = $para+1;
				//echo $para.$thresh.'<br>';
				$stmt->bindParam($para,$input->$thresh);
				$para = $para+1;
				//echo $para.$target.'<br>';
				$stmt->bindParam($para,$input->$target);
				$para = $para+1;
				//echo $para.$critical.'<br>';
				$stmt->bindParam($para,$input->$critical);
				$para = $para+1;
				//echo $para.$uom.'<br>';
				$stmt->bindParam($para,$input->$uom);
				$para = $para+1;
				$stmt->bindParam($para,$input->$type);
				$para = $para+1;
			}
			
			$stmt->execute();
			$response_array['status'] = 'success';
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function recipeDelete($recipe_id)
    {
		$tables = array("PRIN_RECIPE","PRIN_PRODUCT_PROFILE");
		$db = getDB();
		try{
			foreach($tables as $table) {
				$deleteSql = "DELETE FROM $table WHERE RECIPE_ID='$recipe_id'";
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
	public function recipeProductDelete($product_id)
    {
		$deleteSql = "DELETE FROM PRIN_PRODUCT_PROFILE WHERE RECIPE_PARAM_ID = ".$product_id;
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
	public function AddRecipe()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO prin_recipe (RECIPE_NAME, RECIPE_TYPE, ITEM_ID, EXPECTED_UOM, EXPECTED_VALUE, RECIPE_PROCESS, CREATED_BY,CREATION_DATE,LAST_UPDATED_DATE,LAST_UPDATED_BY,IMAGE) VALUES (:recipe_name, :recipe_type, :item_id, :expected_uom, :expected_value, :recipe_process, :created_by,:creation_date,:last_updated_date,:last_updated_by,:image)";
		
    try {
      $db = getDB();
      $stmt1 = $db->prepare($insertSql);
      $stmt1->bindParam("recipe_name", $input->i_RECIPE_NAME);
      $stmt1->bindParam("recipe_type", $input->i_RECIPE_TYPE);
      $stmt1->bindParam("item_id", $input->i_ITEM_ID);
      $stmt1->bindParam("expected_uom", $input->i_EXPECTED_UOM);
      $stmt1->bindParam("expected_value", $input->i_EXPECTED_VALUE);
      $stmt1->bindParam("recipe_process", $input->i_RECIPE_PROCESS);
	  $stmt1->bindParam("created_by", $input->i_CREATED_BY);
      $stmt1->bindParam("creation_date", $input->i_CREATION_DATE);
	  $stmt1->bindParam("last_updated_date", $input->i_CREATION_DATE);
	  $stmt1->bindParam("last_updated_by", $input->i_LAST_UPDATED_DATE);
	  $stmt1->bindParam("image", $input->i_IMAGE);
	  $stmt1->execute();
      $recipeID = $db->lastInsertId();
	  for($i=1;$i<=30;$i++){
		$recipe_param_id = "i_RECIPE_PARAM_ID_".$i;
		$parameter = "i_PRODUCT_PARAMETER_".$i;
		$thresh = "i_THRESHOLD_".$i;
		$target = "i_TARGET_".$i;
		$critical = "i_CRITICALITY_".$i;
		$uom = "i_UOM_".$i;
		$type = "i_TYPE_".$i;
		$insertproductprofile = "INSERT INTO prin_recipe (RECIPE_PARAM_ID, PRODUCT_PARAMETER, THRESHOLD, TARGET, CRITICALITY, UOM, TYPE) VALUES (:recipe_param_id_".$i.", :product_parameter_".$i.", :threshold_".$i.", :target_".$i.", :criticality_".$i.", :uom_".$i.", :type_".$i.")";	
		$stmt = $db->prepare($insertproductprofile);
		$stmt1->bindParam("recipe_name", $input->i_RECIPE_NAME);
		  $stmt1->bindParam("recipe_type", $input->i_RECIPE_TYPE);
		  $stmt1->bindParam("item_id", $input->i_ITEM_ID);
		  $stmt1->bindParam("expected_uom", $input->i_EXPECTED_UOM);
		  $stmt1->bindParam("expected_value", $input->i_EXPECTED_VALUE);
		  $stmt1->bindParam("recipe_process", $input->i_RECIPE_PROCESS);
		  $stmt1->bindParam("created_by", $input->i_CREATED_BY);
		  $stmt1->bindParam("creation_date", $input->i_CREATION_DATE);
		  $stmt1->bindParam("last_updated_date", $input->i_CREATION_DATE);
		  $stmt1->bindParam("last_updated_by", $input->i_LAST_UPDATED_DATE);
		  $stmt1->bindParam("image", $input->i_IMAGE);
	}
	  $response_array['status'] = 'success';
	  echo $recipeID;
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
      die();
    }
   }
	public function getRecipelibrary(){
		$sql = "SELECT A.RECIPE_ID,A.RECIPE_CODE,A.RECIPE_NAME,A.RECIPE_TYPE,A.ITEM_ID,A.TARGET_MATERIAL,A.EXPECTED_UOM,A.EXPECTED_VALUE,A.DESCRIPTION,A.RECIPE_PROCESS,A.LAST_UPDATED_DATE,A.LAST_UPDATED_BY,A.IMAGE FROM PRIN_RECIPE A";
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
	public function getRecipelibrarybyId($Id){
		$sql = "SELECT A.RECIPE_ID,A.RECIPE_CODE,A.RECIPE_NAME,A.RECIPE_TYPE,A.ITEM_ID,A.TARGET_MATERIAL,A.EXPECTED_UOM,A.EXPECTED_VALUE,A.DESCRIPTION,A.RECIPE_PROCESS,A.LAST_UPDATED_DATE,A.LAST_UPDATED_BY,A.IMAGE FROM PRIN_RECIPE A WHERE A.RECIPE_ID=".$Id;
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
	public function getProductProfilebyId($Id){
		$sql = "SELECT * FROM PRIN_PRODUCT_PROFILE A WHERE A.RECIPE_ID=".$Id." ORDER BY RECIPE_PARAM_ID";
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
	
	public function storeImages($equipement_name,$imageData,$code,$deleteImage){
		if (!file_exists('../../../Previn_images/'.$equipement_name)) {
			@mkdir('./../../Previn_images/'.$equipement_name, 0777, true);
		}
		
		
		list($type, $imageData) = explode(';', $imageData);
		list(,$extension) = explode('/',$type);
		list(,$imageData)      = explode(',', $imageData);
		$iData = base64_decode($imageData);
		
		$fileName = './../../Previn_images/'.$equipement_name.'/'.$code.'.'.$extension;
		file_put_contents($fileName, $iData);
		if(!empty($deleteImage) && ($deleteImage != $equipement_name.'/'.$code.'.'.$extension)) {
			if(is_file('../../'.$deleteImage))
			@unlink('../../'.$deleteImage);
		}
		
		return 'Previn_images/'.$equipement_name.'/'.$code.'.'.$extension;
	}
	
	public function checkBase64Images($base64){
        $decoded = base64_decode($string, true);
        // Check if there is no invalid character in strin
        if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $string)) return false;

        // Decode the string in strict mode and send the responce
         if(!base64_decode($string, true)) return false;

        // Encode and compare it to origional one
        if(base64_encode($decoded) != $string) return false;

        return true;
    }
	public function check_base64_image($base64) {
		$img = imagecreatefromstring(base64_decode($base64));
		if (!$img) {
			return false;
		}

		imagepng($img, 'tmp.png');
		$info = getimagesize('tmp.png');

		unlink('tmp.png');

		if ($info[0] > 0 && $info[1] > 0 && $info['mime']) {
			return true;
		}

		return false;
	}
	/************************************************
		@Created by :- 5838
		@Comment	:- check recipe name exist or not 
		**********************************************/
	 public function checkRecipenameexits($name){
		$sql = "SELECT count(*) FROM PRIN_RECIPE WHERE RECIPE_NAME= '".base64_decode($name)."'";
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