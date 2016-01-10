##WidowFix##
*By: AJ Savino*

JS Library to fix widows in copy (a single word that hangs on a new line). Works on HTML elements and Strings. No dependencies required. Works by inserting non-breaking spaces at the end of the copy.

###Implementation###
Include JS file on your page

HTML
```html
//Run on body. "lorem ipsum" is a non-breaking phrase
WidowFix.runElements([document.body], ["lorem ipsum"]);

//Run on string
var test = "Lorem ipsum dolor sit amet";
test = WidowFix.runString(test);
console.log(test);
```

----------

####JavaScript API####
```javascript
/* Methods */

//Parameters are optional
WidowFix.runElements(elements, phrases);
//"elements" is an array of HTML elements to apply the copy fix
//"phrases" is an array of strings. Non-breaking spaces will be inserted into all phrases found. Use case would be if you have a brand name such as "Foo Bars". You may want to ensure that "Foo Bars" never wraps in between "Foo" and "Bars"

WidowFix.runString(inString, phrases);
//"inString" is the string to apply the copy fix
//"phrases" see info above