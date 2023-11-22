Select some paragraphs and try the below code:

var styles = app.selection[0].textStyleRanges.everyItem().appliedParagraphStyle;

for (var i=0;i<styles.length;i++) {//.length missing

    $.writeln(styles.name);

    }





I'd also like to be able to loop through all the applied paragraph styles in a document (to find out the names).

var styles = app.activeDocument.textFrames.everyItem().textStyleRanges.everyItem().appliedParagraphStyle;

for (i=0; i<styles.length; i++)

{

     $.writeln(styles.name);

}




//test to make sure the style sheet exists
var paraStyleName = "name goes here"
var paraStyles = doc.allParagraphStyles.sort();

Array.prototype.exists = function(search){
 for (var i=0; i<this.length; i++)
    if (this[i] == search) return true;
 return false;
}
 
if (paraStyles.exists(paraStyleName) == false) {
    alert("The paragraph style " + paraStyleName + " is not in this document"); // true
    exit()
}