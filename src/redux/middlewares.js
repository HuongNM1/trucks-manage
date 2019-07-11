export const asynFn = store => next => action =>{
    if('function' === typeof action){
        action(next);
    }else{
        next(action);
    }
}