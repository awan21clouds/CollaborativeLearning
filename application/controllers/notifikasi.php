<?php

class Notifikasi extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            $user = $this->session->userdata('user');
            $data = $this->createDataNotifikasi($user->id_user);
            $this->model_notifikasi->insertNotifikasi($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function signUpNotifikasiTarget() {
        try {
            $data = $this->createDataNotifikasiTarget();
            $this->model_notifikasi->insertNotifikasiTarget($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function createDataNotifikasi($id_user) {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
//            'id_post' => "001" . date("Ymd") . date("his") . "" . rand(10, 99),
            'id_notifikasi' => $this->input->post('id_notifikasi'),
            'id_user' => $id_user,
            'id_grup' => $this->input->post('id_grup'),
            'id_content_notification' => $this->input->post('id_content_notification'),
            'url' => $this->input->post('url'),
            'tanggal_notifikasi' => $this->input->post('tanggal_notifikasi')
        );
        return $data;
    }

    public function createDataNotifikasiTarget() {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
//            'id_post' => "001" . date("Ymd") . date("his") . "" . rand(10, 99),
            'id_notifikasi_target' => $this->input->post('id_notifikasi_target'),
            'id_notifikasi' => $this->input->post('id_notifikasi'),
            'id_user' => $this->input->post('id_user_target'),
            'status_baca' => 0
        );
        return $data;
    }

    public function getNotifikasi() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_notifikasi->viewById($id_user)) {
            $sub_data = array();
            foreach ($query as $r) {
                array_push($sub_data, $r);
            }
            $data = array(
                'data' => $sub_data,
                'alert' => $this->model_notifikasi->viewByCount($id_user)
            );
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    function updateNotifikasiTarget() {
        try {
            $id_notifikasi_target = $this->input->post('id_notifikasi_target');
            $this->model_notifikasi->updateNotifikasiTarget($id_notifikasi_target, '1');
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }
    
    function updateAllNotifikasiTarget() {
        try {
            $user = $this->session->userdata('user');
            $id_user = $user->id_user;            
            $this->model_notifikasi->updateAllNotifikasiTarget($id_user, '1');
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

}

?>