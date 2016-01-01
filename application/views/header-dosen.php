<?php
$this->output->set_header('Last-Modified:'.gmdate('D, d M Y H:i:s').'GMT');
$this->output->set_header('Cache-Control: no-store, no-cache, must-revalidate');
$this->output->set_header('Cache-Control: post-check=0, pre-check=0',false);
$this->output->set_header('Pragma: no-cache');
?>

<html>
    <head>
        <title></title>        
        <link href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />         
        <link href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap-theme.css" rel="stylesheet"/>

        <!-- FontAwesome 4.3.0 -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <!-- Ionicons 2.0.0 -->
        <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />   
        <!-- fullCalendar 2.2.5-->
        <link href="<?php echo base_url(); ?>assets/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url(); ?>assets/plugins/fullcalendar/fullcalendar.print.css" rel="stylesheet" type="text/css" media='print'/>
        <!-- DataTables -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/datatables/dataTables.bootstrap.css">		
        <!-- Select2 -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/select2/select2.min.css"/>
        <!-- Theme style -->
        <link href="<?php echo base_url(); ?>assets/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />

        <!-- AdminLTE Skins. Choose a skin from the css/skins 
             folder instead of downloading all of them to reduce the load. -->
        <link href="<?php echo base_url(); ?>assets/dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
        <!-- iCheck -->
        <link href="<?php echo base_url(); ?>assets/plugins/iCheck/flat/blue.css" rel="stylesheet" type="text/css" />
        <!-- Morris chart -->
        <link href="<?php echo base_url(); ?>assets/plugins/morris/morris.css" rel="stylesheet" type="text/css" />
        <!-- jvectormap -->
        <link href="<?php echo base_url(); ?>assets/plugins/jvectormap/jquery-jvectormap-1.2.2.css" rel="stylesheet" type="text/css" />
        
        
        <!-- Date Picker -->
        <link href="<?php echo base_url(); ?>assets/plugins/datepicker/datepicker3.css" rel="stylesheet" type="text/css" />
        
        <link href="<?php echo base_url(); ?>assets/plugins/validator/dist/css/bootstrapValidator.css" rel="stylesheet" type="text/css" />
        <!-- Daterange picker -->
        <link href="<?php echo base_url(); ?>assets/plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" />
        <!-- Bootstrap Color Picker -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/colorpicker/bootstrap-colorpicker.min.css">
        <!-- Bootstrap time Picker -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/timepicker/bootstrap-timepicker.min.css">		
        <!-- bootstrap wysihtml5 - text editor -->
        <link href="<?php echo base_url(); ?>assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />

        <!-- Tagsinput -->
        <link href="<?php echo base_url(); ?>assets/plugins/tagsinput/tokenfield-typeahead.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url(); ?>assets/plugins/tagsinput/bootstrap-tokenfield.css" rel="stylesheet" type="text/css" />
                       

        <link href="<?php echo base_url(); ?>assets/plugins/dropzone/dropzone.css" rel="stylesheet" type="text/css" />	   
        
        <style>
            .navbar-custom {
                color: #FFFFFF;
                background-color: #999999;
            }
            .navbar-nav li.active:after, .navbar-nav li.active:before{                
                bottom: 4%;
                margin-bottom: -2px;
                left: 50%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
            }

            .navbar-nav li.active:after {
                border-bottom-color: #fff;
                border-width: 6px;
                margin-left: -6px;
                z-index: 1;
            }

            .nav-tabs li.active:after, .nav-tabs li.active:before, .nav-tabs li.active:focus{                
                bottom: 6%;
                margin-bottom: -2px;
                left: 50%;
                border: 0px solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
            }

            .nav-tabs li.active:after, .nav-tabs li.active:focus{
                border-bottom-color: #f2f2f2;
                border-width: 6px;
                margin-left: -6px;
                z-index: 1;
            }		

            .nav-tabs > li.active > a,
            .nav-tabs > li.active > a:focus,
            .nav-tabs > li.active > a:hover{				
                border-top:0px solid;
                border-right:0px solid;
                border-left:0px solid;
                border-bottom:1px solid #f2f2f2;				
            }

            .nav-tabs-custom.tab-danger>.nav-tabs>li.active{border-top-color: #f56954;}
            .nav-tabs-custom.tab-success>.nav-tabs>li.active{border-top-color: #00a65a;}
            .nav-tabs-custom.tab-warning>.nav-tabs>li.active{border-top-color: #f39c12;}
            .nav-tabs-custom.tab-default>.nav-tabs>li.active{border-top-color: #ffffff;}


            li.vertical-divider-default-full {
                margin-left: 0px;
                margin-right: 0px;
                height: 50px;
                border: 0;
                border-left: 1px solid #cccccc;
                display: inline-block;
                vertical-align: bottom;
            }

            li.vertical-divider-default {
                top: 10px;
                margin-left: 0px;
                margin-right: 0px;
                height: 30px;
                border: 0;
                border-left: 1px solid #cccccc;
                display: inline-block;
                vertical-align: bottom;
            }

            li.vertical-divider-default-sub {
                top: 6px;
                margin-left: 0px;
                margin-right: 0px;
                height: 30px;
                border: 0;
                border-left: 1px solid #f2f2f2;
                display: inline-block;
                vertical-align: bottom;
            }

            .fixed-container{
                position: fixed;
            }

            .typeahead_wrapper { display: block; height: 30px; }
            .typeahead_photo { float: left; max-width: 30px; max-height: 30px; margin-right: 5px; }
            .typeahead_labels { float: left; height: 30px; }
            .typeahead_primary { font-weight: bold; }
            .typeahead_secondary { font-size: .8em; margin-top: -5px; }
        </style>
        <!-- jQuery 2.1.4 -->

    </head>

    <body class="hold-transition skin-blue layout-top-nav">
        <div class="wrapper">

            <header class="main-header">
                <nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container">
                        <div class="navbar-header">
                            <a href="<?php echo base_url(); ?>beranda" class="navbar-brand">Collaborative Learning</a>
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                                <i class="fa fa-bars"></i>
                            </button>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse pull-left" id="navbar-collapse">                           
                            <form class="navbar-form navbar-left" role="search">
                                <div class="form-group">  
                                    <div class="input-group">
                                        <input class="typeahead form-control" style="width:460%;" type="text" id="navbar-search-input" placeholder="Search Group/User">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                                <!-- /.form group -->
                            </form>
                        </div>
                        <!-- /.navbar-collapse -->
                        <!-- Navbar Right Menu -->
                        <div class="navbar-custom-menu">
                            <ul class="nav navbar-nav">
                                <!-- Messages: style can be found in dropdown.less-->
                                <li class="dropdown messages-menu">
                                    <!-- Menu toggle button -->
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="header-messages-alert">
                                        <i class="fa fa-envelope"></i>
                                        <!--span class="label label-success">4</span-->
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="header"><div id="header-messages-notif"></div></li>
                                        <li>
                                            <!-- inner menu: contains the messages -->
                                            <ul class="menu" id="header-messages"></ul>
                                            <!-- /.menu -->
                                        </li>
                                        <li class="footer"><a href="javascript:void(0)" onclick="mark_all_message()">Mark All</a></li>
                                    </ul>
                                </li>
                                <!-- /.messages-menu -->

                                <li class="dropdown messages-menu">
                                    <!-- Menu toggle button -->
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="header-groups-alert">
                                        <i class="fa fa-users"></i>
                                        <!--span class="label label-success">4</span-->
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="header"><div id="header-groups-notif"></div></li>
                                        <li>
                                            <!-- inner menu: contains the messages -->
                                            <ul class="menu" id="header-groups"></ul>
                                            <!-- /.menu -->
                                        </li>
                                        <li class="footer"><a href="javascript:void(0)" onclick="mark_all_grup()">Mark all</a></li>
                                    </ul>
                                </li>


                                <!-- Notifications Menu -->
                                <li class="dropdown notifications-menu">
                                    <!-- Menu toggle button -->
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="header-notifications-alert">
                                        <i class="fa fa-bell"></i>                                        
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="header"><div id="header-notifications-notif"></div></li>
                                        <li>
                                            <!-- Inner Menu: contains the notifications -->
                                            <ul class="menu" id="header-notifications"></ul>
                                        </li>											
                                        <li class="footer"><a href="javascript:void(0)" onclick="mark_all_notification()">Mark all</a></li>
                                    </ul>
                                </li>
                                <!-- User Account Menu -->
                                <li class="dropdown user user-menu">
                                    <!-- Menu Toggle Button -->
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                        <img class="user-photo user-image" alt="User Image"> 
                                        <span class="hidden-xs hide" id="current_src_image">                                            
                                            <?php echo $this->session->userdata('user')->src_image; ?>
                                        </span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <!-- The user image in the menu -->
                                        <li class="user-header">
                                           <img class="user-photo img-circle" alt="User Image">
                                            <p>
                                                <?php echo $this->session->userdata('user')->nama; ?>
                                                <small id="session_id_user"><?php echo $this->session->userdata('user')->id_user; ?></small>
                                            <div id="id_grup" class="hide"><?php echo $this->session->userdata('user')->id_grup; ?></div>
                                            </p>
                                        </li>                                        
                                        <!-- Menu Footer-->
                                        <li class="user-footer">
                                            <div class="pull-left">
                                                <a href="<?php echo base_url(); ?>setting" class="btn btn-default btn-flat">Setting</a>
                                            </div>
                                            <div class="pull-right">
                                                <a href="/CollaborativeLearning/beranda/logout" class="btn btn-default btn-flat">Sign out</a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!-- /.navbar-custom-menu -->
                    </div>
                    <!-- /.container-fluid -->
                </nav>