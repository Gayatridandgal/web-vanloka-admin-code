import { ArrowLeft, CheckCircle2, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_FEATURES } from '../data/planData';

export const PlanCreatePage = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

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
            featureId,
            description: feature ? feature.description : '',
        };
        setSelectedFeatures(newFeatures);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F8FAFC',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        background: 'white',
                        padding: '60px 80px',
                        borderRadius: 24,
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        maxWidth: 500,
                    }}
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
                        <CheckCircle2 size={40} />
                    </div>
                    <h2
                        style={{
                            fontSize: 24,
                            fontWeight: 900,
                            color: '#1E293B',
                            marginBottom: 12,
                        }}
                    >
                        Plan Created!
                    </h2>
                    <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: 32 }}>
                        The new subscription plan has been registered successfully and is now
                        active.
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
                            onClick={() => setIsSuccess(false)}
                        >
                            Add Another
                        </button>
                        <button
                            className="btn btn-primary w-full sm:w-auto"
                            onClick={() => navigate('/plan')}
                        >
                            Go to Plans
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            {/* Header */}
            <div className="page-header">
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    className="flex-col sm:flex-row sm:items-center"
                >
                    <button
                        type="button"
                        className="btn btn-secondary w-full sm:w-auto"
                        style={{ padding: '8px 12px' }}
                        onClick={() => navigate('/plan')}
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div className="text-center sm:text-left">
                        <div className="page-title">Create New Plan</div>
                        <div className="breadcrumb">
                            Plan Management <span>/</span> Create
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Body */}
            <div className="page-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div
                    style={{
                        maxWidth: 800,
                        margin: '0 auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                    }}
                >
                    {/* Pricing Strategy */}
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1.5px solid var(--border)',
                            padding: 24,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: 14,
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--primary)',
                                marginBottom: 20,
                            }}
                        >
                            Pricing Strategy
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="form-group mb-0">
                                <label className="form-label">Monthly Price (₹)</label>
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
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label className="form-label">Yearly Price (₹)</label>
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
                                />
                            </div>
                        </div>
                    </div>

                    {/* Plan Details */}
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1.5px solid var(--border)',
                            padding: 24,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: 14,
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--primary)',
                                marginBottom: 20,
                            }}
                        >
                            Plan Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="form-group mb-0">
                                <label className="form-label">Plan Name*</label>
                                <input
                                    required
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. Pro, Enterprise"
                                    value={planData.name}
                                    onChange={(e) =>
                                        setPlanData({ ...planData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label className="form-label">Type *</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        required
                                        className="form-select"
                                        value={planData.type}
                                        onChange={(e) =>
                                            setPlanData({ ...planData, type: e.target.value })
                                        }
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
                                            color: 'var(--muted)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Resource Inclusions */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
                            style={{ marginTop: 12 }}
                        >
                            <div className="form-group mb-0">
                                <label className="form-label">Vehicles Included</label>
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
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label className="form-label">Beacons Included</label>
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
                                />
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
                            style={{ marginTop: 12 }}
                        >
                            <div className="form-group mb-0">
                                <label className="form-label">GPS Devices Included</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. 5 free"
                                    value={planData.gpsIncluded}
                                    onChange={(e) =>
                                        setPlanData({ ...planData, gpsIncluded: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label className="form-label">Support Level</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        className="form-select"
                                        value={planData.support}
                                        onChange={(e) =>
                                            setPlanData({ ...planData, support: e.target.value })
                                        }
                                    >
                                        <option value="Email only">Email only</option>
                                        <option value="Priority phone + email">
                                            Priority phone + email
                                        </option>
                                        <option value="Dedicated Manager">Dedicated Manager</option>
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none',
                                            color: 'var(--muted)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
                            style={{ marginTop: 12 }}
                        >
                            <div className="form-group mb-0">
                                <label className="form-label">Status *</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        required
                                        className="form-select"
                                        value={planData.status}
                                        onChange={(e) =>
                                            setPlanData({
                                                ...planData,
                                                status: e.target.value as 'Active' | 'Inactive',
                                            })
                                        }
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
                                            color: 'var(--muted)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <label className="form-label">Trial Period (Days)</label>
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
                                />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: 12 }}>
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-input"
                                style={{ minHeight: 80, resize: 'vertical' }}
                                placeholder="Briefly describe what this plan offers..."
                                value={planData.description}
                                onChange={(e) =>
                                    setPlanData({ ...planData, description: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Plan Features */}
                    <div
                        style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1.5px solid var(--border)',
                            padding: 24,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 20,
                                flexDirection: 'column',
                                gap: 12,
                            }}
                            className="sm:flex-row"
                        >
                            <h3
                                style={{
                                    fontSize: 14,
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: 'var(--primary)',
                                    margin: 0,
                                }}
                            >
                                Plan Features
                            </h3>
                            <button
                                type="button"
                                className="btn btn-secondary w-full sm:w-auto"
                                style={{ padding: '6px 12px', fontSize: 11 }}
                                onClick={handleAddFeature}
                            >
                                <Plus size={14} /> Add Feature
                            </button>
                        </div>

                        {selectedFeatures.length === 0 ? (
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '30px 0',
                                    border: '1.5px dashed var(--border)',
                                    borderRadius: 12,
                                    color: 'var(--muted)',
                                    fontSize: 13,
                                }}
                            >
                                No features added yet. Click 'Add Feature' to start.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {selectedFeatures.map((feat, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            gap: 12,
                                            alignItems: 'flex-start',
                                            background: '#F8FAFC',
                                            padding: 16,
                                            borderRadius: 12,
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div className="form-group" style={{ marginBottom: 8 }}>
                                                <label
                                                    className="form-label"
                                                    style={{ fontSize: 9 }}
                                                >
                                                    Feature Name
                                                </label>
                                                <div style={{ position: 'relative' }}>
                                                    <select
                                                        className="form-select"
                                                        style={{ height: 38, padding: '0 12px' }}
                                                        value={feat.featureId}
                                                        onChange={(e) =>
                                                            handleFeatureChange(idx, e.target.value)
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
                                                            right: 10,
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            pointerEvents: 'none',
                                                            color: 'var(--muted)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label
                                                    className="form-label"
                                                    style={{ fontSize: 9 }}
                                                >
                                                    Description
                                                </label>
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#475569',
                                                        minHeight: 18,
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
                                                marginTop: 22,
                                                color: '#EF4444',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleRemoveFeature(idx)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    padding: '20px 24px',
                    background: 'white',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 12,
                    flexDirection: 'column',
                }}
                className="sm:flex-row"
            >
                <button
                    type="button"
                    className="btn btn-secondary w-full sm:w-auto"
                    onClick={() => navigate('/plan')}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Save Plan
                </button>
            </div>
        </form>
    );
};
