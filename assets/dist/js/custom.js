

/*-------------------------------------------Initialization----------------------------------------------------*/
var data_users, data_groups, data_schedules, data_schedules_grup, data_files;

/*-------------------------------------------End of Initialization----------------------------------------------------*/
$('#progress-wall').hide();
function active_url() {
    var link = window.location.href.split('/');
    if (link[4] === 'grup') {
        $("#link-grup").addClass("active");
    } else if (link[4] === 'progress') {
        $("#link-progress").addClass("active");
    } else if (link[4] === 'schedule') {
        $("#link-schedule").addClass("active");
    } else if (link[4] === 'file') {
        $("#link-file").addClass("active");
    } else if (link[4] === 'anouncement') {
        $("#link-anouncement").addClass("active");
    } else if (link[4] === 'myschedule') {
        $("#link-myschedule").addClass("active");
    }
//    $('[rel="tooltip"]').tooltip();

}
/*-------------------------------------------Runner----------------------------------------------------*/
$(document).ready(function () {

    getPhoto();
    active_url();
    form_login();
    form_forgot_password();
    form_reset_password();
    user_admin();
    group_admin();
    student_group();
    progress();
    getHeaderMessages();
    getHeaderGrup();
    getHeaderNotification();
    searchDosen();
    anouncement();
    myschedule();
    schedule();
    message();
    files();
    searchPost();

});
/*-------------------------------------------End of Runner----------------------------------------------------*/


/*-------------------------------------------User Admin----------------------------------------------------*/
function user_admin() {
    $('input[name="tanggal_lahir"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD-MM-YYYY'
        }
    });
    form_user();
    form_user_update();
    prodi_getJSON();
    jenis_user_getJSON();
    data_users();
}

function form_user() {
    function user_success(returndata) {
//        alert(returndata);
    }
    function user_complete(status) {
        $('#form-user').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        data_users.ajax.reload();
        $("#form-user")[0].reset();
        $('#newUser').modal('hide');
//        var $form = $(e.target);
    }

    $('#form-user').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            id_user: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            nama: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tempat_lahir: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tanggal_lahir: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    date: {
                        format: 'DD-MM-YYYY'
//                        separator: '.'
                    }
//                    callback: {
//                        message: 'The end date must be more grather from start and current date',
//                        callback: function (value, validator, $field) {
//                            var start = new Date($('#form-schedule-update input[name=tanggal_mulai]').val());
//                            var end = new Date($('#form-schedule-update input[name=tanggal_selesai]').val());
//                            var now = new Date();
//                            var status = testDate(end.getTime() > start.getTime());
//                            return status;
//                        }
//                    }
                }
            },
            telp: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    digits: {
                        message: 'Number required'
                    }
                }
            },
            email: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'The value is not a valid email address'
                    }
                }
            },
            id_prodi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            id_jenis_user: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-user').submit(function (event) {

            //disable the default form submission
            event.preventDefault();
            //grab all form data  
            var formData = new FormData($(this)[0]);
            formData.append('tanggal_lahir', dateFormatInput($('#form-user input[name="tanggal_lahir"]').val()));
            ajaxPro('POST', '/CollaborativeLearning/users/signUp', formData, null, false, false, false, false, user_success, error_messages, user_complete);
            return false;
        });
    });
}


function data_users() {
    data_users = $('#data-users').DataTable({
        ajax: '/CollaborativeLearning/users/getJSON',
        columns: [{
                "data": "id_user"
            }, {
                "data": "nama"
            }, {
                "data": "nama_prodi"
            }, {
                "data": "keterangan_jenis_user"
            }, {
                "data": "id_user",
                "render": function (data, type, row) {
                    var html = '<center><div class="btn-group">';
                    html += '<button type="button" class="detail btn btn-primary" value="' + data + '" data-toggle="tooltip" data-placement="top" title="Detail User Info"><i class="fa fa-search"></i> Detail</button>';
                    html += '<button type="button" class="btn btn-primary" onclick="user_update(this);" value="' + data + '" data-toggle="tooltip" data-placement="top" title="Update Data User"><i class="fa fa-pencil-square-o"></i>Update</button>';
                    html += '<button type="button" class="btn btn-primary" onclick="user_del(this);" value="' + data + '" data-toggle="tooltip" data-placement="top" title="Delete Data User"><i class="fa fa-trash-o"></i> Delete</button>';
                    html += '</div></center>';
                    return html;
                    //return "<center><button class='update btn btn-primary' onclick='update(this);' value='"+data+"' data-toggle='modal' data-target='#myModal'> <i class='fa fa-update'></i> update</button></center>";
                }
            }],
        "aLengthMenu": [[10, 50, -1], [10, 50, "All"]],
        "pageLength": 10
    });
    $('#data-users tbody').on('click', 'td .detail', function () {
        var tr = $(this).closest('tr');
        var row = data_users.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
}



function format(d) {
    var html = '<div class="box-body no-padding">';
    html += '<ul class="nav nav-pills nav-stacked">';
    html += '<li><a href="javascript:void(0)"><i class="fa fa-circle-o text-aqua"></i> <span style="padding-right:80px;">Tempat Lahir </span> : ' + d.tempat_lahir + '</a></li>';
    html += '<li><a href="javascript:void(0)"><i class="fa fa-circle-o text-aqua"></i> <span style="padding-right:78px;">Tanggal Lahir </span> : ' + dateFormatOutput(d.tanggal_lahir) + '</a></li>';
    html += '<li><a href="javascript:void(0)"><i class="fa fa-circle-o text-aqua"></i> <span style="padding-right:115px;">Telepon </span> : ' + d.telp + '</a></li>';
    html += '<li><a href="javascript:void(0)"><i class="fa fa-circle-o text-aqua"></i> <span style="padding-right:93px;">Email Lahir </span> : ' + d.email + '</a></li>';
    html += '</ul>';
    html += '</div>';
    return html;
}

function user_update(i) {
    $.ajax({
        type: "GET",
        url: "/CollaborativeLearning/users/getUser",
        data: "id_user=" + $(i).val(),
        dataType: "json",
        success: function (object) {
//            var res = (object.tanggal_lahir).split("-");
//            var newDate = res[2] + '/' + res[1] + '/' + res[0];
            $('#updateUser input[name=id_user]').val(object.id_user);
            $('#updateUser input[name=nama]').val(object.nama);
            $('#updateUser input[name=tempat_lahir]').val(object.tempat_lahir);
            $('#updateUser input[name=tanggal_lahir]').val(dateFormatOutput(object.tanggal_lahir));
            $('#updateUser input[name=telp]').val(object.telp);
            $('#updateUser input[name=email]').val(object.email);
            $('#updateUser select[name=id_prodi]').val(object.id_prodi);
            $('#updateUser select[name=id_jenis_user]').val(object.id_jenis_user);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        },
        complete: function (status) {
            $('#updateUser').modal('show');
        }
    });
}

function form_user_update() {
    function user_success(returndata) {
//        alert(returndata);
    }
    function user_complete(status) {
        $('#form-user-update').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        data_users.ajax.reload();
        $("#form-user-update")[0].reset();
        $('#updateUser').modal('hide');
    }

    $('#form-user-update').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            id_user: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            nama: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tempat_lahir: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tanggal_lahir: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    date: {
                        format: 'DD-MM-YYYY'
//                        separator: '.'
                    }
//                    callback: {
//                        message: 'The end date must be more grather from start and current date',
//                        callback: function (value, validator, $field) {
//                            var start = new Date($('#form-schedule-update input[name=tanggal_mulai]').val());
//                            var end = new Date($('#form-schedule-update input[name=tanggal_selesai]').val());
//                            var now = new Date();
//                            var status = testDate(end.getTime() > start.getTime());
//                            return status;
//                        }
//                    }
                }
            },
            telp: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    digits: {
                        message: 'Number required'
                    }
                }
            },
            email: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'The value is not a valid email address'
                    }
                }
            },
            id_prodi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            id_jenis_user: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-user-update').submit(function (event) {

            //disable the default form submission
            event.preventDefault();
            //grab all form data  
            var formData = new FormData($(this)[0]);
            formData.append('tanggal_lahir', dateFormatInput($('#form-user-update input[name="tanggal_lahir"]').val()));
            ajaxPro('POST', '/CollaborativeLearning/users/update', formData, null, false, false, false, false, user_success, error_messages, user_complete);
            return false;
        });
    });

//    $('#form-user-update').submit(function (event) {
//
//        //disable the default form submission
//        event.preventDefault();
//        //grab all form data  
//        var formData = new FormData($(this)[0]);
//        $.ajax({
//            url: "/CollaborativeLearning/users/update",
//            type: 'POST',
//            data: formData,
//            async: false,
//            cache: false,
//            contentType: false,
//            processData: false,
//            beforeSend: function () {
//            },
//            success: function (returndata) {
////                alert(returndata);
//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//                //notify("warning", xhr.responseText, "glyphicon glyphicon-remove");                
//            },
//            complete: function (status) {
//                data_users.ajax.reload();
//                $('#updateUser').modal('hide');
//            }
//        });
//        return false;
//    });
}

function user_del(i) {
    var id = "id_user=" + $(i).val();
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act == true) {
        $.ajax({
            type: "POST",
            url: "/CollaborativeLearning/users/delete",
            data: id,
            success: function (returndata) {
                //data-users.ajax.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            },
            complete: function (status) {
                data_users.ajax.reload();
            }
        });
    }
}
/*-------------------------------------------End of User Admin----------------------------------------------------*/




/*-------------------------------------------Group Admin----------------------------------------------------*/
function group_admin() {
    //form_group();
    //form_group_update();
    data_groups();
    form_group();
    form_group_update();
    form_member_update();
    $("#form-member-update .anggota").select2();
}

function error_messages(xhr, ajaxOptions, thrownError) {
    alert(xhr.responseText);
}

function complete_group() {
    data_groups.ajax.reload();
    $("#form-group")[0].reset();
    $("#form-group select[name=pembimbing_1]").select2('val', $("#form-group select[name=pembimbing_1] option:first").val());
    $("#form-group select[name=pembimbing_2]").select2('val', $("#form-group select[name=pembimbing_2] option:first").val());
    var $form = $(e.target);
}

function success(returndata) {
//    alert(returndata);
}

function ajaxPro(type, url, data, dataType, async, cache, contentType, processData, success, error, complete) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: dataType,
        async: async,
        cache: cache,
        contentType: contentType,
        processData: processData,
        success: success,
        error: error,
        complete: complete
    });
}

function ajaxLive(type, url, data, dataType, async, cache, contentType, processData, success, error, complete, beforeSend) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: dataType,
        async: async,
        cache: cache,
        contentType: contentType,
        processData: processData,
        beforeSend: beforeSend,
        success: success,
        error: error,
        complete: complete
    });
}

function ajaxDel(type, url, data, success, error, complete, beforeSend) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        beforeSend: beforeSend,
        success: success,
        error: error,
        complete: complete
    });
}

function ajaxDelLive(type, url, data, success, error, complete) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        success: success,
        error: error,
        complete: complete
    });
}


function notify(type, message, icon) {
    $.notify({
        // options
        icon: icon,
//        title: 'Bootstrap notify',
        message: message
//        url: 'https://github.com/mouse0270/bootstrap-notify',
//        target: '_blank'
    }, {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 3000,
        timer: 1000,
//        url_target: '_blank',
//        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        }
//        onShow: null,
//        onShown: null,
//        onClose: null,
//        onClosed: null,
//        icon_type: 'class',
//        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
//    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
//    '<span data-notify="icon"></span> ' +
//    '<span data-notify="title">{1}</span> ' +
//    '<span data-notify="message">{2}</span>' +
//    '<div class="progress" data-notify="progressbar">' +
//    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
//    '</div>' +
//    '<a href="{3}" target="{4}" data-notify="url"></a>' +
//    '</div>' 
    });
}
function concatString(val) {
    if (val.toString().length === 1) {
        val = '0' + val;
    }
    return val;
}

function form_group() {
    $('#form-group').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        var d = new Date();
        var id_grup = d.getFullYear() + '' + concatString((d.getMonth() + 1)) + '' + concatString(d.getDate()) + '' + concatString(d.getHours()) + '' + concatString(d.getMinutes()) + '' + concatString(d.getSeconds()) + '' + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var current_date = d.getFullYear() + '/' + concatString((d.getMonth() + 1)) + '/' + concatString(d.getDate());
        formData.append('id_grup', id_grup);
        formData.append('tanggal', current_date);
        ajaxPro('POST', '/CollaborativeLearning/grup/signUp', formData, null, false, false, false, false, null, error_messages, complete_group);
        $('#newGroup').modal('hide');
        return false;
    });
}


function data_groups() {
    data_groups = $('#data-groups').DataTable({
        ajax: '/CollaborativeLearning/grup/getJSON',
        columns: [{
                "data": "id_grup",
                "render": function (data, type, row) {
                    return "<center>" + data + "</center>";
                }
            }, {
                "data": "nama_grup"
            }, {
                "data": "tanggal_buat",
                "render": function (data, type, row) {
                    return "<center>" + dateFormatOutput(data) + "</center>";
                }
            }, {
                "data": "jumlah_anggota",
                "render": function (data, type, row) {
                    return "<center>" + data + "</center>";
                }
            }, {
                "data": "id_grup",
                "render": function (data, type, row) {
                    var html = '<center><div class="btn-group">';
                    html += '<button type="button" class="detail btn btn-primary" value="' + data + '" rel="tooltip" data-placement="top" title="Detail Group Info"><i class="fa fa-search"></i> Detail</button>';
                    html += '<button type="button" class="btn btn-primary" onclick="group_update(this);" value="' + data + '" rel="tooltip" data-placement="top" title="Update Data Group"><i class="fa fa-pencil-square-o"></i>Update</button>';
                    html += '<button type="button" class="btn btn-primary" onclick="group_del(this);" value="' + data + '" rel="tooltip" data-placement="top" title="Delete Data Group"><i class="fa fa-trash-o"></i> Delete</button>';
                    html += '</div></center>';
                    return html;
                }
            }],
        "aLengthMenu": [[10, 50, -1], [10, 50, "All"]],
        "pageLength": 10
    });
    $('#data-groups tbody').on('click', 'td .detail', function () {
        var tr = $(this).closest('tr');
        var row = data_groups.row(tr);
        if (row.child.isShown()) {
// This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
// Open this row
            row.child(format_group(row.data())).show();
            tr.addClass('shown');
        }
    });
}

function format_group(d) {
    var html = '<table class="table table-bordered">';
    html += '<tr>';
    html += '<th width="10%"><center> NIM/NIP </center></th>';
    html += '<th><center> Nama </center></th>';
    html += '<th><center> Program Studi </center></th>';
    html += '<th><center> Keterangan </center></th>';
    html += '<th width="5%"><center><button type="button" onclick="member_group_update(this)" value="' + d.id_grup + '" class="new-member btn btn-primary"><i class="fa fa-user-plus"></i></button></center></th>';
    html += '</tr>';
    $(d.anggota).each(function (i, v) {
        html += '<tr>';
        html += '<td>' + v.id_user + '</td>';
        html += '<td>' + v.nama + '</td>';
        html += '<td>' + v.nama_prodi + '</td>';
        html += '<td>' + v.keterangan_jenis_anggota + '</td>';
        html += '<td><center><button type="button" class="detail-member btn btn-primary" onclick="member_group_del(this)" value="' + v.id_anggota + '"><i class="fa fa-user-times"></i></button></center></td>';
        html += '</tr>';
    });
    html += '</table>';
    return html;
}


function group_update(i) {

    function group_update_succes(object) {
        $('#updateGroup input[name=id_grup]').val(object.id_grup);
        $('#updateGroup input[name=tanggal]').val(object.tanggal_buat);
        $('#updateGroup input[name=nama_grup]').val(object.nama_grup);
//        $('#updateGroup .anggota').select2('val', temp);
    }

    var id_grup = "id_grup=" + $(i).val();
//    ajaxPro('GET', '/CollaborativeLearning/users/getUserByJenisUser', 'id_jenis_user=11333', 'JSON', false, false, false, false, option_pembimbing, error_messages, null);
//    ajaxPro('GET', '/CollaborativeLearning/users/getFreeUserAndMemberByJenisUser', 'id_jenis_user=22555&' + id_grup, 'JSON', false, false, false, false, option_anggota, error_messages, null);
    ajaxPro('GET', '/CollaborativeLearning/grup/getGroup', id_grup, 'json', false, false, false, false, group_update_succes, error_messages, null);
    $('#updateGroup').modal('show');
}

function form_group_update() {
    function update_success(returndata) {
        data_groups.ajax.reload();
        $('#form-group-update')[0].reset();
        $('#updateGroup').modal('hide');
    }

    $('#form-group-update').submit(function (event) {
        var temp = [];
        event.preventDefault();
        var id_grup = "id_grup=" + $('input[name=id_grup]').val();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/grup/update', formData, null, false, false, false, false, update_success, error_messages, null);
        return false;
    });
}

function member_group_update(i) {
    function option_pembimbing(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_user + '">' + v.nama + '</option>';
        });
        $('select[name=id_user]').html(html);
        $('select[name=id_user]').select2('val', $('select[name=id_user] option:eq(0)').val());
    }

    function option_keterangan_pembimbing(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_jenis_anggota + '">' + v.keterangan_jenis_anggota + '</option>';
        });
        $('select[name=id_jenis_anggota]').html(html);
        $('select[name=id_jenis_anggota]').select2('val', $('select[name=id_jenis_anggota] option:eq(0)').val());
    }
    function option_anggota(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_user + '">' + v.id_user + ' - ' + v.nama + '</option>';
        });
        $('.anggota').html(html);
    }
    $('#member-group-update').modal('show');
    $('#form-member-update input[name=id_grup]').val($(i).val());
    ajaxPro('GET', '/CollaborativeLearning/users/getFreeUserByJenisUser', 'id_jenis_user=22555', 'JSON', false, false, false, false, option_anggota, error_messages, null);
    ajaxPro('GET', '/CollaborativeLearning/anggota/getAvailableLecturer', 'id_grup=' + $(i).val(), 'JSON', false, false, false, false, option_pembimbing, error_messages, null);
    ajaxPro('GET', '/CollaborativeLearning/jenis_anggota/getAvailable', 'id_grup=' + $(i).val(), 'JSON', false, false, false, false, option_keterangan_pembimbing, error_messages, null);
}

function form_member_update() {
    function member_success(object) {
//        alert(object);
        data_groups.ajax.reload();
        $('#form-member-update')[0].reset();
        $('#member-group-update').modal('hide');
    }
    $('#form-member-update').submit(function (event) {
        event.preventDefault();
        var val = $('#form-member-update input[name=jenis_anggota]:checked').val().toString();
        var d = new Date();
        var current_date = d.getFullYear() + '/' + concatString((d.getMonth() + 1)) + '/' + concatString(d.getDate()) + ' ' + concatString(d.getHours()) + ':' + concatString(d.getMinutes()) + ':' + concatString(d.getSeconds());
        var formData = new FormData($(this)[0]);
        formData.append('tanggal', current_date);
        switch (val) {
            case '11333':
                ajaxPro('POST', '/CollaborativeLearning/anggota/updateLecturer', formData, null, false, false, false, false, member_success, error_messages, null);
                break;
            case '22555':
                ajaxPro('POST', '/CollaborativeLearning/anggota/signUpMember', formData, null, false, false, false, false, member_success, error_messages, null);
                break;
            default:
                alert('Nobody Wins!');
                break;
        }
        return false;
    });
    $('#lecturer').show();
    $('#member').hide();
    $('#form-member-update input[name=jenis_anggota]').change(function () {
        switch ($(this).val()) {
            case '11333':
                $('#lecturer').show();
                $('#member').hide();
                break;
            case '22555':
                $('#lecturer').hide();
                $('#member').show();
                break;
            default:
                alert('Nobody Wins!');
                break;
        }
    });
}

function member_group_del(i) {
    function group_del_complete(status) {
//        notify('success', 'Delete success', null);
        data_groups.ajax.reload();
    }
    var id_anggota = "id_anggota=" + $(i).val();
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxDel('POST', '/CollaborativeLearning/anggota/deleteAnggota', id_anggota, null, error_messages, group_del_complete);
    }
}

function group_del(i) {
    function group_del_complete(status) {
        notify('success', 'Delete success', null);
        data_groups.ajax.reload();
    }
    var id_grup = "id_grup=" + $(i).val();
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxDel('POST', '/CollaborativeLearning/anggota/deleteByIdGroup', id_grup, null, error_messages, null);
        ajaxDel('POST', '/CollaborativeLearning/grup/delete', id_grup, null, error_messages, group_del_complete);
    }
}
/*-------------------------------------------End of Group Admin----------------------------------------------------*/

/*-------------------------------------------Group Student----------------------------------------------------*/
function student_group() {
    var link = window.location.href.split('/');
    if (link[4] === 'grup') {
        searchMember();
        get_post();
        do_post();
        form_post_edit();
        get_group_info();
        form_comment_post();
        form_comment_post_edit();
        form_post_file_edit();
        post_nav();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        post_file_nav();
        $('.form-post-edit').hide();
        $('.form-comment-post-edit').hide();
        $('.form-post-file-edit').hide();
        $('.comment-hide').hide();
        $('.file-hide').hide();
    }
}

function student_group_nav() {
    var link = window.location.href.split('/');
    if (link[4] === 'grup') {
        get_post();
        form_post_edit();
        form_comment_post();
        form_comment_post_edit();
        form_post_file_edit();
        post_nav();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        post_file_nav();
        $('.form-comment-post-edit').hide();
        $('.isi_comment').show();
        $('.form-post-edit').hide();
        $('.form-post-file-edit').hide();
        $('.isi_post').show();
        $('.comment-hide').hide();
        $('.file-hide').hide();
    }
}

function comment_hide_nav() {
    $('.comment-hide-trigger').click(function () {
        $(this).parent().parent().parent().find('.comment-hide').show();
        $(this).parent().parent().parent().find('.comment-hide-nav').hide();
        return false;
    });
}

function file_hide_nav() {
    $('.file-hide-trigger').click(function () {
        $(this).parent().parent().find('.file-hide').show();
        $(this).parent().parent().find('.file-hide-trigger').hide();
        return false;
    });
}

function get_post() {
    function post_success(object) {
        $('#content-wall').html('');
        var html = '';
        if (object.data.length > 0) {
            $(object.data).each(function (i, v) {
                var d = new Date(v.tanggal_post);
                html += '<div class="box box-widget">';
                html += '<div class="box-header with-border">';
                html += '<div class="user-block">';
                html += imageCheck(v.photo, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle user-image" alt="User Image"/>', '<img src="/CollaborativeLearning/' + v.photo + '" class="img-circle user-image" alt="User Image"/>');
                html += '<span class="username"><a href="#">' + v.nama + '</a></span>';
                html += '<span class="description">' + dateTimeFormatOutput(v.tanggal_post) + '</span>';
                html += '</div>';
                html += '<div class="pull-right box-tools">';
                html += '<div class="btn-group">';
                if ($('#session_id_user').html() === v.id_user) {
                    html += '<button type="button" class="btn btn-box-tool" data-toggle="dropdown" rel="tooltip" data-placement="top" title="Option">';
                    html += '<i class="fa fa-bars"></i>';
                    html += '</button>';
                }
                html += '<ul class="dropdown-menu pull-right" role="menu">';
                html += '<li><a href="javascript:void(0)" class="edit-post">Edit Post<span class="hide">' + v.id_post + '</span></a></li>';
                html += '<li class="divider"></li>';
                html += '<li><a href="javascript:void(0)" class="delete-post">Delete Post<span class="hide">' + v.id_post + '</span></a></li>';
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="box-body">';
                html += '<form class="form-post-edit">';
                html += '<div class="form-group">';
                html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                html += '<input type="hidden" class="form-control" name="id_jenis_post" value="' + v.id_jenis_post + '"/>';
                html += '<input type="hidden" class="form-control" name="tanggal_post" value="' + v.tanggal_post + '"/>';
                html += '<textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;">' + v.isi_post + '</textarea>';
                html += '</div>';
                html += '<div class="form-group pull-right">';
                html += '<button type="button" class="cancel btn btn-default" style="margin-right:5px;">Cancel</button>';
                html += '<button type="submit" class="btn btn-primary">Save</button>';
                html += '</div>';
                html += '</form>';
                html += '<p class="isi_post">' + v.isi_post + '</p>';
                html += post_file(v.file_post);
                html += '</div>';
                if (v.comment_post.length > 0) {
                    html += '<div class="box-footer box-comments">';
                    var comment_show = 1;
                    if (v.comment_post.length > comment_show) {

                        html += '<div class="comment-hide-nav box-comment">';
                        html += '<div class="comment-text">';
                        html += '<a href="javascript:void(0)" class="comment-hide-trigger">View All Comments (' + (v.comment_post.length - comment_show) + ')</a>';
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
                        if ($('#session_id_user').html() === w.id_user) {
                            html += '<button type="button" class="edit-comment btn btn-box-tool" value="' + w.id_comment_post + '" data-toggle="tooltip" data-placement="top" title="Edit Comment"><i class="fa fa-pencil"></i></button>';
                            html += '<button type="button" class="delete-comment btn btn-box-tool" value="' + w.id_comment_post + '" data-toggle="tooltip" data-placement="top" title="Delete Comment"><i class="fa fa-times"></i></button>';
                        }
                        html += '</span>'; //comment-nav
                        html += '</span>'; //username
                        html += '<span class="text-muted pull-left">';
                        html += dc.getHours() + ':' + dc.getMinutes() + ':' + dc.getSeconds() + ' ' + dc.getDate() + '/' + (dc.getMonth() + 1) + '/' + dc.getFullYear();
                        html += '</span><br/>'; //text-muted
                        html += '<form class="form-comment-post-edit">';
                        html += '<div class="form-group">';
                        html += '<input type="hidden" class="form-control" name="id_comment_post" value="' + w.id_comment_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="tanggal_comment" value="' + w.tanggal_comment + '"/>';
                        html += '<textarea class="form-control" name="isi_comment" rows="3" placeholder="Enter ..." style="resize: none;">' + w.isi_comment + '</textarea>';
                        html += '</div>'; //form-group
                        html += '<div class="form-group pull-right">';
                        html += '<button type="button" class="cancel-comment-post-edit btn btn-default" style="margin-right:5px;">Cancel</button>';
                        html += '<button type="submit" class="btn btn-primary">Save</button>';
                        html += '</div>'; //form-group
                        html += '</form>'; //form
                        html += '<p class="isi_comment">' + w.isi_comment + '</p>';
                        if (w.src_file !== null) {
                            if (file_image((w.src_file).toString().split('.')[(w.src_file).toString().split('.').length - 1]) === true) {
                                html += '<img class="img-responsive" src="/CollaborativeLearning/' + w.src_file + '" alt="Photo">';
                            } else {
                                html += '<ul class="mailbox-attachments clearfix">';
                                html += '<li>';
                                html += '<span class="mailbox-attachment-icon"><i ' + file_type((w.src_file).toString().split('.')[1]) + '></i></span>';
                                html += '<div class="mailbox-attachment-info">';
                                html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (w.src_file).toString().split('/')[(w.src_file).toString().split('.').length] + '</a>';
                                html += '<span class="mailbox-attachment-size">';
                                html += '<a href="/CollaborativeLearning/' + w.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
//                            if ($('#session_id_user').html() === v.id_user) {
//                                html += '<a href="javascript:void(0)" class="edit-post-file btn btn-default btn-xs"><i class="fa fa-pencil-square"></i></a>';
//                            }
                                html += '</span>';
                                html += '</div>';
                                html += '</li>';
                                html += '</ul>';
                            }

                        }
                        html += '</div>'; //comment-text
                        html += '</div>'; //box-comment
                    });
                    html += '</div>';
                }
                html += '<div class="box-footer">';
                html += '<form class="form-comment-post">';
                html += imageCheck($('#current_src_image').html().trim(), '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-responsive img-circle img-sm" alt="User Image"/>', '<img src="/CollaborativeLearning/' + $('#current_src_image').html().trim() + '" class="img-responsive img-circle img-sm" alt="User Image"/>');
                html += '<div class="input-group margin img-push">';
                html += '<input type="hidden" name="id_post" value="' + v.id_post + '">';
                html += '<input type="text" name="isi_comment" class="form-control input-sm" placeholder="Press enter to post comment">';
                html += '<span class="input-group-btn">';
                html += '<div class="btn btn-default btn-file input-sm btn-flat">';
                html += '<i class="fa fa-paperclip"></i> <span class="file-changed"></span>';
                html += '<input type="file" name="src_file" onchange="setFileValComment(this);" onselect="setFileValComment(this);">';
                html += '</div>';
                html += '</span>';
                html += '</div>';
                html += '</form>';
                html += '</div>';
                html += '</div>';
            });
        } else {
            html += '<div class="error-page" id="content-null">';
            html += '<div class="error-content">';
            html += '<h3><i class="fa fa-warning text-yellow"></i> Oops! Discussion not found.</h3>';
            html += '<p>Please contact your student to confirm it</p>';
            html += '</div>';
            html += '</div>';

        }
        $('#content-wall').html(html);
    }

    var id_grup = window.location.href.split('?')[1].toString();
    ajaxPro('GET', '/CollaborativeLearning/post/getPost', id_grup, 'json', false, false, false, false, post_success, null, null);
}

function do_post() {
    function post_success(returndata) {
        student_group_nav();
        $('#form-post')[0].reset();
//        $('#content-wall').hide(function () {
//            setInterval(function () {
//                get_post();
//                $('#progress-wall').hide();
//                $('#content-wall').fadeIn();
//                $('.form-post-edit').hide();
////                notify('success', 'Input data success', null);
//            }, 2000);
//        });
    }

    function post_beforeSend() {
    }
    $('#form-post').submit(function (event) {
        var d = new Date();
        var id_post = '001' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var id_post_file = '021' + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var tanggal_post = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        formData.append('id_post', id_post);
        formData.append('id_post_file', id_post_file);
        formData.append('tanggal_post', tanggal_post);
        formData.append('id_jenis_post', 'P1111');

        var id_grup = window.location.href.split('?')[1].toString().split('=')[1];
        ajaxLive('GET', '/CollaborativeLearning/anggota/getSelectedUser', 'id_grup=' + id_grup, 'json', false, false, false, false, getSelectedUser, error_messages, complete_group, post_beforeSend);
        function getSelectedUser(object) {
            if ((!is_empty($('input[name="src_file"]').val()) && is_empty($('textarea[name="isi_post"]').val())) || (!is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val())) || (is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val()))) {
                formData.append('id_anggota', object.data.id_anggota);
                ajaxLive('POST', '/CollaborativeLearning/post/signUp', formData, null, false, false, false, false, post_success, error_messages, complete_group, post_beforeSend);
                ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, post_success, error_messages, complete_group, post_beforeSend);
                $('#form-post').find('.file-changed').html('Attachment');

                var url = '/CollaborativeLearning/search/search_post?id_post=' + id_post + '&id_grup=' + id_grup;
                do_notification(formData, 'CN001', post_success, url, id_grup);
            }
        }
        return false;
    });
}

function is_empty(v) {
    if (v.trim() === null || v.trim() === "") {
        return true;
    } else {
        return false;
    }

}

function post_nav() {
    $('.edit-post').click(function () {
//        alert($(this).parent().parent().parent().parent().parent().parent().html());
        $(this).parent().parent().parent().parent().parent().parent().find('.form-post-edit').show();
        $(this).parent().parent().parent().parent().parent().parent().find('.isi_post').hide();
        return false;
    });
    $('.delete-post').click(function () {
        delete_post($(this).find('.hide').html());
        return false;
    });
    $('.cancel').click(function () {
        $(this).parent().parent().parent().find('.form-post-edit').hide();
        $(this).parent().parent().parent().find('.isi_post').show();
    });
}

function form_post_edit() {
    function post_success(returndata) {
        student_group_nav();
        search_post_nav();
    }
    $('.form-post-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/post/update', formData, null, false, false, false, false, post_success, error_messages, null);
        return false;
    });
}

function delete_post(i) {
    function post_success(returndata) {
        student_group_nav();
        search_post_nav();
    }

    function post_beforeSend() {

    }
    var id_post = "id_post=" + i;
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxDelLive('POST', '/CollaborativeLearning/post/delete', id_post, post_success, null, null, post_beforeSend);
        return false;
    }
}

function imageCheck(data, emptyUrl, issetUrl) {
    var url = '';
    if (data === null || data === '') {
        url = emptyUrl;
    } else {
        url = issetUrl;
    }
    return url;
}

function file_type(data) {
    var html = '';
    if (data === 'xlsx' || data === 'xls') {
        html = 'class="fa fa-file-excel-o" style="color:#00a65a"';
    } else if (data === 'docx' || data === 'doc') {
        html = 'class="fa fa-file-word-o" style="color:#3c8dbc"';
    } else if (data === 'pptx' || data === 'ppt') {
        html = 'class="fa fa-file-powerpoint-o" style="color:#f39c12"';
    } else if (data === 'pdf') {
        html = 'class="fa fa-file-pdf-o" style="color:#f56954"';
    } else if (data === 'rar' || data === 'zip') {
        html = 'class="fa fa-file-archive-o" style="color:#605ca8"';
    } else if (data === 'txt') {
        html = 'class="fa fa-file-text-o"';
    } else {
        html = 'class="fa fa fa-file-o"';
    }
    return html;
}

function file_image(l) {
    var a = ["jpeg", "jpg", "png"];
    var status = false;
    $(a).each(function (i, v) {
        if (v === l) {
            status = true;
        }
    });
    return status;
}

function post_file(data) {
    var html = '';
    var comment_show = 2;
    var verse = data.length - 1;
    if (data.length > 0) {
        $(data).each(function (i, v) {
            if (i === 0) {
                if (file_image((v.src_file).toString().split('.')[(v.src_file).toString().split('.').length - 1]) === true) {
                    html += '<img class="img-responsive pad" src="/CollaborativeLearning/' + v.src_file + '" alt="Photo">';
                } else {
                    html += '<ul class="mailbox-attachments clearfix">';
                    html += '<li>';
                    html += '<span class="mailbox-attachment-icon"><i ' + file_type((v.src_file).toString().split('.')[1]) + '></i></span>';
                    html += '<div class="mailbox-attachment-info">';
                    html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</a>';
                    html += '<span class="mailbox-attachment-size">';
                    html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
                    if ($('#session_id_user').html() === v.id_user) {
                        html += '<a href="javascript:void(0)" class="edit-post-file btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Upload Revision File"><i class="fa fa-pencil-square"></i></a>';
                    }
                    html += '</span>';
                    html += '</div>';
                    html += '</li>';
                    html += '</ul>';
                    html += '<form class="form-post-file-edit">';
                    html += '<div class="text-center">';
                    html += '<div class="btn-group form-group">';
                    html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                    html += '<input type="hidden" class="form-control" name="tanggal_file" value="' + v.tanggal_file + '"/>';
                    html += '<div class="btn btn-default btn-file">';
                    html += '<i class="fa fa-paperclip"></i> Browse';
                    html += '<input type="file" name="src_file">';
                    html += '</div>';
                    html += '<button type="button" class="cancel-post-file-edit btn btn-danger btn-flat">Cancel</button>';
                    html += '<button type="submit" class="btn btn-primary btn-flat">Save</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</form>';
                    if (data.length > comment_show) {
                        html += '<a href="javascript:void(0)" class="file-hide-trigger">View All Attachment (' + (data.length - comment_show) + ')</a>';
                    }
                }


            } else {
                var tf = new Date(v.tanggal_file);
                if (data.length > comment_show) {
                    if (i <= data.length - (comment_show)) {
                        html += '<blockquote class="file-hide">';
                    } else {
                        html += '<blockquote>';
                    }
                } else {
                    html += '<blockquote>';
                }
//                html += '<blockquote>';
                html += '<p>' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</p>';
                html += '<small>';
                html += concatString(tf.getHours()) + ':' + concatString(tf.getMinutes()) + ':' + concatString(tf.getSeconds()) + ' ' + concatString(tf.getDate()) + '/' + concatString((tf.getMonth() + 1)) + '/' + tf.getFullYear();
                html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-left:2px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
                html += '</small>';
                html += '</blockquote>';
            }
        });
    }
    return html;
}

function post_file_nav() {
    $('.edit-post-file').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-post-file-edit').show();
        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').hide();
    });
    $('.cancel-post-file-edit').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-post-file-edit').hide();
        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').show();
    });
}

function form_post_file_edit() {
    function post_success() {
        student_group_nav();
        search_post_nav();
    }
    $('.form-post-file-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        var d = new Date();
        var id_post_file = '021' + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        formData.append('id_post_file', id_post_file);
        ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, post_success, null, null, null);
        return false;
    });
}

function get_group_info() {

    function info_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            if (v.id_jenis_user === '22555') {
                html += '<li>';
                html += imageCheck(v.foto_user, '<img src="/CollaborativeLearning/assets/dist/img/default.png" alt = "User Image"/>', '<img src="/CollaborativeLearning/' + v.foto_user + '" alt = "User Image"/>');
                html += '<a class = "users-list-name" href = "#"> ' + v.nama + ' </a>';
                html += '<span class = "users-list-date users-list-name" > ' + v.keterangan_jenis_anggota + ' </span>';
                html += '</li>';
            }
        });
        $('.users-list').html(html);
        var tf = new Date(object.tanggal_buat);
        var tanggal_buat = concatString(tf.getDate()) + '/' + concatString((tf.getMonth() + 1)) + '/' + tf.getFullYear();
        $('#jumlah_anggota').html(object.jumlah_anggota);
        $('.tanggal_buat').html(tanggal_buat);
        $('.nama_grup').html(object.nama_grup);
        $('.id_grup').html(object.id_grup);
        $('#foto_grup').css('background', 'url(/CollaborativeLearning/' + object.foto_grup + ') center center');
    }

    function pembimbing_nav(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            html += '<div class="box box-widget widget-user-2">';
//            html += '<div class="widget-user-header" style="background-color:'+randomColor+'">';
            html += '<div class="widget-user-header">';
            html += '<div class="widget-user-image">';
            html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle" alt="User Avatar"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="img-circle" alt="User Avatar"/>');
            html += '<h3 class="widget-user-username">' + v.nama + '</h3>';
            html += '<h5 class="widget-user-desc">' + v.keterangan_jenis_anggota + '</h5>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        $('#pembimbing-nav').html(html);
    }
    var link = window.location.href.split('?');
    var id_grup = link[1].toString();
    ajaxPro('GET', '/CollaborativeLearning/anggota/getCurrentGroup', id_grup, 'json', false, false, false, false, info_success, null, null);
    ajaxPro('GET', '/CollaborativeLearning/anggota/getMember', id_grup + '&id_jenis_user=11333', 'json', false, false, false, false, pembimbing_nav, null, null);


    function jumlah_file(object) {
        $('#jumlah_file').html(object.data.length);
    }
    var id_grup = window.location.href.split('?')[1].toString();
    ajaxPro('GET', '/CollaborativeLearning/post_file/getFiles', id_grup, 'json', false, false, false, false, jumlah_file, null, null);
}

function form_comment_post() {
    function info_success(object) {
        student_group_nav();
        search_post_nav();
        $('.form-comment-post')[0].reset();
    }
    $('.form-comment-post').submit(function (event) {
        event.preventDefault();
        var d = new Date();
        var id_comment_post = '002' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
        var tanggal_comment = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var formData = new FormData($(this)[0]);
        formData.append('id_comment_post', id_comment_post);
        formData.append('tanggal_comment', tanggal_comment);
        ajaxPro('POST', '/CollaborativeLearning/comment_post/signUp', formData, null, false, false, false, false, info_success, error_messages, complete_group);
        var id_grup = $('.id_grup').html();
        var url = '/CollaborativeLearning/search/search_post?id_post=' + $(this).find('input[name=id_post]').val() + '&id_grup=' + id_grup;
        do_notification(formData, 'CN004', info_success, url, id_grup);
        return false;
    });
}

function delete_comment_post(i) {
    function post_success(returndata) {
        student_group_nav();
        progress_navigate();
        search_post_nav();
    }

    function post_beforeSend() {

    }
    var id_comment_post = "id_comment_post=" + i;
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxDelLive('POST', '/CollaborativeLearning/comment_post/delete', id_comment_post, post_success, null, null, post_beforeSend);
        return false;
    }
}

function form_comment_post_edit() {
    function post_success(returndata) {
        student_group_nav();
        search_post_nav();
    }
    $('.form-comment-post-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/comment_post/update', formData, null, false, false, false, false, post_success, error_messages, null);
        return false;
    });
}

function comment_nav() {
    $('.comment-nav').hide();
    $('.box-comment').hover(function () {
        $(this).find('.comment-nav').show();
    }, function () {
        $(this).find('.comment-nav').hide();
    });
    $('.edit-comment').click(function () {
        $(this).parent().parent().parent().find('.form-comment-post-edit').show();
        $(this).parent().parent().parent().find('.isi_comment').hide();
    });
    $('.delete-comment').click(function () {
        delete_comment_post($(this).val());
    });
    $('.cancel-comment-post-edit').click(function () {
        $(this).parent().parent().parent().find('.form-comment-post-edit').hide();
        $(this).parent().parent().parent().find('.isi_comment').show();
    });
    $('.edit-comment-progress').click(function () {
        $(this).parent().parent().parent().find('.form-comment-progress-edit').show();
        $(this).parent().parent().parent().find('.isi_comment').hide();
    });
    $('.cancel-comment-progress-edit').click(function () {
        $(this).parent().parent().parent().find('.form-comment-progress-edit').hide();
        $(this).parent().parent().parent().find('.isi_comment').show();
    });
}

/*-------------------------------------------End of Group Student----------------------------------------------------*/

/*-------------------------------------------Form----------------------------------------------------*/
function form_login() {
    function login_success(returndata) {

        switch (returndata) {
            case '1':
                window.location.href = "beranda";
                break;
            case '0':
                $('#login-message').html('Username and Password not match');
                break;
            default:
                alert('Nobody Wins!');
                break;
        }

//        if (returndata===1 || returndata==='1') {
//            alert(1);
//            window.location.href = "beranda";            
//        }else{
//          
//        }
//        notify('success', 'Login success', null);
//        
    }
    $('#form-login').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/beranda/login', formData, null, false, false, false, false, login_success, error_messages, complete_group);
        return false;
    });
}

function form_forgot_password() {
    function login_success(returndata) {
        alert('Please check your registered email!');
        $('#form-forgot')[0].reset();
    }
    $('#form-forgot').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/beranda/forgotPassword', formData, null, false, false, false, false, login_success, error_messages, complete_group);
        return false;
    });
}

function form_reset_password() {
    function login_success(returndata) {
        alert(returndata);
        $('#form-reset-password')[0].reset();
    }
    $('#form-reset-password').submit(function (event) {
        event.preventDefault();
        var act = confirm("Are you sure to reset your password?");
        if (act === true) {
            var formData = new FormData($(this)[0]);
            ajaxPro('POST', '/CollaborativeLearning/beranda/resetPassword', formData, null, false, false, false, false, login_success, error_messages, complete_group);
        }
        return false;
    });
}
/*-------------------------------------------End of Form----------------------------------------------------*/



/*-------------------------------------------Get JSON----------------------------------------------------*/
function prodi_getJSON() {
    $.getJSON("/CollaborativeLearning/prodi/getJSON", function (data) {
        var html = '';
        $(data).each(function (i, v) {
            html += '<option value="' + v.id_prodi + '">' + v.nama_prodi + '</option>';
        });
        $('#updateUser select[name=id_prodi], #newUser select[name=id_prodi]').html(html);
    });
}

function jenis_user_getJSON() {
    $.getJSON("/CollaborativeLearning/jenis_user/getJSON", function (data) {
        var html = '';
        $(data).each(function (i, v) {
            html += '<option value="' + v.id_jenis_user + '">' + v.keterangan_jenis_user + '</option>';
        });
        $('#updateUser select[name=id_jenis_user], #newUser select[name=id_jenis_user]').html(html);
    });
}

function user_getJSON() {
    $.getJSON("/CollaborativeLearning/users/getJSON", function (data) {
        var html = '';
        $(data).each(function (i, v) {
            html += '<tr>';
            html += '<td>' + v.id_user + "</td>";
            html += '<td>' + v.nama + "</td>";
            html += '<td>' + v.tempat_lahir + "</td>";
            html += '<td>' + v.tanggal_lahir + "</td>";
            html += '<td>' + v.telp + "</td>";
            html += '<td>' + v.email + "</td>";
            html += '<td>' + v.nama_prodi + "</td>";
            html += '<td>' + v.keterangan_jenis_user + "</td>";
            html += '<td><button class="btn btn-primary">View</button></td>';
            html += '</tr>';
        });
        $('#data-users tbody').html(html);
    });
}
/*-------------------------------------------End of Get JSON----------------------------------------------------*/

/*-------------------------------------------Progress Page----------------------------------------------------*/
function progress() {
    var link = window.location.href.split('/');
    if (link[4] === 'progress') {
        searchMember();
        getProgress();
        do_progress();
        progress_nav();
        form_progress_edit();
        get_group_info();
        form_comment_progress();
        form_comment_progress_edit();
        form_progress_file_edit();
        form_progress_file_add();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        progress_file_nav();
        progress_add_file_nav();
        getMember();
        $('.form-progress-edit').hide();
        $('.form-comment-progress-edit').hide();
        $('.form-progress-file-add').hide();
        $('.form-progress-file-edit').hide();
        $('.comment-hide').hide();
        $('.file-hide').hide();
        $(".select2").select2();
    }
}

function progress_navigate() {
    var link = window.location.href.split('/');
    if (link[4] === 'progress') {
        getProgress();
        progress_nav();
        form_progress_edit();
        get_group_info();
        form_comment_progress();
        form_comment_progress_edit();
        form_progress_file_edit();
        form_progress_file_add();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        progress_file_nav();
        progress_add_file_nav();
        getMember();
        $('.form-progress-edit').hide();
        $('.form-comment-progress-edit').hide();
        $('.form-progress-file-add').hide();
        $('.form-progress-file-edit').hide();
        $('.comment-hide').hide();
        $('.file-hide').hide();
        $(".select2").select2();
    }
}

function getProgress() {
    function progress_success(object) {
        var html = '';
        if (object.data.length > 0) {
            $('.timeline').html('');
            $(object.data).each(function (i, v) {
                html += '<li>';
                html += '<i class="fa fa-check-circle-o bg-green"></i>';
                html += '<div class="timeline-item">';
                html += '<div class="box box-solid collapsed-box">';
                html += '<div class="box-header with-border">';
                html += '<h3 class="box-title">' + v.id_user + ' - ' + v.nama + '</h3>';
                html += '<div class="box-tools pull-right">';
                html += '<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" data-placement="top" title="View Progress"><i class="fa fa-plus"></i></button>';
                if ($('#session_id_user').html() === v.id_user) {
                    html += '<button type="button" class="edit-progress btn btn-box-tool" value="' + v.id_post + '" data-toggle="tooltip" data-placement="top" title="Edit Progress"><i class="fa fa-pencil"></i></button>';
                    if (v.file_post.length === 0) {
                        html += '<button type="button" class="add-progress-file btn btn-box-tool" value="' + v.id_post + '" data-toggle="tooltip" data-placement="top" title="Upload Attachment"><i class="fa fa-file"></i></button>';
                    }
                }
                html += '</div>'; //box-tools
                html += '</div>'; //box-header
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
                html += '</div>'; //form-group
                html += '<div class="form-group">';
                html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                html += '<input type="hidden" class="form-control" name="id_jenis_post" value="' + v.id_jenis_post + '"/>';
                html += '<input type="hidden" class="form-control" name="tanggal_post" value="' + v.tanggal_post + '"/>';
                html += '<textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;">' + v.isi_post + '</textarea>';
                html += '</div>';
                html += '<div class="form-group pull-right">';
                html += '<button type="button" class="cancel btn btn-default" style="margin-right:5px;">Cancel</button>';
                html += '<button type="submit" class="btn btn-primary">Save</button>';
                html += '</div>';
                html += '</form>';
                html += '<p class="isi_post">' + v.isi_post + '</p>';
                if (v.file_post.length === 0) {
                    html += '<form class="form-progress-file-add">';
                    html += '<div class="text-center">';
                    html += '<div class="btn-group form-group">';
                    html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                    html += '<input type="hidden" class="form-control" name="tanggal_file" value="' + v.tanggal_file + '"/>';
                    html += '<div class="btn btn-default btn-file">';
                    html += '<i class="fa fa-paperclip"></i> Browse';
                    html += '<input type="file" name="src_file">';
                    html += '</div>';
                    html += '<button type="button" class="cancel-progress-file-add btn btn-danger btn-flat">Cancel</button>';
                    html += '<button type="submit" class="btn btn-primary btn-flat">Save</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</form>';
                }
//
                html += progress_file(v.file_post);
                if (v.anggota_post.length > 0) {
                    html += '<p class="isi_post">';
                    html += '<strong><i class="fa fa-tags margin-r-5"></i> Tags</strong>';
                    $(v.anggota_post).each(function (j, w) {
                        html += '<span class="label label-primary" style="margin-left:5px;">' + w.nama + '</span>';
                    });
                    html += '</p>';
                }
                html += '</div>'; //box-body
                if (v.comment_post.length > 0) {
                    html += '<div class="box-footer box-comments">';
                    var comment_show = 1;
                    if (v.comment_post.length > comment_show) {

                        html += '<div class="comment-hide-nav box-comment">';
                        html += '<div class="comment-text">';
                        html += '<a href="javascript:void(0)" class="comment-hide-trigger">View All Comments(' + (v.comment_post.length - comment_show) + ')</a>';
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
                        html += '<div class="comment-text">';
                        html += '<span class="username">';
                        html += w.nama;
                        html += '<span class="comment-nav text-muted pull-right">';
                        if ($('#session_id_user').html() === w.id_user) {
                            html += '<button type="button" class="edit-comment-progress btn btn-box-tool" value="' + w.id_comment_post + '" data-toggle="tooltip" data-placement="top" title="Edit Comment"><i class="fa fa-pencil"></i></button>';
                            html += '<button type="button" class="delete-comment btn btn-box-tool" value="' + w.id_comment_post + '" data-toggle="tooltip" data-placement="top" title="Delete Comment"><i class="fa fa-times"></i></button>';
                        }
                        html += '</span>'; //comment-nav
                        html += '</span>'; //username
                        html += '<span class="text-muted pull-left">';
                        html += dc.getHours() + ':' + dc.getMinutes() + ':' + dc.getSeconds() + ' ' + dc.getDate() + '/' + (dc.getMonth() + 1) + '/' + dc.getFullYear();
                        html += '</span><br/>'; //text-muted
                        html += '<form class="form-comment-progress-edit">';
                        html += '<div class="form-group">';
                        html += '<input type="hidden" class="form-control" name="id_comment_post" value="' + w.id_comment_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="tanggal_comment" value="' + w.tanggal_comment + '"/>';
                        html += '<textarea class="form-control" name="isi_comment" rows="3" placeholder="Enter ..." style="resize: none;">' + w.isi_comment + '</textarea>';
                        html += '</div>'; //form-group
                        html += '<div class="form-group pull-right">';
                        html += '<button type="button" class="cancel-comment-progress-edit btn btn-default" style="margin-right:5px;">Cancel</button>';
                        html += '<button type="submit" class="btn btn-primary">Save</button>';
                        html += '</div>'; //form-group
                        html += '</form>'; //form
                        html += '<p class="isi_comment">' + w.isi_comment + '</p>';
                        if (w.src_file !== null) {
                            if (file_image((w.src_file).toString().split('.')[(w.src_file).toString().split('.').length - 1]) === true) {
                                html += '<img class="img-responsive" src="/CollaborativeLearning/' + w.src_file + '" alt="Photo">';
                            } else {
                                html += '<ul class="mailbox-attachments clearfix">';
                                html += '<li>';
                                html += '<span class="mailbox-attachment-icon"><i ' + file_type((w.src_file).toString().split('.')[1]) + '></i></span>';
                                html += '<div class="mailbox-attachment-info">';
                                html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (w.src_file).toString().split('/')[(w.src_file).toString().split('.').length - 1] + '</a>';
                                html += '<span class="mailbox-attachment-size">';
                                html += '<a href="/CollaborativeLearning/' + w.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
//                        if ($('#session_id_user').html() === v.id_user) {
//                            html += '<a href="javascript:void(0)" class="edit-post-file btn btn-default btn-xs"><i class="fa fa-pencil-square"></i></a>';
//                        }
                                html += '</span>';
                                html += '</div>';
                                html += '</li>';
                                html += '</ul>';
                            }
                        }
                        html += '</div>'; //comment-text
                        html += '</div>'; //box-comment
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
                html += '<i class="fa fa-paperclip"></i> <span class="file-changed"></span>';
                html += '<input type="file" name="src_file" onchange="setFileValComment(this);" onselect="setFileValComment(this);">';
                html += '</div>'; //btn
                html += '</span>'; //input-group-btn
                html += '</div>'; //input-group
                html += '</form>'; //form-comment-post
                html += '</div>'; //box-footer
                html += '</div>'; //box
                html += '</div>'; //timeline-item
                html += '</li>';
            });
            $('.timeline').html(html);
        } else {
            $('#progress-null').html('');
            html += '<div class="error-page" id="content-null">';
            html += '<div class="error-content">';
            html += '<h3><i class="fa fa-warning text-yellow"></i> Oops! Progress not found.</h3>';
            html += '<p>Please contact your student to confirm it</p>';
            html += '</div>';
            html += '</div>';
            $('#progress-null').html(html);
        }


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
    var link = window.location.href.split('?');
    var id_grup = link[1].toString();
    ajaxPro('GET', '/CollaborativeLearning/anggota/getMember', id_grup + '&id_jenis_user=22555', 'json', false, false, false, false, option_anggota, null, null);
}

function do_progress() {
    function progress_success(returndata) {
        $('#form-progress')[0].reset();
        progress_navigate();
    }

    function post_beforeSend() {
    }
    $('#form-progress').submit(function (event) {
        event.preventDefault();
        var d = new Date();
        var id_post = '001' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var id_post_file = '021' + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var id_anggota_post = '022' + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + (Math.floor(Math.random() * (9999 - 1000) + 1000));
        var tanggal_post = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var formData = new FormData($(this)[0]);
        formData.append('id_post', id_post);
        formData.append('id_post_file', id_post_file);
        formData.append('id_anggota_post', id_anggota_post);
        formData.append('tanggal_post', tanggal_post);
        formData.append('id_jenis_post', 'P1112');

        if ((!is_empty($('input[name="src_file"]').val()) && is_empty($('textarea[name="isi_post"]').val())) || (!is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val())) || (is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val()))) {
            ajaxLive('POST', '/CollaborativeLearning/post/signUp', formData, null, false, false, false, false, progress_success, null, null, null);
            ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, progress_success, null, null, null);
            ajaxLive('POST', '/CollaborativeLearning/anggota_post/signUp', formData, null, false, false, false, false, progress_success, null, null, null);
            $('.file-changed').html('Attachment');

            var id_grup = window.location.href.split('?')[1].toString().split('=')[1];
            var url = '/CollaborativeLearning/search/search_post?id_post=' + id_post + '&id_grup=' + id_grup;
            do_notification(formData, 'CN002', progress_success, url, id_grup);
        }
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
        ajaxPro('POST', '/CollaborativeLearning/anggota_post/deleteAnggotaPost', formData, null, false, false, false, false, post_success, error_messages, null);
        ajaxPro('POST', '/CollaborativeLearning/post/update', formData, null, false, false, false, false, post_success, error_messages, null);
        ajaxPro('POST', '/CollaborativeLearning/anggota_post/signUp', formData, null, false, false, false, false, post_success, error_messages, null);
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
        ajaxPro('POST', '/CollaborativeLearning/comment_post/signUp', formData, null, false, false, false, false, info_success, error_messages, complete_group);
        var id_grup = $('.id_grup').html();
        var url = '/CollaborativeLearning/search/search_post?id_post=' + $(this).find('input[name=id_post]').val() + '&id_grup=' + id_grup;
        do_notification(formData, 'CN005', info_success, url, id_grup);
        return false;
    });
}


function progress_file(data) {
    var html = '';
    var verse = data.length - 1;
    var comment_show = 2;
    if (data.length > 0) {
        $(data).each(function (i, v) {
            if (i === 0) {
                if (file_image((v.src_file).toString().split('.')[(v.src_file).toString().split('.').length - 1]) === true) {
                    html += '<img class="img-responsive pad" src="/CollaborativeLearning/' + v.src_file + '" alt="Photo">';
                } else {
                    html += '<ul class="mailbox-attachments clearfix">';
                    html += '<li>';
                    html += '<span class="mailbox-attachment-icon"><i ' + file_type((v.src_file).toString().split('.')[1]) + '></i></span>';
                    html += '<div class="mailbox-attachment-info">';
                    html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</a>';
                    html += '<span class="mailbox-attachment-size">';
                    html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
                    if ($('#session_id_user').html() === v.id_user) {
                        html += '<a href="javascript:void(0)" class="edit-progress-file btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Upload Revision File"><i class="fa fa-pencil-square"></i></a>';
                    }
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
                    html += '<button type="button" class="cancel-post-file-edit btn btn-danger btn-flat">Cancel</button>';
                    html += '<button type="submit" class="btn btn-primary btn-flat">Save</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</form>';
                    if (data.length > comment_show) {
                        html += '<a href="javascript:void(0)" class="file-hide-trigger">View All Attachment(' + (data.length - comment_show) + ')</a>';
                    }
                }

            } else {
                var tf = new Date(v.tanggal_file);
                if (data.length > comment_show) {
                    if (i <= data.length - (comment_show)) {
                        html += '<blockquote class="file-hide">';
                    } else {
                        html += '<blockquote>';
                    }
                } else {
                    html += '<blockquote>';
                }

//                html += '<blockquote class="file-hide">';
                html += '<p>' + (v.src_file).toString().split('/')[(v.src_file).toString().split('.').length] + '</p>';
                html += '<small>';
                html += concatString(tf.getHours()) + ':' + concatString(tf.getMinutes()) + ':' + concatString(tf.getSeconds()) + ' ' + concatString(tf.getDate()) + '/' + concatString((tf.getMonth() + 1)) + '/' + tf.getFullYear();
                html += '<a href="/CollaborativeLearning/' + v.src_file + '" class="btn btn-default btn-xs" style="margin-left:2px;" data-toggle="tooltip" data-placement="top" title="Download File"><i class="fa fa-cloud-download"></i></a>';
                html += '</small>';
                html += '</blockquote>';
            }
        });
    }
    return html;
}

function progress_file_nav() {
    $('.edit-progress-file').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-progress-file-edit').show();
        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').hide();
    });
    $('.cancel-progress-file-edit').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-progress-file-edit').hide();
        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').show();
    });
}

function progress_add_file_nav() {
    $('.add-progress-file').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-progress-file-add').show();
//        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').hide();
    });
    $('.cancel-progress-file-add').click(function () {
        $(this).parent().parent().parent().parent().parent().find('.form-progress-file-add').hide();
//        $(this).parent().parent().parent().parent().parent().find('.mailbox-attachments').show();
    });
}

function form_comment_progress_edit() {
    function post_success(returndata) {
        student_group_nav();
        progress_navigate();
    }
    $('.form-comment-progress-edit').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/comment_post/update', formData, null, false, false, false, false, post_success, error_messages, null);
        return false;
    });
}

function form_progress_file_edit() {
    function post_success() {
        progress_navigate();
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

function form_progress_file_add() {
    function post_success() {
        progress_navigate();
    }
    $('.form-progress-file-add').submit(function (event) {
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

/*-------------------------------------------Anouncement Page----------------------------------------------------*/
function anouncement() {
    var link = window.location.href.split('/');
    if (link[4] === 'anouncement' || link[4] === 'search') {
        getAnouncement();
        getDosenGrupOption();
        do_anouncement();
    }
}

function anouncement_nav() {
    getDosenGrupOption();
    getAnouncement();
}

function getAnouncement() {
    function anouncement_success(object) {
        if (object.data.length > 0) {
            $('.group-list').html('');
            var html = '';
            $(object.data).each(function (i, v) {
                html += '<li class="item">';
                html += '<div class="product-img">';
//            html += '<img src="<?php echo base_url(); ?>assets/dist/img/photo7.jpg" alt="Product Image">';     
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" alt="Product Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" alt="Product Image"/>');
                html += '</div>'; //product-img
                html += '<div class="product-info">';
                html += '<a href="grup/index?id_grup=' + v.id_grup + '" class="product-title">' + v.nama_grup;
//                html += '<small class="pull-right" style="color:#999999;">100%</small>';
//                html += '<div class="progress xs" style="margin-top:10px;">';
//                html += '<div class="progress-bar progress-bar-success" style="width: 100%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>';
//                html += '</div>'; //progress
                html += '<div class="users-list-name">';
                $(v.anggota).each(function (j, w) {
//                    html += '<span class="badge">' + w.nama + '</span>';
                    html += w.nama;
                    if (j < (v.anggota.length - 1)) {
                        html += ', ';
                    }
                });
                html += '</div>';
                html += '</div>'; //product-info
                html += '</li>'; //item
            });
            $('.group-list').html(html);
        }

    }
    ajaxPro('GET', '/CollaborativeLearning/grup/getDosenGrup', null, 'json', false, false, false, false, anouncement_success, null, null);
}

function do_anouncement() {
    function anouncement_success(returndata) {
        $('#form-anouncement .grup-option').select2('val', '');
        $('#form-anouncement')[0].reset();
        anouncement_nav();
    }

    function anouncement_beforeSend() {
    }
    $('#form-anouncement').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        if ((!is_empty($('input[name="src_file"]').val()) && is_empty($('textarea[name="isi_post"]').val())) || (!is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val())) || (is_empty($('input[name="src_file"]').val()) && !is_empty($('textarea[name="isi_post"]').val()))) {
            $('#form-anouncement .grup-option option:selected').each(function (i, v) {
                var d = new Date();
                var id_post = '001' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
                var id_post_file = '021' + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
                var tanggal_post = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                formData.append('id_post', id_post);
                formData.append('id_post_file', id_post_file);
                formData.append('tanggal_post', tanggal_post);
                formData.append('id_jenis_post', 'P1111');
                formData.append('id_anggota', $(v).val());
                ajaxLive('POST', '/CollaborativeLearning/post/signUpAnouncement', formData, null, false, false, false, false, anouncement_success, error_messages, null, null);
                ajaxLive('POST', '/CollaborativeLearning/post_file/signUp', formData, null, false, false, false, false, anouncement_success, error_messages, null, null);
                $('#form-anouncement').find('.file-changed').html('Attachment');
                var id_grup = $(v).attr('alt');
                var url = '/CollaborativeLearning/search/search_post?id_post=' + id_post + '&id_grup=' + id_grup;
                do_notification(formData, 'CN001', anouncement_success, url, id_grup);
            });
        }

        return false;
    });
}

function getDosenGrupOption() {
    function option_success(object) {
        if (object.data.length > 0) {
            var html = '';
            $(object.data).each(function (i, v) {
                html += '<option value="' + v.id_anggota + '" alt="' + v.id_grup + '">' + v.nama_grup + '</option>';
            });
            $('.grup-option').html(html);
        }
    }
    ajaxPro('GET', '/CollaborativeLearning/grup/getDosenGrup', null, 'json', false, false, false, false, option_success, null, null);
}
/*-------------------------------------------End of Anouncement Page----------------------------------------------------*/

/*-------------------------------------------Schedule Page----------------------------------------------------*/
function myschedule() {
    var link = window.location.href.split('/');
    if (link[4] === 'myschedule') {
        initDataSchedule('/CollaborativeLearning/schedule/getJSONDT');
        initElement();
        initCalendar('/CollaborativeLearning/schedule/getJSON');
        getDosenGrupOption();
        do_myschedule();
        form_schedule_update();
        get_group_info();
    }
}

function myschedule_nav() {
//    initElement();
    initCalendar('/CollaborativeLearning/schedule/getJSON');
    getDosenGrupOption();
    getEvents();
    form_schedule_update();
    get_group_info();
}

function getEvents() {
    function option_success(object) {
        data_schedules.ajax.reload();
        $('#calendar').fullCalendar('refetchEvents');
    }
    ajaxPro('GET', '/CollaborativeLearning/schedule/getJSON', null, 'json', false, false, false, false, option_success, null, null);
}

function do_myschedule() {
    function anouncement_success(returndata) {
        $("select[name=option]").select2('val', 'All');
        $('#form-myschedule').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        $('#form-myschedule')[0].reset();
        $('input[name="tanggal_mulai"], input[name="tanggal_selesai"]').val(dateTimeFormatOutput(getCurrentDateTime()));
        myschedule_nav();
    }
    function testDate(parameters) {
        if (parameters === true) {
            return true;
        } else {
            return false;
        }
    }
    function anouncement_beforeSend() {
    }

    $('#form-myschedule').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            option: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            judul: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
//                    stringLength: {
//                        min: 6,
//                        max: 30,
//                        message: 'The username must be more than 6 and less than 30 characters long'
//                    },
//                    remote: {
//                        url: 'remote.php',
//                        message: 'The username is not available'
//                    },
//                    regexp: {
//                        regexp: /^[a-zA-Z0-9_\.]+$/,
//                        message: 'The username can only consist of alphabetical, number, dot and underscore'
//                    }
                }
            },
            tanggal_mulai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-myschedule input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-myschedule input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate((end.getTime() > start.getTime()) && (start.getTime() >= now.getTime()));
                            return status;
                        }
                    }
                }
            },
            tanggal_selesai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-myschedule input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-myschedule input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate((end.getTime() > start.getTime()) && (start.getTime() >= now.getTime()));
                            return status;
                        }
                    }
//                    different: {
//                        field: 'tanggal_mulai',
//                        message: 'must different with start'
//                    }
                }
            },
            deskripsi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
//            email: {
//                validators: {
//                    notEmpty: {
//                        message: 'The email address is required and can\'t be empty'
//                    },
//                    emailAddress: {
//                        message: 'The input is not a valid email address'
//                    }
//                }
//            },
//            password: {
//                validators: {
//                    notEmpty: {
//                        message: 'The password is required and can\'t be empty'
//                    }
//                }
//            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-myschedule').submit(function (event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var tanggal_mulai = dateTimeFormatInput($('#form-myschedule input[name=tanggal_mulai]').val());
            var tanggal_selesai = dateTimeFormatInput($('#form-myschedule input[name=tanggal_selesai]').val());
            $('.grup-option option:selected').each(function (i, v) {
                var d = new Date();
                var id_schedule = '025' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
                formData.append('id_anggota', $(v).val());
                formData.append('id_schedule', id_schedule);
                formData.append('tanggal_mulai', tanggal_mulai);
                formData.append('tanggal_selesai', tanggal_selesai);
                ajaxLive('POST', '/CollaborativeLearning/schedule/signUp', formData, null, false, false, false, false, anouncement_success, error_messages, null, null);
                var id_grup = $(v).attr('alt');
                var url = '/CollaborativeLearning/schedule/index?id_grup=' + id_grup;
                do_notification(formData, 'CN003', null, url, id_grup);
            });
            return false;
        });

    });


    $('#form-myschedule input[name=tanggal_mulai]').change(function (e) {
        $('#form-myschedule').data('bootstrapValidator').revalidateField('tanggal_selesai');
        $('#form-myschedule').data('bootstrapValidator').revalidateField('tanggal_mulai');
    });
    $('#form-myschedule input[name=tanggal_selesai]').change(function (e) {
        $('#form-myschedule').data('bootstrapValidator').revalidateField('tanggal_mulai');
        $('#form-myschedule').data('bootstrapValidator').revalidateField('tanggal_selesai');
    });
}

function initDataSchedule(url) {
//    data_schedules = $('#data-schedules').DataTable();
    data_schedules = $('#data-schedules').DataTable({
        ajax: url,
        columns: [{
                "data": "judul"
            }, {
                "data": "deskripsi"
//                "render": function (data, type, row) {
//                    var dateFormat = data.split('-');
//                    return "<center>" + dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0] + "</center>";
//                }
            }, {
                "data": "tanggal_mulai",
                "render": function (data, type, row) {
                    return "<center>" + dateTimeFormatOutput(data) + "</center>";
                }
            }, {
                "data": "tanggal_selesai",
                "render": function (data, type, row) {
                    return "<center>" + dateTimeFormatOutput(data) + "</center>";
                }
            }, {
                "data": "nav",
                "render": function (data, type, row) {
                    var html = '<center><div class="btn-group">';
                    html += '<button type="button" class="btn btn-primary" onclick="schedule_update(this);" value="' + data + '"><i class="fa fa-pencil-square-o"></i></button>';
                    html += '<button type="button" class="btn btn-primary" onclick="schedule_delete(this);" value="' + data + '"><i class="fa fa-trash-o"></i></button>';
                    html += '</div></center>';
                    return html;
                }
            }],
        "aLengthMenu": [[10, 50, -1], [10, 50, "All"]],
        "pageLength": 10
    });
}

function schedule_delete(i) {
    function schedule_complete(object) {
        $(object.data).each(function (i, v) {
            var id_schedule = "id_schedule=" + v.id_schedule;
            ajaxDel('POST', '/CollaborativeLearning/schedule/delete', id_schedule, null, null, null);
        });
        data_schedules.ajax.reload();
        myschedule_nav();
    }
    var parameter = "judul=" + $(i).val().toString().split('+')[0] + "&tanggal_mulai=" + $(i).val().toString().split('+')[1];
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxLive('GET', '/CollaborativeLearning/schedule/getSelectedSchedule', parameter, 'json', false, false, false, false, schedule_complete, error_messages, null, null);
    }

}

function schedule_update(i) {
    function schedule_complete(object) {
        var data = object.data[0];
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_schedule + '-' + v.id_anggota + '" selected>' + v.nama_grup + '<option>';
        });

        $('#form-schedule-update .grup-option').html(html);
        $('#form-schedule-update .grup-option').select2();
        $('#form-schedule-update input[name=judul]').val(data.judul);
        $('#form-schedule-update input[name=tanggal_mulai]').val(dateTimeFormatOutput(data.tanggal_mulai));
        $('#form-schedule-update input[name=tanggal_selesai]').val(dateTimeFormatOutput(data.tanggal_selesai));
        $('#form-schedule-update textarea[name=deskripsi]').val(data.deskripsi);
        $(".btn-schedule:eq(1)").click();
    }
    var parameter = "judul=" + $(i).val().toString().split('+')[0] + "&tanggal_mulai=" + $(i).val().toString().split('+')[1];
    ajaxLive('GET', '/CollaborativeLearning/schedule/getSelectedSchedule', parameter, 'json', false, false, false, false, schedule_complete, error_messages, null, null);
}

function form_schedule_update() {
    function update_success(object) {
        $("select[name=option_update]").select2('val', 'All');
        $('#form-schedule-update').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        $('#form-schedule-update')[0].reset();
        $('#form-schedule-update input[name="tanggal_mulai"], #form-schedule-update input[name="tanggal_selesai"]').val(getCurrentDateTime());
        data_schedules.ajax.reload();
        myschedule_nav();
        $(".btn-schedule:eq(0)").click();
//        $('#updateSchedule').modal('hide');

    }

    function testDate(parameters) {
        if (parameters === true) {
            return true;
        } else {
            return false;
        }
    }

    $('#form-schedule-update').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            option_update: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            judul: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tanggal_mulai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule-update input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule-update input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate(end.getTime() > start.getTime());
                            return status;
                        }
                    }
                }
            },
            tanggal_selesai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule-update input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule-update input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate((end.getTime() > start.getTime()));
                            return status;
                        }
                    }
//                    different: {
//                        field: 'tanggal_mulai',
//                        message: 'must different with start'
//                    }
                }
            },
            deskripsi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-schedule-update').submit(function (event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var tanggal_mulai = dateTimeFormatInput($('#form-schedule-update input[name=tanggal_mulai]').val());
            var tanggal_selesai = dateTimeFormatInput($('#form-schedule-update input[name=tanggal_selesai]').val());
            $('#form-schedule-update .grup-option option:selected').each(function (i, v) {
                var val = $(v).val().toString().split('-');
                formData.append('id_schedule', val[0]);
                formData.append('id_anggota', val[1]);
                formData.append('tanggal_mulai', tanggal_mulai);
                formData.append('tanggal_selesai', tanggal_selesai);
                ajaxLive('POST', '/CollaborativeLearning/schedule/update', formData, null, false, false, false, false, update_success, error_messages, null, null);
                $('#updateSchedule').modal('hide');
            });
            return false;
        });
    });


    $('#form-schedule-update input[name=tanggal_mulai]').change(function (e) {
        $('#form-schedule-update').data('bootstrapValidator').revalidateField('tanggal_selesai');
        $('#form-schedule-update').data('bootstrapValidator').revalidateField('tanggal_mulai');
    });
    $('#form-schedule-update input[name=tanggal_selesai]').change(function (e) {
        $('#form-schedule-update').data('bootstrapValidator').revalidateField('tanggal_mulai');
        $('#form-schedule-update').data('bootstrapValidator').revalidateField('tanggal_selesai');
    });
}


function initElement() {
    $(".select2").select2();

    $('input[name="tanggal_mulai"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        timePickerSeconds: true,
        locale: {
            format: 'HH:mm:ss DD-MM-YYYY'
        }
    });
    $('input[name="tanggal_selesai"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        timePickerSeconds: true,
        locale: {
            format: 'HH:mm:ss DD-MM-YYYY'
        }
    });
    $('input[name="tanggal_mulai"], input[name="tanggal_selesai"]').val(dateTimeFormatOutput(getCurrentDateTime()));
}

function getCurrentDateTime() {
    var d = new Date();
    return d.getFullYear() + '/' + concatString((d.getMonth() + 1)) + '/' + concatString(d.getDate()) + ' ' + concatString(d.getHours()) + ':' + concatString(d.getMinutes()) + ':' + concatString(d.getSeconds());
}
function initCalendar(url) {
    var date = new Date();
    var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
    $('#calendar').fullCalendar({
        height: 520,
        header: {
            left: 'prev,next today add',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
            add: 'aaddd',
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
        },
        events: url,
        eventLimit: true,
        selectable: true,
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        dayClick: function (date, jsEvent, view) {

            data_schedules.clear().draw();
            data_schedules.destroy();
            initDataSchedule('/CollaborativeLearning/schedule/getJSONDTStart?start=' + date.format());
            $(".btn-schedule:eq(0)").click();
            $('#updateSchedule').modal('show');
//            alert('Clicked on: ' + date.format());
//
//            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//
//            alert('Current view: ' + view.name);

            // change the day's background color just for fun
//            $(this).css('background-color', 'red');

        }
    });
}

/*-------------------------------------------End of Schedule Page----------------------------------------------------*/

/*-------------------------------------------Schedule Page----------------------------------------------------*/
function schedule() {
    var link = window.location.href.split('/');
    if (link[4] === 'schedule') {
        searchMember();
        var id_grup = window.location.href.split('?')[1].toString();
        data_schedules_grup = $('#data-schedules-grup').DataTable();
//        initDataScheduleGrup('/CollaborativeLearning/schedule/getJSONDTIdGrup?' + id_grup);
        initElement();
        initCalendarGrup('/CollaborativeLearning/schedule/getJSONGrup?' + id_grup);
        do_schedule();
        form_schedule_update_grup();
        get_group_info();
    }
}

function schedule_nav() {
    var id_grup = window.location.href.split('?')[1].toString();
//    initElement();
    initCalendarGrup('/CollaborativeLearning/schedule/getJSONGrup?' + id_grup);
    form_schedule_update_grup();
//    getEvents();    
}

function do_schedule() {
    function anouncement_success(returndata) {
        $('#form-schedule').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        $('#form-schedule')[0].reset();
        $('input[name="tanggal_mulai"], input[name="tanggal_selesai"]').val(dateTimeFormatOutput(getCurrentDateTime()));
        $('#calendar').fullCalendar('refetchEvents');
        schedule_nav();
    }
    function testDate(parameters) {
        if (parameters === true) {
            return true;
        } else {
            return false;
        }
    }

//    function anouncement_success(returndata) {
//        $('#form-schedule')[0].reset();
//        $('#calendar').fullCalendar('refetchEvents');
//        schedule_nav();
//    }

    function anouncement_beforeSend() {
    }

    $('#form-schedule').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            judul: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tanggal_mulai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate((end.getTime() > start.getTime()) && (start.getTime() >= now.getTime()));
                            return status;
                        }
                    }
                }
            },
            tanggal_selesai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate((end.getTime() > start.getTime()) && (start.getTime() >= now.getTime()));
                            return status;
                        }
                    }
                }
            },
            deskripsi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-schedule').submit(function (event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var id_grup = window.location.href.split('?')[1].toString();
            ajaxPro('GET', '/CollaborativeLearning/anggota/getSelectedUser', id_grup, 'json', false, false, false, false, selected_success, null, null);
            function selected_success(object) {
                var d = new Date();
                var id_schedule = '025' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
                formData.append('id_anggota', object.data.id_anggota);
                formData.append('id_schedule', id_schedule);
                formData.append('tanggal_mulai', dateTimeFormatInput($('#form-schedule input[name=tanggal_mulai]').val()));
                formData.append('tanggal_selesai', dateTimeFormatInput($('#form-schedule input[name=tanggal_selesai]').val()));

                ajaxLive('POST', '/CollaborativeLearning/schedule/signUp', formData, null, false, false, false, false, anouncement_success, error_messages, null, null);
                var id_grup = window.location.href.split('?')[1].toString().split('=')[1];
                var url = '/CollaborativeLearning/schedule/index?id_grup=' + id_grup;
                do_notification(formData, 'CN003', anouncement_success, url, id_grup);
            }
            return false;
        });

    });

    $('#form-schedule input[name=tanggal_mulai]').change(function (e) {
        $('#form-schedule').data('bootstrapValidator').revalidateField('tanggal_selesai');
        $('#form-schedule').data('bootstrapValidator').revalidateField('tanggal_mulai');
    });

    $('#form-schedule input[name=tanggal_selesai]').change(function (e) {
        $('#form-schedule').data('bootstrapValidator').revalidateField('tanggal_mulai');
        $('#form-schedule').data('bootstrapValidator').revalidateField('tanggal_selesai');
    });
}

function initDataScheduleGrup(url) {
//    data_schedules = $('#data-schedules').DataTable();
    data_schedules_grup = $('#data-schedules-grup').DataTable({
        ajax: url,
        columns: [{
                "data": "judul"
            }, {
                "data": "deskripsi"
//                "render": function (data, type, row) {
//                    var dateFormat = data.split('-');
//                    return "<center>" + dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0] + "</center>";
//                }
            }, {
                "data": "tanggal_mulai",
                "render": function (data, type, row) {
                    return "<center>" + dateTimeFormatOutput(data) + "</center>";
                }
            }, {
                "data": "tanggal_selesai",
                "render": function (data, type, row) {
                    return "<center>" + dateTimeFormatOutput(data) + "</center>";
                }
            }, {
                "data": "id_schedule",
                "render": function (data, type, row) {
                    var html = '<center><div class="btn-group">';
                    html += '<button type="button" class="btn btn-primary" onclick="schedule_update_grup(this);" value="' + data + '"><i class="fa fa-pencil-square-o"></i></button>';
                    html += '<button type="button" class="btn btn-primary" onclick="schedule_delete_grup(this);" value="' + data + '"><i class="fa fa-trash-o"></i></button>';
                    html += '</div></center>';
                    return html;
                }
            }],
        "aLengthMenu": [[10, 50, -1], [10, 50, "All"]],
        "pageLength": 10
    });
}


function initCalendarGrup(url) {
    var date = new Date();
    var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
    $('#calendar').fullCalendar({
        height: 520,
        header: {
            left: 'prev,next today add',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
            add: 'aaddd',
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
        },
        events: url,
        eventLimit: true,
        selectable: true,
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        dayClick: function (date, jsEvent, view) {

            data_schedules_grup.clear().draw();
            data_schedules_grup.destroy();
            var id_grup = window.location.href.split('?')[1].toString();
            initDataScheduleGrup('/CollaborativeLearning/schedule/getJSONDTIdGrup?start=' + date.format() + '&' + id_grup);
            $(".btn-schedule:eq(0)").click();
            $('#updateSchedule').modal('show');
//            alert('Clicked on: ' + date.format());
//
//            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//
//            alert('Current view: ' + view.name);

            // change the day's background color just for fun
//            $(this).css('background-color', 'red');

        }
    });
}

function schedule_delete_grup(i) {
    function schedule_complete(object) {
        data_schedules_grup.ajax.reload();
        $('#calendar').fullCalendar('refetchEvents');
        schedule_nav();
    }
    var id_schedule = "id_schedule=" + $(i).val();
    var act = confirm("Anda yakin ingin menghapus data ini?");
    if (act === true) {
        ajaxDel('POST', '/CollaborativeLearning/schedule/delete', id_schedule, schedule_complete, error_messages, null);
//        ajaxDel('GET', '/CollaborativeLearning/schedule/getSelectedSchedule', tanggal_mulai, schedule_complete, error_messages, null);
    }

}


function schedule_update_grup(i) {
    $.ajax({
        type: "GET",
        url: "/CollaborativeLearning/schedule/getJSONUpdateGrup",
        data: "id_schedule=" + $(i).val(),
        dataType: "json",
        success: function (object) {
//            alert(object);            
//            var html = '';
//            $(object.data.schedule).each(function (i, v) {
//                html += '<option value="' + v.id_schedule + '-' + v.id_anggota + '" selected>' + v.nama_grup + '<option>';
//            });
//            $('#form-schedule-update .grup-option').html(html);
//            $('#form-schedule-update .grup-option').select2();
            $('#form-schedule-update-grup input[name=id_schedule]').val(object.data.id_schedule);
            $('#form-schedule-update-grup input[name=id_anggota]').val(object.data.id_anggota);
            $('#form-schedule-update-grup input[name=judul]').val(object.data.judul);
            $('#form-schedule-update-grup input[name=tanggal_mulai]').val(dateTimeFormatOutput(object.data.tanggal_mulai));
            $('#form-schedule-update-grup input[name=tanggal_selesai]').val(dateTimeFormatOutput(object.data.tanggal_selesai));
            $('#form-schedule-update-grup textarea[name=deskripsi]').val(object.data.deskripsi);
            $(".btn-schedule:eq(1)").click();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        },
        complete: function (status) {
            $('#updateUser').modal('show');
        }
    });
}

function form_schedule_update_grup() {

    function update_success(object) {
        $('#form-schedule-update-grup').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        $('#form-schedule-update-grup')[0].reset();
        $('input[name="tanggal_mulai"], input[name="tanggal_selesai"]').val(dateTimeFormatOutput(getCurrentDateTime()));
        data_schedules_grup.ajax.reload();
        $('#calendar').fullCalendar('refetchEvents');
        schedule_nav();
        $(".btn-schedule:eq(0)").click();
    }

    function testDate(parameters) {
        if (parameters === true) {
            return true;
        } else {
            return false;
        }
    }

    $('#form-schedule-update-grup').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            judul: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            tanggal_mulai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate(end.getTime() > start.getTime());
                            return status;
                        }
                    }
                }
            },
            tanggal_selesai: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    },
                    callback: {
                        message: 'The end date must be more grather from start and current date',
                        callback: function (value, validator, $field) {
                            var start = new Date(dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_mulai]').val()));
                            var end = new Date(dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_selesai]').val()));
                            var now = new Date();
                            var status = testDate(end.getTime() > start.getTime());
                            return status;
                        }
                    }
                }
            },
            deskripsi: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-schedule-update-grup').submit(function (event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            formData.append('tanggal_mulai', dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_mulai]').val()));
            formData.append('tanggal_selesai', dateTimeFormatInput($('#form-schedule-update-grup input[name=tanggal_selesai]').val()));
            ajaxLive('POST', '/CollaborativeLearning/schedule/update', formData, null, false, false, false, false, update_success, error_messages, null, null);
            return false;
        });
    });

    $('#form-schedule-update-grup input[name=tanggal_mulai]').change(function (e) {
        $('#form-schedule-update-grup').data('bootstrapValidator').revalidateField('tanggal_selesai');
        $('#form-schedule-update-grup').data('bootstrapValidator').revalidateField('tanggal_mulai');
    });

    $('#form-schedule-update-grup input[name=tanggal_selesai]').change(function (e) {
        $('#form-schedule-update-grup').data('bootstrapValidator').revalidateField('tanggal_mulai');
        $('#form-schedule-update-grup').data('bootstrapValidator').revalidateField('tanggal_selesai');
    });
}

/*-------------------------------------------End of Schedule Page----------------------------------------------------*/

/*-------------------------------------------Message Page----------------------------------------------------*/
function message() {
    var link = window.location.href;
    if (link.indexOf('message') > -1) {
        var id_chat = window.location.href.split('?')[1].split('=')[1];
//        alert(id_chat);
        box_message();
        getMessageMember();
        getChats();
//        getLastChat($('#recently-messages li:eq(0) .hide').html());
        getLastChat(id_chat);
        form_chat();
        form_new_message();
    }
}

function message_nav() {
//    box_message();
    getMessageMember();
    getChats();
    getLastChat($('#recently-messages li:eq(0) .hide').html());
    getHeaderMessages();
    form_new_message();
}

function box_message() {
    function message_success(object) {
        var html = '';
        if (object.data.length === 0) {
            html += '<div class="col-md-12">';
            html += '<div class="error-page">';
            html += '<div class="error-content">';
            html += '<h3><i class="fa fa-warning text-yellow"></i> Oops! Messages not found.</h3>';
            html += '<p>you may want to <a href="javascript:void(0)" data-toggle="modal" data-target="#myModal">create first message</a></p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
//            $('#chat-null').show();
//            $('#chat-not-null').hide();
        } else {
            html += '<div class="col-md-4">';
            html += '<div class="box box-solid">';
            html += '<div class="box-header with-border">';
            html += '<h3 class="box-title">Recently Messages</h3>';
            html += '</div>';//box-header
            html += '<div class="box-body" id="recently-messages">';
            html += '<ul class="products-list product-list-in-box">';
            html += '</ul>';//products-list
            html += '</div>';//box-body
            html += '</div>';//box 
            html += '</div>';//col-md-4
            html += '<div class="col-md-8">';
            html += '<div class="box box-solid direct-chat direct-chat-primary">';
            html += '<div class="box-header with-border">';
            html += '<i class="fa fa-comments-o"></i>';
            html += '<h3 class="box-title">Current Message</h3>';
            html += '<div class="box-tools pull-right">';
            html += '<div class="btn-group">';
            html += '<button type="button" class="btn btn-default btn-flat btn-sm active" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil"></i> New Message</button>';
            html += '</div>';//btn-group
            html += '</div>';//box-tools
            html += '</div>';//box-header
            html += '<div class="box-body chat" id="chat-box">';
            html += '<div class="direct-chat-messages">';
            html += '</div>';
            html += '</div>';
            html += '<div class="box-footer">';
            html += '<form id="form-chat">';
            html += '<div class="input-group">';
            html += '<input type="hidden" name="id_chat" class="form-control">';
            html += '<input type="text" name="isi_content_chat" class="form-control" placeholder="Type Message ...">';
            html += '<div class="input-group-btn">';
            html += '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Option <span class="fa fa-caret-up"></span></button>';
            html += '<ul class="dropdown-menu drop-up">';
            html += '<li><a href="javascript:void(0)" id="videoCallTrigger" data-toggle="modal" data-target="#videoDialog">Video Call</a></li>';
            html += '<li><a href="#">Add File</a></li>';
            html += '</ul>';
            html += '</div>';
            html += '</div>';
            html += '</form>';
            html += '</div>';//box
            html += '</div>';//col-md-8
//            $('#chat-null').hide();
//            $('#chat-not-null').show();
        }
        $('#chat-content').html(html);

    }
    ajaxPro('GET', '/CollaborativeLearning/message/getChat', null, 'json', false, false, false, false, message_success, null, null);
}

function video_call_start() {
//    var width = 570;    // We will scale the photo width to this
//    var height = 0;     // This will be computed based on the input stream
//
//    var streaming = false;
//
//    var video = null;
//    var canvas = null;
//    var photo = null;
//    var startbutton = null;
//
//    
//
//    video = document.getElementById('video');
//    canvas = document.getElementById('canvas');
//    photo = document.getElementById('photo');
//    startbutton = document.getElementById('startbutton');
//    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
//    navigator.getMedia(
//            {
//                video: true,
//                audio: false
//            },
//    function (stream) {
//        if (navigator.mozGetUserMedia) {
//            video.mozSrcObject = stream;
//        } else {
//            var vendorURL = window.URL || window.webkitURL;
//            video.src = vendorURL.createObjectURL(stream);
//        }
//        video.play();
//    },
//            function (err) {
//                console.log("An error occured! " + err);
//            }
//    );
//
//    video.addEventListener('canplay', function (ev) {
//        if (!streaming) {
//            height = video.videoHeight / (video.videoWidth / width);
//
//            // Firefox currently has a bug where the height can't be read from
//            // the video, so we will make assumptions if this happens.
//
//            if (isNaN(height)) {
//                height = width / (4 / 3);
//            }
//
//            video.setAttribute('width', width);
//            video.setAttribute('height', height);
//            canvas.setAttribute('width', width);
//            canvas.setAttribute('height', height);
//            streaming = true;
//        }
//    }, false);
    $("#webcam").scriptcam({
//        path: '/CollaborativeLearning/assets/plugins/ScriptCam/scriptcam.swf',
        showMicrophoneErrors: false,
        onError: onError,
        cornerRadius: 20,
        cornerColor: 'e3e5e2',
        onWebcamReady: onWebcamReady,
        uploadImage: 'upload.gif',
        onPictureAsBase64: base64_tofield_and_image
    });

    function base64_tofield() {
        $('#formfield').val($.scriptcam.getFrameAsBase64());
    }

    function base64_toimage() {
        $('#image').attr("src", "data:image/png;base64," + $.scriptcam.getFrameAsBase64());
    }

    function base64_tofield_and_image(b64) {
        $('#formfield').val(b64);
        $('#image').attr("src", "data:image/png;base64," + b64);
    }

    function changeCamera() {
        $.scriptcam.changeCamera($('#cameraNames').val());
    }
    function onError(errorId, errorMsg) {
        $("#btn1").attr("disabled", true);
        $("#btn2").attr("disabled", true);
        alert(errorMsg);
    }
    function onWebcamReady(cameraNames, camera, microphoneNames, microphone, volume) {
        $.each(cameraNames, function (index, text) {
            $('#cameraNames').append($('<option></option>').val(index).html(text));
        });
        $('#cameraNames').val(camera);
    }
}

function video_call_stop() {
    var video = document.getElementById('video');
    video.pause();
}

function getMessageMember() {
    function option_anggota(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<option value="' + v.id_user + '">' + v.nama + '</option>';
        });
        $('.chat-member').html(html);
    }
//    var id_user = $('#session_id_user').html();
    ajaxPro('GET', '/CollaborativeLearning/message/getAnggotaChat', null, 'json', false, false, false, false, option_anggota, null, null);
}

function form_chat() {
    function succes_form_chat(object) {
        $('#form-chat input[name=isi_content_chat]').val('');
        var id_chat = $('#form-chat input[name=id_chat]').val();
        getChats();
        getLastChat(id_chat);
    }
    $('#form-chat').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        ajaxPro('POST', '/CollaborativeLearning/message/getAnggotaByCurrentSession', formData, 'json', false, false, false, false, success_chat, null, null);
        function success_chat(object) {
            var d = new Date();
            var id_content_chat = '028' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
            formData.append('id_content_chat', id_content_chat);
            formData.append('id_anggota_chat', object.data.id_anggota_chat);
            ajaxPro('POST', '/CollaborativeLearning/message/signUpContentChat', formData, 'html', false, false, false, false, succes_form_chat, error_messages, null);
            do_message_notification(id_content_chat, object.data.id_anggota_chat, 1, null);


            ajaxPro('POST', '/CollaborativeLearning/message/getCurrentAnggotaChat', formData, 'json', false, false, false, false, success_anggota_chat, error_messages, null);
            function success_anggota_chat(object) {
                $(object.data).each(function (i, v) {
                    do_message_notification(id_content_chat, v.id_anggota_chat, 0, null);
                });
            }
            getHeaderMessages();
        }
        return false;
    });
}

function getChats() {
    function message_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<li class="item">';
            html += '<div class="product-img">';
            html += '<img src="/CollaborativeLearning/assets/dist/img/default.png"  alt="Product Image"/>';
            html += '<div class="hide">' + v.id_chat + '</div>';
//            $(v.anggota_chat).each(function (j, w) {
//                html += imageCheck(w.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png"  alt="Product Image"/>', '<img src="/CollaborativeLearning/' + w.src_image + '" alt="Product Image"/>');
//            });
//            html += '<img src="<?php echo base_url(); ?>assets/dist/img/user1-128x128.jpg" alt="Product Image">';
            html += '</div>';
            html += '<div class="product-info">';
            html += '<a href="javascript:void(0)" onclick="getOnChat(this);" class="product-title users-list-name" alt="' + v.id_chat + '">';
            $(v.anggota_chat).each(function (j, w) {
                html += w.nama;
                if (j < (v.anggota_chat.length - 1)) {
                    html += ', ';
                }
            });
            html += '</a>';
            html += '<span class="product-description">';
            html += v.last_chat;
            html += '</span>';
            html += '</div>';
            html += '</li>';
        });
        $('#recently-messages ul').html(html);
    }
    ajaxPro('GET', '/CollaborativeLearning/message/getChat', null, 'json', false, false, false, false, message_success, null, null);
}

function getLastChat(id_chat) {
    function chat_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            var d = new Date(v.tanggal_content_chat);
            if (v.id_user === $('#session_id_user').html()) {
                html += '<div class="direct-chat-msg right">';
                html += '<div class="direct-chat-info clearfix">';
                html += '<span class="direct-chat-name pull-right">' + v.nama + '</span>';
                html += '<span class="direct-chat-timestamp pull-left">' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '</span>';
                html += '</div>';
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="direct-chat-img" alt="Message User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="direct-chat-img" alt="Message User Image"/>');
                html += '<div class="direct-chat-text">';
                html += v.isi_content_chat;
                html += '</div>';
                html += '</div>';

            } else {
                html += '<div class="direct-chat-msg">';
                html += '<div class="direct-chat-info clearfix">';
                html += '<span class="direct-chat-name pull-left">' + v.nama + '</span>';
                html += '<span class="direct-chat-timestamp pull-right">' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '</span>';
                html += '</div>';
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="direct-chat-img" alt="Message User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="direct-chat-img" alt="Message User Image"/>');
                html += '<div class="direct-chat-text">';
                html += v.isi_content_chat;
                html += '</div>';
                html += '</div>';
            }
        });
//        $('#chat-box').html(html);
        $('.direct-chat-messages').html(html);
    }
//    alert(id_chat);
    var lastChat = 'id_chat=' + id_chat;
    $('#form-chat input[name=id_chat]').val(id_chat);
    ajaxPro('GET', '/CollaborativeLearning/message/getMessageChat', lastChat, 'json', false, false, false, false, chat_success, null, null);
}

function getOnChat(i) {
    function chat_success(object) {
//        alert(object);
        var html = '';
        $(object.data).each(function (i, v) {
            var d = new Date(v.tanggal_content_chat);
            if (v.id_user === $('#session_id_user').html()) {
                html += '<div class="direct-chat-msg right">';
                html += '<div class="direct-chat-info clearfix">';
                html += '<span class="direct-chat-name pull-right">' + v.nama + '</span>';
                html += '<span class="direct-chat-timestamp pull-left">' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '</span>';
                html += '</div>';
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="direct-chat-img" alt="Message User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="direct-chat-img" alt="Message User Image"/>');
                html += '<div class="direct-chat-text">';
                html += v.isi_content_chat;
                html += '</div>';
                html += '</div>';

            } else {
                html += '<div class="direct-chat-msg">';
                html += '<div class="direct-chat-info clearfix">';
                html += '<span class="direct-chat-name pull-left">' + v.nama + '</span>';
                html += '<span class="direct-chat-timestamp pull-right">' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '</span>';
                html += '</div>';
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="direct-chat-img" alt="Message User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="direct-chat-img" alt="Message User Image"/>');
                html += '<div class="direct-chat-text">';
                html += v.isi_content_chat;
                html += '</div>';
                html += '</div>';
            }
        });
        $('.direct-chat-messages').html(html);
//        $('#chat-box').html(html);
    }

//    alert(id_chat);
    var lastChat = 'id_chat=' + $(i).attr('alt');
    $('#form-chat input[name=id_chat]').val($(i).attr('alt'));
    ajaxPro('GET', '/CollaborativeLearning/message/getMessageChat', lastChat, 'json', false, false, false, false, chat_success, null, null);
}

function form_new_message() {
    function new_message_success() {
        message_nav();
        $('#form-new-message .chat-member').select2('val', '');
        $('#form-new-message').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
        $('#form-new-message')[0].reset();
        $('#myModal').modal('hide');
    }

    $('#form-new-message').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            anggota: {
                selector: '#chat-member-validator',
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            },
            isi_content_chat: {
                message: 'Invalid value',
                validators: {
                    notEmpty: {
                        message: 'Required'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#form-new-message').submit(function (event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var d = new Date();
            var id_chat = '226' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
            formData.append('id_chat', id_chat);
            ajaxPro('POST', '/CollaborativeLearning/message/signUpChat', formData, null, false, false, false, false, null, null, null);
            var anggota_chat = [];
            $('#form-new-message .chat-member option:selected').each(function (i, v) {
                var id_anggota_chat = '027' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
                formData.append('id_anggota_chat', id_anggota_chat);
                formData.append('id_user', $(v).val());
                ajaxPro('POST', '/CollaborativeLearning/message/signUpAnggotaChat', formData, null, false, false, false, false, null, null, null);

                anggota_chat.push(id_anggota_chat);
            });
            var id_anggota_chat = '027' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
            formData.append('id_anggota_chat', id_anggota_chat);
            formData.append('id_user', $('#session_id_user').html());
            ajaxPro('POST', '/CollaborativeLearning/message/signUpAnggotaChat', formData, null, false, false, false, false, null, null, null);
            var id_content_chat = '028' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
            formData.append('id_content_chat', id_content_chat);
            formData.append('id_anggota_chat', id_anggota_chat);
            ajaxPro('POST', '/CollaborativeLearning/message/signUpContentChat', formData, null, false, false, false, false, null, null, null);
//        alert(id_anggota_chat+" "+1);
            do_message_notification(id_content_chat, id_anggota_chat, 1, null);

            $(anggota_chat).each(function (i, v) {
                do_message_notification(id_content_chat, v, 0, null);
            });
            new_message_success();
            return false;
        });

    });


}
/*-------------------------------------------End of Message Page----------------------------------------------------*/


/*-------------------------------------------File Page----------------------------------------------------*/
function files() {
    var link = window.location.href.split('/');
    if (link[4] === 'file') {
        searchMember();
        get_group_info();
        data_files();
    }
}

function data_files() {
    var id_grup = window.location.href.split('?')[1].toString();
    data_files = $('#data-files').DataTable({
//        ajax: '/CollaborativeLearning/users/getJSON',
        ajax: '/CollaborativeLearning/post_file/getFiles?' + id_grup,
        columns: [{
                "data": "src_file",
                "render": function (data, type, row) {
                    var html = (data).toString().split('/')[(data).toString().split('.').length];
                    return html;
                }
            }, {
                "data": "tanggal_file",
                "render": function (data, type, row) {
//                    var dateFormat = data.split('-');
//                    return "<center>" + dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0] + "</center>";
                    return "<center>" + data + "</center>";
                }
            }, {
                "data": "src_file",
                "render": function (data, type, row) {
                    var html = '<center>';
                    html += '<a href="../' + data + '">Download<a>';
                    html += '</center>';
                    return html;
                    //return "<center><button class='update btn btn-primary' onclick='update(this);' value='"+data+"' data-toggle='modal' data-target='#myModal'> <i class='fa fa-update'></i> update</button></center>";
                }
            }],
        "aLengthMenu": [[10, 50, -1], [10, 50, "All"]],
        "pageLength": 10
    });
}
/*-------------------------------------------End of Message Page----------------------------------------------------*/

function searchDosen() {

    $('.typeahead').typeahead({
        source: function (query, process) {
            ajaxPro('GET', '/CollaborativeLearning/grup/getDosenGrupSpecial', null, null, false, false, false, false, success_typeahead, null, null);
            function success_typeahead(objects) {
                var d = [];
                $(objects).each(function (i, v) {
                    d.push(v.id + "+" + v.nama + "+" + v.url + "+" + v.status);
                });
                process(d);
            }


        },
        //                    scrollHeight:3,
        //                    displayField: 'subWilayah',
        highlighter: function (item) {
            var result = item.split("+");
            var itm = '';
            itm += '<div class="typeahead_wrapper">';
            itm += '<div class="typeahead_labels">';
            itm += '<div class="typeahead_primary">' + result[1] + '</div>';
            itm += '<div class="typeahead_secondary">' + result[3] + '</div>';
            itm += '</div>';
            itm += '</div>';
            return itm;
        },
//        onSelect: function(item){
//            alert(1);
//        },
        updater: function (item) {
            var result = item.split("+");
            window.location.href = '/CollaborativeLearning' + result[2];
//            $('#nomorWilayah').val(result[0]);
//            return result[0];
        }
    });
}

function searchMember() {
    var id_grup = window.location.href.split('?')[1].toString();
    $('.search-member').typeahead({
        source: function (query, process) {
            ajaxPro('GET', '/CollaborativeLearning/search/post', id_grup, null, false, false, false, false, success_typeahead, null, null);
            function success_typeahead(objects) {
                var d = [];
                $(objects).each(function (i, v) {
                    d.push(v.id_user + "+" + v.isi_post + "+" + v.url + "+" + v.status);
                });
                process(d);
            }

//            $.getJSON('/CollaborativeLearning/search/post?' + id_grup, function (objects) {
//                var d = [];
//                alert(1);
//                $(objects).each(function (i, v) {
//                    d.push(v.id_user + "+" + v.isi_post + "+" + v.url + "+" + v.status);
//                });
//                process(d);
//            });

        },
        //                    scrollHeight:3,
        //                    displayField: 'subWilayah',
        highlighter: function (item) {
            var result = item.split("+");
            var itm = '';
            itm += '<div class="typeahead_wrapper">';
            itm += '<div class="typeahead_labels">';
//            itm += '<div class="typeahead_primary widget-user-username">' + result[1] + '</div>';
            itm += '<div class="typeahead_primary">' + result[1] + '</div>';
            itm += '<div class="typeahead_secondary">' + result[3] + '</div>';
            itm += '</div>';
            itm += '</div>';
            return itm;
        },
//        onSelect: function(item){
//            alert(1);
//        },
        updater: function (item) {
            var result = item.split("+");
            window.location.href = '/CollaborativeLearning' + result[2];
//            $('#nomorWilayah').val(result[0]);
//            return result[0];
        }
    });
}

function searchPost() {
    var link = window.location.href.split('/');
    if (link[4] === 'search') {
        searchMember();
        get_group_info();
        getSearchPost();
        form_post_edit();
        form_comment_post();
        form_comment_post_edit();
        form_post_file_edit();
        post_nav();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        post_file_nav();
        $('.form-post-edit').hide();
        $('.form-comment-post-edit').hide();
        $('.form-post-file-edit').hide();
        $('.comment-hide').hide();
        $('.file-hide').hide();

    }

}

function search_post_nav() {
    var link = window.location.href.split('/');
    if (link[4] === 'search') {
        get_group_info();
        getSearchPost();
        form_post_edit();
        form_comment_post();
        form_comment_post_edit();
        form_post_file_edit();
        post_nav();
        comment_nav();
        comment_hide_nav();
        file_hide_nav();
        post_file_nav();
        $('.form-comment-post-edit').hide();
        $('.isi_comment').show();
        $('.form-post-edit').hide();
        $('.form-post-file-edit').hide();
        $('.isi_post').show();
        $('.comment-hide').hide();
        $('.file-hide').hide();
    }
}

function getSearchPost() {
    function post_success(object) {
        $('#content-wall').html('');
        var html = '';
        if (object.data.length > 0) {
            $(object.data).each(function (i, v) {
                var d = new Date(v.tanggal_post);
                html += '<div class="box box-widget">';
                html += '<div class="box-header with-border">';
                html += '<div class="user-block">';
                html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle user-image" alt="User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="img-circle user-image" alt="User Image"/>');
                html += '<span class="username"><a href="#">' + v.nama + '</a></span>';
                html += '<span class="description">' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '</span>';
                html += '</div>';//user-block
                html += '<div class="pull-right box-tools">';
                html += '<div class="btn-group">';
                if ($('#session_id_user').html() === v.id_user) {
                    html += '<button type="button" class="btn btn-box-tool" data-toggle="dropdown">';
                    html += '<i class="fa fa-bars"></i>';
                    html += '</button>';
                }
                html += '<ul class="dropdown-menu pull-right" role="menu">';
                html += '<li><a href="javascript:void(0)" class="edit-post">Edit <span class="hide">' + v.id_post + '</span></a></li>';
                html += '<li class="divider"></li>';
                html += '<li><a href="javascript:void(0)" class="delete-post">Delete <span class="hide">' + v.id_post + '</span></a></li>';
                html += '</ul>';
                html += '</div>';//btn-group
                html += '</div>';//pull-right
                html += '</div>';//box-header
                html += '<div class="box-body">';
                html += '<form class="form-post-edit">';
                html += '<div class="form-group">';
                html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                html += '<input type="hidden" class="form-control" name="id_jenis_post" value="' + v.id_jenis_post + '"/>';
                html += '<input type="hidden" class="form-control" name="tanggal_post" value="' + v.tanggal_post + '"/>';
                html += '<textarea class="form-control" name="isi_post" rows="3" placeholder="Enter ..." style="resize: none;">' + v.isi_post + '</textarea>';
                html += '</div>';
                html += '<div class="form-group pull-right">';
                html += '<button type="button" class="cancel btn btn-default" style="margin-right:5px;">Cancel</button>';
                html += '<button type="submit" class="btn btn-primary">Save</button>';
                html += '</div>';
                html += '</form>';
                html += '<p class="isi_post">' + v.isi_post + '</p>';
                html += post_file(v.file_post);
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
                        if ($('#session_id_user').html() === w.id_user) {
                            html += '<button type="button" class="edit-comment btn btn-box-tool" value="' + w.id_comment_post + '"><i class="fa fa-pencil"></i></button>';
                            html += '<button type="button" class="delete-comment btn btn-box-tool" value="' + w.id_comment_post + '"><i class="fa fa-times"></i></button>';
                        }
                        html += '</span>'; //comment-nav
                        html += '</span>'; //username
                        html += '<span class="text-muted pull-left">';
                        html += dc.getHours() + ':' + dc.getMinutes() + ':' + dc.getSeconds() + ' ' + dc.getDate() + '/' + (dc.getMonth() + 1) + '/' + dc.getFullYear();
                        html += '</span><br/>'; //text-muted
                        html += '<form class="form-comment-post-edit">';
                        html += '<div class="form-group">';
                        html += '<input type="hidden" class="form-control" name="id_comment_post" value="' + w.id_comment_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="id_post" value="' + v.id_post + '"/>';
                        html += '<input type="hidden" class="form-control" name="tanggal_comment" value="' + w.tanggal_comment + '"/>';
                        html += '<textarea class="form-control" name="isi_comment" rows="3" placeholder="Enter ..." style="resize: none;">' + w.isi_comment + '</textarea>';
                        html += '</div>'; //form-group
                        html += '<div class="form-group pull-right">';
                        html += '<button type="button" class="cancel-comment-post-edit btn btn-default" style="margin-right:5px;">Cancel</button>';
                        html += '<button type="submit" class="btn btn-primary">Save</button>';
                        html += '</div>'; //form-group
                        html += '</form>'; //form
                        html += '<p class="isi_comment">' + w.isi_comment + '</p>';
                        if (w.src_file !== null) {
                            html += '<ul class="mailbox-attachments clearfix">';
                            html += '<li>';
                            html += '<span class="mailbox-attachment-icon"><i ' + file_type((w.src_file).toString().split('.')[1]) + '></i></span>';
                            html += '<div class="mailbox-attachment-info">';
                            html += '<a href="#" class="mailbox-attachment-name users-list-name"><i class="fa fa-paperclip"></i> ' + (w.src_file).toString().split('/')[(w.src_file).toString().split('.').length] + '</a>';
                            html += '<span class="mailbox-attachment-size">';
                            html += '<a href="/CollaborativeLearning/' + w.src_file + '" class="btn btn-default btn-xs" style="margin-right:1px;"><i class="fa fa-cloud-download"></i></a>';
//                            if ($('#session_id_user').html() === v.id_user) {
//                                html += '<a href="javascript:void(0)" class="edit-post-file btn btn-default btn-xs"><i class="fa fa-pencil-square"></i></a>';
//                            }
                            html += '</span>';
                            html += '</div>';
                            html += '</li>';
                            html += '</ul>';
                        }
                        html += '</div>'; //comment-text
                        html += '</div>'; //box-comment
                    });
                    html += '</div>';
                }
                html += '<div class="box-footer">';
                html += '<form class="form-comment-post">';
                html += imageCheck($('#current_src_image').html().trim(), '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-responsive img-circle img-sm" alt="User Image"/>', '<img src="/CollaborativeLearning/' + $('#current_src_image').html().trim() + '" class="img-responsive img-circle img-sm" alt="User Image"/>');
                html += '<div class="input-group margin img-push">';
                html += '<input type="hidden" name="id_post" value="' + v.id_post + '">';
                html += '<input type="text" name="isi_comment" class="form-control input-sm" placeholder="Press enter to post comment">';
                html += '<span class="input-group-btn">';
                html += '<div class="btn btn-default btn-file input-sm btn-flat">';
                html += '<i class="fa fa-paperclip"></i>';
                html += '<input type="file" name="src_file">';
                html += '</div>';
                html += '</span>';
                html += '</div>';
                html += '</form>';
                html += '</div>';
                html += '</div>';//box
//              
            });
        }
        $('#content-wall').html(html);
    }

    var url = window.location.href.split('?')[1].toString().split('&');
    var id_post = url[0];
    var id_grup = url[1];
    ajaxPro('GET', '/CollaborativeLearning/search/getSearchPost', id_post, 'json', false, false, false, false, post_success, null, null);
}

function getHeaderMessages() {
    function message_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<li>';
            if (v.status_baca === '1') {
//                html += '<a href="/CollaborativeLearning/grup/index?id_grup=' + v.id_content_chat + '" alt="' + v.id_anggota_chat + '">';
                html += '<a href="/CollaborativeLearning/message?id_chat=' + v.id_chat + '" alt="' + v.id_chat + '">';
            } else {
                html += '<a href="/CollaborativeLearning/message?id_chat=' + v.id_chat + '" onclick="update_message_notif(this);" class="btn-default" alt="' + v.id_chat + '">';
            }
            html += '<div class="pull-left">';
            html += '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle" alt="User Image"/>';
            html += '</div>';
            html += '<h4>';
            html += '<div class="users-list-name">';
            $(v.anggota_chat).each(function (j, w) {
                html += w.nama;
                if (j < (v.anggota_chat.length - 1)) {
                    html += ', ';
                }
            });
            html += '</div>';
            html += '</h4>';
            html += '<p>' + v.last_chat + '</p>';
            html += '</a>';
            html += '</li>';
        });
        $('#header-messages').html(html);
        $('#header-messages-notif').html('You have ' + object.alert + ' new messages');

        if (object.alert > 0)
            $('#header-messages-alert').html('<i class="fa fa-envelope"></i><span class="label label-success">' + object.alert + '</span>');
        else
            $('#header-messages-alert').html('<i class="fa fa-envelope"></i>');

    }
//    ajaxPro('GET', '/CollaborativeLearning/message/getChat', null, 'json', false, false, false, false, message_success, null, null);
    ajaxPro('GET', '/CollaborativeLearning/message/getNotifikasiChat', null, 'json', false, false, false, false, message_success, null, null);
}

function update_message_notif(i) {
    function post_success(returndata) {
//        alert(returndata);
        getHeaderMessages();
    }

    var parameter = "id_chat=" + $(i).attr('alt');
//    alert(parameter);
    ajaxPro('GET', '/CollaborativeLearning/notifikasi_chat/updateStatus', parameter, 'html', false, false, false, false, post_success, null, null);
    return false;
}

function mark_all_message() {
    function post_success(returndata) {
        getHeaderMessages();
    }
    ajaxDelLive('POST', '/CollaborativeLearning/notifikasi_chat/updateAllStatus', null, post_success, error_messages, null, null);
}


function getHeaderGrup() {
    function anouncement_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            html += '<li>';
            if (v.status === '1') {
                html += '<a href="/CollaborativeLearning/grup/index?id_grup=' + v.id_grup + '" alt="' + v.id_anggota + '">';
            } else {
                html += '<a href="/CollaborativeLearning/grup/index?id_grup=' + v.id_grup + '" onclick="update_grup_notif(this);" class="btn-default" alt="' + v.id_anggota + '">';
            }
//            html += '<a href="/CollaborativeLearning/grup/index?id_grup=' + v.id_grup + '">';
            html += '<div class="pull-left">';
            html += imageCheck(v.src_image, '<img src="/CollaborativeLearning/assets/dist/img/default.png" class="img-circle" alt="User Image"/>', '<img src="/CollaborativeLearning/' + v.src_image + '" class="img-circle" alt="User Image"/>');
            html += '</div>';
            html += '<h4>';
            html += v.nama_grup;
            html += '</h4>';
            html += '<p>';
            html += '<div class="users-list-name">';
            $(v.anggota).each(function (j, w) {
//                    html += '<span class="badge">' + w.nama + '</span>';
                html += w.nama;
                if (j < (v.anggota.length - 1)) {
                    html += ', ';
                }
            });
            html += '</div>';
            html += '</p>';
            html += '</a>';
            html += '</li>';
        });
        $('#header-groups').html(html);
        $('#header-groups-notif').html('You have ' + object.alert + ' new groups');

        if (object.alert > 0)
            $('#header-groups-alert').html('<i class="fa fa-users"></i><span class="label label-warning">' + object.alert + '</span>');
        else
            $('#header-groups-alert').html('<i class="fa fa-users"></i>');

    }
    ajaxPro('GET', '/CollaborativeLearning/grup/getDosenGrup', null, 'json', false, false, false, false, anouncement_success, null, null);
}

function update_grup_notif(i) {
    function post_success(returndata) {
        getHeaderGrup();
    }

    var id_anggota = "id_anggota=" + $(i).attr('alt');
    ajaxDelLive('POST', '/CollaborativeLearning/anggota/updateStatus', id_anggota, post_success, error_messages, null, null);
    return false;
}

function mark_all_grup() {
    function post_success(returndata) {
        getHeaderGrup();
    }
    ajaxDelLive('POST', '/CollaborativeLearning/anggota/updateAllStatus', null, post_success, error_messages, null, null);
}


function getHeaderNotification() {
    function anouncement_success(object) {
        var html = '';
        $(object.data).each(function (i, v) {
            var content = v.nama_source + ' ' + v.isi_content_notification + ' ' + v.nama_grup;
//            html += '<li data-toggle="tooltip" data-placement="top" title="' + content + '">';                        
            html += '<li>';
            if (v.status_baca === '1') {
                html += '<a href="' + v.url + '" alt="' + v.id_notifikasi_target + '">';
            } else {
                html += '<a href="' + v.url + '" onclick="update_notification(this);" class="btn-default" alt="' + v.id_notifikasi_target + '">';
            }
            html += content;
            html += '</a>';
            html += '</li>';
        });

        $('#header-notifications').html(html);
        $('#header-notifications-notif').html('You have ' + object.alert + ' new notifications');

        if (object.alert > 0) {
            $('#header-notifications-alert').html('<i class="fa fa-bell"></i><span class="label label-danger">' + object.alert + '</span>');
        } else {
            $('#header-notifications-alert').html('<i class="fa fa-bell"></i>');
        }
    }
    ajaxPro('GET', '/CollaborativeLearning/notifikasi/getNotifikasi', null, 'json', false, false, false, false, anouncement_success, null, null);
}

function update_notification(i) {
    function post_success(returndata) {
        getHeaderNotification();
    }

    var id_notifikasi_target = "id_notifikasi_target=" + $(i).attr('alt');
    ajaxDelLive('POST', '/CollaborativeLearning/notifikasi/updateNotifikasiTarget', id_notifikasi_target, post_success, error_messages, null, null);
    return false;
}

function do_notification(formData, cn, success, url, id_grup) {
    var d = new Date();
    var id_notifikasi = '029' + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
    var tanggal_post = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    formData.append('id_notifikasi', id_notifikasi);
    formData.append('id_grup', id_grup);
    formData.append('id_content_notification', cn);
    formData.append('url', url);
    formData.append('tanggal_notifikasi', tanggal_post);
    ajaxLive('POST', '/CollaborativeLearning/notifikasi/signUp', formData, null, false, false, false, false, success, error_messages, complete_group, null);
    ajaxLive('POST', '/CollaborativeLearning/anggota/getAnggotaTarget', formData, null, false, false, false, false, anggotaTarget, error_messages, complete_group, null);
    function anggotaTarget(object) {
        $(object.data).each(function (i, v) {
            var id_notifikasi_target = '0292' + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (9999 - 1000) + 1000));
            formData.append('id_notifikasi_target', id_notifikasi_target);
            formData.append('id_user_target', v.id_user);
            ajaxLive('POST', '/CollaborativeLearning/notifikasi/signUpNotifikasiTarget', formData, null, false, false, false, false, success, error_messages, complete_group, null);
        });
    }
}


function do_message_notification(id_content_chat, id_anggota_chat, status_baca, success) {
    var d = new Date();
    var id_notifikasi_chat = '128' + d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) + (Math.floor(Math.random() * (99 - 10) + 10));
    var formData = new FormData();
    formData.append('id_notifikasi_chat', id_notifikasi_chat);
    formData.append('id_content_chat', id_content_chat);
    formData.append('id_anggota_chat', id_anggota_chat);
    formData.append('status_baca', status_baca);
    ajaxPro('POST', '/CollaborativeLearning/notifikasi_chat/signUp', formData, 'html', false, false, false, false, success, error_messages, null);
}

function mark_all_notification() {
    function post_success(returndata) {
        getHeaderNotification();
    }
    ajaxDelLive('POST', '/CollaborativeLearning/notifikasi/updateAllNotifikasiTarget', null, post_success, error_messages, null, null);
}

function getPhoto() {
    function post_success(returndata) {
//        alert(returndata);
        $(".user-photo").attr('src', returndata);
    }
    ajaxPro('GET', '/CollaborativeLearning/users/getPhoto', null, 'json', false, false, false, false, post_success, null, null);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function setFileVal(i) {
    $('.file-changed').html($(i).val().split('\\')[$(i).val().split('\\').length - 1]);
}

function setFileValComment(i) {
    $(i).parent().find('.file-changed').html($(i).val().split('\\')[$(i).val().split('\\').length - 1]);
}

function dateFormatOutput(d) {
    var date = new Date(d);
    return concatString(date.getDate()) + '-' + concatString(date.getMonth() + 1) + '-' + date.getFullYear();
}

function dateFormatInput(d) {
    d = d.toString().split('-');
    return d[2] + '-' + d[1] + '-' + d[0];
}

function dateTimeFormatOutput(d) {
    var date = new Date(d);
    return concatString(date.getHours()) + ':' + concatString(date.getMinutes()) + ':' + concatString(date.getSeconds()) + ' ' + concatString(date.getDate()) + '-' + concatString(date.getMonth() + 1) + '-' + date.getFullYear();
}

function dateTimeFormatInput(d) {
    d = d.toString().split(' ');
    var time = d[0];
    var date = d[1].toString().split('-');
    return date[2] + '-' + date[1] + '-' + date[0] + ' ' + time;
}