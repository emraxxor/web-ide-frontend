export const PROXY = {
    host: 'http://localhost',
    port: 8090
}

export const DefaultConfiguration = {
    USER_STORAGE_KEY : 'user',
    USER_ID : 'userId',
    NEPTUN_ID : 'neptunId',
    EXPIRATION_DATE : 'expirationDate',
    TOKEN_STORAGE_KEY : 'token'
 };
 


 export const DefaultLocalStorage = {

    set(token, userId, neptunId, exp)  {
        localStorage.setItem(DefaultConfiguration.TOKEN_STORAGE_KEY,token);
        localStorage.setItem(DefaultConfiguration.EXPIRATION_DATE,exp);
        localStorage.setItem(DefaultConfiguration.USER_ID,userId);
        localStorage.setItem(DefaultConfiguration.NEPTUN_ID,neptunId);    
    },

    remove() {
        localStorage.removeItem(DefaultConfiguration.TOKEN_STORAGE_KEY);
        localStorage.removeItem(DefaultConfiguration.EXPIRATION_DATE);
        localStorage.removeItem(DefaultConfiguration.USER_ID);
        localStorage.removeItem(DefaultConfiguration.NEPTUN_ID);
    }

 }


 export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}
