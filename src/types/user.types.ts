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
    loading: boolean,
    setUser: (user: UserDocument | null)=> void;
    clearUser: ()=> void;
    setLoading: (loading: boolean) => void;
    updateUser: (updates: Partial<UserDocument>) => void;
}


