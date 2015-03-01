var execSync = require('exec-sync');
var fs = require('fs');
var express = require("express");
var app = express();

var JSFtp = require("jsftp");

var ftp = new JSFtp({
	host: 'mafreebox.freebox.fr'
});

// function execSync(cmd){
// 	execSync_ch("cd "+__dirname+";"+cmd);
// }

function treat(A_first){
	execSync("mkdir -p o");
	execSync("rm -f o/*.pdf");
	execSync("rm -f o/*.txt");
	execSync("rm -f static/result.pdf");
	execSync("pdftk A.pdf burst output o/a%04d.pdf", true);
	execSync("pdftk B.pdf burst output o/b%04d.pdf", true);
	var list = fs.readdirSync("./o/");
	var A = new Array();
	var B = new Array();
	for(var i in list){
		if(list[i][0]=='a')
			A.push('./o/'+list[i]);
		else if(list[i][0]=='b')
			B.push('./o/'+list[i]);
	}
	A.sort();
	B.sort();

	if(A.length!=B.length)
		return {error: true, code: 1, msg: 'Les deux fichiers pdf n\'ont pas le même nombre de pages.'};

	B = B.reverse();

	var command = 'pdftk ';
	for(var i=0; i<A.length; i++){
		command += A[i]+' ';
		command += B[i]+' ';
	}
	command += ' cat output static/result.pdf';
	var result = execSync(command, true);
	return {error: false, dlpath: 'result.pdf', result: command};
}


function getLastPDFs(callback){
	ftp.ls("Disque dur/Scans", function(err, res) {
		res.sort(function(a, b){
			return b.time - a.time;
		})
		var pdfs = new Array();
		res.forEach(function(file){
			if(file.name.substr(-4)=='.pdf')
				pdfs.push({name: file.name, time: file.time});
		});
		pdfs[0].selected = pdfs[1].selected = true;
		callback(pdfs);
	});
}

function downloadPDF(name1, name2, callback){
	name1 = name1.replace(/[^A-z0-9.]/g,'');
	name2 = name2.replace(/[^A-z0-9.]/g,'');
	execSync('rm -f A.pdf B.pdf');
	ftp.get("Disque dur/Scans/"+name1, 'A.pdf', function(err){
		if(err)
			throw "ERR!:";
		ftp.get("Disque dur/Scans/"+name2, 'B.pdf', function(err){
			if(err)
				throw "ERR!:";
			callback();
		});
	});
}

app.enable('trust proxy');
app.set("views", __dirname+'/views');
app.set("view engine", "jade");
app.use('/static', express.static(__dirname+"/static"));

var busy = false;

app.get('/', function(req, res){
	if(req.ip.substr(0,10)=='192.168.0.'){
		res.setHeader('Content-type', 'text/html');
		getLastPDFs(function(pdfs){
			res.render('index', {pdfs: JSON.stringify(pdfs)});
		});
	}else
		res.render('404',{});
});
app.get('/treat/:file1/:file2/:afirst', function(req, res){
	if(req.ip.substr(0,10)=='192.168.0.'){
		res.setHeader('Content-type', 'text/html');
		downloadPDF(req.params.file1, req.params.file2, function(){
			var o = treat(req.params.afirst=='true');
			res.render('done', {d: JSON.stringify(o)});
		});
	}else
		res.render('404',{});
});

// treat();
app.listen(9223);