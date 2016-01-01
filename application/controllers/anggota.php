<?php

class Anggota extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            if ($this->input->post('anggota')) {
                foreach ($this->input->post('anggota') as $value) {
                    $id_anggota = $this->input->post('id_grup') . date("his") . rand(1000, 9999);
                    $data = $this->createDataAnggota($id_anggota, $value, "JA03");
                    $this->model_anggota->insert($data);
                }
            }
            if ($this->input->post('pembimbing_1')) {
                $id_anggota = $this->input->post('id_grup') . date("his") . rand(1000, 9999);
                $data = $this->createDataAnggota($id_anggota, $this->input->post('pembimbing_1'), "JA01");
                $this->model_anggota->insert($data);
            }
            if ($this->input->post('pembimbing_2')) {
                $id_anggota = $this->input->post('id_grup') . date("his") . rand(1000, 9999);
                $data = $this->createDataAnggota($id_anggota, $this->input->post('pembimbing_2'), "JA02");
                $this->model_anggota->insert($data);
            }
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function signUpMember() {
        try {
            if ($this->input->post('anggota')) {
                foreach ($this->input->post('anggota') as $value) {
                    $id_anggota = $this->input->post('id_grup') . date("his") . rand(1000, 9999);
                    $data = $this->createDataAnggota($id_anggota, $value, "JA03");
                    $this->model_anggota->insert($data);
                }
            }
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function updateLecturer() {
        try {
            $id_anggota = $this->input->post('id_grup') . date("his") . rand(1000, 9999);
            $data = $this->createDataAnggota($id_anggota, $this->input->post('id_user'), $this->input->post('id_jenis_anggota'));
            $this->model_anggota->insert($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function deleteAnggota() {
        $id_anggota = $this->input->post('id_anggota');
        $this->model_anggota->deleteAnggota($id_anggota);
        echo "Delete Data Success";
    }

    public function createDataAnggota($id_anggota, $id_user, $id_jenis_anggota) {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
            'id_anggota' => $id_anggota,
            'id_grup' => $this->input->post('id_grup'),
            'id_user' => $id_user,
            'id_jenis_anggota' => $id_jenis_anggota,
            'tanggal_gabung' => date("Y/m/d"),
            'status' => 0
        );
        return $data;
    }

    public function deleteByIdGroup() {
        $id_grup = $this->input->post('id_grup');
        $this->model_anggota->deleteByIdGroup($id_grup);
        echo "Delete Data Success";
    }

    public function getAvailableLecturer() {
        $id_grup = $this->input->get('id_grup');
        $data = array('data' => array());
        if ($this->model_anggota->viewLecturerByIdGrup($id_grup)) {
            $second_sub_data = array();
            $query = $this->model_anggota->viewLecturerByIdGrup($id_grup);
            foreach ($query as $r) {
                array_push($second_sub_data, $r);
            }
            $data = array('data' => $second_sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getCurrentGroup() {
//        $user = $this->session->userdata('user');
//        $id_user = $user->id_user;
        $id_grup = $this->input->get('id_grup');
        $data = array('data' => array());
        if ($sub_query = $this->model_anggota->viewByIdGrup($id_grup)) {
            $second_sub_data = array();
            foreach ($sub_query as $r) {
                array_push($second_sub_data, $r);
                $data = array(
                    'data' => $second_sub_data,
                    'jumlah_anggota' => $sub_query[0]->jumlah_anggota,
                    'foto_grup' => $sub_query[0]->foto_grup,
                    'tanggal_buat' => $sub_query[0]->tanggal_buat,
                    'nama_grup' => $sub_query[0]->nama_grup,
                    'id_grup' => $sub_query[0]->id_grup
                );
            }
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getGroupByCurrentSession() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota->viewByIdUser($id_user)) {
            $sub_data = array();
            foreach ($query as $r) {
                $third_sub_data = array();
                if ($sub_query = $this->model_anggota->viewByIdGrup($r->id_grup)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($third_sub_data, $sub_r);
                    }
                }
                $second_sub_data = array(
                    'id_grup' => $r->id_grup,
                    'jumlah_anggota' => $r->jumlah_anggota,
                    'anggota' => $third_sub_data
                );

                array_push($sub_data, $second_sub_data);
            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getMember() {
        $data = array('data' => array());
        $id_grup = $this->input->get('id_grup');
        $id_jenis_user = $this->input->get('id_jenis_user');
        if ($this->model_anggota->viewMemberByIdGrup($id_grup, $id_jenis_user)) {
            $sub_data = array();
            $query = $this->model_anggota->viewMemberByIdGrup($id_grup, $id_jenis_user);
            foreach ($query as $r) {
                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getSelectedUser() {
        $id_grup = $this->input->get('id_grup');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
//        echo $id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota->getAnggotaByIdGrupUser2($id_grup, $id_user)) {
//            echo $query[0]->id_anggota;
            $data = array('data' => $query[0]);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getAnggotaTarget() {
        $id_grup = $this->input->post('id_grup');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
//        echo $id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota->viewByIdGrupNotif($id_grup, $id_user)) {
            $sub_data = array();
            foreach ($query as $r) {
                array_push($sub_data, $r);
            }
//            echo $query[0]->id_anggota;
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getAnggotaTargetAdmin() {
        $id_grup = $this->input->post('id_grup');
        $id_user = $this->input->post('id_user');        
        echo $id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota->viewByIdGrupNotif($id_grup, $id_user)) {
            $sub_data = array();
            foreach ($query as $r) {
                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    function updateStatus() {
        try {
            $id_notifikasi_target = $this->input->post('id_anggota');
            $this->model_anggota->updateStatus($id_notifikasi_target, '1');
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    function updateAllStatus() {
        try {
            $user = $this->session->userdata('user');
            $id_user = $user->id_user;
            $this->model_anggota->updateAllStatus($id_user, '1');
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

}

?>