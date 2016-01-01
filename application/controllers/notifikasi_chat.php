<?php

class Notifikasi_Chat extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {

            $data = $this->createNotifikasiChat();
            $this->model_notifikasi_chat->insertNotifikasi($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function createNotifikasiChat() {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
//            'id_post' => "001" . date("Ymd") . date("his") . "" . rand(10, 99),
            'id_notifikasi_chat' => $this->input->post('id_notifikasi_chat'),
            'id_content_chat' => $this->input->post('id_content_chat'),
            'id_anggota_chat' => $this->input->post('id_anggota_chat'),
            'status_baca' => $this->input->post('status_baca')
        );
        return $data;
    }

    public function updateStatus() {
        $id_chat = $this->input->get('id_chat');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
//        echo $id_chat;
        if ($query = $this->model_notifikasi_chat->getIdNotifikasiChat($id_user, $id_chat)) {
//            echo $query[0]->id_notifikasi_chat."\n";
            foreach ($query as $r) {
                $id_notifikasi_chat = $r->id_notifikasi_chat;
//                echo $id_notifikasi_chat."\n";
                $this->model_notifikasi_chat->updateStatus($id_notifikasi_chat, 1);
            }
        }
    }
    
    public function updateAllStatus() {        
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        if ($query = $this->model_notifikasi_chat->getIdNotifikasiChatByIdUser($id_user)) {
//            echo $query[0]->id_notifikasi_chat."\n";
            foreach ($query as $r) {
                $id_notifikasi_chat = $r->id_notifikasi_chat;
                $this->model_notifikasi_chat->updateStatus($id_notifikasi_chat, 1);
            }
        }
    }

}

?>