( function()
{
	
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	app.doScript
	(
	
	updateNameAndDescriptionOfTextBoxes,
	ScriptLanguage.JAVASCRIPT, 
	[], 
	UndoModes.ENTIRE_SCRIPT, 
	"SCRIPT | Update Name and Description of TextBoxes Form Fields"
	
	);

function updateNameAndDescriptionOfTextBoxes()   
{   
	var myDoc = app.activeDocument;   
	var textBoxes = myDoc.textBoxes.everyItem().getElements();   
	var textBoxesLength = textBoxes.length;
	
	for (var n = 0; n < textBoxesLength; n++)   
	{   
		var currentTextBox = textBoxes[n];
		currentTextBox.name = "New Name " + ( n + 1 );   
		currentTextBox.description = "New Description "+ ( n + 1 );
	};
};

}() )