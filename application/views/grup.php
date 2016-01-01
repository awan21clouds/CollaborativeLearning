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
<?php include 'navbar-member.php'; ?>
</header>


<!-- Full Width Column -->
<div class="content-wrapper" style="margin-top:50px;">
    <div class="container">
        <!-- Content Header (Page header) -->                   

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-8">
                    <form id="form-post">
                        <div class="nav-tabs-custom tab-default">
                            <ul class="nav nav-tabs">										
                                <li class="active"><a href="#tab_1" data-toggle="tab"><i class="fa fa-pencil-square"></i> Write Post</a></li>                                                                
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_1">
                                    <div class="form-group">
                                        <label></label>
                                        <textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;"></textarea>
                                    </div>  

                                    <div class="form-group">
                                        <div class="btn btn-default btn-file">
                                            <i class="fa fa-paperclip"></i> <span class="file-changed">Attachment</span>
                                            <input type="file" name="src_file" onchange="setFileValComment(this);" onselect="setFileValComment(this);">
                                        </div>                                                                       
                                    </div>
                                </div>    

                            </div>
                            <!-- /.tab-content -->
                            <div class="box-footer">    
                                <button type="submit" class="btn btn-primary pull-right">Send</button>
                            </div>
                        </div>
                    </form>
                    <!-- nav-tabs-custom -->
                    <div id="progress-wall">
                        <center><img width="100" height="100" src="<?php echo base_url(); ?>assets/dist/img/progress.gif" /></center>
                    </div>                                        
                    <div id="content-wall"></div>
                </div>	
                <?php include 'navbar-grup.php'; ?>                
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
<?php include 'footer.php'; ?>