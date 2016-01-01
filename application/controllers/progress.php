<?php

class Progress extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
            redirect(base_url());
        } else {
            $user = $this->session->userdata('user');
            $data['id_grup'] = $this->input->get('id_grup');
            if ($this->input->get('id_grup')) {
                $data['id_grup'] = $this->input->get('id_grup');
            } else {
                $user = $this->session->userdata('user');
                $id_user = $user->id_user;
                $query = $this->model_anggota->viewByIdUser($id_user);
                $data['id_grup'] = $query[0]->id_grup;
            }
            switch ($user->id_jenis_user) {
                case 00000 : $this->load->view("user-admin", $user);
                    break;
                case 11333 :
                    $this->load->view("progress-dosen", $data);
//                    $this->load->view("beranda-dosen", $user);
                    break;
                case 22555 : //$this->load->view("grup", $user);
                    $this->load->view("progress", $data);
                    break;
                default : echo "User Unrecognized";
                    break;
            }
        }
    }

}

?>