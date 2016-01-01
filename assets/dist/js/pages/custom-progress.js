$(document).ready(function () {    
    progress();
//    anouncement();
//    schedule();

});
/*-------------------------------------------Progress Page----------------------------------------------------*/
function progress() {
    getProgress();
    do_progress();
    progress_nav();
    form_progress_edit();
    get_group_info();
    form_comment_progress();
    form_comment_progress_edit();
    form_progress_file_edit();
    comment_nav();
    comment_hide_nav();
    post_file_nav();
    getMember();
    $('.form-progress-edit').hide();
    $('.form-comment-progress-edit').hide();
    $('.form-progress-file-edit').hide();
    $('.comment-hide').hide();
    $(".select2").select2();
}

function progress_navigate() {
    getProgress();
    do_progress();
//    progress_nav();
//    form_progress_edit();
//    get_group_info();
//    form_comment_progress();
//    form_comment_progress_edit();
//    form_progress_file_edit();
//    comment_nav();
//    comment_hide_nav();
//    post_file_nav();
//    getMember();
//    $('.form-progress-edit').hide();
//    $('.form-comment-progress-edit').hide();
//    $('.form-progress-file-edit').hide();
//    $('.comment-hide').hide();
//    $(".select2").select2();
}

function getProgress() {
    function progress_success(object) {
        $('.timeline').html('');
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<li>';
            html += '<i class="fa fa-check-circle-o bg-green"></i>';
            html += '<div class="timeline-item">';
            html += '<div class="box box-solid collapsed-box">';
            html += '<div class="box-header with-border">';
            html += '<h3 class="box-title">' + v.id_user + ' - ' + v.nama + '</h3>';
            html += '<div class="box-tools pull-right">';
            html += '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>';
            html += '<button type="button" class="edit-progress btn btn-box-tool" value="' + v.id_post + '"><i class="fa fa-pencil"></i></button>';
            html += '</div>';//box-tools
            html += '</div>';//box-header
            html += '<div class="box-body" >';
            html += '<form class="form-progress-edit">';
            html += '<div class="form-group">';
            html += '<select name="anggota[]" class="form-control select2" multiple="multiple" data-placeholder="Select a State" style="width: 100%;">';
            if (v.anggota.length > 0) {
                $(v.anggota).each(function (j, w) {
                    var is_found = false;
                    if (v.anggota_post.length > 0) {
                        $(v.anggota_post).each(function (k, x) {
//                            alert(w.id_anggota +' '+ x.id_member +' = '+(w.id_anggota === x.id_member));
                            if (w.id_anggota === x.id_member) {
                                is_found = true;
                            }
                        });
                    }

                    if (is_found === true) {
                        html += '<option value="' + w.id_anggota + '" selected>' + w.nama + '</option>';
                    } else {
                        html += '<option value="' + w.id_anggota + '">' + w.nama + '</option>';
                    }
                });
            }
            html += '</select>';
            html += '</div>';//form-group
            html += '<div class="form-group">';
            html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
            html += '<input type="hidden" class="form-control" name="id_jenis_post" value="' + v.id_jenis_post + '"/>';
            html += '<input type="hidden" class="form-control" name="tanggal_post" value="' + v.tanggal_post + '"/>';
            html += '<textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;">' + v.isi_post + '</textarea>';
            html += '</div>';
            html += '<div class="form-group pull-right">';
            html += '<button type="button" class="cancel btn btn-default" style="margin-right:5px;">Cencel</button>';
            html += '<button type="submit" class="btn btn-primary">Save</button>';
            html += '</div>';
            html += '</form>';
            if (v.anggota_post.length > 0) {
                html += '<p class="isi_post">';
                html += '<strong><i class="fa fa-tags margin-r-5"></i> Tags</strong>';
                $(v.anggota_post).each(function (j, w) {
                    html += '<span class="label label-primary" style="margin-left:5px;">' + w.nama + '</span>';
                });
                html += '</p>';
            }
            html += '<p class="isi_post">' + v.isi_post + '</p>';
            html += progress_file(v.file_post);
            html += '</div>';//box-body
            if (v.comment_post.length > 0) {
                html += '<div class="box-footer box-comments">';
                var comment_show = 1;
                if (v.comment_post.length > comment_show) {

                    html += '<div class="comment-hide-nav box-comment">';
                    html += '<div class="comment-text">';
                    html += '<a href="javascript:void(0)" class="comment-hide-trigger">Lihat semua komentar (' + (v.comment_post.length - comment_show) + ')</a>';
                    html += '</div>';
                    html += '</div>';
                }
                $(v.comment_post).each(function (j, w) {
                    if (v.comment_post.length > comment_show) {
                        if (j < v.comment_post.length - comment_show) {
                            html += '<div class="comment-hide box-comment">';
                        } else {
                            html += '<div class="box-comment">';
                        }
                    } else {
                        html += '<div class="box-comment">';
                    }

                    var dc = new Date(w.tanggal_comment);
                    html += imageCheck(w.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle img-sm" alt="User Image"/>', '<img src="/CollaborativeLearning/' + w.src_image + '" class="img-circle img-sm" alt="User Image"/>');
//                    html += '<img class="img-circle img-sm" src="/CollaborativeLearning/assets/dist/img/default-50x50.gif" alt="User Image">';
                    html += '<div class="comment-text">';
                    html += '<span class="username">';
                    html += w.nama;
                    html += '<span class="comment-nav text-muted pull-right">';
                    html += '<button type="button" class="edit-comment-progress btn btn-box-tool" value="' + w.id_comment_post + '"><i class="fa fa-pencil"></i></button>';
                    html += '<button type="button" class="delete-comment btn btn-box-tool" value="' + w.id_comment_post + '"><i class="fa fa-times"></i></button>';
                    html += '</span>';//comment-nav
                    html += '</span>';//username
                    html += '<span class="text-muted pull-left">';
                    html += dc.getHours() + ':' + dc.getMinutes() + ':' + dc.getSeconds() + ' ' + dc.getDate() + '/' + (dc.getMonth() + 1) + '/' + dc.getFullYear();
                    html += '</span><br/>';//text-muted
                    html += '<form class="form-comment-progress-edit">';
                    html += '<div class="form-group">';
                    html += '<input type="hidden" class="form-control" name="id_comment_post" value="' + w.id_comment_post + '"/>';
                    html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                    html += '<input type="hidden" class="form-control" name="tanggal_comment" value="' + w.tanggal_comment + '"/>';
                    html += '<textarea class="form-control" name="isi_comment" rows="3" placeholder="Enter ..." style="resize: none;">' + w.isi_comment + '</textarea>';
                    html += '</div>';//form-group
                    html += '<div class="form-group pull-right">';
                    html += '<button type="button" class="cancel-comment-progress-edit btn btn-default" style="margin-right:5px;">Cencel</button>';
                    html += '<button type="submit" class="btn btn-primary">Save</button>';
                    html += '</div>';//form-group
                    html += '</form>';//form
                    html += '<p class="isi_comment">' + w.isi_comment + '</p>';
                    if (w.src_file !== null) {
                        html += '<ul class="mailbox-attachments clearfix">';
                        html += '<li>';
                        html += '<span class="mailbox-attachment-icon"><i ' + file_type((w.src_file).toString().split('.')[1]) + '></i></span>';
                        html += '<div class="mailbox-attachment-info">';
                        html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (w.src_file).toString().split('/')[(w.src_file).toString().split('.').length] + '</a>';
                        html += '<span class="mailbox-attachment-size">';
                        html += '<a href="/CollaborativeLearning/' + w.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;"><i class="fa fa-cloud-download"></i></a>';
                        html += '<a href="javascript:void(0)" class="edit-post-file btn btn-default btn-xs"><i class="fa fa-pencil-square"></i></a>';
                        html += '</span>';
                        html += '</div>';
                        html += '</li>';
                        html += '</ul>';
                    }
                    html += '</div>';//comment-text
                    html += '</div>';//box-comment
                });
                html += '</div>';
            }
            html += '<div class="box-footer">';
            html += '<form class="form-comment-progress">';
            html += imageCheck($('#current_src_image').html().trim(), '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-responsive img-circle img-sm" alt="User Image"/>', '<img src="/CollaborativeLearning/' + $('#current_src_image').html().trim() + '" class="img-responsive img-circle img-sm" alt="User Image"/>');
            html += '<div class="input-group margin img-push">';
            html += '<input type="hidden" name="id_post" value="' + v.id_post + '">';
            html += '<input type="text" name="isi_comment" class="form-control input-sm" placeholder="Press enter to post comment">';
            html += '<span class="input-group-btn">';
            html += '<div class="btn btn-default btn-file input-sm btn-flat">';
            html += '<i class="fa fa-paperclip"></i>';
            html += '<input type="file" name="src_file">';
            html += '</div>';//btn
            html += '</span>';//input-group-btn
            html += '</div>';//input-group
            html += '</form>';//form-comment-post
            html += '</div>';//box-footer
            html += '</div>';//box
            html += '</div>';//timeline-item
            html += '</li>';
        });
        $('.timeline').html(html);
    }
    var link = window.location.href.split('?');
    var id_grup = link[1].toString();
    ajaxPro('GET', '/CollaborativeLearning/post/getProgress', id_grup, 'json', false, false, false, false, progress_success, null, null);
}


function getMember() {
    function option_anggota(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_anggota + '">' + v.nama + '</option>';
        });
        $('.assign').html(html);
    }
    ajaxPro('GET', '/CollaborativeLearning/anggota/getMember', 'id_jenis_anggota=JA03', 'json', false, false, false, false, option_anggota, null, null);
}

function do_progress() {
    function progress_success(returndata) {
        progress_navigate();
        $('#form-progress')[0].reset();
    }

    function post_beforeSend() {
    }
    $('#form-progress').submit(function (event) {
        var d = new Date();
        var id_post = '001' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (99 - 10) + 10));
        var id_post_file = '021' + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var id_anggota_post = '022' + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var tanggal_post = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
//        var waktu_post = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        formData.append('id_post', id_post);
        formData.append('id_post_file', id_post_file);
        formData.append('id_anggota_post', id_anggota_post);
        formData.append('tanggal_post', tanggal_post);
        formData.append('id_jenis_post', 'P1112');        
        ajaxLive('POST', '/CollaborativeLearning/post/signUp', formData, null, false, false, false, false, progress_success, null, null, post_beforeSend);
        ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, progress_success, null, null, post_beforeSend);
        ajaxLive('POST', '/CollaborativeLearning/anggota_post/signUp', formData, null, false, false, false, false, progress_success, null, null, post_beforeSend);
        return false;
    });
}

function form_progress_edit() {
    function post_success(returndata) {        
        progress_navigate();
    }
    $('.form-progress-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/anggota_post/deleteAnggotaPost', formData, null, false, false, false, false, post_success, null, null);
        ajaxPro('POST', '/CollaborativeLearning/post/update', formData, null, false, false, false, false, post_success, null, null);
        ajaxPro('POST', '/CollaborativeLearning/anggota_post/signUp', formData, null, false, false, false, false, post_success, null, null);
        return false;
    });
}

function progress_nav() {
    $('.edit-progress').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-progress-edit').show();
        $(this).parent().parent().parent().parent().parent().find('.isi_post').hide();
    });

    $('.cancel').click(function () {
        $(this).parent().parent().parent().find('.form-progress-edit').hide();
        $(this).parent().parent().parent().find('.isi_post').show();
    });
}

function form_comment_progress() {
    function info_success(object) {
        progress_navigate();
        $('.form-comment-progress')[0].reset();
    }
    $('.form-comment-progress').submit(function (event) {
        event.preventDefault();
        
        var d = new Date();
        var id_comment_post = '002' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
        var tanggal_comment = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var formData = new FormData($(this)[0]);
        formData.append('id_comment_post', id_comment_post);
        formData.append('tanggal_comment', tanggal_comment);                
        ajaxPro('POST', '/CollaborativeLearning/comment_post/signUp', formData, null, false, false, false, false, info_success, null, null);
        return false;
    });
}


function progress_file(data) {
    var html = '';
    var verse = data.length - 1;
    if (data.length > 0) {
        $(data).each(function (i, v) {
            if (i === 0) {
                html += '<ul class="mailbox-attachments clearfix">';
                html += '<li>';
                html += '<span class="mailbox-attachment-icon"><i ' + file_type((v.src_file).toString().split('.')[1]) + '></i></span>';
                html += '<div class="mailbox-attachment-info">';
                html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</a>';
                html += '<span class="mailbox-attachment-size">';
                html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;"><i class="fa fa-cloud-download"></i></a>';
                html += '<a href="javascript:void(0)" class="edit-progress-file btn btn-default btn-xs"><i class="fa fa-pencil-square"></i></a>';
                html += '</span>';
                html += '</div>';
                html += '</li>';
                html += '</ul>';
                html += '<form class="form-progress-file-edit">';
                html += '<div class="text-center">';
                html += '<div class="btn-group form-group">';
                html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                html += '<input type="hidden" class="form-control" name="tanggal_file" value="' + v.tanggal_file + '"/>';
                html += '<div class="btn btn-default btn-file">';
                html += '<i class="fa fa-paperclip"></i> Browse';
                html += '<input type="file" name="src_file">';
                html += '</div>';
                html += '<button type="button" class="cancel-post-file-edit btn btn-danger btn-flat">Cencel</button>';
                html += '<button type="submit" class="btn btn-primary btn-flat">Save</button>';
                html += '</div>';
                html += '</div>';
                html += '</form>';
            } else {
                var tf = new Date(v.tanggal_file);
                html += '<blockquote>';
                html += '<p>' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</p>';
                html += '<small>';
                html += concatString(tf.getHours()) + ':' + concatString(tf.getMinutes()) + ':' + concatString(tf.getSeconds()) + ' ' + concatString(tf.getDate()) + '/' + concatString((tf.getMonth() + 1)) + '/' + tf.getFullYear();
                html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-left:2px;"><i class="fa fa-cloud-download"></i></a>';
                html += '</small>';
                html += '</blockquote>';
            }
        });
    }
    return html;
}

function form_comment_progress_edit() {
    function post_success(returndata) {
        student_group_nav();
        progress_navigate();
    }
    $('.form-comment-progress-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/comment_post/update', formData, null, false, false, false, false, post_success, null, null);
        return false;
    });
}

function form_progress_file_edit() {
    function post_success() {
        student_group_nav();
    }
    $('.form-progress-file-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        var d = new Date();
        var id_post_file = '021' + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        formData.append('id_post_file', id_post_file);
        ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, post_success, null, null, null);
        return false;
    });
}

/*-------------------------------------------End of Progress Page----------------------------------------------------*/

