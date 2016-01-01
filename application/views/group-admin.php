<?php include 'header-admin.php'; ?>
<!-- Full Width Column -->
<div class="content-wrapper" style="margin-top:50px;">
    <div class="container">
        <!-- Content Header (Page header) -->                   

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">				

                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Groups Status</h3>
                            <div class="box-tools pull-right">									  
                                <div class="btn-group">		
                                    <button type="button" class="btn btn-default btn-flat btn-sm active" data-toggle="modal" data-target="#newGroup" rel="tooltip" title="Create New Group" data-placement="bottom"><i class="fa fa-pencil"></i> New Group</button>										  
                                    <!--<button type="button" class="btn btn-default btn-flat btn-sm active" onclick="newGrup()"><i class="fa fa-pencil"></i> New Group</button>-->										  
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="data-groups" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th width="10%"><center>Group Id</center></th>
                                        <th><center>Group Name</center></th>
                                        <th><center>Date</center></th>
                                        <th width="8%"><center>Members</center></th>                                        
                                        <th width="25%"></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>                
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>							               
            </div>			

        </section>
        <!-- /.content -->
    </div>
    <!-- /.container -->
</div>

<!-- Modal -->
<div id="updateGroup" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-group-update">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New Group</h4>
                </div>
                <div class="modal-body">                    
                    <div class="form-group">
                        <label>Nama Grup</label>
                        <input type="text" name="nama_grup" class="form-control" placeholder="Enter ...">
                        <input type="hidden" name="id_grup" class="form-control" placeholder="Enter ...">
                        <input type="hidden" name="tanggal" class="form-control" placeholder="Enter ...">
                    </div>                   
                    <div class="form-group">								
                        <div class="btn btn-default btn-file">
                            <i class="fa fa-paperclip"></i> Foto
                            <input type="file" name="src_image">
                        </div>
                        <p class="help-block">Max. 2MB</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" data-dismiss="">Send</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- Modal -->
<div id="newGroup" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-group">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New  Group</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nama Grup</label>
                        <input type="text" name="nama_grup" class="form-control" placeholder="Enter ...">
                    </div>                    
                    <div class="form-group">								
                        <div class="btn btn-default btn-file">
                            <i class="fa fa-paperclip"></i> Foto
                            <input type="file" name="src_image">
                        </div>
                        <p class="help-block">Max. 2MB</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" data-dismiss="">Send</button>
                </div>
            </div>
        </form>
    </div>
</div>


<div id="member-group-update" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-member-update">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Update Group</h4>
                </div>
                <div class="modal-body">                    
                    <div class="form-group text-center">
                        <label>Jenis Anggota</label><br/>
                        <label class="radio-inline"><input type="radio" name="jenis_anggota"  value="11333" checked>Lecturer</label>
                        <label class="radio-inline"><input type="radio" name="jenis_anggota" value="22555">Member</label>                        
                    </div>
                    <div id="lecturer">
                        <div class="form-group">
                            <label>Lecturer</label>
                            <select name="id_user" class="form-control select2" data-placeholder="Select a State" style="width: 100%;"></select>                           
                        </div>                    
                        <div class="form-group">
                            <label>State</label>
                            <select name="id_jenis_anggota" class="form-control select2" data-placeholder="Select a State" style="width: 100%;"></select>                           
                        </div>                    
                    </div>
                    <div id="member">
                        <div class="form-group">
                            <label>Anggota</label>
                            <select name="anggota[]" class="anggota form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;"></select>
                            <input type="hidden" name="id_grup" class="form-control" placeholder="Enter ...">
                        </div>                    
                    </div>
                </div>   
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" data-dismiss="">Send</button>
                </div>
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