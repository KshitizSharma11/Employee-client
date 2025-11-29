export interface Employee {
    id: string;
    name: string;
    age: number;
    class: string;
    subjects: string[];
    attendance: number;
}

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'employee';
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}