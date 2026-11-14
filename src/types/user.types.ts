export type createUserDocumentProps = {
    uid: string,
    data: {
        name: string,
        email: string,
        profileURL: string
    }
}

export type UserDocument = {
  id: string;
  name: string;
  email: string;
  profileURL: string;
};

export interface  UserStoreProps {
    user: UserDocument | null,
    setUser: (user: UserDocument | null)=> void,
    clearUser: ()=> void;
    updateUser: (updates: Partial<UserDocument>) => void;
}


