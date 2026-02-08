function literal(src) {
    literals = src.match(/`[^`]*`/g);
    for (l in literals) {
        original_literal = literals[l];
		literals[l] = literals[l].replaceAll("\"", "\\\"")
        invars = literals[l].match(/\$\{[^{^}]+\}/g);
        literals[l] = literals[l].replaceAll("`", '"');

        for (i in invars) {
			if (invars[i].indexOf("+") != -1 || invars[i].indexOf("-") != -1 || invars[i].indexOf("*") != -1 || invars[i].indexOf("/") != -1 || invars[i].indexOf("?"))
				literals[l] = literals[l].replace(invars[i], '" + (' + invars[i].slice(2, -1).replaceAll("\\\"", "\"") + ') + "');
			else
				literals[l] = literals[l].replace(invars[i], '" + ' + invars[i].slice(2, -1).replaceAll("\\\"", "\"") + ' + "');
		}
        
        src = src.replace(original_literal, literals[l]);
		src = src.replace(' + ""', "");
		src = src.replace(" + ''", "");
    }
    return src;
}