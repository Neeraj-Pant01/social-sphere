const createError = (errStatus, errMesasge) =>{
    const err =  new Error();
    err.status = errStatus;
    err.message = errMesasge;

    return err;
}

module.exports = createError;