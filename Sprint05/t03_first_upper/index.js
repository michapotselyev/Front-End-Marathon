function firstUpper(string)
{
    if(string == null)
    {
        return "";
    }
    else
    {
        string = string.trim();
        string = string.toLowerCase();
        if((/[a-zA-Z]/).test(string[0]) == true)
        {
            string = string.charAt(0).toUpperCase() + string.slice(1);
        }
        return string;
    }
}

module.exports.firstUpper = firstUpper;
