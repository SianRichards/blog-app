import { database } from '../../../index';

export const databaseRef = (pathway) => {
    return database.ref(pathway)
};

export const orderDatabaseValuesByChild = (pathway, childName, childValue) => {
    return databaseRef(pathway).orderByChild(childName).equalTo(childValue)
};

export const addDatabaseValue = (pathway, pushValue) => {
    return databaseRef(pathway).push(pushValue)
};

export const updateDatabaseValue = (pathway, updateValue) => {
    return databaseRef(pathway).update(updateValue)
};

export const setDatabaseValue = (pathway, setValue) => {
    return databaseRef(pathway).set(setValue)
};

export const removeDatabaseValue = (pathway) => {
    return databaseRef(pathway).remove()
};