const validate = {
    isEmpty: (value)=>{
        return undefined === value || null === value || '' === value;
    },
    outOfLength: (value, maxLength)=>{
        console.log(value.length, maxLength, maxLength < value.length);
        return maxLength < value.length;
    }
}
export default validate;