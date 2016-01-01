<?php
	class Prodi extends CI_Controller{
		public function __contruct(){
			parent::__contruct();
		}
		
		public function index(){						
			$this->load->view("beranda");
		}
		
		public function getJSON(){
			if($query = $this->model_prodi->view()){
				header("content-type: application/json"); 
				echo json_encode($query);
				exit;
			}
		}
	}
?>