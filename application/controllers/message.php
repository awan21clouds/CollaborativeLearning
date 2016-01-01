<?php

class Message extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
            redirect(base_url());
        } else {
            $data['id_grup'] = $this->input->get('id_grup');
            if ($this->input->get('id_grup')) {
                $data['id_grup'] = $this->input->get('id_grup');
            } else {
                $user = $this->session->userdata('user');
                $id_user = $user->id_user;
                $query = $this->model_anggota->viewByIdUser($id_user);
                $data['id_grup'] = $query[0]->id_grup;
            }
            $this->load->view("message", $data);
        }
    }

    public function signUpChat() {
        try {
            $data = $this->createChat();
            $this->model_message->insertChat($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function signUpAnggotaChat() {
        try {
            $data = $this->createAnggotaChat();
            $this->model_message->insertAnggotaChat($data);
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function signUpContentChat() {
        try {
            $data = $this->createContentChat();
            $this->model_message->insertContentChat($data);
            if ($this->input->post('id_content_chat')) {
                echo $this->input->post('id_content_chat');
            }
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }

    public function createChat() {
        $data = array(
            'id_chat' => $this->input->post('id_chat'),
            'tanggal_mulai' => date("Ymd")
        );
        return $data;
    }

    public function createAnggotaChat() {
        $data = array(
            'id_anggota_chat' => $this->input->post('id_anggota_chat'),
            'id_user' => $this->input->post('id_user'),
            'id_chat' => $this->input->post('id_chat')
        );
        return $data;
    }

    public function createContentChat() {
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
            'id_content_chat' => $this->input->post('id_content_chat'),
            'isi_content_chat' => $this->input->post('isi_content_chat'),
            'tanggal_content_chat' => date("Y/m/d H:i:s"),
            'id_anggota_chat' => $this->input->post('id_anggota_chat')
        );
        return $data;
    }

    public function getAnggotaByCurrentSession() {
        $id_chat = $this->input->post('id_chat');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_message->viewByCurrentSession($id_user, $id_chat)) {
            $data = array('data' => $query[0]);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
//        echo $id_chat.' '.$id_grup.' '.$id_user;
    }

    public function getChat() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_message->viewChat($id_user)) {
            $first_sub = array();
            foreach ($query as $r) {
                $second_sub = array();
                if ($sub_query = $this->model_message->viewAnggotaChat($r->id_chat)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($second_sub, $sub_r);
                    }
                }
                $r->anggota_chat = $second_sub;
                array_push($first_sub, $r);
            }
            $data = array('data' => $first_sub);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
//        echo $id_chat.' '.$id_grup.' '.$id_user;
    }

    public function getNotifikasiChat() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array(
            'data' => array(),
            'alert' => 0
        );
        if ($query = $this->model_message->viewNotifikasiChat($id_user)) {
            $first_sub = array();
            $alert = 0;
            foreach ($query as $r) {
                $second_sub = array();
                if ($sub_query = $this->model_message->viewAnggotaChat($r->id_chat)) {
                    foreach ($sub_query as $sub_r) {
                        array_push($second_sub, $sub_r);
                    }
                }
                $r->anggota_chat = $second_sub;
                array_push($first_sub, $r);

                if ($r->status_baca == 0) {
                    $alert++;
                }
            }
            $data = array(
                'data' => $first_sub,
                'alert' => $alert
            );
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
//        echo $id_chat.' '.$id_grup.' '.$id_user;
    }

    public function getMessageChat() {
        $id_chat = $this->input->get('id_chat');
        $data = array('data' => array());
        if ($query = $this->model_message->viewMessageChat($id_chat)) {
            $first_sub = array();
            foreach ($query as $r) {
                array_push($first_sub, $r);
            }
            $data = array('data' => $first_sub);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
//        echo $id_chat.' '.$id_grup.' '.$id_user;
    }

    public function getCurrentAnggotaChat() {
        $id_chat = $this->input->post('id_chat');
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota_chat->viewByIdChatNotCurrentUser($id_chat, $id_user)) {
            $first_sub = array();
            foreach ($query as $r) {
                array_push($first_sub, $r);
            }
            $data = array('data' => $first_sub);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
//        echo $id_chat.' '.$id_grup.' '.$id_user;
    }

//    public function getAnggotaChat() {
//        $user = $this->session->userdata('user');
//        $id_user = $user->id_user;
//        $data = array('data' => array());
//        if ($query = $this->model_anggota->viewByIdUser($id_user)) {
//            $first_sub = array();
//            foreach ($query as $r) {
//                if ($sub_query = $this->model_anggota->viewMemberByIdGrupNotUser($r->id_grup)) {
//                    foreach ($sub_query as $sub_r) {
//                        if ($sub_r->id_user != $id_user) {
//                            if (sizeof($first_sub) == 0) {
//                                array_push($first_sub, $sub_r);
//                            } else {
//                                $test = false;
//                                foreach ($first_sub as $c) {
//                                    if ($c->id_user == $sub_r->id_user) {
//                                        $test = true;
//                                        break;
//                                    }
//                                }
//                                if ($test == false) {
//                                    array_push($first_sub, $sub_r);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//            $data = array('data' => $first_sub);
//        }
//        header("content-type: application/json");
//        echo json_encode($data);
//        exit;
//    }
    
    public function getAnggotaChat() {
        $user = $this->session->userdata('user');
        $id_user = $user->id_user;
        $data = array('data' => array());
        if ($query = $this->model_anggota->viewByIdUser($id_user)) {
            $first_sub = array();
            foreach ($query as $r) {
                if ($sub_query = $this->model_anggota->viewMemberByIdGrupNotUser()) {
                    foreach ($sub_query as $sub_r) {
                        if ($sub_r->id_user != $id_user) {
                            if (sizeof($first_sub) == 0) {
                                array_push($first_sub, $sub_r);
                            } else {
                                $test = false;
                                foreach ($first_sub as $c) {
                                    if ($c->id_user == $sub_r->id_user) {
                                        $test = true;
                                        break;
                                    }
                                }
                                if ($test == false) {
                                    array_push($first_sub, $sub_r);
                                }
                            }
                        }
                    }
                }
            }
            $data = array('data' => $first_sub);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }
    
}

?>