import { create } from 'zustand';

function checkUrl(photoName) {
    let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
    return expUrl.test(photoName);
}

export const signStore = create((set) => ({
    username: '',
    photo: '',
    role: '',
    newCategory: false,
    userSet(name, pho, ro) {
        set((state) => ({
            username: name,
            photo: checkUrl(pho) ? pho : `${process.env.NEXT_PUBLIC_BACK_IMAGE}/${pho}`,
            role: ro,
        }));
    },
    userPhoto(pho) {
        set((state) => ({
            photo: checkUrl(pho) ? pho : `${process.env.NEXT_PUBLIC_BACK_IMAGE}/${pho}`,
        }));
    },
    userRole(ro) {
        set((state) => {
            return { role: ro };
        });
    },
    newCategoryFun() {
        set((state) => {
            return { newCategory: !state.newCategory };
        });
    },
}));
