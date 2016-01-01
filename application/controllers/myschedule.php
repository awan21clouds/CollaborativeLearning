<?php

class MySchedule extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
            redirect(base_url());
        } else {
            $this->load->view("myschedule");
        }
    }

}

?>