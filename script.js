function convert() {
    document.getElementById("old").value = literal(document.getElementById("es6").value);
	// document.getElementById("copy").disabled = false;
}

function literal(text) {
    literals = text.match(/`[^`]*`/g);
    for (l in literals) {
        original_literal = literals[l];
        literals[l] = literals[l].replaceAll("\"", "\\\"")
        invars = literals[l].match(/\$\{[^{^}]+\}/g);
        literals[l] = literals[l].replaceAll("`", '"').replaceAll("\n", "");

        for (i in invars) {
			if (invars[i].indexOf("+") != -1 || invars[i].indexOf("-") != -1 || invars[i].indexOf("*") != -1 || invars[i].indexOf("/") != -1)
				literals[l] = literals[l].replace(invars[i], '" + (' + invars[i].slice(2, -1) + ') + "');
			else
				literals[l] = literals[l].replace(invars[i], '" + ' + invars[i].slice(2, -1) + ' + "');
		}
        
        text = text.replace(original_literal, literals[l]);
		text = text.replace('"" + ', "");
		text = text.replace(' + ""', "");
    }
    return text
}

/*function copytxt() {
	navigator.clipboard.writeText(document.getElementById("old").value);
}*/