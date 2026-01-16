function check() {
    if (window.isSecureContext) document.getElementById("copy").style.display = "inline-block";
    document.getElementById("app").style.display = "block";
}

function convert() {
    document.getElementById("old").value = literal(document.getElementById("es6").value);
	document.getElementById("copy").disabled = false;
}

function literal(src) {
    literals = src.match(/`[^`]*`/g);
    for (l in literals) {
        original_literal = literals[l];
		literals[l] = literals[l].replaceAll("\"", "\\\"")
        invars = literals[l].match(/\$\{[^{^}]+\}/g);
        literals[l] = literals[l].replaceAll("`", '"');

        for (i in invars) {
			if (invars[i].indexOf("+") != -1 || invars[i].indexOf("-") != -1 || invars[i].indexOf("*") != -1 || invars[i].indexOf("/") != -1)
				literals[l] = literals[l].replace(invars[i], '" + (' + invars[i].slice(2, -1) + ') + "');
			else
				literals[l] = literals[l].replace(invars[i], '" + ' + invars[i].slice(2, -1) + ' + "');
		}
        
        src = src.replace(original_literal, literals[l]);
		src = src.replace(' + ""', "");
		src = src.replace(" + ''", "");
    }
    return src;
}

function copytxt() {
	navigator.clipboard.writeText(document.getElementById("old").value);
}