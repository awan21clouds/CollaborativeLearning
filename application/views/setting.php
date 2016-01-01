<?php
$user = $this->session->userdata('user');
switch ($user->id_jenis_user) {
    case 00000 : 
        include 'header-admin.php';
        break;
    case 11333 :
        include 'header-dosen.php';
        break;
    case 22555 : 
        include 'header.php';
        break;
    default : echo "User Unrecognized";
        break;
}
?>
</header>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/ihover/src/ihover.css" type="text/css" media="screen"/>

<!-- Full Width Column -->
<div class="content-wrapper" style="margin-top:50px;">
    <div class="container">
        <!-- Content Header (Page header) -->                   
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">

                    <!-- PRODUCT LIST -->
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Profil</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div class="col-sm-3">
                                <div class="text-center">
                                    <div class="ih-item circle effect13 from_left_and_right">
                                        <a href="javascript:void(0)" onclick="$('#setting-photo').click()">
                                            <div class="img">
                                                <img class="user-photo">
                                                <?php
//                                                if (empty($this->session->userdata('user')->src_image)) {
//                                                    echo '<img src="' . base_url() . 'assets/dist/img/default.png" >';
//                                                } else {
//                                                    echo '<img src="' . base_url() . $this->session->userdata('user')->src_image . '" >';
//                                                }
//                                                ?>
                                            </div>
                                            <div class="info">
                                                <div class="info-back">
                                                    <h3>Click here</h3>
                                                    <p>Change Picture</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <form id="update-photo" enctype='multipart/form-data' action="<?php echo base_url(); ?>users/updatePhoto" method="POST">
                                    <input type="hidden" name="id_user" value="<?php echo $this->session->userdata('user')->id_user; ?>"/>                                        
                                    <input type="file" name="src_image" class="hide" onchange="$('#update-photo').submit()" id="setting-photo"/>
                                </form>                                
                                <!-- colored -->                                
                            </div>                     
                            <div class="col-md-9">
                                <form id="form-reset-password">
                                    <div class="form-group">
                                        <label>Old Password</label>
                                        <input type="hidden" name="username" value="<?php echo $this->session->userdata('user')->id_user; ?>"/>  
                                        <input type="password" name="old_password" class="form-control" placeholder="Enter ...">                                        
                                    </div>                   
                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input type="password" name="new_password" class="form-control" placeholder="Enter ...">                                       
                                    </div>                   
                                    <div class="form-group pull-right">                                        
                                        <button type="submit" class="btn btn-primary" data-dismiss="">Reset Password</button>
                                    </div>                   
                                </form>
                            </div>                            
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer no-padding">
                            <ul class="nav nav-stacked">
                                <li><a href="javascript:void(0)">NIM/NIP <span class="pull-right badge"><?php echo $this->session->userdata('user')->id_user; ?></span></a></li>
                                <li><a href="javascript:void(0)">Nama <span class="pull-right badge"><?php echo $this->session->userdata('user')->nama; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Program Studi <span class="pull-right badge"><?php echo $this->session->userdata('user')->nama_prodi; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Fakultas <span class="pull-right badge"><?php echo $this->session->userdata('user')->fakultas; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Tempat Lahir <span class="pull-right badge"><?php echo $this->session->userdata('user')->tempat_lahir; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Tanggal Lahir <span class="pull-right badge"><?php echo $this->session->userdata('user')->tanggal_lahir; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Telp <span class="pull-right badge"><?php echo $this->session->userdata('user')->telp; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Email <span class="pull-right badge"><?php echo $this->session->userdata('user')->email; ?></span></a></li>                                
                            </ul>
                        </div>
                        <!-- /.box-footer -->
                    </div>                   
                </div>
            </div>			
        </section>
        <!-- /.content -->
    </div>
    <!-- /.container -->

</div>
<footer class="main-footer">
    <div class="container">

        <strong>Copyright &copy; 2014-2015 </strong> 
    </div>
    <!-- /.container -->
</footer>
<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-new-message">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New Messages</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>To</label>
                        <select name="anggota[]" class="assign form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
                    </div>
                    <div class="form-group">
                        <label>Messages</label>
                        <textarea class="form-control" name="isi_content_chat" rows="3" placeholder="Enter ..." style="resize: none;"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="">Send</button>
                </div>
            </div>
        </form>
    </div>
</div>
<?php include 'footer.php'; ?>