<?php

class Post_File extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            $this->fileUpload($this->input->post('id_post_file'));
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function createDataPostFile() {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
//            'id_post' => "001" . date("Ymd") . date("his") . "" . rand(10, 99),
            'id_post_file' => $this->input->post('id_post_file'),
            'id_post' => $this->input->post('id_post'),
            'tanggal_file' => date("Ymdhis")
        );
        return $data;
    }

    public function fileUpload($file_name) {
        $config['upload_path'] = 'assets/images/';
        $config['allowed_types'] = 'gif|jpg|jpeg|png|iso|dmg|zip|rar|doc|docx|xls|xlsx|ppt|pptx|csv|ods|odt|odp|pdf|rtf|sxc|sxi|txt|exe|avi|mpeg|mp3|mp4|3gp';
//        $config['file_name'] = $user->id_user . '.jpg';
//        $config['file_name'] = $file_name;
        $config['overwrite'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $this->upload->set_allowed_types('*');
        $src = null;
        if ($this->upload->do_upload('src_file')) {
            $file_data = $this->upload->data();
//            $file_type = explode('.', $file_data['file_name']);
//            $src = 'assets/images/' . $file_name . '.' . $file_type[1];
            $src = 'assets/images/' . $file_data['file_name'];
//            echo $file_data['file_size'];
//            $resize['image_library'] = 'gd2';
//            $resize['source_image'] = $src;
//            $resize['create_thumb'] = FALSE;
//            $resize['maintain_ratio'] = FALSE;
//            $resize['width'] = 1250;
//            $resize['height'] = 835;
//            $resize['overwrite'] = TRUE;
//            $this->load->library('image_lib', $resize);
//            $this->image_lib->initialize($resize);
//            $this->image_lib->resize();
            $data = $this->createDataPostFile();
            $this->model_post_file->insert($data);
            $this->model_post_file->updatePhotoProfil($file_name, $src);
        }
    }

    public function delete() {
        $id_post = $this->input->post('id_post');
        $this->model_post->delete($id_post);
        echo "Delete Data Success";
    }

    public function update() {
        $id_post = $this->input->post('id_post');
        $data = $this->createDataPost();
        $this->model_post->update($id_post, $data);
        echo $this->input->post('isi_post');
    }

//    public function getJSON() {
//        $user = $this->session->userdata('user');
//        $id_grup = $user->id_grup;
//        $data = array('data' => array());
//        if ($query = $this->model_post->viewByIdGrup($id_grup)) {
//            $sub_data = array();
//            foreach ($query as $r) {                
//                array_push($sub_data, $r);
//            }
//            $data = array('data' => $sub_data);
//        }
//        header("content-type: application/json");
//        echo json_encode($data);
//        exit;
//    }

    public function getJSON() {
        $user = $this->session->userdata('user');
        $id_grup = $user->id_grup;
        $data = array('data' => array());
        if ($query = $this->model_post->viewByIdGrup($id_grup)) {
            $sub_data = array();
            foreach ($query as $r) {
                $second_sub_data = array();
                if ($sub_query = $this->model_comment_post->viewByIdPost($r->id_post)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($second_sub_data, $sub_r);
                    }
                }
                $r->comment_post = $second_sub_data;
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

    public function getFiles() {
        $data = array('data' => array());
        $id_grup = $this->input->get('id_grup');
        if ($query = $this->model_post_file->viewByIdGrup($id_grup)) {
            $second_sub_data = array();
            foreach ($query as $r) {
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