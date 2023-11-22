var main = function() {

	var file = File.openDialog();

	if  ( !file  || !/\.indd$/.test(file.name) ) return;

	var xmpFile = new XMPFile(file.fsName, XMPConst.UNKNOWN,XMPConst.OPEN_FOR_UPDATE);

	var xmp = new XMPMeta();

	if (xmpFile.canPutXMP(xmp)) {

		xmpFile.putXMP(xmp);

	}

	xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);

}

try

{

	ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');

	main();

}

catch (e)

{

alert(e.message+"//"+e.line );

	alert('Unable to load the AdobeXMPScript library!'); 

}

alert("Done!");