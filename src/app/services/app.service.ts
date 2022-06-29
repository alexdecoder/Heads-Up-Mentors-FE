import { HttpClient, HttpContext, HttpContextToken } from "@angular/common/http";
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

    async fileUpload(variant: 'STUDENT' | 'MENTOR', formData: FormData): Promise<FileUploadResult> {
        let url = environment.host + '/api/upload/';
        if(variant === 'STUDENT') {
            url += 'student/';
        } else {
            url += 'mentor/';
        }

        return new Promise<FileUploadResult>((resolve, _) => {
            this.http.post(url, formData, {
                context: new HttpContext().set(SHOULD_OVERRIDE_CONTENT_TYPE, true)
            }).subscribe({
                next: (_) => resolve({success: true}),
                error: (v) => {
                    if(v.status === 400) {
                        resolve({success: false, error: v.error.message});
                    }
                    return resolve({success: false});
                }
            });
        });
    }
}

export const SHOULD_OVERRIDE_CONTENT_TYPE = new HttpContextToken<boolean>(() => false);

export interface SignupCodeResult {
    success: boolean,
    code?: string | null,
}

export interface FileUploadResult {
    success: boolean,
    error?: string | null,
}