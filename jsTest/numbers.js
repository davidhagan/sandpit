//we wanted to know how big js numbers get

var testNumbers = function(){
	var start = -10000000000000;
	var end = 10000000000000;
	testIntegers(start,end);
	testFloats(start,end);
};

var testIntegers = function(s,e){
	for (var i = s; i < e; i++){
		console.log("test",i,i.toString());
	}
};
var testFloats = function(s,e){
	var offset = 0.000017;
	for (var i = s; i < e; i++){
		var temp = i+offset;
		console.log("test",temp,temp.toString());
	}
};
var specificTest = function(){
	var t = Math.pow(2,63);
	var tString = t.toString();
	var e = t + 1;
	var eString = e.toString();
	var f = parseInt(tString+"005");
	var g = f * 4;
	var h = g / 2;
	console.log("test",t,e,eString,tString,f,g,h);
};
var specificTest = function(){
	var base = Math.pow(2,16);
	var basePlus = base + 5;
	var b64 = Math.pow(base,8);
	var b64DivOnce = b64 / 2;
	var backAgain = b64;
	for (var i = 0; i < 112; i++){
		backAgain = backAgain / 2;
		console.log("dec",backAgain);
	}
	console.log("test",base,basePlus,b64,b64DivOnce,backAgain);

}
