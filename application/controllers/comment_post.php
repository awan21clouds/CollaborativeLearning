<?php

class Comment_Post extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            $user = $this->session->userdata('user');
            $id_user = $user->id_user;
            if ($query = $this->model_anggota->viewByIdUser($id_user)) {
                $id_anggota = $query[0]->id_anggota;
                $data = $this->createDataCommentPost($id_anggota);
                $this->model_comment_post->insert($data);
                $this->fileUpload($this->input->post('id_comment_post'));
                echo "Input Data Success";
            }
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

//
    public function createDataCommentPost($id_anggota) {
        $data = array(
            'id_comment_post' => $this->input->post('id_comment_post'),
            'id_post' => $this->input->post('id_post'),
            'id_anggota' => $id_anggota,
            'isi_comment' => $this->input->post('isi_comment'),
            'tanggal_comment' => $this->input->post('tanggal_comment')
        );
        return $data;
    }

    public function delete() {
        $id_comment_post = $this->input->post('id_comment_post');
        $this->model_comment_post->delete($id_comment_post);
        echo "Delete Data Success";
    }

    public function update() {
        $id_comment_post = $this->input->post('id_comment_post');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        if ($query = $this->model_anggota->viewByIdUser($id_user)) {
            $id_anggota = $query[0]->id_anggota;
            $data = $this->createDataCommentPost($id_anggota);
            $this->model_comment_post->update($id_comment_post, $data);
            echo "Update Data Success";
        }
    }
    
    public function fileUpload($file_name) {
        $config['upload_path'] = 'assets/images/';
        $config['allowed_types'] = 'gif|jpg|jpeg|png|iso|dmg|zip|rar|doc|docx|xls|xlsx|ppt|pptx|csv|ods|odt|odp|pdf|rtf|sxc|sxi|txt|exe|avi|mpeg|mp3|mp4|3gp';
        $config['overwrite'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $this->upload->set_allowed_types('*');
        $src = null;
        if ($this->upload->do_upload('src_file')) {
            $file_data = $this->upload->data();
            $src = 'assets/images/' . $file_data['file_name'];//           
            $this->model_comment_post->updatePhotoProfil($file_name, $src);
        }
    }

//    
//    public function getJSON() {
//        $data = array('data' => array());
//        if ($query = $this->model_grup->queryView()) {            
//            $sub_data = array();
//            foreach ($query as $r) {                
//                $second_sub_data = array();
//                if ($sub_query = $this->model_anggota->viewByIdGrup($r->id_grup)) {
//                    foreach ($sub_query as $sub_r) {                        
//                        array_push($second_sub_data, $sub_r);
//                    }
//                }
//                $r->anggota = $second_sub_data;                
//                array_push($sub_data, $r);
//            }
//            $data = array('data' => $sub_data);
//        }
//        header("content-type: application/json");
//        echo json_encode($data);
//        exit;
//    }
//
//    public function getGroup() {
//        $id_grup = $this->input->get('id_grup');
//        if ($query = $this->model_grup->viewById($id_grup)) {
//            $second_sub_data = array();
//            if ($sub_query = $this->model_anggota->viewByIdGrup($query[0]->id_grup)) {
//                foreach ($sub_query as $sub_r) {
//                    array_push($second_sub_data, $sub_r);
//                }
//            }
//            $query[0]->anggota = $second_sub_data;
//
//            header("content-type: application/json");
//            echo json_encode($query[0]);
//            exit;
//        }
//
//    }
//    
//    public function getGroupByCurrentSession() {
//        $user = $this->session->userdata('user');
//        $id_user = $user->id_user;
//        $data = array('data' => array());
//        if ($query = $this->model_anggota->viewByIdUser($id_user)) {
//            $sub_data = array();
//            foreach ($query as $r) {
//                $third_sub_data = array();
//                if ($sub_query = $this->model_anggota->viewByIdGrup($r->id_grup)) {
//                    foreach ($sub_query as $sub_r) {
//                        array_push($third_sub_data, $sub_r);
//                    }
//                }
//                $second_sub_data = array(
//                    'id_grup' => $r->id_grup,
//                    'jumlah_anggota' => $r->jumlah_anggota,
//                    'anggota' => $third_sub_data
//                );
//
//                array_push($sub_data, $second_sub_data);
//            }
//            $data = array('data' => $sub_data);
//        }
//        header("content-type: application/json");
//        echo json_encode($data);
//        exit;
//    }
}

?>