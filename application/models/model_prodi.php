<?php
	class model_prodi extends CI_Model{
		public function insert($data){			
			$this->db->insert('prodi', $data);
		}
		
		public function view(){
			$this->db->select('*')
					 ->from('prodi'); 
			$query = $this->db->get();
			return $query->result();
		}			
	}
?>