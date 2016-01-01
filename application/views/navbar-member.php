<nav class="navbar" role="navigation" style="top:50px;">
    <div class="container">                        
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
            <ul class="nav navbar-nav">				
                <li class="vertical-divider-default"></li>
                <li id="link-grup"><a href="<?php echo base_url(); ?>grup/index?id_grup=<?php echo $id_grup; ?>">Discussion</a></li>								
                <li class="vertical-divider-default"></li>
                <li id="link-progress"><a href="<?php echo base_url(); ?>progress/index?id_grup=<?php echo $id_grup; ?>">progress</a></li>
                <li class="vertical-divider-default"></li>
                <li id="link-schedule"><a href="<?php echo base_url(); ?>schedule/index?id_grup=<?php echo $id_grup; ?>">Schedule</a></li>
                <li class="vertical-divider-default"></li>
                <li id="link-file"><a href="<?php echo base_url(); ?>file/index?id_grup=<?php echo $id_grup; ?>">Files</a></li>         
                <li class="vertical-divider-default"></li>														
            </ul>

        </div>      

        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu">
                    <form class="navbar-form" role="search">
                        <div class="form-group">                  
                            <div class="input-group">
                                <input type="text" class="search-member form-control" id="navbar-search-input" placeholder="Search in this group"/>
                            </div>
                            <!-- /.input group -->
                        </div>
                        <!-- /.form group -->
                    </form>
                </li>                
            </ul>
        </div>
    </div>
</nav>