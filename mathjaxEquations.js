// mathjax_equations.js

//
const factorial = (aValue) => {
	if (n <= 1) return 1;
	return n * factorial_recursion(n - 1);
};
//
function makeFomulraRootAndPrimeFactors(aPrimeFactorsCount) {
	let retStrFomulra = "= \\sqrt{";
	const factors = [];
	for (const factor in aPrimeFactorsCount) {
		if (aPrimeFactorsCount[factor] === 1) {
			factors.push(factor);
		} else {
			factors.push(factor + "^{" + aPrimeFactorsCount[factor] + "}");
		}
	}
	retStrFomulra += factors.join(" \\times ");
	retStrFomulra += "}";
	return retStrFomulra;
}

//
function makeFomrulaRefined(aPrimeFactorsCount)
{
	let retStrFormula = "";
	const factors = [];
	let valueOuter = 1;
	let valueInner = 1;
	for (let factor in aPrimeFactorsCount) {
		const outN = parseInt(aPrimeFactorsCount[factor] / 2);
		const inN = aPrimeFactorsCount[factor] % 2;
		if (outN > 0) {
			valueOuter *= factor ** outN;
		}
		if (inN > 0) {
			valueInner *= factor ** inN;
		}
	}
	if (valueInner === 1) {
		retStrFormula = "= " + valueOuter;
	} else {
		retStrFormula = "= " + valueOuter + "\\sqrt{" + valueInner + "}";
	}
	return retStrFormula;
}

//
function makeFomulraUpper(aValueA, aValueB, aValueC) {
	let retStrFormula = "";
	const s = (aValueA + aValueB + aValueC) / 2;
	const StringSmallS = s % 1 === 0 ? s : s.toFixed(2);
	retStrFormula = "s = \\frac{" + aValueA + " + " + aValueB + " + "+ aValueC +"}{2} = " + StringSmallS;
	return retStrFormula;
}

//
function makeFomulraAnswer1(aValueA, aValueB, aValueC) {
	let retStrFormula = "";

	const s = (aValueA + aValueB + aValueC) / 2;
	const strFormulaSABC = "= \\sqrt{ " + s + "("+ s + "-" + aValueA + ")" + "("+ s + "-" + aValueB + ")" + "("+ s + "-" + aValueC + ")}";

	retStrFormula = "Area" + strFormulaSABC ;

	return retStrFormula;
}

//
function makeFomulraAnswer2(aValueA, aValueB, aValueC) {
	let retStrFormula = "";

	const s = (aValueA + aValueB + aValueC) / 2;
	let area2 = s * (s - aValueA) * (s - aValueB) * (s - aValueC);
	const primeFactorization = new PrimeFactorization(area2);
	const aryFactors = primeFactorization.factorization;
	const aryPrimeFactors = primeFactorization.countPrimeFactors();
	const area1 = Math.sqrt(area2);

	const strFormulaRoot = "= \\sqrt{"+ area2 +"}";
	const strPrimeFactors = makeFomulraRootAndPrimeFactors(aryPrimeFactors);
	const strPrimeFactorsAdvanced = makeFomrulaRefined(aryPrimeFactors);
	const strFormulaArea = (area1 % 1 === 0) ? ("= " + area1) : ("= " + area1.toFixed(2));

	retStrFormula = strFormulaRoot;
	if (strPrimeFactors != strFormulaRoot) {
		retStrFormula += strPrimeFactors;
	}
	if (strPrimeFactorsAdvanced != strFormulaRoot && strPrimeFactorsAdvanced != strPrimeFactors) {
		retStrFormula += strPrimeFactorsAdvanced;
	}
	if (strFormulaArea != strPrimeFactorsAdvanced) {
		retStrFormula += strFormulaArea;
	}

	return retStrFormula;
}

//
function generateMathJax(aValueA, aValueB, aValueC) {
	// Guideance
	const  strFomulaGuideance = makeFomulraUpper(aValueA, aValueB, aValueC);
	// Anser (upper)
	const strFormulaAnswer1 = makeFomulraAnswer1(aValueA, aValueB, aValueC);
	// Anser (lower)
	const strFormulaAnswer2 = makeFomulraAnswer2(aValueA, aValueB, aValueC);

	// display fomulas
	let equationContainer = document.getElementById('equationContainer');
	equationContainer.innerHTML = `
		<span class="equation">\\[ ${strFomulaGuideance}\\]</span>
		<span class="equation">\\[ ${strFormulaAnswer1}\\]</span>
		<span class="equation">\\[ ${strFormulaAnswer2}\\]</span>
	`;

	// render
	MathJax.typeset();
}
