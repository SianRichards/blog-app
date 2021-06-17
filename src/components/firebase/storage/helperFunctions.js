import { firebaseStorage } from '../../../index';

export const firebaseStorageRef = (pathway) => {
    return firebaseStorage.ref(pathway)
};

export const listAllStoragePathwayContents = (pathway) => {
    return firebaseStorageRef(pathway).listAll()
};

export const putFileInStoragePathway = (pathway, file) => {
    return firebaseStorageRef(pathway).put(file)
};