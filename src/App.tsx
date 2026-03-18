import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import type { ModalName, UserInfo } from './types'; // ← "import type" for TS-only types

// Auth
import { LoginScreen } from './auth/LoginPage';

// Layout
import { Sidebar } from './layouts/Sidebar';

// Pages
import { Dashboard } from './pages/Dashboard';
import { FeedbacksPage } from './pages/Feedback';
import { FeedbackResolve } from './pages/FeedbackResolve';
import { ReportsPage } from './pages/Report';
import { SettingsPage } from './pages/Setting';
import { StaffPage } from './pages/Staff';
import StaffCreate from './pages/StaffCreate';
import { OrganisationPage } from './pages/Organisation';
import OrganisationCreate from './pages/OrganisationCreate';

import { RolesPage } from './pages/Roles';
import { RoleCreatePage } from './pages/RoleCreate';
import { BeaconPage } from './pages/Beacon';
import { BeaconCreatePage } from './pages/BeaconCreate';
import { GpsPage } from './pages/Gps';
import { GpsCreatePage } from './pages/GpsCreate';
import { PlanFeaturesPage } from './pages/PlanFeatures';
import { PlanFeatureCreatePage } from './pages/PlanFeatureCreate';
import { PlanPage } from './pages/Plan';
import { PlanCreatePage } from './pages/PlanCreate';
import { SupplierPage } from './pages/Supplier';
import { SupplierCreatePage } from './pages/SupplierCreate';
import { SupplierDeviceDetails } from './pages/SupplierDeviceDetails';
import { AppUsersPage } from './pages/AppUsers';

// Modals
import { AllModals } from './modals/AllModals';

const DEFAULT_USER: UserInfo = {
    name: 'Admin User',
    email: 'admin@vanloka.com',
    initials: 'AD',
};

/* ─────────────────────────────────────────────────
   Admin shell — sidebar + page area + modals
───────────────────────────────────────────────── */
interface AdminLayoutProps {
    user: UserInfo;
    modal: ModalName;
    openModal: (m: ModalName) => void;
    closeModal: () => void;
    onLogout: () => void;
    children: React.ReactNode;
}

import { Menu } from 'lucide-react';

function AdminLayout({ user, modal, openModal, closeModal, onLogout, children }: AdminLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setMobileMenuOpen(true);
        window.addEventListener('open-sidebar', handler);
        return () => window.removeEventListener('open-sidebar', handler);
    }, []);

    return (
        <div className="admin-wrap">
            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
            <Sidebar
                onLogout={onLogout}
                user={user}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
            <div className="page relative">
                {/* Mobile hamburger - lg:hidden per documentation */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden absolute top-[13px] right-4 z-30 p-1.5 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
                    aria-label="Open Menu"
                >
                    <Menu size={22} strokeWidth={2.5} />
                </button>
                {children}
            </div>
            <AllModals active={modal} close={closeModal} goto={openModal} />
        </div>
    );
}

/* ─────────────────────────────────────────────────
   Route guard — redirects to /login if not auth'd
───────────────────────────────────────────────── */
function PrivateRoute({
    isLoggedIn,
    children,
}: {
    isLoggedIn: boolean;
    children: React.ReactNode;
}) {
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

/* ─────────────────────────────────────────────────
   App
───────────────────────────────────────────────── */
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modal, setModal] = useState<ModalName>('');
    const [user, setUser] = useState<UserInfo>(DEFAULT_USER);

    const navigate = useNavigate();
    const openModal = (m: ModalName) => setModal(m);
    const closeModal = () => setModal('');

    const handleLogin = (u: UserInfo) => {
        setUser(u);
        setIsLoggedIn(true);
        navigate('/dashboard', { replace: true });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(DEFAULT_USER);
        navigate('/login', { replace: true });
    };

    const handleViewSessions = () => {
        // TODO: Implement view sessions logic
    };

    return (
        <Routes>
            {/* /login ──────────────────────────────── */}
            <Route
                path="/login"
                element={
                    isLoggedIn ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <LoginScreen onLogin={handleLogin} />
                    )
                }
            />

            {/* / → smart redirect ─────────────────── */}
            <Route
                path="/"
                element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}
            />

            {/* Protected admin pages ──────────────── */}
            <Route
                path="/*"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <AdminLayout
                            user={user}
                            modal={modal}
                            openModal={openModal}
                            closeModal={closeModal}
                            onLogout={handleLogout}
                        >
                            <Routes>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard onViewSessions={handleViewSessions} />}
                                />
                                <Route path="/feedbacks" element={<FeedbacksPage />} />
                                {/* ── Staff management ── */}
                                <Route path="/staff" element={<StaffPage />} />
                                {/* ── Staff Creation ── */}
                                 <Route path="/staff/create" element={<StaffCreate />} />
                                 <Route path="/staff/edit/:id" element={<StaffCreate />} />
                                {/* ── Masters / Beacons ── */}
                                <Route path="/masters/beacon-devices" element={<BeaconPage />} />
                                <Route path="/masters/beacon-devices/create" element={<BeaconCreatePage />} />
                                <Route path="/masters/beacon-devices/edit/:id" element={<BeaconCreatePage />} />
                                {/* ── Masters / GPS ── */}
                                <Route path="/masters/gps-devices" element={<GpsPage />} />
                                <Route path="/masters/gps-devices/create" element={<GpsCreatePage />} />
                                <Route path="/masters/gps-devices/edit/:id" element={<GpsCreatePage />} />
                                {/* ── Masters / Plan Features ── */}
                                <Route path="/masters/plan-features" element={<PlanFeaturesPage />} />
                                <Route path="/masters/plan-features/create" element={<PlanFeatureCreatePage />} />
                                <Route path="/masters/plan-features/edit/:id" element={<PlanFeatureCreatePage />} />
                                <Route path="/plan" element={<PlanPage />} />
                                <Route path="/plan/create" element={<PlanCreatePage />} />
                                <Route path="/plan/edit/:id" element={<PlanCreatePage />} />
                                {/* ── Supplier management ── */}
                                <Route path="/suppliers" element={<SupplierPage />} />
                                <Route path="/suppliers/create" element={<SupplierCreatePage />} />
                                <Route path="/suppliers/:id/devices" element={<SupplierDeviceDetails />} />
                                {/* ── App Users management ── */}
                                <Route path="/app-users" element={<AppUsersPage />} />
                                {/* ── Organisation management ── */}
                                <Route path="/organisation" element={<OrganisationPage />} />
                                <Route path="/organisation/create" element={<OrganisationCreate />} />
                                <Route path="/organisation/edit/:id" element={<OrganisationCreate />} />
                                {/* ── Roles & Permissions ── */}
                                <Route path="/roles-permissions" element={<RolesPage />} />
                                <Route path="/roles-permissions/create" element={<RoleCreatePage />} />
                                <Route path="/roles-permissions/edit/:id" element={<RoleCreatePage />} />


                                {/* ── Feedback resolve full-page form ── */}
                                <Route
                                    path="/feedbacks/resolve"
                                    element={<FeedbackResolve />}
                                />
                                <Route
                                    path="/feedbacks/resolve/:id"
                                    element={<FeedbackResolve />}
                                />
                                <Route path="/reports" element={<ReportsPage />} />
                                <Route path="/reports/:type" element={<ReportsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                {/* Any unknown path → dashboard */}
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </AdminLayout>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
