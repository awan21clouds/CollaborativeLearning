<?php

class Users extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
            redirect(base_url());
        } else {
            $this->load->view("user-admin");
        }
    }

    public function delete() {
        $id_user = $this->input->post('id_user');
        $this->model_user->delete($id_user);
        echo "Delete Data Success";
    }

    public function update() {
        $id_user = $this->input->post('id_user');
        $data = $this->createDataUser();
        $this->model_user->update($id_user, $data);
        $this->fileUpload($id_user);
        echo "Update Data Success";
    }

    public function signUp() {
        $id_user = $this->input->post('id_user');
        $data = $this->createDataUser();
        $this->model_user->insert($data);
        $this->fileUpload($id_user);
        echo "Input Data Success";
    }

    public function updatePhoto() {
        $id_user = $this->input->post('id_user');
        $this->fileUpload($id_user);

//        $user = $this->session->userdata('user');
//        $this->session->unset_userdata('user');
//        
//        $username = $user->username;
//        $password = $user->password;
//        if ($this->model_user->login($username, $password)->num_rows() > 0) {
//            $this->session->set_userdata('user', $this->model_user->login($username, $password)->result()[0]);
//        } else if ($this->model_user->login_admin($username, $password)->num_rows() > 0) {
//            $this->session->set_userdata('user', $this->model_user->login_admin($username, $password)->result()[0]);
//        }
        redirect("../setting");
    }

    public function getPhoto() {
        $id_user = $this->session->userdata('user')->id_user;
        $photo = '/CollaborativeLearning/assets/images/default.png';

        try {
            if ($query = $this->model_user->viewById($id_user)) {
                $photo = '/CollaborativeLearning/'.$query[0]->src_image;
            } 
        } catch (Exception $e) {
            $photo = '/CollaborativeLearning/assets/images/default.png';
        }
        header("content-type: application/json");
        echo json_encode($photo);
        exit;
    }

    public function createDataUser() {       
        $data = array(
            'id_user' => $this->input->post('id_user'),
            'username' => $this->input->post('id_user'),
            'password' => md5(str_replace("-", "", $this->input->post('tanggal_lahir'))),
            'nama' => $this->input->post('nama'),
            'tempat_lahir' => $this->input->post('tempat_lahir'),
            'tanggal_lahir' => $this->input->post('tanggal_lahir'),
            'telp' => $this->input->post('telp'),
            'email' => $this->input->post('email'),
            'id_prodi' => $this->input->post('id_prodi'),
            'id_jenis_user' => $this->input->post('id_jenis_user')
        );
        return $data;
    }

    public function fileUpload($file_name) {
        $config['upload_path'] = 'assets/images/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg|pdf|doc|xml|zip|rar';
//        $config['file_name'] = $user->id_user . '.jpg';
        $config['file_name'] = $file_name;
        $config['overwrite'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $this->upload->set_allowed_types('*');
        $src = null;
        if ($this->upload->do_upload('src_image')) {
            $file_data = $this->upload->data();
            $file_type = explode('.', $file_data['file_name']);
            $src = 'assets/images/' . $file_name . '.' . $file_type[1];
            $resize['image_library'] = 'gd2';
            $resize['source_image'] = $src;
            $resize['create_thumb'] = FALSE;
            $resize['maintain_ratio'] = FALSE;
            $resize['width'] = 160;
            $resize['height'] = 160;
            $resize['overwrite'] = TRUE;
            $this->load->library('image_lib', $resize);
            $this->image_lib->initialize($resize);
            $this->image_lib->resize();
            $this->model_user->updatePhotoProfil($file_name, $src);
        }
    }

    public function getJSON() {
        $data = array('data' => array());
        if ($query = $this->model_user->view()) {
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

    public function getUser() {
        $id_user = $this->input->get('id_user');
        if ($query = $this->model_user->viewByIdUnGroup($id_user)) {
            header("content-type: application/json");
            echo json_encode($query[0]);
            exit;
        }
    }

    public function getCurrentSession() {
        header("content-type: application/json");
        echo json_encode($this->session->userdata('user'));
        exit;
    }

    public function getUserByJenisUser() {
        $id_jenis_user = $this->input->get('id_jenis_user');
        if ($query = $this->model_user->viewByJenisUser($id_jenis_user)) {
            //$data = array("data");
            $sub_data = array();
            foreach ($query as $r) {

                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
            header("content-type: application/json");
            echo json_encode($data);
            exit;
        }
    }

    public function getFreeUserByJenisUser() {
        $id_jenis_user = $this->input->get('id_jenis_user');
        $data = array('data' => array());
        if ($query = $this->model_user->viewFreeUserByJenisUser($id_jenis_user)) {
            //$data = array("data");
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

    public function getFreeUserAndMemberByJenisUser() {
        $id_jenis_user = $this->input->get('id_jenis_user');
        $id_grup = $this->input->get('id_grup');
        if ($query = $this->model_user->viewFreeAndMemberUserByJenisUser($id_jenis_user, $id_grup)) {
            //$data = array("data");
            $sub_data = array();
            foreach ($query as $r) {

                array_push($sub_data, $r);
            }
            $data = array('data' => $sub_data);
            header("content-type: application/json");
            echo json_encode($data);
            exit;
        }
    }

}

?>