export type PageName =
    | 'dashboard'
    | 'roles'
    | 'staff'
    | 'vehicle'
    | 'instructor'
    | 'trainee'
    | 'session'
    | 'vendor'
    | 'feedbacks'
    | 'compliance'
    | 'reports'
    | 'bulk'
    | 'settings';

export type AuthScreen = 'login' | 'forgot' | 'reset' | 'pw-success';

// ── NEW — stores logged-in user info ──
export interface UserInfo {
    name: string;
    email: string;
    initials: string;
}

// ── ModalName (used in my components) ──
export type ModalName =
    | ''
    | 'delete-confirm'
    | 'excel-staff'
    | 'excel-vehicle'
    | 'excel-instructor'
    | 'excel-trainee'
    | 'role-create'
    | 'role-view'
    | 'role-edit'
    | 'staff-create'
    | 'staff-view'
    | 'staff-edit'
    | 'vehicle-create'
    | 'vehicle-view'
    | 'vehicle-edit'
    | 'instructor-create'
    | 'ins-view'
    | 'ins-edit'
    | 'trainee-create'
    | 'trainee-view'
    | 'trainee-edit'
    | 'session-create'
    | 'ins-assign'
    | 'ses-view'
    | 'vendor-create'
    | 'vendor-view'
    | 'feedback-resolve'
    | 'compliance-create';

// ── ModalId (your original naming, kept for compatibility) ──
export type ModalId =
    | 'm-delete-confirm'
    | 'm-excel-staff'
    | 'm-excel-vehicle'
    | 'm-excel-instructor'
    | 'm-excel-trainee'
    | 'm-role-create'
    | 'm-role-view'
    | 'm-role-edit'
    | 'm-staff-create'
    | 'm-staff-view'
    | 'm-staff-edit'
    | 'm-vehicle-create'
    | 'm-vehicle-view'
    | 'm-vehicle-edit'
    | 'm-instructor-create'
    | 'm-ins-view'
    | 'm-ins-edit'
    | 'm-trainee-create'
    | 'm-trainee-view'
    | 'm-trainee-edit'
    | 'm-session-create'
    | 'm-ins-assign'
    | 'm-ses-view'
    | 'm-vendor-create'
    | 'm-vendor-view'
    | 'm-feedback-resolve'
    | 'm-compliance-create';
