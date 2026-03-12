import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import type { ModalName, UserInfo } from './types'; // ← "import type" for TS-only types

// Auth
import { LoginScreen } from './auth/LoginPage';

// Layout
import { Sidebar } from './layouts/Sidebar';

// Pages
import { Dashboard } from './pages/Dasboard';
import { FeedbacksPage } from './pages/Feedback';
import { FeedbackResolve } from './pages/FeedbackReslove';
import { ReportsPage } from './pages/Report';
import { SettingsPage } from './pages/Setting';
import { StaffPage } from './pages/Staff'; // ← For staff listing page
import StaffCreate from './pages/StaffCreate';
import { TraineeComplaint } from './pages/TraineeComplaint'; // ← For /feedbacks/complaint// ← For staff create modal

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

function AdminLayout({ user, modal, openModal, closeModal, onLogout, children }: AdminLayoutProps) {
    return (
        <div className="admin-wrap">
            <Sidebar onLogout={onLogout} user={user} />
            <div className="page">{children}</div>
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

                                {/* ── Feedback resolve full-page form ── */}
                                <Route path="/feedbacks/resolve" element={<FeedbackResolve />} />
                                {/* ── Trainee complaint submission ── */}
                                <Route path="/feedbacks/complaint" element={<TraineeComplaint />} />
                                <Route path="/reports" element={<ReportsPage />} />
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
