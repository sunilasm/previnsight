<?php
namespace App;
use PDO;
class IndexController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	public function index()
    {
        echo "This is the home page";
    }

    public function hello($name)
    {
        echo "Hello, $name";
    }

    // Optional setters
    public function setApp($app)
    {
        $this->app = $app;
    }

    public function setRequest($request)
    {
        $this->request = $request;
    }

    public function setResponse($response)
    {
        $this->response = $response;
    }

    // Init
    public function init()
    {
        // do things now that app, request and response are set.
    }
}