<?php

class model_schedule extends CI_Model {

    public function insert($data) {
        $this->db->insert('schedule', $data);
    }

    public function view() {
        $this->db->select('*')
                ->from('schedule');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdSchedule($id_schedule) {
        $this->db->select('*')
                ->from('schedule')
                ->where('id_schedule', $id_schedule);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByTime($judul, $deskripsi, $tanggal_mulai, $tanggal_selesai) {
        $this->db->select('*')
                ->from('schedule')
                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
                ->join('grup', 'anggota.id_grup = grup.id_grup')
                ->where('judul', $judul)
                ->where('deskripsi', $deskripsi)
                ->where('tanggal_mulai', $tanggal_mulai)
                ->where('tanggal_selesai', $tanggal_selesai);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewByTitleStart($judul, $tanggal_mulai) {
        $query = $this->db->query('SELECT * FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota where SCHEDULE.judul="'.$judul.'" AND DATE(schedule.tanggal_mulai) = "'.$tanggal_mulai.'"');
        
//        $this->db->select('*')
//                ->from('schedule')
//                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
//                ->join('grup', 'anggota.id_grup = grup.id_grup')
//                ->where('judul', $judul)                
//                ->where('tanggal_mulai', $tanggal_mulai);                
//        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdAnggota($id_anggota) {
        $this->db->select('*')
                ->from('schedule')
                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
                ->where('anggota.id_anggota', $id_anggota)
                ->group_by('tanggal_mulai');
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdUser($id_user) {
//        $this->db->select('*')
//                ->from('schedule')
//                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
//                ->where('anggota.id_user', $id_user)
////                ->group_by('tanggal_mulai');
//                ->group_by('judul');
//        $query = $this->db->get();
        $query = $this->db->query('SELECT *, (tanggal_selesai + INTERVAL 1 DAY) as tanggal_selesai FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota where anggota.id_user = "'.$id_user.'" group by judul');
        return $query->result();
    }

    public function viewByIdGrup($id_grup) {
        $query = $this->db->query('SELECT *, (tanggal_selesai + INTERVAL 1 DAY) as tanggal_selesai FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota where anggota.id_grup = "'.$id_grup.'"');
        return $query->result();
    }

    public function viewByIdGrupStart($id_grup, $start) {
//        $this->db->select('*')
//                ->from('schedule')
//                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
//                ->where('anggota.id_grup', $id_grup)
//                ->where('DATE(schedule.tanggal_mulai)', $start)
//                ->group_by('tanggal_mulai');
        $query = $this->db->query('SELECT * FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota where anggota.id_grup = "'.$id_grup.'" AND DATE(schedule.tanggal_mulai) = "'.$start.'"');
//        $query = $this->db->get();
        return $query->result();
    }

    public function viewByIdUserStart($id_user, $start) {
//        $this->db->select('*')
//                ->from('schedule')
//                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
//                ->where('anggota.id_user', $id_user)
//                ->where('DATE(schedule.tanggal_mulai)', $start)
//                ->group_by('tanggal_mulai');
//        $query = $this->db->get();
        $query = $this->db->query('SELECT * FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota where anggota.id_user = "'.$id_user.'" AND DATE(schedule.tanggal_mulai) = "'.$start.'" group by judul');
        return $query->result();
    }

    public function viewByIdUserFullStart($id_user, $judul, $start) {
//        $this->db->select('*')
//                ->from('schedule')
//                ->join('anggota', 'anggota.id_anggota = schedule.id_anggota')
//                ->where('anggota.id_user', $id_user)
//                ->where('schedule.tanggal_mulai', $start)
//                ->group_by('judul');
//        $query = $this->db->get();
        $query = $this->db->query('SELECT * FROM schedule join anggota on schedule.id_anggota = anggota.id_anggota join grup on anggota.id_grup = grup.id_grup where anggota.id_user = "'.$id_user.'" AND schedule.judul="'.$judul.'" AND Date(schedule.tanggal_mulai) = "'.$start.'" ');
        return $query->result();
    }

    public function update($id, $data) {
        $this->db->where('id_schedule', $id);
        $this->db->update('schedule', $data);
    }

    public function delete($id) {
        $this->db->where('id_schedule', $id);
        $this->db->delete('schedule');
    }

}
?>

