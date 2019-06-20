const validate = {
    isEmpty: (value)=>{
        return undefined === value || null === value || '' === value;
    },
    outOfLength: (value, maxLength)=>{
        return maxLength < value.length;
    }
}
export default validate;