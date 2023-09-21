// Open dialog to select path for text file
var textFilePath = Folder.selectDialog("Select a destination for the layer list text file.");

// Set text file name to active document name + .txt
var textFileName = app.activeDocument.name + ".txt";

// Create text file
var textFile = new File(textFilePath + "/" + textFileName);

// Set text file encoding
textFile.encoding = "UTF-8";

// Open text file
textFile.open("w");

// Loop through all layers of active document
for (var i = 0; i < app.activeDocument.layers.length; i++) {

    // Write layer name to textfile
    textFile.write(app.activeDocument.layers[i].name + "\n");

}

// Close text file
textFile.close();