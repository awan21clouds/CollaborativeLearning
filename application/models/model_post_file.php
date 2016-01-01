<?php

class model_post_file extends CI_Model {

    public function insert($data) {
        $this->db->insert('post_file', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('post_file');
        $query = $this->db->get();
        return $query->result();
    }    
    
    public function viewByIdGrup($id_grup) {
        $this->db->select('*')
                ->from('post_file')
                ->join('post', 'post_file.id_post = post.id_post')
                ->join('anggota', 'anggota.id_anggota = post.id_anggota')
                ->where('anggota.id_grup', $id_grup);
        $query = $this->db->get();
        return $query->result();
    } 
    
    public function queryView() {
        $query = $this->db->query('SELECT *, (select count(*) from anggota a where a.id_post_file = g.id_post_file) as "jumlah_anggota" FROM post_file g');
        return $query->result();
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('post_file')
                ->where('id_post_file', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdPost($id_post) {
        $this->db->select('post_file.*, post.*, anggota.*, user.*')
                ->from('post_file')
                ->join('post', 'post_file.id_post = post.id_post')
                ->join('anggota', 'anggota.id_anggota = post.id_anggota')
                ->join('user', 'user.id_user= anggota.id_user')
                ->where('post.id_post', $id_post)
                ->order_by('post_file.tanggal_file', 'desc'); 
        $query = $this->db->get();
        return $query->result();
    }
    
    public function updatePhotoProfil($id, $src) {
        $this->db->set("src_file", $src);
        $this->db->where('id_post_file', $id);
        $this->db->update('post_file');
    }

    public function update($id, $data) {
        $this->db->where('id_post_file', $id);
        $this->db->update('post_file', $data);
    }

    public function delete($id) {
        $this->db->where('id_post_file', $id);
        $this->db->delete('post_file');
    }

}

?>