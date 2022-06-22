const WORD_NUMBERS = [
    'không',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
];

function readDozen(no: number, isWhole: boolean) {
    let dozen = '';
    const quotient = Math.floor(no / 10);
    const remainder = no % 10;
    if (quotient > 1) {
        dozen = ` ${WORD_NUMBERS[quotient]} mươi`;
        if (remainder === 1) {
            dozen += ' mốt';
        }
    } else if (quotient === 1) {
        dozen = ' mười';
        if (remainder === 1) {
            dozen += ' một';
        }
    } else if (isWhole && remainder > 0) {
        dozen = ' lẻ';
    }
    if (remainder === 5 && quotient > 1) {
        dozen += ' lăm';
    } else if (remainder > 1 || (remainder === 1 && quotient === 0)) {
        dozen += ` ${WORD_NUMBERS[remainder]}`;
    }
    return dozen;
}

function readHundred(no: number, isWhole: boolean) {
    let text = '';
    const tram = Math.floor(no / 100);
    no = no % 100;
    if (isWhole || tram > 0) {
        text = ` ${WORD_NUMBERS[tram]} trăm`;
        text += readDozen(no, true);
    } else {
        text = readDozen(no, false);
    }
    return text;
}

function readMillion(no: number, isWhole: boolean) {
    let text = '';
    const million = Math.floor(no / 1000000);
    no = no % 1000000;
    if (million > 0) {
        text = `${readHundred(million, isWhole)} triệu`;
        isWhole = true;
    }
    const thousand = Math.floor(no / 1000);
    no = no % 1000;
    if (thousand > 0) {
        text += `${readHundred(thousand, isWhole)} nghìn`;
        isWhole = true;
    }
    if (no > 0) {
        text += readHundred(no, isWhole);
    }
    return text;
}

function convertVietnamese(no: number) {
    if (no === 0) return WORD_NUMBERS[0];
    let text = '',
        postFix = '';
    do {
        const billion = no % 1000000000;
        no = Math.floor(no / 1000000000);
        if (no > 0) {
            text = readMillion(billion, true) + postFix + text;
        } else {
            text = readMillion(billion, false) + postFix + text;
        }
        postFix = ' tỷ';
    } while (no > 0);
    return text;
}

export function convertToText(n: number): string {
    const result = convertVietnamese(n).trim();

    return result.length > 0 ? 'Bằng chữ: ' + result + ' đồng' : '';
}

export function keypressCommon(event: any, patternType: string) {
    const pattern = new RegExp(patternType);
    const value = event.key;
    // return pattern.test(value);
    const isTest = pattern.test(value);
    if (!isTest) {
        event.preventDefault();
    }
}

// check copy paste action
export function pasteCommon(event: any, patternType: string) {
    const pattern = new RegExp(patternType)
    setTimeout(() => {
        const isTest = pattern.test(event.target.value.trim());
        if (!isTest) {
            event.target.value = ''
        }
    }, 100)
}

// check nhập số thập phân dương
export function checkDecimalPositive(event: any) {
    console.log(event.keyCode);
    // không cho nhập dấu thập phân vào đầu chuỗi
    if (event.target.value.length === 0) {
        if (event.keyCode === 190 || event.keyCode === 110) {
            event.preventDefault()
        }
    }

    // nếu như đã có dấu thập phân thì không cho nhập dấu thập phân lần 2
    if (event.target.value.indexOf('.') > -1) {
        if (event.keyCode === 190 || event.keyCode === 110) {
            event.preventDefault()
        }
    }

    /**
     * @description: Không cho nhập chữ cái và ký tự đặc biệt ngoại trừ những trường hợp ở dưới
     * @code: 8 [backspace],
     * @code: 190 & 110 [.]
     * @code: 38...40 [arrow keys]
     * @code: Ctrl + A & Ctrl + S & Ctrl + V [Chọn tất, copy, paste]
     */
    if (!(/\d/.test(event.key)) &&
        event.keyCode !== 8 &&
        event.keyCode !== 190 && event.keyCode !== 110 &&
        event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40 &&
        !(event.ctrlKey && (event.keyCode == 65 || event.keyCode == 67 || event.keyCode == 86))) {
        event.preventDefault()
    }
}