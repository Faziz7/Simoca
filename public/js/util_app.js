function showNotif(kd_err, message){
	if(kd_err == 'OK'){
		swal("Sukses",message, "success");
	}else if(kd_err == 'ER'){
		swal("Error",message, "error");
	}else{
		swal("Peringatan",message, "warning");
	}
}


//untuk user
function showDetailUser(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#EditModal').modal('hide');
				$('#DeleteModal').modal('hide');


				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);
				$('#myModalDetail').modal('show');

			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}


function showAddUser(){
	$('#EditModal').modal('hide');
	$('#DeleteModal').modal('hide');
	$('#myModalDetail').modal('hide');

	$('input[name=id_user]').val('');
	$('input[name=username]').val('');
	$('input[name=password]').val('');
	$('input[name=nama_pj]').val('');
	$('input[name=perusahaan]').val('');
	$('input[name=alamat_perusahaan]').val('');
	$('input[name=contact]').val('');
	$('input[name=email]').val('');
	$('input[name=role_user]').val('');
	$('#myModalAdd').modal('show');
}


function showUpdate(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#DeleteModal').modal('hide');
				$('#myModalDetail').modal('hide');

				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);

				$('#EditModal').modal('show');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}

function showDelete(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#EditModal').modal('hide');
				$('#myModalDetail').modal('hide');

				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);
				

				$('#DeleteModal').modal('show');

			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}


//untuk pelabuhan
function showDetailPelabuhan(id_pelabuhan){
	$.ajax({
		url: '/reference/getDetailPelabuhan',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_pelabuhan : id_pelabuhan}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				// $('#myModalAdd').modal('hide');
				$('#DeleteModalPelabuhan').modal('hide');
				$('#EditModalPelabuhan').modal('hide');

				$('input[name=id_pelabuhan]').val(data.message[0]['id_pelabuhan']);
				$('input[name=longitude]').val(data.message[0]['longitude']);
				$('input[name=latitude]').val(data.message[0]['latitude']);
				$('input[name=kd_pelabuhan]').val(data.message[0]['kd_pelabuhan']);
				$('input[name=nama_pelabuhan]').val(data.message[0]['nama_pelabuhan']);
				$('input[name=nama_kabkota]').val(data.message[0]['nama_kabkota']);
				$('input[name=alamat_pelabuhan]').val(data.message[0]['alamat_pelabuhan']);
				$('input[name=telp_pelabuhan]').val(data.message[0]['telp_pelabuhan']);
				$('input[name=website]').val(data.message[0]['website']);
				$('input[name=fasilitas]').val(data.message[0]['fasilitas']);

				$('#DetailModalPelabuhan').modal('show');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}

// function showAddPelabuhan(){
// 	$('#EditModal').modal('hide');
// 	$('#DeleteModal').modal('hide');
// 	$('#myModalDetail').modal('hide');

// 	$('input[name=id_user]').val('');
// 	$('input[name=username]').val('');
// 	$('input[name=password]').val('');
// 	$('input[name=nama_pj]').val('');
// 	$('input[name=perusahaan]').val('');
// 	$('input[name=alamat_perusahaan]').val('');
// 	$('input[name=contact]').val('');
// 	$('input[name=email]').val('');
// 	$('input[name=role_user]').val('');
// 	$('#myModalAdd').modal('show');
// }


function showUpdatePelabuhan(id_pelabuhan){
	$.ajax({
		url: '/reference/getDetailPelabuhan',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_pelabuhan : id_pelabuhan}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#DeleteModalPelabuhan').modal('hide');
				$('#DetailModalPelabuhan').modal('hide');

				$('input[name=id_pelabuhan]').val(data.message[0]['id_pelabuhan']);
				$('input[name=longitude]').val(data.message[0]['longitude']);
				$('input[name=latitude]').val(data.message[0]['latitude']);
				$('input[name=kd_pelabuhan]').val(data.message[0]['kd_pelabuhan']);
				$('input[name=nama_pelabuhan]').val(data.message[0]['nama_pelabuhan']);
				$('input[name=nama_kabkota]').val(data.message[0]['nama_kabkota']);
				$('input[name=alamat_pelabuhan]').val(data.message[0]['alamat_pelabuhan']);
				$('input[name=telp_pelabuhan]').val(data.message[0]['telp_pelabuhan']);
				$('input[name=website]').val(data.message[0]['website']);
				$('input[name=fasilitas]').val(data.message[0]['fasilitas']);
				
				$('#EditModalPelabuhan').modal('show');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}

function showDeletePelabuhan(id_pelabuhan){
	$.ajax({
		url: '/reference/getDetailPelabuhan',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_pelabuhan : id_pelabuhan}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#DetailModalPelabuhan').modal('hide');
				$('#EditModalPelabuhan').modal('hide');

				$('input[name=id_pelabuhan]').val(data.message[0]['id_pelabuhan']);
				// $('input[name=longitude]').val(data.message[0]['longitude']);
				// $('input[name=latitude]').val(data.message[0]['latitude']);
				// $('input[name=kd_pelabuhan]').val(data.message[0]['kd_pelabuhan']);
				// $('input[name=nama_pelabuhan]').val(data.message[0]['nama_pelabuhan']);
				// $('input[name=nama_kabkota]').val(data.message[0]['nama_kabkota']);
				// $('input[name=alamat_pelabuhan]').val(data.message[0]['alamat_pelabuhan']);
				// $('input[name=telp_pelabuhan]').val(data.message[0]['telp_pelabuhan']);
				// $('input[name=website]').val(data.message[0]['website']);
				// $('input[name=fasilitas]').val(data.message[0]['fasilitas']);
				
				$('#DeleteModalPelabuhan').modal('show');

			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}

function showAddReferencePelabuhan(){
	$('#EditModalPelabuhan').modal('hide');
	$('#DeleteModalPelabuhan').modal('hide');

	$('input[name=id_pelabuhan]').val('');
	$('#myModalAddPelabuhan').modal('show');
}


function showUpdateReferencePelabuhan(id_pelabuhan){
	// $('#myModalAddPelabuhan').modal('hide');
	$('#DeleteModalPelabuhan').modal('hide');
	$('#myModalDetailPelabuhan').modal('hide');
	$('#EditModalPelabuhan').modal('show');

	$('input[name=id_pelabuhan]').val(id_pelabuhan);
}

function showDeleteReferencePelabuhan(id_pelabuhan){
	// $('#myModalAddPelabuhan').modal('hide');
	$('#EditModalPelabuhan').modal('hide');
	$('#myModalDetailPelabuhan').modal('hide');
	$('input[name=id_pelabuhan]').val(id_pelabuhan);
	$('#DeleteModalPelabuhan').modal('show');
}

//pemilik kapal
function showAddReferencePemilikKapal(){
	$('#UpdateStatusPemilik').modal('hide');
	$('#DeleteModalPemilik').modal('hide');
	$('input[name=mmsi]').val('');
	$('input[name=no_tanda_daftar]').val('');
	$('input[name=no_akta]').val('');
	$('#AddModalPemilik').modal('show');
}

function showDeleteReferencePemilikKapal(id_pemilik_kapal){
	$('#UpdateStatusPemilik').modal('hide');
	$('#AddModalPemilik').modal('hide');
	$('input[name=id_pemilik_kapal]').val(id_pemilik_kapal);
	$('#DeleteModalPemilik').modal('show');
}

$(document).ready(function() {
    $('.select2').select2();
    $('#mytable').dataTable();
});

//update status kapal
function showUpdateStatus(id_pemilik_kapal){
	$('input[name=id_pemilik_kapal]').val(id_pemilik_kapal);
	$('#AddModalPemilik').modal('hide');
	$('#DeleteModalPemilik').modal('hide');
	$('#UpdateStatusPemilik').modal('show');
}