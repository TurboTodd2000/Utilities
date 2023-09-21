removeUnusedCharStyles();

function removeUnusedCharStyles() {
	var charStyle, found,
	doc = app.activeDocument,
	charStyles = doc.characterStyles;

	
	for (var i = charStyles.length - 1; i >= 1; i--) { // skip default style: [None]
		try {
			charStyle = charStyles[i];
			app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
			app.findTextPreferences.appliedCharacterStyle = charStyle;
			found = doc.findText();
			if (found.length == 0) {
				charStyle.remove();
			}
		}
		catch(err) {
			g.WriteToFile(doc.name + " - " + err.message + ", line: " + err.line);
		}		
	}

	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
}