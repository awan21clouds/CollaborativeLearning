<?php

class model_anggota extends CI_Model {

    public function insert($data) {
        $this->db->insert('anggota', $data);
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
    
    public function getAnggotaByIdGrup($id_grup) {
        $this->db->select('*')
                ->from('anggota')
                ->where('id_grup', $id_grup);
        $query = $this->db->get();
        return $query->num_rows();
    }
    
    public function getAnggotaByIdGrupUser($id_grup, $id_user) {
        $this->db->select('*')
                ->from('anggota')
                ->where('id_user', $id_user)
                ->where('id_grup', $id_grup);
        $query = $this->db->get();
        return $query->num_rows();
    }
    
    public function viewByCount($id_user) {
        $this->db->select('*')
                ->from('anggota')
                ->where('id_user', $id_user)
                ->where('status', '0');
        $query = $this->db->get();
        return $query->num_rows();
    }   
    
    public function getAnggotaByIdGrupUser2($id_grup, $id_user) {
        $this->db->select('*')
                ->from('anggota')
                ->where('id_user', $id_user)
                ->where('id_grup', $id_grup);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewLecturerByIdGrup($id) {
        $query = $this->db->query('SELECT * FROM user JOIN jenis_user ON user.id_jenis_user=jenis_user.id_jenis_user WHERE user.id_user NOT IN (SELECT id_user FROM anggota WHERE id_grup="'.$id.'") AND jenis_user.id_jenis_user="11333"');
        return $query->result();
    }           

    public function viewByIdGrup($id) {
        $this->db->select('anggota.*, user.*, user.src_image as foto_user, prodi.*, jenis_anggota.*, grup.*, grup.src_image as foto_grup, (select count(b.id_user) from anggota b where b.id_grup = anggota.id_grup) as jumlah_anggota')
                ->from('anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('prodi', 'prodi.id_prodi = user.id_prodi')
                ->join('jenis_anggota', 'jenis_anggota.id_jenis_anggota = anggota.id_jenis_anggota')
                ->join('grup', 'grup.id_grup = anggota.id_grup')
                ->where('anggota.id_grup', $id)
                ->order_by("jenis_anggota.id_jenis_anggota", "asc");
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByIdGrupNotif($id_grup, $id_user) {
        $query = $this->db->query('SELECT * from anggota join user on anggota.id_user=user.id_user join grup on anggota.id_grup=grup.id_grup where anggota.id_grup='.$id_grup.' AND anggota.id_user != '.$id_user);
        return $query->result();
    }        
    
//    public function viewMemberByIdGrupNotUser($id) {
//        $this->db->select('user.*, prodi.*, jenis_anggota.*')
//                ->from('anggota')
//                ->join('user', 'anggota.id_user = user.id_user')
//                ->join('prodi', 'prodi.id_prodi = user.id_prodi')
//                ->join('jenis_anggota', 'jenis_anggota.id_jenis_anggota = anggota.id_jenis_anggota')                
//                ->where('id_grup', $id)   
//                ->group_by('anggota.id_user');
//        $query = $this->db->get();
//        return $query->result();
//    }
    
    public function viewMemberByIdGrupNotUser() {
        $this->db->select('user.*, prodi.*, jenis_anggota.*')
                ->from('anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('prodi', 'prodi.id_prodi = user.id_prodi')
                ->join('jenis_anggota', 'jenis_anggota.id_jenis_anggota = anggota.id_jenis_anggota')                
//                ->where('id_grup', $id)   
                ->group_by('anggota.id_user');
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewMemberByIdGrup($id, $id_jenis_user) {
        $this->db->select('anggota.*, user.*, prodi.*, jenis_anggota.*')
                ->from('anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('prodi', 'prodi.id_prodi = user.id_prodi')
                ->join('jenis_anggota', 'jenis_anggota.id_jenis_anggota = anggota.id_jenis_anggota')
                ->where('id_grup', $id)
                ->where('user.id_jenis_user', $id_jenis_user)
                ->order_by("jenis_anggota.id_jenis_anggota", "asc");
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByIdUser($id) {
        $this->db->select('anggota.*, user.*, prodi.*, jenis_anggota.*, grup.*, (select count(b.id_user) from anggota b where b.id_grup = anggota.id_grup) as jumlah_anggota')
                ->from('anggota')
                ->join('user', 'anggota.id_user = user.id_user')
                ->join('prodi', 'prodi.id_prodi = user.id_prodi')
                ->join('jenis_anggota', 'jenis_anggota.id_jenis_anggota = anggota.id_jenis_anggota')
                ->join('grup', 'grup.id_grup= anggota.id_grup')
                ->where('anggota.id_user', $id);                
        $query = $this->db->get();
        return $query->result();
    }
    
    public function update($id, $data) {
        $this->db->where('id_anggota', $id);
        $this->db->update('anggota', $data);
    }
    
    public function deleteByIdGroup($id) {
        $this->db->where('id_grup', $id);
        $this->db->delete('anggota');
    }
    
    public function deleteAnggota($id) {
        $this->db->where('id_anggota', $id);
        $this->db->delete('anggota');
    }
    
    public function updateStatus($id, $status_baca) {
        $this->db->set("status", $status_baca);
        $this->db->where('id_anggota', $id);
        $this->db->update('anggota');
    }
    
    public function updateAllStatus($id, $status_baca) {
        $this->db->set("status", $status_baca);
        $this->db->where('id_user', $id);
        $this->db->update('anggota');
    }
}

?>