<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of search
 *
 * @author Rizqy Fahmi
 */
class search extends CI_Controller {

    public function __contruct() {
        parent::__contruct();
    }

    public function index() {
        if (empty($this->session->userdata('user'))) {
            redirect(base_url());
        } else {
            $data['id_grup'] = $this->input->get('id_grup');
            if ($this->input->get('id_grup')) {
                $data['id_grup'] = $this->input->get('id_grup');
            } else {
                $user = $this->session->userdata('user');
                $id_user = $user->id_user;
                $query = $this->model_anggota->viewByIdUser($id_user);
                $data['id_grup'] = $query[0]->id_grup;
            }
            $this->load->view("search-dosen", $data);
        }
    }

    public function user() {
        $data['id_user'] = $this->input->get('id_user');
        $query = $this->model_user->viewById($data['id_user']);
        $data['id_user'] = $query[0]->id_user;
        $data['nama'] = $query[0]->nama;
        $data['nama_prodi'] = $query[0]->nama_prodi;
        $data['tempat_lahir'] = $query[0]->tempat_lahir;
        $data['tanggal_lahir'] = $query[0]->tanggal_lahir;
        $data['fakultas'] = $query[0]->fakultas;
        $data['telp'] = $query[0]->telp;
        $data['email'] = $query[0]->email;
        $data['keterangan_jenis_user'] = $query[0]->keterangan_jenis_user;
        $data['src_image'] = $query[0]->src_image;
        $data['grup'] = $this->model_grup->viewByIdUser($data['id_user']);
        $this->load->view("search-dosen", $data);
    }

    public function post() {
        $id_grup = $this->input->get('id_grup');
        $data = array();
        if ($query = $this->model_post->viewPostByIdGrup($id_grup)) {
            foreach ($query as $sub_r) {
                $r = array(
                    "id_user" => $sub_r->id_user,
                    "isi_post" => $sub_r->isi_post,
                    "url" => '/search/search_post?id_post=' . $sub_r->id_post . '&id_grup=' . $id_grup,
                    "status" => $sub_r->keterangan_jenis_post,
                );
                array_push($data, $r);
            }
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

    public function search_post() {
        $data['id_user'] = $this->input->get('id_user');
        $data['id_grup'] = $this->input->get('id_grup');
        $this->load->view("search-post", $data);
    }

    public function getSearchPost() {
        $id_post = $this->input->get('id_post');
        $data = array('data' => array());
        if ($query = $this->model_post->viewById($id_post)) {
            $sub_data = array();

            $id_post = $query[0]->id_post;
            $second_sub_data = array();
            if ($sub_query = $this->model_comment_post->viewByIdPost($id_post)) {
                foreach ($sub_query as $sub_r) {
                    array_push($second_sub_data, $sub_r);
                }
            }
            $query[0]->comment_post = $second_sub_data;


            $third_sub_data = array();
            if ($sub_query = $this->model_post_file->viewByIdPost($id_post)) {
                foreach ($sub_query as $sub_r) {
                    array_push($third_sub_data, $sub_r);
                }
            }
            $query[0]->file_post = $third_sub_data;

            $fourth_sub_data = array();
            if ($sub_query = $this->model_anggota_post->getAnggotaByIdPost($id_post)) {
                foreach ($sub_query as $sub_r) {
                    array_push($fourth_sub_data, $sub_r);
                }
            }
            $query[0]->anggota_post = $fourth_sub_data;

//            $fifth_sub_data = array();
//            if ($sub_query = $this->model_anggota->viewMemberByIdGrup($id_grup, 'JA03')) {
//                foreach ($sub_query as $sub_r) {
//                    array_push($fifth_sub_data, $sub_r);
//                }
//            }
//            $query[0]->anggota = $fifth_sub_data;
//
//
//            array_push($sub_data, $r);
//            foreach ($query as $r) {
//                $id_post = $r->id_post;
//                $second_sub_data = array();
//                if ($sub_query = $this->model_comment_post->viewByIdPost($id_post)) {
//                    foreach ($sub_query as $sub_r) {
//                        array_push($second_sub_data, $sub_r);
//                    }
//                }
//                $r->comment_post = $second_sub_data;
//                $third_sub_data = array();
//                if ($sub_query = $this->model_post_file->viewByIdPost($id_post)) {
//                    foreach ($sub_query as $sub_r) {
//                        array_push($third_sub_data, $sub_r);
//                    }
//                }
//                $r->file_post = $third_sub_data;
//                $fourth_sub_data = array();
//                if ($sub_query = $this->model_anggota_post->getAnggotaByIdPost($id_post)) {
//                    foreach ($sub_query as $sub_r) {
//                        array_push($fourth_sub_data, $sub_r);
//                    }
//                }
//                $r->anggota_post = $fourth_sub_data;
//
//                $fifth_sub_data = array();
//                if ($sub_query = $this->model_anggota->viewMemberByIdGrup($id_grup, 'JA03')) {
//                    foreach ($sub_query as $sub_r) {
//                        array_push($fifth_sub_data, $sub_r);
//                    }
//                }
//                $r->anggota = $fifth_sub_data;
//
//
            array_push($sub_data, $query[0]);
//            }
            $data = array('data' => $sub_data);
        }
        header("content-type: application/json");
        echo json_encode($data);
        exit;
    }

}
