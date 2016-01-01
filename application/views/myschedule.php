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
                <div class="col-md-6">
                    <form id="form-myschedule">
                        <div class="nav-tabs-custom tab-default">

                            <ul class="nav nav-tabs">										
                                <li class="active"><a href="#tab_1" data-toggle="tab"><i class="fa fa-pencil-square"></i> Write Post</a></li>                                
                            </ul>
                            <div class="tab-content" >
                                <div class="tab-pane active" id="tab_1">
                                    <div class="form-group">
                                        <label>To</label>
                                        <select name="option" class="grup-option form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
                                    </div>
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input type="text" name="judul" class="form-control" value=""/>
                                    </div> 
                                    <div class="form-group">
                                        <label>Start</label>
                                        <input type="text" name="tanggal_mulai" class="form-control" value="" />
                                    </div>  
                                    <div class="form-group">
                                        <label>End</label>
                                        <input type="text" name="tanggal_selesai" class="form-control" value=""/>
                                    </div>  
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea class="form-control" name="deskripsi" rows="3" placeholder="Enter ..." style="resize: none;"></textarea>
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
                <!-- nav-tabs-custom -->
                <div class="col-md-6">
                    <div class="box box-solid">
                        <div class="box-body no-padding">
                            <!-- THE CALENDAR -->
                            <div id="calendar"></div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /. box -->
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
</div><!-- ./wrapper -->
<div id="updateSchedule" class="modal fade" role="dialog">
    <div class="modal-dialog">        
        <!-- Modal content-->
        <div class="modal-content" style="width:800px; margin-left: -80px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Update Schedule</h4>
            </div>
            <ul class="nav nav-tabs hide">										
                <li class="active"><a href="#scheduleTab1" data-toggle="tab" class="btn btn-schedule">Tab 1</a></li>
                <li class=""><a href="#scheduleTab2" data-toggle="tab" class="btn btn-schedule">Tab 2</a></li>
            </ul>
            <div class="modal-body tab-content">                    
                <div class="tab-pane active" id="scheduleTab1">
                    <table id="data-schedules" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th><center>Title</center></th>
                                <th><center>Description</center></th>
                                <th><center>Start</center></th>
                                <th><center>End</center></th>
                                <th width=20%"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>                
                    </table>
                </div>
                <div class="tab-pane" id="scheduleTab2">
                    <form id="form-schedule-update">
                        <div class="form-group">
                            <label>To</label>
                            <select name="option_update" class="grup-option form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
                        </div>
                        <div class="form-group">
                            <label>Title</label>                            
                            <input type="text" name="judul" class="form-control" value=""/>
                        </div> 
                        <div class="form-group">
                            <label>Start</label>
                            <input type="text" name="tanggal_mulai" class="form-control" value="" />
                        </div>  
                        <div class="form-group">
                            <label>End</label>
                            <input type="text" name="tanggal_selesai" class="form-control" value=""/>
                        </div>  
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" name="deskripsi" rows="3" placeholder="Enter ..." style="resize: none;"></textarea>
                        </div>   
                        <div class="form-group modal-footer">
                            <button type="submit" class="btn btn-primary pull-right">Send</button>
                        </div>
                    </form>
                </div>
            </div>               
        </div>
    </div>
</div>

</div>        
<script src="<?php echo base_url(); ?>assets/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!-- jQuery UI 1.11.2 -->
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.min.js" type="text/javascript"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>
<script src="<?php echo base_url(); ?>assets/dist/js/custom.js" type="text/javascript"></script>    	
<!-- Bootstrap 3.3.2 JS -->
<script src="<?php echo base_url(); ?>assets/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>  
<script src="<?php echo base_url(); ?>assets/plugins/notify/bootstrap-notify.min.js" type="text/javascript"></script>
<!-- Select2 -->
<script src="<?php echo base_url(); ?>assets/plugins/select2/select2.full.min.js"></script>
<!-- InputMask -->
<script src="<?php echo base_url(); ?>assets/plugins/input-mask/jquery.inputmask.js"></script>
<script src="<?php echo base_url(); ?>assets/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="<?php echo base_url(); ?>assets/plugins/input-mask/jquery.inputmask.extensions.js"></script>
<!-- DataTables -->
<script src="<?php echo base_url(); ?>assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?php echo base_url(); ?>assets/plugins/datatables/dataTables.bootstrap.min.js"></script>  		
<!-- Morris.js charts -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="<?php echo base_url(); ?>assets/plugins/morris/morris.min.js" type="text/javascript"></script>		
<!-- Sparkline -->
<script src="<?php echo base_url(); ?>assets/plugins/sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
<!-- jvectormap -->
<script src="<?php echo base_url(); ?>assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
<!-- jQuery Knob Chart -->
<script src="<?php echo base_url(); ?>assets/plugins/knob/jquery.knob.js" type="text/javascript"></script>
<!-- iCheck 1.0.1 -->
<script src="<?php echo base_url(); ?>assets/plugins/iCheck/icheck.min.js"></script>
<!-- datepicker -->
<script src="<?php echo base_url(); ?>assets/plugins/datepicker/bootstrap-datepicker.js" type="text/javascript"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="<?php echo base_url(); ?>assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
<!-- Slimscroll -->
<script src="<?php echo base_url(); ?>assets/plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>			
<!-- FastClick -->
<script src='<?php echo base_url(); ?>assets/plugins/fastclick/fastclick.min.js'></script>				
<!-- Typehead -->
<!--script src="<!?php echo base_url(); ?>assets/plugins/typeahead/bootstrap3-typeahead.min.js" type="text/javascript"></script-->
<!-- Tagsinput -->				
<script src="<?php echo base_url(); ?>assets/plugins/tagsinput/bootstrap-tokenfield.js" type="text/javascript"></script>								
<script src="<?php echo base_url(); ?>assets/plugins/tagsinput/scrollspy.js" type="text/javascript"></script>						
<script src="<?php echo base_url(); ?>assets/plugins/tagsinput/affix.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/tagsinput/typeahead.bundle.min.js" type="text/javascript"></script>		
<script src="<?php echo base_url(); ?>assets/plugins/tagsinput/docs.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/Bootstrap-3-Typeahead/bootstrap3-typeahead.min.js" type="text/javascript"></script>
<!-- AdminLTE App -->
<script src="<?php echo base_url(); ?>assets/dist/js/app.min.js" type="text/javascript"></script>    
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
<!-- Validator -->
<script src="<?php echo base_url(); ?>assets/plugins/validator/dist/js/bootstrapValidator.js" type="text/javascript"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>

</body>
</html>