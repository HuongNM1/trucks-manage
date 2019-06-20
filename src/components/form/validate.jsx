const validate = {
    isEmpty: (value)=>{
        return undefined === value || null === value || '' === value;
    },
    outOfLength: (value, maxLength)=>{
        return maxLength < value.length;
    },
    isNaN: (value)=>{
        return isNaN(value);
    },
    outOfMaxValue: (value, maxValue)=>{
        return value > maxValue;
    }
}
export default validate;