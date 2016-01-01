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
                <div class="col-md-8" >
                    <div id="progress-null"> </div>
                    <ul class="timeline" id="progress-not-null"></ul>
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