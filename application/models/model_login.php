<?php
	class model_login extends CI_Model{
		
		public function insert($data){
			$this->db->insert('anggota', $data);
		}
		
		public function view(){
			$this->db->select('*')
					 ->from('anggota');					 
			$query = $this->db->get();
			return $query->result();
		}			
		
		public function getAnggotaGrup($id_user){
			$this->db->select('*')
					 ->from('anggota')
					 ->where('id_user', $id_user);
			$query = $this->db->get();
			return $query->num_rows();
		}
		
		public function viewByIdGrup($id){
			$this->db->select('anggota.*, user.*')
					 ->from('anggota')
					 ->join('user', 'anggota.id_user = user.id_user')
					 ->where('id_grup', $id);
			$query = $this->db->get();
			return $query->result();
		}
	}
?>