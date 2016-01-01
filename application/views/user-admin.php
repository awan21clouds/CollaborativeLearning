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
                            <h3 class="box-title">Users</h3>
                            <div class="box-tools pull-right">									  
                                <div class="btn-group">		
                                    <button type="button" class="btn btn-default btn-flat btn-sm active" data-toggle="modal" data-target="#newUser" rel="tooltip" title="Create New Group" data-placement="bottom"><i class="fa fa-pencil"></i> New User</button>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="data-users" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th><center>NIM/NIP</center></th>
                                <th><center>Nama</center></th>
                                <th><center>Program Studi</center></th>
                                <th><center>Status</center></th>
                                <th width="25%"></th>
                                </tr>
                                </thead>                                    
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
<div id="newUser" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-user" enctype="multipart/form-data">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New User</h4>
                </div>
                <div class="modal-body">
                    <!-- text input -->
                    <div class="form-group">
                        <label>NIP/NIM</label>
                        <input type="text" name="id_user" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Nama</label>
                        <input type="text" name="nama" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Tempat Lahir</label>
                        <input type="text" name="tempat_lahir" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Tanggal Lahir</label>
                        <input type="text" name="tanggal_lahir" id="datemask" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Telp</label>
                        <input type="text" name="telp" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" name="email" class="form-control" placeholder="Enter ...">
                    </div>														
                    <div class="form-group">
                        <label>Program Studi</label>
                        <select class="form-control" name="id_prodi" id="prodi"></select>
                    </div>
                    <div class="form-group">
                        <label>Jenis User</label>
                        <select class="form-control" name="id_jenis_user" id="jenis_user"></select>
                    </div>   
                    <div class="hide form-group">								
                        <div class="btn btn-default btn-file">
                            <i class="fa fa-paperclip"></i> Foto
                            <input type="file" name="src_image" value="C:/default.png">
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
<div id="updateUser" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form id="form-user-update">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Edit User</h4>
                </div>
                <div class="modal-body">
                    <!-- text input -->
                    <div class="form-group">
                        <label>NIP/NIM</label>
                        <input type="text" name="id_user" class="form-control" readonly="true" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Nama</label>
                        <input type="text" name="nama" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Tempat Lahir</label>
                        <input type="text" name="tempat_lahir" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Tanggal Lahir</label>
                        <input type="text" name="tanggal_lahir" id="datemask" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Telp</label>
                        <input type="text" name="telp" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" name="email" class="form-control" placeholder="Enter ...">
                    </div>														
                    <div class="form-group">
                        <label>Program Studi</label>
                        <select class="form-control" name="id_prodi" id="prodi"></select>
                    </div>
                    <div class="form-group">
                        <label>Jenis User</label>
                        <select class="form-control" name="id_jenis_user" id="jenis_user"></select>
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

<footer class="main-footer">
    <div class="container">

        <strong>Copyright &copy; 2014-2015 </strong> 
    </div>
    <!-- /.container -->
</footer>
<?php include 'footer.php'; ?>