removeUnusedParStyles();

function removeUnusedParStyles() {
	var parStyle, found,
	doc = app.activeDocument,
	parStyles = doc.paragraphStyles;
	
	for (var i = parStyles.length - 1; i >= 2; i--) { // to skip default styles: 1 - [No Paragraph Style], 2 - [Basic Paragraph]
		try {
			parStyle = parStyles[i];
			app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
			app.findTextPreferences.appliedParagraphStyle = parStyle;
			found = doc.findText();
			if (found.length == 0) {
				parStyle.remove();
			}
		}
		catch(err) {
			g.WriteToFile(doc.name + " - " + err.message + ", line: " + err.line);
		}		
	}

	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
}