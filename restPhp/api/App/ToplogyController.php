<?php
namespace App;
use PDO;
class ToplogyController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
	public function setTopplogy(){	
		$request = \Slim\Slim::getInstance()->request();
		$data = $request->getBody();
		if(!empty($data)) {
			$jsonString = $request->getBody();
			 
			//$file = "./data/alerts.json";
			$file = "topplogy.json";
			$fileData = file_get_contents($file);
			if($fileData != "") {
				$fileData .= ",".$jsonString;
			}
			else {
				$fileData = $jsonString;
			}
			$dataAsJson = $fileData;
			file_put_contents($file, $dataAsJson);
			$this->setResponse($this->json(array("message"=>"Content written Sucessfully")), 200);
		}
	}
	public function getTopplogy(){	
		$request = \Slim\Slim::getInstance()->request();
		//$file = "./data/alerts.json";
		$file = "topplogy.json";
		$fileData = "[".file_get_contents($file)."]";
		$fileData = json_decode($fileData);
		$this->setResponse($this->json(array("message"=>"Read Sucessfully","data"=>$fileData)), 200);
		
	}
	/*
	 *	Encode array into JSON
	*/
	public function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
	public function setResponse($response)
    {
        echo $this->response = $response;
    }
	public function setRequest($request)
    {
        $this->request = $request;
    }
	
}