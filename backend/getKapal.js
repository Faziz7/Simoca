const request = require("request")
const conn = require('../config/db2')
const util = require('../util/util')

var url = "https://sehati.hubla.dephub.go.id/gis/ship"

function getKapal(){
	request({
	    url: url,
	    json: true 
	},async function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	// console.log()
	    	response = response.body
	    	for(let i = 0; i < response.length; i++){
	    		let tanggal = await util.getDateTimestamp()
	    		let icon_kapal ='ship'

	    		if(response[i].jenis_kapal == 'Kapal Penumpang'){
	    			icon_kapal ='ship-red'
	    		}else if(response[i].jenis_kapal == 'Kapal Penangkap Ikan'){
	    			icon_kapal = 'ship-purple'
	    		}else{
	    			icon_kapal ='ship'
	    		}

	    		let save_kapal  = {
		        		latitude : response[i].latitude, 
		        		longitude : response[i].longitude,
		        		id_kapal : response[i].kapal_id,
		        		mmsi : response[i].mmsi,
		        		vessel_name : response[i].vessel_name,
		        		heading : response[i].true_heading,
		        		received_time_utc_unix : tanggal,
		        		jenis_kapal : response[i].jenis_kapal,
		        		icon_kapal : icon_kapal,
		        		flag_tarik : 'N'
		        }

		        // console.log(save_kapal)
		        let save_kapal_insert =  conn.insert("tb_temp_data_kapal", save_kapal)
		        save_kapal_insert.then(result => {
		        	console.log(response[i].mmsi + " status insert : "+ result)
		        })
	    	}

	        // console.log(body['features']) // Print the json response
	        // let data = []
	     //    for(var i = 0; i < body['features'].length; i++){
		    // 	//get geometry
		    //     let save_geomoetry = body['features'][i]['geometry'];
		    //     save_properties = body['features'][i]['properties'];

		        // let save_kapal  = {
		        // 		latitude : save_geomoetry['coordinates'][0], 
		        // 		longitude : save_geomoetry['coordinates'][1],
		        // 		id_kapal : save_properties['id'],
		        // 		mmsi : save_properties['mmsi'],
		        // 		vessel_name : save_properties['vessel_name'],
		        // 		heading : save_properties['heading'] == '' ? '0' : save_properties['heading'],
		        // 		received_time_utc_unix : save_properties['received_time_utc_unix'],
		        // 		jenis_kapal : save_properties['jenis_kapal'],
		        // 		icon_kapal : save_properties['icon_kapal'],
		        // 		flag_tarik : 'N'
		        // }

		        // let save_kapal_insert = conn.insert("tb_temp_data_kapal", save_kapal)
		        // save_kapal_insert.then(result => {
		        // 	console.log(save_properties['mmsi'] + " status insert : "+ result)
		        // })
		    // }
	    }else{
	    	console.log('error :'+error)
	    }
	})
}

getKapal();