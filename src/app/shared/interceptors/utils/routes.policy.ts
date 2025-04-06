import { environment } from "../../environments/environment.dev";

export const publicUrls: Array<string> = [
    `${environment.api_entry}/identification/signin/`,
    '/register',
    '/explore-cars',

];
export const privateUrls: Array<string> =  [
    '/client',
    '/agent',
    '/back-office',
    `${environment.api_entry}/identification/connected-user/`,
]