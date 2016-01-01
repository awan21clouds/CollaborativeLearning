<?php

class model_post extends CI_Model {

    public function insert($data) {
        $this->db->insert('post', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('post');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('post')
                ->join('anggota', 'anggota.id_anggota = post.id_anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('grup', 'grup.id_grup = anggota.id_grup')
                ->join('jenis_post', 'jenis_post.id_jenis_post = post.id_jenis_post')
                ->where('post.id_post', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewFileByIdGrup($id) {
        $this->db->select('*')
                ->from('post')
                ->join('post_file', 'post_file.id_post = post.id_post')
                ->where('id_post', $id);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewPostByIdGrup($id) {
        $this->db->select('*')
                ->from('post')
                ->join('anggota', 'anggota.id_anggota = post.id_anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('grup', 'grup.id_grup = anggota.id_grup')
                ->join('jenis_post', 'jenis_post.id_jenis_post = post.id_jenis_post')
                ->where('grup.id_grup', $id);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByIdGrup($id, $id_jenis_post) {
        $this->db->select('anggota.*, user.*, user.src_image as "photo", post.*, grup.*,')
                ->from('user')
                ->join('anggota', 'anggota.id_user = user.id_user')
                ->join('grup', 'grup.id_grup = anggota.id_grup')
                ->join('post', 'post.id_anggota = anggota.id_anggota')
                ->where('anggota.id_grup', $id)
                ->where('post.id_jenis_post', $id_jenis_post)
                ->order_by("post.tanggal_post", "desc");                
        $query = $this->db->get();
        return $query->result();
    }

    public function viewJA() {
        $query = $this->db->query('SELECT *, (SELECT COUNT(id_anggota) FROM anggota a where a.id_post = g.id_post) AS "jumlah_anggota" FROM post g');
        return $query;
    }
    
    public function update($id, $data) {
        $this->db->where('id_post', $id);
        $this->db->update('post', $data);
    }

    public function delete($id) {
        $this->db->where('id_post', $id);
        $this->db->delete('post');
    }
}
?>