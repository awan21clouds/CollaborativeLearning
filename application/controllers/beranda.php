<?php

class Beranda extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
//            redirect('login');
            $this->load->view("login");
        } else {
            $user = $this->session->userdata('user');
            switch ($user->id_jenis_user) {
                case 00000 : $this->load->view("user-admin", $user);
                    break;
                case 11333 :
                    redirect(base_url() . "anouncement");
//                    $this->load->view("beranda-dosen", $user);
                    break;
                case 22555 : //$this->load->view("grup", $user);
//                    redirect(base_url()."grup");
                    $id_user = $user->id_user;
                    $query = $this->model_anggota->viewByIdUser($id_user);
                    redirect("../grup/index?id_grup=" . $query[0]->id_grup);
                    break;
                default : echo "User Unrecognized";
                    break;
            }
        }
    }

    public function login() {
        $msg = '0';
        $username = $this->input->post('username');
        $password = md5($this->input->post('password'));
//        $query = $this->model_user->login($username, $password);
        if ($this->model_user->login($username, $password)->num_rows() > 0) {
            $this->session->set_userdata('user', $this->model_user->login($username, $password)->result()[0]);
            $msg = '1';
        } else if ($this->model_user->login_admin($username, $password)->num_rows() > 0) {
            $this->session->set_userdata('user', $this->model_user->login_admin($username, $password)->result()[0]);
            $msg = '1';
        }
        header("content-type: application/json");
        echo json_encode($msg);
    }

    public function test() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        echo $id_user;
    }

    public function logout() {
        $this->session->unset_userdata('user');
        $this->session->sess_destroy();        
        redirect(base_url());
//        redirect('login');
    }

    public function sendEmail($email, $newPassword) {

        $this->load->library('email');
        $config['protocol'] = "smtp";
        $config['smtp_host'] = "ssl://smtp.gmail.com";
        $config['smtp_port'] = "465";
        $config['smtp_user'] = "telucollaborativelearning@gmail.com";
        $config['smtp_pass'] = "telucollaborativelearning1";
        $config['charset'] = "utf-8";
        $config['mailtype'] = "html";
        $config['newline'] = "\r\n";

        $this->email->initialize($config);
        $this->email->from('telucollaborativelearning@gmail.com', 'telucollaborativelearning');
        $this->email->to($email);

        $this->email->subject('Forgot Password');
        $this->email->message($newPassword);
        $this->email->send();

//        echo $this->email->print_debugger();
    }

    public function generatePassword() {
        $length = 10;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function forgotPassword() {
        $email = $this->input->post('email');
        if ($query = $this->model_user->viewByEmail($email)) {
            $newPassword = $this->generatePassword();
            $user_data = "NIM = " . $query[0]->id_user . "<br/>" . "Nama = " . $query[0]->nama . "<br />Password = " . $newPassword;
            $this->model_user->updatePassword(md5($newPassword), $query[0]->id_user);
            $this->sendEmail($email, $user_data);
        }
    }

    public function resetPassword() {
        $username = $this->input->post('username');
        $old_password = md5($this->input->post('old_password'));
        $new_password = md5($this->input->post('new_password'));
        if ($this->model_user->login($username, $old_password)->num_rows() > 0) {
            $this->model_user->updatePassword($new_password, $username);
            echo 'Reset password success!';
        } else {
            echo 'Reset password failed!';
        }
    }

}

?>