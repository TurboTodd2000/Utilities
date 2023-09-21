//Layer Labeler
//Todd Kidder 5/16/2023

//all code "borrowed" from various examples and scripts. All glory to the internet overmind!

//Ver 6R - fixed decenders going below bottom of slug area

//VARIABLES

//get document assigned to var
var doc = app.activeDocument;

//get # of layers
layerNum = doc.layers.length;

//get # of pages
pageNum = doc.pages.length;

//layer blacklist
//used to turn layers on and off
var layerBlacklistVisibility = ["Crop Cubed"];
var layerBlacklistLock = ["Crop Cubed"];

//FIGURE OUT SIZE OF TEXT BOX
//height and width of page
pageW= doc.documentPreferences.pageWidth;
pageH= doc.documentPreferences.pageHeight;

//height of text box
boxHeight = .1375;

//slug
//cropOffset = .5;
slugX = doc.documentPreferences.slugInsideOrLeftOffset;
slugY = doc.documentPreferences.slugBottomOffset;

//calculate offset for geometric bounds
topLeftX = 0 - slugX;
topLeftY = pageH + (slugY-boxHeight);
bottomRightX = pageW + slugX;
bottomRightY = pageH + slugY;

// alert(topLeftX);
// exit();

//BOX PROPERTIES
//text box name
boxName = "layer box";


//TEXT PROPERTIES
//set font to use
var myFont = app.fonts.item("Arial");



//----------------------------------------
//PROTOTYPES
//----------------------------------------

//need to declare prototypes before they're called
//this allows a search inside of an array, used for turning the layers on and off
Array.prototype.exists = function(search){
 for (var i=0; i<this.length; i++)
    if (this[i] == search) return true;
 return false;
};





//layer unlock
layerLocker(layerBlacklistLock);


//create magenta in case it isn't in file already
makeColor();


//'DA LOOP

//loop through all the pages of the active document
for (var j = 0; j < pageNum; j++) {

    //remove existing layer lable box - not working yet
    //doc.pages[j].textFrames.itemByName("layer box").remove();

    // Loop through all layers of active document
    for (var i = 0; i < layerNum; i++) {

        //get name of current layer
        layerName = doc.layers[i].name;

        //if your name isn't Crop Cubed, Slug Cubed or Tap Test run loop
        if (layerName == "Crop Cubed" || layerName == "Slug Cubed" || layerName == "Tap Test" || layerName == "Color Spec Cubed" || layerName == "CONTENT GRAPHICS" || layerName == "CONTENT FORMATTING" || layerName == "SYSTEM") {

        } else {

            //create text frame
            var textFrame = doc.pages[j].textFrames.add();
            textFrame.properties = {

                name: boxName,
                itemLayer : layerName,
                geometricBounds: [topLeftY,topLeftX,bottomRightY,bottomRightX],
                strokeWeight: 0.005,
                strokeColor: "None",
                fillColor: "None",
                contents: layerName

                };

            //set text frame inset for bottom of text box
            doc.pages[j].textFrames.itemByName(boxName).textFramePreferences.insetSpacing = [ 0,0,.0125,0 ];

            //set text properties
            doc.pages[j].textFrames.itemByName(boxName).texts[0].fillColor = myColorA;    
            doc.pages[j].textFrames.itemByName(boxName).texts[0].pointSize = 9;
            doc.pages[j].textFrames.itemByName(boxName).texts[0].justification = Justification.centerAlign;
            doc.pages[j].textFrames.itemByName(boxName).texts[0].appliedFont = myFont;
            doc.pages[j].textFrames.itemByName(boxName).texts[0].fontStyle = "Bold";
        }
    };
};


alert("Done!");








//----------------------------------------
//FUNCTIONS
//----------------------------------------


//set layer visibilty
function layerVisibilty(lbl){
    for (i = 0; i < doc.layers.length; i++) {

        //get name of current layer
        layerName = doc.layers[i].name;

            if (lbl.exists(layerName)) {

                doc.layers[i].visible = false;

            } else {

                doc.layers[i].visible = true;

            };
            
    };

};





//lock/unlock layers
function layerLocker(lll) {

    for (i = 0; i < doc.layers.length; i++) {

        //get name of current layer
        layerName = doc.layers[i].name;

        if (lll.exists(layerName)) {

            doc.layers[i].locked = true;

        } else {

            doc.layers[i].locked = false;

        };

    };

};







//Create a color.
function makeColor(){
    var myDocument = app.documents.item(0);

    try{
        myColorA = myDocument.colors.item("C=0 M=100 Y=0 K=0"); //Change the name of the color as you want
        //If the color does not exist, trying to get its name will generate an error.
        myName = myColorA.name;
    }
    catch (myError){
        //The color style did not exist, so create it.
        myColorA = myDocument.colors.add({name:"C=0 M=100 Y=0 K=0", model:ColorModel.process, colorValue:[0, 100, 0, 0]}); //Change the name of the color as you want and change the combination
    };
};