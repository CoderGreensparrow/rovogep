function createReverseMap(map) {
    return new Map(Array.from(map, ([key, value]) => [value, key]));
}  // https://dev.to/vishesh-tiwari/how-to-reverse-the-key-value-pair-in-map-typescript-59ff

const rovogepLatin = document.getElementById("rovogep-latin");
const rovogepRunes = document.getElementById("rovogep-runes");
const runeTable = new Map([
    // no need to make full lowercase forms, but all other forms are required
    ["`", ""],
    ["?", "⸮"],
    [",", "⹁"],
    [";", "⁏"],
    ["(", "["],
    [")", "]"],
    ["„", "⹂"],
    ["”", "‟"],
    ["Q", "𐲓𐲪"],
    ["W", "𐲮𐲮"],
    ["X", "𐲓𐲥"],
    ["Y", "𐲐"],
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
    ["Z", "𐲯"],
    ["ZS", "𐲰"],
    ["Zs", "𐲰"],
    ["ZZS", "𐲰𐲰"],
    ["Zzs", "𐲰𐳰"]
])
const latinTable = createReverseMap(runeTable);
// Don't write Q, W, X when converting from runes to latin
latinTable.delete("𐲓𐲪");
latinTable.delete("𐲮𐲮");
latinTable.delete("𐲓𐲥");
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
const runeTableMaxMatchLength = Math.max(...runeTable.keys().toArray().map((x) => x.length));
const latinTableMaxMatchLength = Math.max(...latinTable.keys().toArray().map((x) => x.length));
const runeNumberCharacters = ["∅", "𐳺", "𐳻", "𐳼", "𐳽", "𐳾", "𐳿"];
const arabicNumberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const runeNumberMatcher = /[∅𐳺𐳻𐳼𐳽𐳾𐳿]+/ivd;
const arabicNumberMatcher = /\d+/ivd;

function numberConvert__convertUnderThousand(numberUnderThousand, outputIfOne, outputOneHundredAsONEHundred) {
    let remaining = numberUnderThousand;
    let outputDraft = "";
    while (remaining > 0) {
        if (remaining > 999) {
            outputDraft = "CRITICAL_INTERNAL_NUMBER_CONVERSION_ERROR";
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
        // reverse procedure: decode character by character, and put them to their place when detecting a 100 or 1000 (because these are the only "grouped" numbers, aka one can write forty-two hundred, instead of 42 literal hundred characters.)
        // ∅ is ignored, unless the entire string only consists of it.
        // Since all Old Hungarian rune numbers are technically counted as two characters, I'll do it that way...
        // I'll also pre-filter for ∅ because it can cause issues.
        if (matchString.split("").every((x) => x === runeNumberTable.get(0))) {
            for (let i = 1; i <= matchString.length; i++) {
                outputDraft += "0";
            }
        } else {
            // remove "runic" zero-replacement characters (because that only counts as one character, while all other runes count as two, which would mess up the loop with a shift in the character read head)
            matchString = matchString.replaceAll(runeNumberTable.get(0), "");
            let i = 0;
            let thousands = 0;
            let hundreds = 0;
            let lows = 0;
            let outputNumberDraft = 0;
            while (i < matchString.length) {
                let currentDoubleUnicodeCharacter = matchString.slice(i, i + 2);
                if (currentDoubleUnicodeCharacter === runeNumberTable.get(1000)) {
                    thousands = hundreds + lows;
                    hundreds = 0;
                    lows = 0;
                    if (thousands === 0) {
                        thousands = 1;
                    }
                    thousands *= 1000;
                } else if (currentDoubleUnicodeCharacter === runeNumberTable.get(100)) {
                    hundreds = lows;
                    lows = 0;
                    if (hundreds === 0) {
                        hundreds = 1;
                    }
                    hundreds *= 100;
                } else {
                    lows += arabicNumberTable.get(currentDoubleUnicodeCharacter);  // this can only be done because there is no complex subtraction stuff, like with roman numerals
                }
                i += 2;
            }
            outputNumberDraft = thousands + hundreds + lows;
            outputDraft = String(outputNumberDraft);
        }
    }

    return outputDraft;
}

function runeConvert(input, latinModified) {
    const localTable = latinModified ? runeTable : latinTable;
    const maxMatchLength = latinModified ? runeTableMaxMatchLength : latinTableMaxMatchLength;
    const localNumberCharacters = latinModified ? arabicNumberCharacters : runeNumberCharacters;
    const localNumberMatcher = latinModified ? arabicNumberMatcher : runeNumberMatcher;

    let i = 0;
    let outputDraft = "";
    while (i < input.length) {
        let matchLength = maxMatchLength;
        let foundMatch = false;
        while (!foundMatch) {
            let matchString = input.slice(i, i + matchLength);
            let matchStringLower = matchString.toLowerCase();
            let matchStringUpper = matchString.toUpperCase();

            let numberMatchString = input.slice(i, input.length);
            if (localNumberCharacters.includes(numberMatchString[0]) || localNumberCharacters.includes(numberMatchString.slice(0, 2))) {  // we have hit upon a number (the first or fisrt two characters are an arabic or runic numeral... because unicode encoding)
                // find the number starting from here with regex, because it can handle "double-width", properly called "surrogate pairs" Unicode characters
                let result = localNumberMatcher.exec(numberMatchString);
                if (result !== null) {
                    matchLength = result.indices[0][1];
                    // convert number
                    matchString = input.slice(i, i + matchLength);
                    // console.log(matchString);  check if regex finds and selects right numberstring
                    outputDraft += numberConvert(matchString, latinModified);
                    i += matchLength;
                    foundMatch = true;
                } else {
                    outputDraft = "INTERNAL_REGEX_NUMBER_MATCHING_ERROR";
                    i = input.length;
                }
            }
            else {
                if (localTable.has(matchStringUpper) && matchLength > 0) {  // don't match to empty strings
                    if (matchStringLower !== matchString) {  // if there is an uppercase letter
                        let table_letter = localTable.get(matchString);  // then query from table
                        if (table_letter !== undefined) {
                            outputDraft += localTable.get(matchString);
                        } else {
                            outputDraft += localTable.get(matchStringUpper);  // fallback, if there is no table entry, use ALL CAPS RUNES
                        }
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

    return outputDraft;
}

function correctDoubleLetterCapitalization(input) {
    // Because runeConvert is a bit dumb backwards, it may output "SzÉKELyEK" if all the runes are capitalized.
    // To combat this, double letters, which have any other possible letter-character after them, get their capitalization corrected.
    // So: SzÉ becomes SZÉ. But SZé becomes Szé. It's always the middle character that gets aligned to fit the context.
    // Similarly, if at the end of a letter-sequence (or "word", but spaces are not used for word boundry detection),
    // double-letters are capitalized if the previous character is, so MECcs -> MECCS, but otherwise, the reverse is done: meCCS -> meCcs.
    // These corrections are also done to CcsÉ. (Dz and Dzs are not checked for, as those cases are handled by the fact that there is no rune for them, so their capitalization info is only lost at the Zs part, so Zs-correction will handle them.)
    // This correction is only done when converting from runes to latin letters, to make the text look more natural.

    // The exact order of applying these rules is present in the funciton itself.
    const nextLetter_FULLCAP_Matcher = /(Cs|Ccs|Gy|Ggy|Ly|Lly|Ny|Nny|Sz|Ssz|Ty|Tty|Zs|Zzs)([AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ])/vdg;
    const nextLetter_fulllower_Matcher = /(CS|CCS|GY|GGY|LY|LLY|NY|NNY|SZ|SSZ|TY|TTY|ZS|ZZS)([aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz])/vdg;
    const prevLetter_FULLCAP_Matcher = /([AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ])(Cs|Ccs|Gy|Ggy|Ly|Lly|Ny|Nny|Sz|Ssz|Ty|Tty|Zs|Zzs)/vdg;
    const prevLetter_fulllower_Matcher = /([aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz])(CS|CCS|GY|GGY|LY|LLY|NY|NNY|SZ|SSZ|TY|TTY|ZS|ZZS)/vdg;


    let i = 1;
    let outputDraft = input;
    outputDraft = outputDraft.replaceAll(prevLetter_FULLCAP_Matcher,
        (match, p1, p2, offset, string, groups) => {
            // p1 (capture group 1): The previous letter, also selected by the regex
            // p2 (capture group 2): The double letter, like Ccs
            return p1 + p2[0] + p2.slice(1, p2.length).toUpperCase();
        }
    )
    outputDraft = outputDraft.replaceAll(prevLetter_fulllower_Matcher,
        (match, p1, p2, offset, string, groups) => {
            // p1 (capture group 1): The previous letter, also selected by the regex
            // p2 (capture group 2): The double letter, like Ccs
            return p1 + p2[0] + p2.slice(1, p2.length).toLowerCase();
        }
    )
    outputDraft = outputDraft.replaceAll(nextLetter_FULLCAP_Matcher,
        (match, p1, p2, offset, string, groups) => {
            // p1 (capture group 1): The double letter, like Ccs
            // p2 (capture group 2): The following letter, also selected by the regex
            return p1.toUpperCase() + p2;
        }
    )
    outputDraft = outputDraft.replaceAll(nextLetter_fulllower_Matcher,
        (match, p1, p2, offset, string, groups) => {
            // p1 (capture group 1): The double letter, like Ccs
            // p2 (capture group 2): The following letter, also selected by the regex
            return p1[0] + p1.slice(1, p1.length).toLowerCase() + p2;
        }
    )
    return outputDraft;
}

function syncRovogep(latinModified) {
    const input = latinModified ? rovogepLatin.value : rovogepRunes.value;
    const outputElement = latinModified ? rovogepRunes : rovogepLatin;

    let outputDraft = runeConvert(input, latinModified);
    if (!latinModified) {
        outputDraft = correctDoubleLetterCapitalization(outputDraft);
    }
    outputElement.value = outputDraft;
}

rovogepLatin.addEventListener("input", (event) => {
    syncRovogep(true);
})
rovogepRunes.addEventListener("input", (event) => {
    syncRovogep(false);
})


/* CLIPBOARD FUNCTIONALITY */
// https://stackoverflow.com/a/30810322
let notificationZone = document.getElementById("frontend-notifications");
function copyToClipboardWithFeedback(text) {
    navigator.clipboard.writeText(text).then(function() {
        let newMsg = document.createElement("p");
        newMsg.innerText = "Másolás sikeres!";
        newMsg.classList.add("success");
        notificationZone.appendChild(newMsg);
        setTimeout(() => {notificationZone.removeChild(newMsg)}, 2500);
    }, function(err) {
        let newMsg = document.createElement("p");
        newMsg.innerText = `Hiba másoláskor: ${err}`;
        newMsg.classList.add("error");
        notificationZone.appendChild(newMsg);
        setTimeout(() => {notificationZone.removeChild(newMsg)}, 5000);
    });
}
function sendInfo(text) {
    let newMsg = document.createElement("p");
    newMsg.innerText = text;
    newMsg.classList.add("info");
    notificationZone.appendChild(newMsg);
    setTimeout(() => {notificationZone.removeChild(newMsg)}, 2500);
}

document.getElementById("rovogep-latin-copy").addEventListener("click", (event) => {
    let text = rovogepLatin.value;
    if (text.length > 0) {
        copyToClipboardWithFeedback(text);
    } else {
        sendInfo("Nincs másolandó szöveg.")
    }
})
document.getElementById("rovogep-runes-copy").addEventListener("click", (event) => {
    let text = rovogepRunes.value;
    if (text.length > 0) {
        copyToClipboardWithFeedback(text);
    } else {
        sendInfo("Nincs másolandó szöveg.")
    }
})