<?php

class model_comment_post extends CI_Model {

    public function insert($data) {
        $this->db->insert('comment_post', $data);
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('comment_post')
                ->where('id_comment_post', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdPost($id_post) {
//        echo $id_post;
        $this->db->select('comment_post.*, post.*, anggota.*, user.*')
                ->from('comment_post')
                ->join('post', 'comment_post.id_post = post.id_post')
                ->join('anggota', 'comment_post.id_anggota = anggota.id_anggota')
                ->join('user', 'user.id_user= anggota.id_user')
                ->where('comment_post.id_post', $id_post);
        $query = $this->db->get();
        return $query->result();
    }

    public function updatePhotoProfil($id, $src) {
        $this->db->set("src_file", $src);
        $this->db->where('id_comment_post', $id);
        $this->db->update('comment_post');
    }

    public function update($id, $data) {
        $this->db->where('id_comment_post', $id);
        $this->db->update('comment_post', $data);
    }

    public function delete($id) {
        $this->db->where('id_comment_post', $id);
        $this->db->delete('comment_post');
    }

}

?>