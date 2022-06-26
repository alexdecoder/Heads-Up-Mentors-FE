import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {};

    login(email: string, password: string): Observable<any> {
        return this.http.post(environment.host + '/api/auth/login', {
            email: email,
            password: password
        });
    }

    loadBaseData(): Observable<any> {
        return this.http.get(environment.host + '/api');
    }

    toggleViewOnly(uuid: string): Observable<any> {
        return this.http.get(environment.host + '/api/permissions/toggle/' + uuid);
    }

    deleteAdmin(uuid: string): Observable<any> {
        return this.http.delete(environment.host + '/api/admin/' + uuid);
    }

    confirmSignupCode(code: string): Observable<any> {
        return this.http.get(environment.host + '/api/signup/confirm/' + code);
    }

    signup(name: string, email: string, password: string, code: string) {
        return this.http.post(environment.host + '/api/signup/' + code, {
            name: name,
            email: email,
            password: password,
        });
    }

    async generateSignupCode(): Promise<SignupCodeResult> {
        return new Promise<SignupCodeResult>((resolve, _) => {
            this.http.get(environment.host + '/api/signup/generate').subscribe({
                next: (v) => resolve({success: true, code: (v as any).code}),
                error: (_) => resolve({success: false})
            });
        });
    }

    fileUpload(variant: 'STUDENT' | 'MENTOR', formData: FormData): Promise<any> {
        let url = environment.host + '/api/upload/';
        if(variant === 'STUDENT') {
            url += 'mentor/';
        } else {
            url += 'student/';
        }

        return new Promise<SignupCodeResult>((resolve, _) => {
            this.http.post(url, formData).subscribe({
                next: (v) => resolve({success: true, code: (v as any).code}),
                error: (_) => resolve({success: false})
            });
        });
    }
}

export interface SignupCodeResult {
    success: boolean,
    code?: string | null,
}

export interface FileUploadResult {
    success: boolean,
    error?: string | null,
    
}