<?php

class model_anggota_chat extends CI_Model {

    //insert anggota chat in model message.php
    public function view() {
        $this->db->select('*')
                ->from('anggota_chat');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdChat($id_chat) {
        $this->db->select('*')
                ->from('anggota_chat')
                ->where('id_chat', $id_chat);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByIdChatNotCurrentUser($id_chat, $id_user) {
        $query = $this->db->query('SELECT * FROM anggota_chat where id_chat="'.$id_chat.'" AND id_user!="'.$id_user.'"');
        return $query->result();
    }
    
    public function viewByIdUser($id_user) {
        $this->db->select('*')
                ->from('anggota_chat')
                ->where('id_user', $id_user);
        $query = $this->db->get();
        return $query->result();
    }

}

?>