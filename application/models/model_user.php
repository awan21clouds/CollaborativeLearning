<?php

class model_user extends CI_Model {

    public function insert($data) {
        $this->db->insert('user', $data);
    }

    public function view() {
        $this->db->select('user.*, jenis_user.*, prodi.*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')
                ->join('prodi', 'user.id_prodi = prodi.id_prodi');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewById($id) {
        $this->db->select('*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')
                ->join('anggota', 'user.id_user= anggota.id_user')
                ->join('prodi', 'user.id_prodi= prodi.id_prodi')
                ->where('user.id_user', $id);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByIdUnGroup($id) {
        $this->db->select('*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')                
                ->join('prodi', 'user.id_prodi= prodi.id_prodi')
                ->where('user.id_user', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByEmail($id) {
        $this->db->select('*')
                ->from('user')
                ->where('email', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByJenisUser($id) {
        $this->db->select('user.*, jenis_user.*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')
                ->where('user.id_jenis_user', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewFreeUserByJenisUser($id) {
        $query = $this->db->query('select * from user JOIN jenis_user ON user.id_jenis_user = jenis_user.id_jenis_user where jenis_user.id_jenis_user = "' . $id . '" and user.id_user not in (select anggota.id_user from anggota)');
        return $query->result();
    }

    public function viewFreeAndMemberUserByJenisUser($id_jenis_user, $id_grup) {
        $query = $this->db->query('select * from user JOIN jenis_user ON user.id_jenis_user = jenis_user.id_jenis_user where jenis_user.id_jenis_user = "' . $id_jenis_user . '" AND user.id_user not in (select anggota.id_user from anggota) OR user.id_user in (select anggota.id_user from anggota JOIN user ON anggota.id_user=user.id_user WHERE anggota.id_grup = "' . $id_grup . '" AND user.id_jenis_user="' . $id_jenis_user . '")');
        return $query->result();
    }

    public function login($username, $password) {
        $this->db->select('*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')
                ->join('anggota', 'user.id_user= anggota.id_user')
                ->join('prodi', 'user.id_prodi= prodi.id_prodi')
                ->where('user.username', $username)
                ->where('user.password', $password);
        $query = $this->db->get();
        return $query;
    }

    public function login_admin($username, $password) {
        $this->db->select('*')
                ->from('user')
                ->join('jenis_user', 'user.id_jenis_user = jenis_user.id_jenis_user')
                ->join('prodi', 'user.id_prodi= prodi.id_prodi')
                ->where('user.username', $username)
                ->where('user.password', $password);
        $query = $this->db->get();
        return $query;
    }

    public function updatePhotoProfil($id, $src) {
        $this->db->set("src_image", $src);
        $this->db->where('id_user', $id);
        $this->db->update('user');
    }

    public function update($id, $data) {
        $this->db->where('id_user', $id);
        $this->db->update('user', $data);
    }

    public function updatePassword($newPassword, $id) {
        $data = array('password'=> $newPassword);
        $this->db->where('id_user', $id);
        $this->db->update('user', $data);
    }

    public function delete($id) {
        $this->db->where('id_user', $id);
        $this->db->delete('user');
    }

}

?>