//----------------------------------------
//XMP Cleaner
//----------------------------------------

//adapted from code found online, all hail the overbrain!
//taken from https://community.adobe.com/t5/indesign-discussions/edit-idml-remove-metadata-save-again-open-in-indesign-can-t-open/td-p/9368046

//Altered by Todd on 11/27/23
//Updated by Todd on 11/30/23

//Changelog
//removed debugging alerts



//----------------------------------------
//VARIABLES
//----------------------------------------

//document
var myDocument = app.activeDocument;

//document name
var docName = myDocument.name;


//document file path

try {var myFilePath = myDocument.filePath} catch(e) {alert(e); exit();};

var myFilePath = myFilePath + "/" + docName


//this cleans up the file name for use elsewhere
var docName = Left(docName, String(docName).length - 5);




//----------------------------------------
//PROTOTYPES
//----------------------------------------

//Prototypes go here


//----------------------------------------
//SANITY TESTS
//----------------------------------------

//Sanity test functions go here

//test name for slashes

//test name for illeagl char.


//----------------------------------------
//START WORK
//----------------------------------------


//dialog to ask if you want to do the current open file
// Call function within a try/catch block to handle error if thrown
try {

	var result = confirmDialog("Do you want to clean the current open file?");;

	// Access the returned variables from the result object
	var openFileFlag = result.openFileFlag;
	var pathToUse = result.pathToUse;

} catch (e) {

	alert(e);
	exit();

};


//clean XMP
try

{

	ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');

	//run function passing file path from either current open file or dialog
	XMPclean(pathToUse);

//alert("clean run");

}

catch (e)

{

alert(e.message+"//"+e.line );

	alert('Unable to load the AdobeXMPScript library!'); 

}


//if open file flag is yes then use the stored path variable to reopen the file
if (openFileFlag == "yes") {
	
	//alert(pathToUse);

	app.open(pathToUse);

};


alert("Done!");



//----------------------------------------
//FUNCTIONS
//----------------------------------------

//Left and right functions, like vb :))
function Left(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0,n);
}

function Right(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

//Functions go here

function confirmDialog(confirmMessage) {
    //alert users about whatever
	if (confirm(confirmMessage)) {

	    //if yes set file path var from myFilePath, close file, set open file flag to yes
		var pathToUse = File(myFilePath);
		myDocument.close(SaveOptions.NO);
		var openFileFlag = "yes";


	} else {

        //if no then ask for file to effect
		var pathToUse = File.openDialog();

	};


	// Create an object to hold the returned variables
	var result = {

		openFileFlag: openFileFlag,
		pathToUse: pathToUse

	};

	return result;


};


function XMPclean(file) {

	if  ( !file  || !/\.indd$/.test(file.name) ) return;

	var xmpFile = new XMPFile(file.fsName, XMPConst.UNKNOWN,XMPConst.OPEN_FOR_UPDATE);

	var xmp = new XMPMeta();

	if (xmpFile.canPutXMP(xmp)) {

		xmpFile.putXMP(xmp);

	}

	xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);

};


