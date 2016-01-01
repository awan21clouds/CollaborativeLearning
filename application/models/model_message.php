<?php

class model_message extends CI_Model {

    public function insertChat($data) {
        $this->db->insert('chat', $data);
    }

    public function insertAnggotaChat($data) {
        $this->db->insert('anggota_chat', $data);
    }

    public function insertContentChat($data) {
        $this->db->insert('content_chat', $data);
    }

    public function viewChat($id_user) {
        $this->db->select('*, (select cc.isi_content_chat as chat from chat ctb join anggota_chat acb on ctb.id_chat = acb.id_chat join content_chat cc on cc.id_anggota_chat = acb.id_anggota_chat where ctb.id_chat = ct.id_chat order by cc.id_content_chat desc limit 1) as last_chat, (select cc.tanggal_content_chat as chat from chat ctb join anggota_chat acb on ctb.id_chat = acb.id_chat join content_chat cc on cc.id_anggota_chat = acb.id_anggota_chat where ctb.id_chat = ct.id_chat order by cc.id_content_chat desc limit 1) as last_tanggal_chat ')
                ->from('chat ct')
                ->join('anggota_chat ac', 'ct.id_chat = ac.id_chat')               
                ->join('user u', 'u.id_user = ac.id_user')               
                ->where('u.id_user', $id_user)                
                ->order_by("last_tanggal_chat", "desc");                
        $query = $this->db->get();
        return $query->result();
    }
    public function viewNotifikasiChat($id_user) {
        $this->db->select('*, (select cc.isi_content_chat as chat from chat ctb join anggota_chat acb on ctb.id_chat = acb.id_chat join content_chat cc on cc.id_anggota_chat = acb.id_anggota_chat where ctb.id_chat = ct.id_chat order by cc.id_content_chat desc limit 1) as last_chat, (select cc.tanggal_content_chat as chat from chat ctb join anggota_chat acb on ctb.id_chat = acb.id_chat join content_chat cc on cc.id_anggota_chat = acb.id_anggota_chat where ctb.id_chat = ct.id_chat order by cc.id_content_chat desc limit 1) as last_tanggal_chat, (select cc.id_content_chat as chat from chat ctb join anggota_chat acb on ctb.id_chat = acb.id_chat join content_chat cc on cc.id_anggota_chat = acb.id_anggota_chat where ctb.id_chat = ct.id_chat order by cc.id_content_chat desc limit 1) as id_last_chat, (select nc.status_baca as chat from content_chat cc join notifikasi_chat nc on cc.id_content_chat = nc.id_content_chat join anggota_chat ac on ac.id_anggota_chat = nc.id_anggota_chat where nc.id_content_chat = id_last_chat and ac.id_user="'.$id_user.'" limit 1) as status_baca')
                ->from('chat ct')
                ->join('anggota_chat ac', 'ct.id_chat = ac.id_chat')                                              
                ->join('notifikasi_chat ncb', 'ncb.id_anggota_chat = ac.id_anggota_chat')                                
                ->join('content_chat ccb', 'ccb.id_content_chat = ncb.id_content_chat')                
                ->join('user u', 'u.id_user = ac.id_user')
                ->where('u.id_user', $id_user)                
                ->group_by("ct.id_chat")                
                ->order_by("last_tanggal_chat", "desc");                
        $query = $this->db->get();
        return $query->result();
    }
       
    
    public function viewMessageChat($id_chat) {
        $this->db->select('*')
                ->from('chat ct')
                ->join('anggota_chat ac', 'ct.id_chat= ac.id_chat')                
                ->join('user u', 'u.id_user = ac.id_user')
                ->join('content_chat cc', 'cc.id_anggota_chat = ac.id_anggota_chat')
                ->where('ct.id_chat', $id_chat);                                
        $query = $this->db->get();
        return $query->result();
    }
    
    public function viewAnggotaChat($id_chat) {
        $this->db->select('*')
                ->from('anggota_chat')
                ->join('user', 'user.id_user = anggota_chat.id_user')                
                ->where('anggota_chat.id_chat', $id_chat);                
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByCurrentSession($id_user, $id_chat) {
        $this->db->select('*')
                ->from('anggota_chat')                
                ->where('anggota_chat.id_user', $id_user)                
                ->where('anggota_chat.id_chat', $id_chat);
        $query = $this->db->get();
        return $query->result();
    }

    public function viewByCurrentGrup($id_user, $id_chat, $id_grup) {
        $this->db->select('anggota.*, anggota_chat.*, (select user.src_image from anggota_chat join anggota on anggota.id_anggota = anggota_chat.id_anggota join user on anggota.id_user=user.id_user where anggota.id_grup=' . $id_grup . ') as photo_anggota_chat')
                ->from('anggota')
                ->join('anggota_chat', 'anggota.id_anggota = anggota_chat.id_anggota')
                ->where('anggota.id_user', $id_user)
                ->where('anggota.id_grup', $id_grup)
                ->where('anggota_chat.id_chat', $id_chat);
        $query = $this->db->get();
        return $query->result();
    }
    
}

?>