export interface Mentor {
    name: string,
    monday: string[],
    tuesday: string[],
    wednesday: string[],
    thursday: string[],
    friday: string[],
    subjects: string[],
    students: Student[],
}

export interface Student {
    status: 'EXACT' | 'CLOSE' | 'UNPAIRED',
    name: string,
    email: string,
    monday: string[],
    tuesday: string[],
    wednesday: string[],
    thursday: string[],
    friday: string[],
    subjects: string[],
    mentor: Mentor,
}

export interface Admin {
    name: string,
    email: string,
    isViewOnly: boolean,
    uuid: string,
}

export interface IPeopleState {
    students: Student[],
    mentors: Mentor[],
    admins: Admin[], 
}