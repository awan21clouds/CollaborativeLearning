<?php

class Jenis_Anggota extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function getAvailable(){
        $id_grup = $this->input->get('id_grup');       
        $data = array('data' => array());
        if($this->model_jenis_anggota->viewAvailableByIdGrup($id_grup)){
            $second_sub_data = array();
            $query = $this->model_jenis_anggota->viewAvailableByIdGrup($id_grup);
            foreach($query as $r){
                array_push($second_sub_data, $r);
            }            
            $data = array('data' => $second_sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;        
    }

}

?>