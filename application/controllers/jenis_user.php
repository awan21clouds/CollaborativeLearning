<?php

class jenis_user extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        $this->load->view("beranda");
    }

    public function getJSON() {
        if ($query = $this->model_jenis_user->view()) {
            header("content-type: application/json");
            echo json_encode($query);
            exit;
        }
    }

}

?>