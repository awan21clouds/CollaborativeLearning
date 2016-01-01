<?php

class model_grup extends CI_Model {

    public function insert($data) {
        $this->db->insert('grup', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('grup');
        $query = $this->db->get();
        return $query->result();
    }

    public function queryView() {
        $query = $this->db->query('SELECT *, (select count(*) from anggota a where a.id_grup = g.id_grup) as "jumlah_anggota" FROM grup g');
        return $query->result();
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('grup')
                ->where('id_grup', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdUser($id) {
        $this->db->select('grup.*, anggota.*')
                ->from('grup')
                ->join('anggota', 'anggota.id_grup = grup.id_grup')
                ->where('id_user', $id)
                ->order_by("anggota.status", "asc")
                ->order_by("anggota.tanggal_gabung", "desc");
        $query = $this->db->get();
        return $query->result();
    }

    public function updatePhotoProfil($id, $src) {
        $this->db->set("src_image", $src);
        $this->db->where('id_grup', $id);
        $this->db->update('grup');
    }

    public function update($id, $data) {
        $this->db->where('id_grup', $id);
        $this->db->update('grup', $data);
    }

    public function delete($id) {
        $this->db->where('id_grup', $id);
        $this->db->delete('grup');
    }

}

?>