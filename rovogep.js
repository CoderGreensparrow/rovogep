function createReverseMap(map) {
    return new Map(Array.from(map, ([key, value]) => [value, key]));
}  // https://dev.to/vishesh-tiwari/how-to-reverse-the-key-value-pair-in-map-typescript-59ff

const rovogepLatin = document.getElementById("rovogep-latin");
const rovogepRunes = document.getElementById("rovogep-runes");
const runeTable = new Map([
    // no need to make full lowercase forms, but all other forms are required
    ["'", ""],
    ["?", "⸮"],
    [",", "⹁"],
    ["(", "["],
    [")", "]"],
    ["„", "⹂"],
    ["”", "‟"],
    ["A", "𐲀"],
    ["Á", "𐲁"],
    ["B", "𐲂"],
    ["C", "𐲄"],
    ["CS", "𐲆"],
    ["Cs", "𐲆"],
    ["CCS", "𐲆𐲆"],
    ["Ccs", "𐲆𐳆"],
    ["D", "𐲇"],
    ["E", "𐲉"],
    ["É", "𐲋"],
    ["F", "𐲌"],
    ["G", "𐲍"],
    ["GY", "𐲎"],
    ["Gy", "𐲎"],
    ["GGY", "𐲎𐲎"],
    ["Ggy", "𐲎𐳎"],
    ["H", "𐲏"],
    ["I", "𐲐"],
    ["Y", "𐲐"],
    ["Í", "𐲑"],
    ["J", "𐲒"],
    ["K", "𐲓"],
    ["L", "𐲖"],
    ["LY", "𐲗"],
    ["Ly", "𐲗"],
    ["LLY", "𐲗𐲗"],
    ["Lly", "𐲗𐳗"],
    ["M", "𐲘"],
    ["N", "𐲙"],
    ["NY", "𐲚"],
    ["Ny", "𐲚"],
    ["NNY", "𐲚𐲚"],
    ["Nny", "𐲚𐳚"],
    ["O", "𐲛"],
    ["Ó", "𐲜"],
    ["Ö", "𐲞"],
    ["Ő", "𐲟"],
    ["P", "𐲠"],
    ["Q", "𐲓𐲪"],
    ["R", "𐲢"],
    ["S", "𐲤"],
    ["SZ", "𐲥"],
    ["Sz", "𐲥"],
    ["SSZ", "𐲥𐲥"],
    ["Ssz", "𐲥𐳥"],
    ["T", "𐲦"],
    ["TY", "𐲨"],
    ["Ty", "𐲨"],
    ["TTY", "𐲨𐲨"],
    ["Tty", "𐲨𐳨"],
    ["U", "𐲪"],
    ["Ú", "𐲫"],
    ["Ü", "𐲭"],
    ["Ű", "𐲬"],
    ["V", "𐲮"],
    ["W", "𐲮"],
    ["X", "𐲓𐲥"],
    ["Z", "𐲯"],
    ["ZS", "𐲰"],
    ["Zs", "𐲰"],
    ["ZZS", "𐲰𐲰"],
    ["Zzs", "𐲰𐳰"]
])
const latinTable = createReverseMap(runeTable);
const runeNumberTable = new Map([
    [0, "∅"],
    [1, "𐳺"],
    [2, "𐳺𐳺"],
    [3, "𐳺𐳺𐳺"],
    [4, "𐳺𐳺𐳺𐳺"],
    [5, "𐳻"],
    [6, "𐳻𐳺"],
    [7, "𐳻𐳺𐳺"],
    [8, "𐳻𐳺𐳺𐳺"],
    [9, "𐳻𐳺𐳺𐳺𐳺"],
    [10, "𐳼"],
    [20, "𐳼𐳼"],
    [30, "𐳼𐳼𐳼"],
    [40, "𐳼𐳼𐳼𐳼"],
    [50, "𐳽"],
    [60, "𐳽𐳼"],
    [70, "𐳽𐳼𐳼"],
    [80, "𐳽𐳼𐳼𐳼"],
    [90, "𐳽𐳼𐳼𐳼𐳼"],
    [100, "𐳾"],
    [1000, "𐳿"]
]);
const arabicNumberTable = createReverseMap(runeNumberTable);
const runeNumberCharacters = ["∅", "𐳺", "𐳻", "𐳼", "𐳽", "𐳾", "𐳿"];
const arabicNumberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const maxMatchLength = Math.max(...runeTable.keys().toArray().map((x) => x.length));

function numberConvert__convertUnderThousand(numberUnderThousand, outputIfOne, outputOneHundredAsONEHundred) {
    let remaining = numberUnderThousand;
    let outputDraft = "";
    while (remaining > 0) {
        if (remaining > 999) {
            outputDraft = "KRITIKUS_SZÁMVÁLTÁSI_HIBA";
            remaining = 0;
        } else if (remaining > 99) {
            let hundreds = Math.floor(remaining / 100);
            if (outputOneHundredAsONEHundred || hundreds > 1) {
                outputDraft += runeNumberTable.get(hundreds);
            }
            outputDraft += runeNumberTable.get(100);
            remaining -= hundreds * 100;
        } else if (remaining > 9) {
            let tens = Math.floor(remaining / 10);
            outputDraft += runeNumberTable.get(tens * 10);
            remaining -= tens * 10;
        } else {
            if (outputIfOne || remaining > 1){
                outputDraft += runeNumberTable.get(remaining);
            }
            remaining = 0;
        }
    }
    return outputDraft;
}

function numberConvert(matchString, latinModified) {
    // https://magyarrovas.hu/rovasiras-szamok-rovassal/
    const maxNumber = 999999;
    let outputDraft = "";

    if (latinModified) {
        let remaining = parseInt(matchString, 10);

        if (remaining === 0) {  // special handling of specifically the value 0 and 0000...
            for (let i = 1; i <= matchString.length; i++) {
                outputDraft += runeNumberTable.get(0);
            }
        }

        while (remaining > 0) {
            if (remaining > maxNumber) {
                outputDraft = remaining;
                remaining = 0;
            } else if (remaining > 999) {
                let thousands = Math.floor(remaining / 1000);
                outputDraft += numberConvert__convertUnderThousand(thousands, false, false);
                outputDraft += runeNumberTable.get(1000);
                remaining -= thousands * 1000;
            } else {
                outputDraft += numberConvert__convertUnderThousand(remaining, true, false);
                remaining = 0;
            }
        }
    } else {
        // reverse procedure: decode ones and tens, and put them to their place when detecting a 100 or 1000.
        // ∅ is ignored, unless the entire string only consists of it.

    }

    return outputDraft;
}

function syncRovogep(latinModified) {
    const input = latinModified ? rovogepLatin.value : rovogepRunes.value;
    const outputElement = latinModified ? rovogepRunes : rovogepLatin;
    const localTable = latinModified ? runeTable : latinTable;
    const localNumberCharacters = latinModified ? arabicNumberCharacters : runeNumberCharacters;

    let i = 0;
    let outputDraft = "";
    while (i < input.length) {
        let matchLength = maxMatchLength;
        let foundMatch = false;
        while (!foundMatch) {
            let matchString = input.slice(i, i + matchLength);
            let matchStringLower = matchString.toLowerCase();
            let matchStringUpper = matchString.toUpperCase();

            if (localNumberCharacters.includes(matchString[0])) {  // we have hit upon a number
                // adjust matchLength until we get all of the number
                matchLength = 1;
                while (localNumberCharacters.includes(input[i + matchLength]) && (i + matchLength < input.length)) {  // if next character is a number and not overflow
                    matchLength += 1;
                }
                // convert number
                matchString = input.slice(i, i + matchLength);
                outputDraft += numberConvert(matchString, latinModified);
                i += matchLength;
                foundMatch = true;
            }
            else {
                if (localTable.has(matchStringUpper)) {
                    if (matchStringLower !== matchString) {  // if there is an uppercase letter
                        outputDraft += localTable.get(matchString);  // then query from table
                    } else {  // else handle full lowercase dynamically
                        outputDraft += localTable.get(matchStringUpper).toLowerCase();
                    }
                    i += matchLength;
                    foundMatch = true;
                } else if (matchLength > 0) {
                    matchLength -= 1;
                } else {
                    outputDraft += input[i];
                    i += 1;
                    foundMatch = true;  // haven't actually found a match, but if there is no match, than the original character is written
                }
            }
        }
    }

    outputElement.value = outputDraft;
}

rovogepLatin.addEventListener("input", (event) => {
    syncRovogep(true);
})
rovogepRunes.addEventListener("input", (event) => {
    syncRovogep(false);
})

document.getElementById("rovogep-latin-copy").addEventListener("click", (event) => {
    alert("notImplemented");
})