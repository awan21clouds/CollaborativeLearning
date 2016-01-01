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
                    <div class="box box-widget widget-user-2">
                        <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget-user-header bg-blue">
                            <div class="widget-user-image">                                
                                <?php
                                if (empty($this->session->userdata('user')->src_image)) {
                                    echo '<img src="' . base_url() . 'assets/dist/img/default.png" class="img-circle" alt="User Avatar">';
                                } else {
                                    echo '<img src="' . base_url() . $this->session->userdata('user')->src_image . '" class="img-circle" alt="User Avatar">';
                                }
                                ?>
                            </div>
                            <!-- /.widget-user-image -->
                            <h3 class="widget-user-username"><?php echo $nama; ?></h3>
                            <h5 class="widget-user-desc"><?php echo $id_user; ?></h5>
                        </div>
                        <div class="box-footer no-padding">
                            <ul class="nav nav-stacked">
                                <li><a href="javascript:void(0)">Keterangan<span class="pull-right badge"><?php echo $keterangan_jenis_user; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Program Studi <span class="pull-right badge"><?php echo $nama_prodi; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Fakultas <span class="pull-right badge"><?php echo $fakultas; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Tempat Lahir <span class="pull-right badge"><?php echo $tempat_lahir; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Tanggal Lahir <span class="pull-right badge"><?php echo $tanggal_lahir; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Telp <span class="pull-right badge"><?php echo $telp; ?></span></a></li>                                
                                <li><a href="javascript:void(0)">Email <span class="pull-right badge"><?php echo $email; ?></span></a></li>                                
                                <li>
                                    <a href="javascript:void(0)">Grup 
                                        <span class="pull-right">
                                            <?php foreach ($grup as $g) { 
                                                echo '<span class="badge">'.$g->nama_grup.'</span>';
                                             }; ?>
                                        </span>
                                    </a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                    <!-- /.widget-user -->            

                </div>							

                <div class="col-md-4">

                    <!-- PRODUCT LIST -->
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Groups</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>
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