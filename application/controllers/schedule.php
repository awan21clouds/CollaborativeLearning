<?php

class Schedule extends CI_Controller {

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
                    $this->load->view("schedule", $data);
//                    $this->load->view("beranda-dosen", $user);
                    break;
                case 22555 : //$this->load->view("grup", $user);
                    $this->load->view("schedule-student", $data);
                    break;
                default : echo "User Unrecognized";
                    break;
            }
        }
    }

    public function signUp() {
        $data = $this->createSchedule();
        $this->model_schedule->insert($data);
    }

    public function createSchedule() {
        $data = array(
            'id_schedule' => $this->input->post('id_schedule'),
            'id_anggota' => $this->input->post('id_anggota'),
            'judul' => $this->input->post('judul'),
            'deskripsi' => $this->input->post('deskripsi'),
            'tanggal_mulai' => $this->input->post('tanggal_mulai'),
            'tanggal_selesai' => $this->input->post('tanggal_selesai')
        );
        return $data;
    }

    public function delete() {
        $id_schedule = $this->input->post('id_schedule');
        $this->model_schedule->delete($id_schedule);
        echo "Delete Data Success";
    }

    public function update() {
        $id_schedule = $this->input->post('id_schedule');
        $data = $this->createSchedule();
        $this->model_schedule->update($id_schedule, $data);
        echo "Update Data Success";
    }

    public function getJSON() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdUser($id_user)) {
            $sub_data = array();
            foreach ($query as $r) {
                
                 $sub_r = array(
                    'id' => $r->id_schedule,
                    'title' => $r->judul,
                    'start' => $r->tanggal_mulai,
                    'end' => $r->tanggal_selesai
                );
                array_push($sub_data, $sub_r);
            }
            $data = $sub_data;
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getJSONGrup() {
        $id_grup = $this->input->get('id_grup');
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdGrup($id_grup)) {
            $sub_data = array();
            foreach ($query as $r) {
                $sub_r = array(
                    'id' => $r->id_schedule,
                    'title' => $r->judul,
                    'start' => $r->tanggal_mulai,
                    'end' => $r->tanggal_selesai
                );
                array_push($sub_data, $sub_r);
            }
            $data = $sub_data;
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getJSONDT() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdUser($id_user)) {
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

    public function getJSONDTIdGrup() {
        $id_grup = $this->input->get('id_grup');
        $start = $this->input->get('start');
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdGrupStart($id_grup, $start)) {
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

    public function getJSONUpdateGrup() {
        $id_schedule = $this->input->get('id_schedule');
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdSchedule($id_schedule)) {
            $data = array('data' => $query[0]);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getJSONDTStart() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $start = $this->input->get('start');
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdUserStart($id_user, $start)) {
            $sub_data = array();
            foreach ($query as $r) {

                $second_sub_data = array();
                if ($sub_query = $this->model_schedule->viewByTime($r->judul, $r->deskripsi, $r->tanggal_mulai, $r->tanggal_selesai)) {
                    foreach ($sub_query as $second_sub_r) {
                        array_push($second_sub_data, $second_sub_r);
                    }
                }

                $r->schedule = $second_sub_data;
                $r->nav = $r->judul.'+'.$r->tanggal_mulai;
                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getSelectedSchedule() {
        $start = new DateTime($this->input->get('tanggal_mulai'));
        $judul = $this->input->get('judul');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_schedule->viewByIdUserFullStart($id_user, $judul, $start->format('Y-m-d'))) {
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

}

?>