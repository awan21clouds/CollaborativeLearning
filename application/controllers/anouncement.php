<?php

class Anouncement extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        $this->load->library('session');
        if ($this->session->userdata('user')) {
            $this->load->view("anouncement");
        } else {
            redirect(base_url());            
        }
    }

}

?>