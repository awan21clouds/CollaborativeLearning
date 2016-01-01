<?php

class Anggota_Post extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        
    }

    public function signUp() {
        try {
            if ($this->input->post('anggota')) {
                foreach ($this->input->post('anggota') as $value) {                    
                    $data = $this->createDataAnggotaPost($value);
                    $this->model_anggota_post->insert($data);
                }
            }           
            echo "Input Data Success";
        } catch (Exception $e) {
            echo 'Caught exception: ', $e->getMessage(), "\n";
        }
    }
    
    public function deleteAnggotaPost() {
        $this->model_anggota_post->deleteByIdPost($this->input->post('id_post'));
    }
       

    public function deleteAnggota() {
        $id_anggota = $this->input->post('id_anggota');
        $this->model_anggota_post->deleteAnggota($id_anggota);
        echo "Delete Data Success";
    }

    public function createDataAnggotaPost($id_anggota) {     
        date_default_timezone_set("Asia/Jakarta");
        $data = array(
            'id_anggota_post' => date("Ymdhis") . rand(1000, 9999),
            'id_post' => $this->input->post('id_post'),
            'id_anggota' => $id_anggota            
        );
        return $data;
    }

    public function deleteByIdGroup() {
        $id_grup = $this->input->post('id_grup');
        $this->model_anggota_post->deleteByIdGroup($id_grup);
        echo "Delete Data Success";
    }

}

?>