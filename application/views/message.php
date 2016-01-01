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

<style>
    .drop-up {
        top: auto;
        bottom: 100% !important;
    }

</style>
<!-- Full Width Column -->
<div class="content-wrapper" style="margin-top:50px;">
    <div class="container">
        <!-- Content Header (Page header) -->                   
        <!-- Main content -->
        <section class="content">
            <div class="row" id="chat-content">
                
            </div>            	

        </section>
        <!-- /.content -->
    </div>
    <!-- /.container -->
</div>

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
                        <select name="anggota[]" class="chat-member form-control select2" id="chat-member-validator" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
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


<!-- Modal -->
<div id="videoDialog" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-new-message">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" id="videoCallClose" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Video Call</h4>
                </div>
                <div class="modal-body">
                    <div id="webcam">
                        flash_url: <?php echo base_url('../assets/plugins/ScriptCam/js/scriptcam.swf'); ?>
                    </div>                   
                </div>
                <!--                <div class="modal-footer">
                                    <button type="submit" class="btn btn-default" data-dismiss="">Send</button>
                                </div>-->
            </div>
        </form>
    </div>
</div>

<footer class="main-footer">
    <div class="container">

        <strong>Copyright &copy; 2014-2015 </strong> 
    </div>
    <!-- /.container -->
</footer>
<?php include 'footer.php'; ?>