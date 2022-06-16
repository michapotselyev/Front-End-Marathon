module.exports = class StrFrequency
{
    constructor(str)
    {
        this.str = str;
    }
    letterFrequencies()
    {
        var string = this.str;
        string = string.toUpperCase();
        var counts = {};
        var ch, len, count;
        for (var i = 0, len = string.length; i < len; ++i)
        {
            ch = string.charAt(i);
            count = counts[ch];
            if((/[a-zA-Z]/).test(ch) == true)
            {
                counts[ch] = count ? count + 1 : 1;
            }
        }
        return counts;
    }
    wordFrequencies()
    {
        if (this.str === '')
        {
            return { '': 1 };
        }
        else
        {
            let result = {};
            const strDubl = this.str.split(/[0-9]*[ '--,!]/).filter((val) => val !== '');
            const strFilter = [...new Set(strDubl)];
            for (const sym1 of strFilter)
            {
                let count = 0;
                for (const sym2 of strDubl)
                {
                    if (sym1.toUpperCase() === sym2.toUpperCase())
                    {
                        count++;
                    }
                }
                result[sym1.toUpperCase()] = count;
            }
            return result;
        }
    }
    reverseString()
    {
        var splitString = this.str.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join("");
        return joinArray;
    }
}

