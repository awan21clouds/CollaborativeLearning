<?php

class model_jenis_anggota extends CI_Model {

    public function insert($data) {
        $this->db->insert('jenis_anggota', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('jenis_anggota');                
        $query = $this->db->get();
        return $query->result();
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('jenis_anggota')
                ->where('id_jenis_anggota', $id);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewAvailableByIdGrup($id) {
        $query = $this->db->query('SELECT * FROM jenis_anggota WHERE jenis_anggota.id_jenis_anggota NOT IN (SELECT id_jenis_anggota FROM anggota WHERE id_grup="'.$id.'") and jenis_anggota.id_jenis_user="11333"');
        return $query->result();
    }   

    public function updatePhotoProfil($id, $src) {
        $this->db->set("src_image", $src);
        $this->db->where('id_jenis_anggota', $id);
        $this->db->update('jenis_anggota');
    }

    public function update($id, $data) {
        $this->db->where('id_jenis_anggota', $id);
        $this->db->update('jenis_anggota', $data);
    }

    public function delete($id) {
        $this->db->where('id_jenis_anggota', $id);
        $this->db->delete('jenis_anggota');
    }
}
?>