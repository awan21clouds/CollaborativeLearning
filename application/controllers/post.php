<?php

class Post extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            $id_anggota = null;
            if ($this->input->post('id_anggota')) {
                $id_anggota = $this->input->post('id_anggota');
            }else{
                $id_anggota = $this->session->userdata('user')->id_anggota;
            }            
            $data = $this->createDataPost($id_anggota);
            $this->model_post->insert($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function signUpAnouncement() {
        try {
            $id_anggota = $this->input->post('id_anggota');
            $data = $this->createDataPost($id_anggota);
            $this->model_post->insert($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function createDataPost($id_anggota) {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
//            'id_post' => "001" . date("Ymd") . date("his") . "" . rand(10, 99),
            'id_post' => $this->input->post('id_post'),
            'isi_post' => $this->input->post('isi_post'),
            'tanggal_post' => $this->input->post('tanggal_post'),
            'id_jenis_post' => $this->input->post('id_jenis_post'),
            'id_anggota' => $id_anggota
        );
        return $data;
    }

    public function delete() {
        $id_post = $this->input->post('id_post');
        $this->model_post->delete($id_post);
        echo "Delete Data Success";
    }

    public function update() {
        $id_post = $this->input->post('id_post');
        $user = $this->session->userdata('user');
        $data = $this->createDataPost($user->id_anggota);
        $this->model_post->update($id_post, $data);
        echo $this->input->post('isi_post');
    }

    public function getPost() {
        $id_grup = $this->input->get('id_grup');
        $this->getJSON('P1111', $id_grup);
    }

    public function getProgress() {
        $id_grup = $this->input->get('id_grup');
        $this->getJSON('P1112', $id_grup);
    }

    public function getJSON($id_jenis_post, $id_grup) {
        $data = array('data' => array());
        if ($query = $this->model_post->viewByIdGrup($id_grup, $id_jenis_post)) {
            $sub_data = array();
            foreach ($query as $r) {
                $id_post = $r->id_post;
                $second_sub_data = array();
                if ($sub_query = $this->model_comment_post->viewByIdPost($id_post)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($second_sub_data, $sub_r);
                    }
                }
                $r->comment_post = $second_sub_data;


                $third_sub_data = array();
                if ($sub_query = $this->model_post_file->viewByIdPost($id_post)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($third_sub_data, $sub_r);
                    }
                }
                $r->file_post = $third_sub_data;

                $fourth_sub_data = array();
                if ($sub_query = $this->model_anggota_post->getAnggotaByIdPost($id_post)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($fourth_sub_data, $sub_r);
                    }
                }
                $r->anggota_post = $fourth_sub_data;

                $fifth_sub_data = array();
                if ($sub_query = $this->model_anggota->viewMemberByIdGrup($id_grup, 'JA03')) {
                    foreach ($sub_query as $sub_r) {
                        array_push($fifth_sub_data, $sub_r);
                    }
                }
                $r->anggota = $fifth_sub_data;


                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function getGroup() {
        $id_grup = $this->input->get('id_grup');
        if ($query = $this->model_grup->viewById($id_grup)) {
            $second_sub_data = array();
            if ($sub_query = $this->model_anggota->viewByIdGrup($query[0]->id_grup)) {
                foreach ($sub_query as $sub_r) {
                    array_push($second_sub_data, $sub_r);
                }
            }
            $query[0]->anggota = $second_sub_data;

            header("content-type: application/json");
            echo json_encode($query[0]);
            exit;
        }
    }
  
}

?>