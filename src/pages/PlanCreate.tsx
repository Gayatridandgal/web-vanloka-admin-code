import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    Plus,
    Trash2,
    RefreshCw,
    Layout,
    Package,
    Settings2,
    Zap,
    IndianRupee,
    Save,
} from 'lucide-react';
import { DUMMY_FEATURES, INITIAL_PLANS } from '../data/planData';

/* ── Tiny Helpers ──────────────────────────────── */
const SectionHeader = ({
    icon: Icon,
    title,
    highlight,
}: {
    icon: React.ElementType;
    title: string;
    highlight?: boolean;
}) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 20px',
            borderBottom: '1.5px solid var(--border)',
            background: highlight ? 'var(--highlight-blue)' : 'var(--surface)',
        }}
    >
        <Icon size={18} color={highlight ? '#2563EB' : 'var(--primary)'} />
        <span
            style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
            }}
        >
            {title}
        </span>
    </div>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div
        style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            marginBottom: 20,
            overflow: 'hidden',
            ...style,
        }}
    >
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '24px 28px', ...style }}>{children}</div>
);

const Grid = ({
    cols,
    children,
    className = '',
}: {
    cols: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }} className={className}>
        {children}
    </div>
);

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label
        style={{
            display: 'block',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            color: '#64748B',
            marginBottom: 6,
        }}
    >
        {children}
        {required && <span style={{ color: '#DC2626', marginLeft: 2 }}>*</span>}
    </label>
);

/* ── Confirmation Overlay ── */
const UpdateConfirmOverlay = ({
    onConfirm,
    onCancel,
    title,
}: {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
}) => (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        }}
        onClick={onCancel}
    >
        <div
            style={{
                background: 'white',
                borderRadius: 16,
                width: '100%',
                maxWidth: 420,
                padding: '36px 32px 28px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,.15)',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}
            >
                <RefreshCw size={36} color="#2563EB" />
            </div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#1E40AF',
                    marginBottom: 8,
                }}
            >
                Confirm Update?
            </div>
            <div
                style={{
                    fontSize: 13,
                    color: '#64748B',
                    marginBottom: 24,
                    lineHeight: 1.6,
                }}
            >
                Are you sure you want to update the details for <strong>{title}</strong>? This will
                modify the plan across the system.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    style={{ minWidth: 120 }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onConfirm}
                    style={{ minWidth: 120 }}
                >
                    Confirm Update
                </button>
            </div>
        </div>
    </div>
);

export const PlanCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;
    const [isSuccess, setIsSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Form State
    const [planData, setPlanData] = useState({
        name: '',
        type: '',
        status: 'Active',
        monthlyPrice: 0,
        yearlyPrice: 0,
        vehiclesIncluded: '',
        beaconsIncluded: '',
        gpsIncluded: '',
        support: 'Email only',
        trialPeriod: 0,
        description: '',
    });

    const [selectedFeatures, setSelectedFeatures] = useState<
        { featureId: string; description: string }[]
    >([]);

    useEffect(() => {
        if (isEdit) {
            const plan = INITIAL_PLANS.find((p) => p.id === id);
            if (plan) {
                setPlanData({
                    name: plan.name,
                    type: plan.type,
                    status: plan.status,
                    monthlyPrice: plan.monthlyPrice,
                    yearlyPrice: plan.yearlyPrice,
                    vehiclesIncluded: plan.vehiclesIncluded,
                    beaconsIncluded: plan.beaconsIncluded,
                    gpsIncluded: plan.gpsIncluded,
                    support: plan.support,
                    trialPeriod: plan.trialPeriod,
                    description: plan.description,
                });
            }
        }
    }, [id, isEdit]);

    const handleAddFeature = () => {
        setSelectedFeatures([...selectedFeatures, { featureId: '', description: '' }]);
    };

    const handleRemoveFeature = (index: number) => {
        setSelectedFeatures(selectedFeatures.filter((_, i) => i !== index));
    };

    const handleFeatureChange = (index: number, featureId: string) => {
        const feature = DUMMY_FEATURES.find((f) => f.id === featureId);
        const newFeatures = [...selectedFeatures];
        newFeatures[index] = {
            featureId: featureId || '',
            description: feature ? feature.description : '',
        };
        setSelectedFeatures(newFeatures);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            setShowConfirm(true);
        } else {
            setIsSuccess(true);
        }
    };

    const confirmUpdate = () => {
        setShowConfirm(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <>
                <div className="page-header">
                    <div>
                        <div className="page-title">
                            <Package size={18} className="ms mr-2" />
                            Plan Management
                        </div>
                        <div className="breadcrumb">
                            Admin <span>/</span> Plans <span>/</span>{' '}
                            {isEdit ? 'Edit Plan' : 'Create New'}
                        </div>
                    </div>
                </div>
                <div
                    className="page-body"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            border: '1.5px solid var(--border)',
                            padding: '40px 24px',
                            textAlign: 'center',
                            maxWidth: 480,
                            width: '100%',
                            boxShadow: '0 8px 40px rgba(5,150,105,.08)',
                        }}
                        className="md:p-[52px_60px]"
                    >
                        <div
                            style={{
                                width: 80,
                                height: 80,
                                background: '#DCFCE7',
                                color: '#10B981',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <CheckCircle2 size={44} color="#059669" />
                        </div>
                        <h2
                            style={{
                                fontSize: 22,
                                fontWeight: 900,
                                color: '#065F46',
                                marginBottom: 8,
                            }}
                        >
                            Plan {isEdit ? 'Updated' : 'Created'} Successfully!
                        </h2>
                        <p style={{ fontSize: 13, color: '#059669', marginBottom: 32 }}>
                            The subscription plan <strong>{planData.name}</strong> has been{' '}
                            {isEdit ? 'updated' : 'registered'} successfully.
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                gap: 12,
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                            className="sm:flex-row"
                        >
                            <button
                                className="btn btn-secondary w-full sm:w-auto"
                                onClick={() => {
                                    setIsSuccess(false);
                                    if (!isEdit)
                                        setPlanData({
                                            name: '',
                                            type: '',
                                            status: 'Active',
                                            monthlyPrice: 0,
                                            yearlyPrice: 0,
                                            vehiclesIncluded: '',
                                            beaconsIncluded: '',
                                            gpsIncluded: '',
                                            support: 'Email only',
                                            trialPeriod: 0,
                                            description: '',
                                        });
                                }}
                            >
                                Add Another
                            </button>
                            <button
                                className="btn btn-primary w-full sm:w-auto"
                                onClick={() => navigate('/plan')}
                            >
                                <ArrowLeft size={18} className="ms mr-1" /> Back to Plans
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <Package size={18} className="ms mr-2" />
                        {isEdit ? 'Edit Subscription Plan' : 'Create New Plan'}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/plan')}
                        >
                            Plan Management
                        </span>
                        <span>/</span> {isEdit ? 'Edit Plan' : 'Create New'}
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary hidden sm:flex"
                    onClick={() => navigate('/plan')}
                >
                    <ArrowLeft size={18} className="ms mr-1" /> Back
                </button>
            </div>

            <div className="page-body">
                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: 860,
                        margin: '0 auto',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    className="px-1 sm:px-0"
                >
                    {/* Basic Info */}
                    <Card>
                        <SectionHeader icon={Settings2} title="Plan Configuration" />
                        <Body>
                            <Grid cols="1fr 1fr" className="grid-cols-1 sm:grid-cols-2">
                                <div style={{ minWidth: 0 }}>
                                    <Label required>Plan Name</Label>
                                    <input
                                        required
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Pro, Enterprise"
                                        value={planData.name}
                                        onChange={(e) =>
                                            setPlanData({ ...planData, name: e.target.value })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label required>Plan Type</Label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            required
                                            className="form-select"
                                            value={planData.type}
                                            onChange={(e) =>
                                                setPlanData({ ...planData, type: e.target.value })
                                            }
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Workplace">Workplace (Offices)</option>
                                            <option value="EduTrack">EduTrack (Institutes)</option>
                                            <option value="DriveSecure">DriveSecure (MDS)</option>
                                            <option value="Trial">Trial</option>
                                            <option value="Enterprise">Enterprise</option>
                                        </select>
                                        <ChevronDown
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                right: 12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                pointerEvents: 'none',
                                                color: '#94A3B8',
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* Pricing */}
                    <Card>
                        <SectionHeader icon={IndianRupee} title="Pricing Model" />
                        <Body style={{ padding: '24px 28px' }}>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                                style={{ boxSizing: 'border-box' }}
                            >
                                <div style={{ minWidth: 0 }}>
                                    <Label>Monthly Price (₹)</Label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={planData.monthlyPrice}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                monthlyPrice: Number(e.target.value),
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>Yearly Price (₹)</Label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={planData.yearlyPrice}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                yearlyPrice: Number(e.target.value),
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>Trial Period (Days)</Label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={planData.trialPeriod}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                trialPeriod: Number(e.target.value),
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>Status</Label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            required
                                            className="form-select"
                                            value={planData.status}
                                            onChange={(e) =>
                                                setPlanData({
                                                    ...planData,
                                                    status: e.target
                                                        .value as typeof planData.status,
                                                })
                                            }
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        <ChevronDown
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                right: 12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                pointerEvents: 'none',
                                                color: '#94A3B8',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Body>
                    </Card>

                    {/* Inclusions */}
                    <Card>
                        <SectionHeader icon={Zap} title="Resource Inclusions" />
                        <Body style={{ padding: '24px 28px' }}>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                                style={{ boxSizing: 'border-box' }}
                            >
                                <div style={{ minWidth: 0 }}>
                                    <Label>Vehicles Included</Label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Up to 15"
                                        value={planData.vehiclesIncluded}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                vehiclesIncluded: e.target.value,
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>Beacons Included</Label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. 150 free"
                                        value={planData.beaconsIncluded}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                beaconsIncluded: e.target.value,
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>GPS Devices Included</Label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. 5 free"
                                        value={planData.gpsIncluded}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                gpsIncluded: e.target.value,
                                            })
                                        }
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <Label>Support Level</Label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            className="form-select"
                                            value={planData.support}
                                            onChange={(e) =>
                                                setPlanData({
                                                    ...planData,
                                                    support: e.target.value,
                                                })
                                            }
                                            style={{ width: '100%', boxSizing: 'border-box' }}
                                        >
                                            <option value="Email only">Email only</option>
                                            <option value="Priority phone + email">
                                                Priority phone + email
                                            </option>
                                            <option value="Dedicated Manager">
                                                Dedicated Manager
                                            </option>
                                        </select>
                                        <ChevronDown
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                right: 12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                pointerEvents: 'none',
                                                color: '#94A3B8',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <Label>Description</Label>
                                <textarea
                                    className="form-input"
                                    style={{
                                        minHeight: 90,
                                        resize: 'vertical',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                    }}
                                    placeholder="Briefly describe what this plan offers..."
                                    value={planData.description}
                                    onChange={(e) =>
                                        setPlanData({ ...planData, description: e.target.value })
                                    }
                                />
                            </div>
                        </Body>
                    </Card>

                    {/* Features Logic */}
                    <Card>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 20px',
                                borderBottom: '1.5px solid var(--border)',
                                background: 'var(--surface)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Layout size={18} color="var(--primary)" />
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 900,
                                        letterSpacing: '.07em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Plan Features
                                </span>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{ padding: '4px 12px', fontSize: 10, height: 28 }}
                                onClick={handleAddFeature}
                            >
                                <Plus size={14} className="ms" /> ADD FEATURE
                            </button>
                        </div>
                        <Body>
                            {selectedFeatures.length === 0 ? (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '32px 0',
                                        border: '1.5px dashed var(--border)',
                                        borderRadius: 12,
                                        color: '#94A3B8',
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    No features added yet. Click 'ADD FEATURE' to include specific
                                    module access.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {selectedFeatures.map((feat, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                gap: 16,
                                                alignItems: 'flex-start',
                                                background: '#F8FAFC',
                                                padding: '16px 20px',
                                                borderRadius: 12,
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ marginBottom: 12 }}>
                                                    <Label>Feature Name</Label>
                                                    <div style={{ position: 'relative' }}>
                                                        <select
                                                            className="form-select"
                                                            style={{ height: 40 }}
                                                            value={feat.featureId}
                                                            onChange={(e) =>
                                                                handleFeatureChange(
                                                                    idx,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="">Select Feature</option>
                                                            {DUMMY_FEATURES.map((df) => (
                                                                <option key={df.id} value={df.id}>
                                                                    {df.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown
                                                            size={14}
                                                            style={{
                                                                position: 'absolute',
                                                                right: 12,
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none',
                                                                color: '#94A3B8',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        style={{
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            color: '#64748B',
                                                            marginBottom: 4,
                                                        }}
                                                    >
                                                        DESCRIPTION
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 12,
                                                            color: '#475569',
                                                            lineHeight: 1.5,
                                                        }}
                                                    >
                                                        {feat.description ||
                                                            'Select a feature to see its description...'}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                style={{
                                                    marginTop: 24,
                                                    color: '#EF4444',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 4,
                                                }}
                                                onClick={() => handleRemoveFeature(idx)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Body>
                    </Card>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 12,
                            marginTop: 12,
                            paddingBottom: 40,
                            flexDirection: 'column',
                        }}
                        className="sm:flex-row"
                    >
                        <button
                            type="button"
                            className="btn btn-secondary w-full sm:w-auto"
                            onClick={() => navigate('/plan')}
                            style={{ minWidth: 120 }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary w-full sm:w-auto"
                            style={{ minWidth: 140 }}
                        >
                            <Save size={18} className="ms mr-2" />{' '}
                            {isEdit ? 'Update Plan' : 'Create Plan'}
                        </button>
                    </div>
                </form>
            </div>

            {showConfirm && (
                <UpdateConfirmOverlay
                    title={planData.name}
                    onConfirm={confirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};
