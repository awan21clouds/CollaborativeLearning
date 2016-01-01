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
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Uploaded Files</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="data-files" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th><center>Nama File</center></th>                                        
                                        <th width="30%"><center>Tanggal</center></th>                                                                               
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