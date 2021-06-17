var async = require('async');
const conn = require('../knex/knex.js');
const request = require("request")
const parse = require('node-html-parser').parse
const scraper = require('table-scraper');

function insertDataKapalDetail(data){
	console.log(data)
	return conn.table('tb_data_kapal_detail').insert(data).catch(err =>{
		console.log("xxxxxxxxxxxxxxxxxxxx error insert data kapal xxxxxxxxxxxxxxxxxxxx \n"+ err)
	})

}

function updateDataKapalDetail(data, id_kapal){
	return conn.table('tb_data_kapal_detail').update(data).where('id_kapal', id_kapal).catch(err =>{
		console.log("xxxxxxxxxxxxxxxxxxxx error update data kapal xxxxxxxxxxxxxxxxxxxx \n"+ err)
	})
}

function moveDataKapalDetailHistory(data, id_kapal){
	return conn.from(conn.raw('?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??)',
					['tb_history_data_kapal_detail', 
					'id_kapal','jenis_kapal','bendera_kapal','imo_mmsi','callsign',
					'arah_kapal','kecepatan_kapal','tujuan','waktu_laporan','koordinat_laut',
					'gt_kapal','panjang_kapal','lebar_kapal','dimensi_dalam_kapal','isi_bersih',
					'loa_kapal','bahan_kapal','penggerak_kapal','jml_cerobong','jml_geladak',
					'merk_mesin','daya','jml_baling',
					'longitude', 'latitude',
					'nama_pemilik', 'alamat_pemilik', 
					'tempat_pembuatan', 'tahun_pembuatan',
					'no_akta', 'tempat_pendaftaran',
					'no_tanda_daftar', 'tgl_pendaftaran',
					'no_surat_ukur', 'tgl_surat_ukur'
					]))
					 .insert(function (){
					 	this.from('tb_data_kapal_detail').where('id_kapal', id_kapal)
					 .select('id_kapal','jenis_kapal','bendera_kapal','imo_mmsi','callsign',
							 'arah_kapal','kecepatan_kapal','tujuan','waktu_laporan','koordinat_laut',
							 'gt_kapal','panjang_kapal','lebar_kapal','dimensi_dalam_kapal','isi_bersih',
							 'loa_kapal','bahan_kapal','penggerak_kapal','jml_cerobong','jml_geladak',
							 'merk_mesin','daya','jml_baling',
							 'longitude', 'latitude',
							 'nama_pemilik', 'alamat_pemilik', 
							 'tempat_pembuatan', 'tahun_pembuatan',
							 'no_akta', 'tempat_pendaftaran',
							 'no_tanda_daftar', 'tgl_pendaftaran',
							 'no_surat_ukur', 'tgl_surat_ukur')
					 }).then(results =>{
					 	updateDataKapalDetail(data, id_kapal);
					 }).catch(err =>{
					 	console.log(err)
					 })
}

function getDataKapalDetail(id_kapal){
	return conn.select('id_kapal').table('tb_data_kapal_detail').where('id_kapal', id_kapal).first()
}

function updateFlagPenarikanDataKapal(id_kapal){
	return conn.table('tb_data_kapal').update({flag_get_detail : 'Y'}).where('id_kapal', id_kapal).catch(err =>{
		console.log(err)
	})
}

function getDataKapal(){
	let data_kapal = []
	// return conn.select().table('tb_temp_data_kapal').where('flag_tarik','Y').then(rows => {
	return conn.select().table('tb_data_kapal').where('flag_get_detail','N').then(rows => {
		rows.forEach(function(data, index) {
			tampung_kapal = {
				last_latitude : data['latitude'],
				last_longitude : data['longitude'],
				mmsi : data['mmsi'],
				id_kapal : data['id_kapal'],
				vessel_name : data['vessel_name'],
				last_received_time_utc_unix : data['received_time_utc_unix'],
				jenis_kapal : data['jenis_kapal'],
				icon_kapal : data['icon_kapal'],
				last_heading : data['heading'],
 				id_penarikan : data['id_penarikan']
			}

			data_kapal.push(tampung_kapal);
		});

		return data_kapal;
	});
}


function getDataKapalById(id_kapal){
	let data_kapal = []
	// return conn.select().table('tb_temp_data_kapal').where('flag_tarik','Y').then(rows => {
	return conn.select().table('tb_data_kapal').where('id_kapal',id_kapal).then(rows => {
		rows.forEach(function(data, index) {
			tampung_kapal = {
				last_latitude : data['latitude'],
				last_longitude : data['longitude'],
				mmsi : data['mmsi'],
				id_kapal : data['id_kapal'],
				vessel_name : data['vessel_name'],
				last_received_time_utc_unix : data['received_time_utc_unix'],
				jenis_kapal : data['jenis_kapal'],
				icon_kapal : data['icon_kapal'],
				last_heading : data['heading'],
 				id_penarikan : data['id_penarikan']
			}

			data_kapal.push(tampung_kapal);
		});

		return data_kapal;
	});
}

async function olahDataDetail(){
	let data_kapal = await getDataKapal();
	for(let i = 0; i < data_kapal.length; i++){
		var url = "https://sehati.hubla.dephub.go.id/index.jsp?mod=view-kapal&id="
		url = url+''+data_kapal[i]['mmsi']
		// console.log(url)
		await scraper.get(url).then(async function(tableData) {
			// console.log(tableData[1])
			// console.log(tableData)
			// property_panjang_lebar = tableData[1]['1'][1].split('/')
			// property_arah_kecepatan = tableData[0]['5'][1].split('/')
			// property_waktu_laporan = tableData[0]['7'][0].replace('Waktu Laporan','').replace('`','')
			// property_koordinat = tableData[0]['8'][0].replace('Koordinat','').replace('`','')

			// let save_kapal = {
			// 	id_kapal : id_kapal,
			// 	jenis_kapal : tableData[0]['1'][1],
			// 	bendera_kapal : tableData[0]['2'][1],
			// 	imo_mmsi : tableData[0]['3'][1],	
			// 	callsign : tableData[0]['4'][1],
			// 	arah_kapal : property_arah_kecepatan[0].trim(),
			// 	kecepatan_kapal : property_arah_kecepatan[1].trim(),
			// 	waktu_laporan : property_waktu_laporan,
			// 	koordinat_laut : property_koordinat,
			// 	gt_kapal : tableData[1]['0'][1],
			// 	panjang_kapal : property_panjang_lebar[0].trim(),
			// 	lebar_kapal : property_panjang_lebar[1].trim(),
			// 	dimensi_dalam_kapal : tableData[1]['2'][1],
			// 	isi_bersih : tableData[1]['3'][1],
			// 	loa_kapal : tableData[1]['4'][1],
			// 	bahan_kapal : tableData[1]['5'][1],
			// 	penggerak_kapal : tableData[1]['6'][1],
			// 	jml_cerobong : tableData[1]['7'][1],
			// 	jml_geladak : tableData[1]['8'][1],
			// 	jml_baling :tableData[1]['9'][1],
			// 	merk_mesin : tableData[1]['10'][1],
			// 	daya : tableData[1]['11'][1]
			// }
			
			// await insertDataKapal(save_kapal)
			// let ada_kapal = await getDataKapalDetail(id_kapal)
			// if(ada_kapal != null){
			// 	console.log(' ================= masuk update kapal '+id_kapal+' =======================')
			// 	await moveDataKapalDetailHistory(save_kapal, id_kapal)
			// 	console.log(' ================= done update kapal '+id_kapal+' =======================')
			// }else{
			// 	console.log(' ================= masuk insert kapal '+id_kapal+' =======================')
			// 	await insertDataKapalDetail(save_kapal)
			// 	console.log(' ================= done insert kapal '+id_kapal+' =======================')
			// }

			// await updateFlagPenarikanDataKapal(id_kapal)

		}).catch(function(err){
			console.log('>>>>>>>>>>>>>>>> reject error scraping data, url : '+ url + '\nerror : '+err + '<<<<<<<<<<<<<<<<')
		})
	}
}

// olahDataDetail()

// olahDetailByKapal = async function(id_kapal){
exports.olahDetailByKapal = async function(id_kapal){
	let url = 'https://sehati.hubla.dephub.go.id/gis/ship/detail/'+id_kapal

	request({
	    url: url,
	    json: true 
	},async function (error, response, body) {
		if (!error && response.statusCode === 200) {
			response = response.body

			for(let i = 0; i < response.length; i++){
				let save_kapal = {
					id_kapal : id_kapal,
					jenis_kapal : response[i].jenis_kapal,
					bendera_kapal : response[i].mid,
					imo_mmsi : response[i].imo_number,	
					callsign : response[i].call_sign,
					arah_kapal : response[i].course_over_ground,
					tujuan : response[i].destination,
					kecepatan_kapal : response[i].speed_over_ground,
					waktu_laporan : response[i].received_time_utc_unix,
					gt_kapal : response[i].dimensi_isikotor,
					panjang_kapal : response[i].dimensi_panjang,
					lebar_kapal : response[i].dimensi_lebar,
					dimensi_dalam_kapal : response[i].dimensi_dalam,
					isi_bersih : response[i].dimensi_isibersih	,
					loa_kapal : response[i].dimensi_loa,
					bahan_kapal : response[i].bahan_ket,
					penggerak_kapal : response[i].penggerak_ket,
					jml_cerobong : response[i].jml_cerobong,
					jml_geladak : response[i].jml_geladak,
					jml_baling :response[i].jml_baling,
					merk_mesin : response[i].mesin_merk,
					daya : response[i].daya_mesin1,
					longitude : response[i].longitude,
					latitude : response[i].latitude,
					nama_pemilik : response[i].nama_pemilik,
					alamat_pemilik : response[i].alamat_pemilik,
					tempat_pembuatan : response[i].tempat_pembuatan,
					tahun_pembuatan : response[i].tahun_pembuatan,
					no_akta : response[i].no_akta,
					tempat_pendaftaran : response[i].tempat_pendaftaran,
					no_tanda_daftar : response[i].no_tanda_pendaftaran,
					tgl_pendaftaran : response[i].tgl_pendaftaran,
					no_surat_ukur : response[i].no_surat_ukur,
					tgl_surat_ukur : response[i].tgl_surat_ukur
				}
				
				let ada_kapal = await getDataKapalDetail(id_kapal)
				if(ada_kapal != null){
					console.log(' ================= masuk update kapal '+id_kapal+' =======================')
					await moveDataKapalDetailHistory(save_kapal, id_kapal)
					console.log(' ================= done update kapal '+id_kapal+' =======================')
				}else{
					console.log(' ================= masuk insert kapal '+id_kapal+' =======================')
					await insertDataKapalDetail(save_kapal)
					console.log(' ================= done insert kapal '+id_kapal+' =======================')
				}

				await updateFlagPenarikanDataKapal(id_kapal)
			}
		}else{
			console.log(error)
		}
	})
}

// olahDetailByKapal('220229000FLORESMANDIRI')