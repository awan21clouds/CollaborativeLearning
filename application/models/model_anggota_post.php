<?php

class model_anggota_post extends CI_Model {

    public function insert($data) {
        $this->db->insert('anggota_post', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('anggota');
        $query = $this->db->get();
        return $query->result();
    }

    public function getAnggotaGrup($id_user) {
        $this->db->select('*')
                ->from('anggota')
                ->where('id_user', $id_user);
        $query = $this->db->get();
        return $query->num_rows();
    }
    
    public function getAnggotaByIdPost($id_post) {
        $this->db->select('anggota_post.*, anggota_post.id_anggota as "id_member", anggota.*, user.*, post.*')
                ->from('anggota_post')
                ->join('anggota', 'anggota_post.id_anggota = anggota.id_anggota')
                ->join('user', 'user.id_user = anggota.id_user')
                ->join('post', 'post.id_post = anggota_post.id_post')
                ->where('anggota_post.id_post', $id_post);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function getAnggotaByIdGrup($id_grup) {
        $this->db->select('anggota_post.*, anggota.*, user.*,')
                ->from('anggota_post')
                ->join('anggota', 'anggota.id_anggota = anggota_post.id_anggota')
                ->join('user', 'user.id_user = anggota.id_user')                
                ->where('anggota.id_grup', $id_grup);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewLecturerByIdGrup($id) {
        $query = $this->db->query('SELECT * FROM user JOIN jenis_user ON user.id_jenis_user=jenis_user.id_jenis_user WHERE user.id_user NOT IN (SELECT id_user FROM anggota WHERE id_grup="'.$id.'") AND jenis_user.id_jenis_user="11333"');
        return $query->result();
    }   
    
    public function update($id, $data) {
        $this->db->where('id_anggota', $id);
        $this->db->update('anggota', $data);
    }
    
    public function deleteByIdPost($id_post) {
        $this->db->where('id_post', $id_post);
        $this->db->delete('anggota_post');
    }
    
    public function deleteAnggota($id) {
        $this->db->where('id_anggota', $id);
        $this->db->delete('anggota');
    }
}

?>