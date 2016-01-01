<?php

class model_jenis_user extends CI_Model {

    public function insert($data) {
        $this->db->insert('jenis_user', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('jenis_user');
        $query = $this->db->get();
        return $query->result();
    }

}

?>