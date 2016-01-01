<?php include 'header-dosen.php'; ?>
<?php include 'navbar-dosen.php'; ?>
</header>


<!-- Full Width Column -->
<div class="content-wrapper" style="margin-top:50px;">
    <div class="container">
        <!-- Content Header (Page header) -->                   

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-8">
                    <form id="form-anouncement">
                        <div class="nav-tabs-custom tab-default">

                            <ul class="nav nav-tabs">										
                                <li class="active"><a href="#tab_1" data-toggle="tab"><i class="fa fa-pencil-square"></i> Write Post</a></li>                                
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_1">
                                    <div class="form-group">
                                        <label>To</label>
                                        <select class="grup-option form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
                                    </div>
                                    <div class="form-group">
                                        <label>Messages</label>
                                        <textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="btn btn-default btn-file">
                                            <i class="fa fa-paperclip"></i> <span class="file-changed">Attachment</span>
                                            <input type="file" name="src_file" onchange="setFileValComment(this);" onselect="setFileValComment(this);">
                                        </div>
                                        <p class="help-block">Max. 2MB</p>
                                    </div>
                                </div>
                                <!-- /.tab-pane -->

                            </div>
                            <!-- /.tab-content -->						
                            <div class="box-footer">                          
                                <button type="submit" class="btn btn-primary pull-right">Send</button>																				                                        
                            </div>

                        </div>
                    </form>                    

                </div>							

                <div class="col-md-4">

                    <!-- PRODUCT LIST -->
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Groups</h3>
<!--                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>-->
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" id="anouncement-groups">
                            <ul class="group-list products-list product-list-in-box"></ul>
                        </div>
                        <!-- /.box-body -->                        
                    </div>                   
                </div>
            </div>				

        </section>
        <!-- /.content -->
    </div>
    <!-- /.container -->
</div>
<footer class="main-footer" style="margin-top:-101px">
    <div class="container">

        <strong>Copyright &copy; 2014-2015 </strong> 
    </div>
    <!-- /.container -->
</footer>
<?php include 'footer.php'; ?>