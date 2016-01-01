<?php

class model_notifikasi_chat extends CI_Model {

    public function insertNotifikasi($data) {
        $this->db->insert('notifikasi_chat', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('post');
        $query = $this->db->get();
        return $query->result();
    }

    public function getIdNotifikasiChat($id_user, $id_chat){
        $this->db->select('*')
                ->from('chat ct')
                ->join('anggota_chat ac', 'ct.id_chat = ac.id_chat')                                              
                ->join('notifikasi_chat ncb', 'ncb.id_anggota_chat = ac.id_anggota_chat')                                
                ->join('content_chat ccb', 'ccb.id_content_chat = ncb.id_content_chat')                
                ->join('user u', 'u.id_user = ac.id_user')
                ->where('u.id_user', $id_user)                             
                ->where('ct.id_chat', $id_chat);                              
        $query = $this->db->get();
        return $query->result();
    }
    
    public function getIdNotifikasiChatByIdUser($id_user){
        $this->db->select('*')
                ->from('chat ct')
                ->join('anggota_chat ac', 'ct.id_chat = ac.id_chat')                                              
                ->join('notifikasi_chat ncb', 'ncb.id_anggota_chat = ac.id_anggota_chat')                                
                ->join('content_chat ccb', 'ccb.id_content_chat = ncb.id_content_chat')                
                ->join('user u', 'u.id_user = ac.id_user')
                ->where('u.id_user', $id_user);                                             
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewById($id_user) {
        $this->db->select('*, a.id_user as id_user_source, a.nama as nama_source')
                ->from('notifikasi')
                ->join('notifikasi_target', 'notifikasi.id_notifikasi = notifikasi_target.id_notifikasi')
                ->join('grup', 'notifikasi.id_grup = grup.id_grup')
                ->join('content_notification', 'notifikasi.id_content_notification = content_notification.id_content_notification')
                ->join('user a', 'notifikasi.id_user= a.id_user')
                ->join('user b', 'notifikasi_target.id_user= b.id_user')
                ->where('notifikasi_target.id_user', $id_user)
                ->order_by('notifikasi_target.status_baca', 'asc')
                ->order_by('notifikasi.tanggal_notifikasi', 'desc');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByCount($id_user) {
        $this->db->select('*')
                ->from('notifikasi_target')
                ->where('id_user', $id_user)
                ->where('status_baca', '0');
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function update($id, $data) {
        $this->db->where('id_post', $id);
        $this->db->update('post', $data);
    }

    public function delete($id) {
        $this->db->where('id_post', $id);
        $this->db->delete('post');
    }

    public function updateStatus($id_notifikasi_chat, $status_baca) {
        $this->db->set("status_baca", $status_baca)
                ->where('id_notifikasi_chat', $id_notifikasi_chat);
        $this->db->update('notifikasi_chat');
    }

}

?>