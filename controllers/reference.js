const hbs = require('hbs');
const fs = require('fs');
const util = require('../util/util')
const model = require('../models/m_reference')

exports.reference = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/reference.html', 'utf8'));
	model.getListReference(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data})
		}
	})
}

exports.addReference =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/reference.html', 'utf8'));
	model.addReference(req,res,sess)
}

exports.updateReference = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/reference.html', 'utf8'));
	model.updateReference(req,res,sess)
}

exports.deleteReference = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/reference.html', 'utf8'));
	model.deleteReference(req,res,sess)
}


//===================================================== region  =======================================================
exports.region = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/region.html', 'utf8'));
	model.getListRegion(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data})
		}
	})
}

exports.addRegion =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/region.html', 'utf8'));
	model.addRegion(req,res,sess)
}

exports.updateRegion = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/region.html', 'utf8'));
	model.updateRegion(req,res,sess)
}

exports.deleteRegion = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/region.html', 'utf8'));
	model.deleteRegion(req,res,sess)
}

//===================================================== negara  =======================================================
exports.negara = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/negara.html', 'utf8'));
	model.getListNegara(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data})
		}
	})
}

exports.addNegara =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/negara.html', 'utf8'));
	model.addNegara(req,res,sess)
}

exports.updateNegara = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/negara.html', 'utf8'));
	model.updateNegara(req,res,sess)
}

exports.deleteNegara = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/negara.html', 'utf8'));
	model.deleteNegara(req,res,sess)
}

//===================================================== pelabuan =======================================================
exports.getDetailPelabuhan = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	model.getDetailPelabuhan(req,res);
}

exports.pelabuhan = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	let isUser = true
	let isAdmin = false

	if(sess['role_user'] == '01'){
		isUser = false
		isAdmin = true
	}else{
		isUser = true
		isAdmin = false
	}

	hbs.registerPartial('content', fs.readFileSync( './views/layout/pelabuhan.html', 'utf8'));
	model.getListPelabuhan(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null, isUser : isUser, isAdmin : isAdmin})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data, isUser : isUser, isAdmin : isAdmin})
		}
	})
}

exports.addPelabuhan =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pelabuhan.html', 'utf8'));
	model.addPelabuhan(req,res,sess)
}

exports.updatePelabuhan = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pelabuhan.html', 'utf8'));
	model.updatePelabuhan(req,res,sess)
}

exports.deletePelabuhan = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pelabuhan.html', 'utf8'));
	model.deletePelabuhan(req,res,sess)
}

//===================================================== Tujuan =======================================================
exports.tujuan = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/tujuan.html', 'utf8'));
	model.getListTujuan(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data})
		}
	})
}

exports.addTujuan =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/tujuan.html', 'utf8'));
	model.addTujuan(req,res,sess)
}

exports.updateTujuan = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/tujuan.html', 'utf8'));
	model.updateTujuan(req,res,sess)
}

exports.deleteTujuan = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/tujuan.html', 'utf8'));
	model.deleteTujuan(req,res,sess)
}

//===================================================== Pemilik Kapal =======================================================
exports.pemilik_kapal = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	let isUser = true
	let isAdmin = false

	if(sess['role_user'] == '01'){
		isUser = false
		isAdmin = true
	}else{
		isUser = true
		isAdmin = false
	}

	hbs.registerPartial('content', fs.readFileSync( './views/layout/pemilik_kapal.html', 'utf8'));
	model.getListPemilik_kapal(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null, isUser : isUser, isAdmin : isAdmin})
		}else{
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data, isUser : isUser, isAdmin : isAdmin})
		}
	}, sess)
}

exports.addPemilik_kapal =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pemilik_kapal.html', 'utf8'));
	model.addPemilik_kapal(req,res,sess)
}

exports.updatePemilik_kapal = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pemilik_kapal.html', 'utf8'));
	model.updatePemilik_kapal(req,res,sess)
}

exports.deletePemilik_kapal = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pemilik_kapal.html', 'utf8'));
	model.deletePemilik_kapal(req,res,sess)
}

exports.updateStatusPemilik = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/pemilik_kapal.html', 'utf8'));
	model.updateStatusPemilik(req,res,sess)
}