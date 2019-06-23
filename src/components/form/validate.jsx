const validate = {
    isEmpty: (value) => {
        return undefined === value || null === value || '' === value;
    },
    outOfLength: (value, maxLength) => {
        return maxLength < value.length;
    },
    isNaN: (value) => {
        return isNaN(value);
    },
    outOfMaxValue: (value, maxValue) => {
        return value > maxValue;
    },
    isNotisPalete: value => {
        let plateRegex = /\d{2}[A-Z]{1,2}\d?[-.]\d{3,5}/g;
        let result = value.match(plateRegex);
        return null === result;
    },
    outOfMaxItem: (value, maxItem)=>{
        if(value){
            return value.length > maxItem;
        }
        return true;
    }
}
export default validate;