import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Pagination } from '../ui/index';
import { DUMMY_SUPPLIERS } from '../data/supplierData';

export const SupplierDeviceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const supplier = DUMMY_SUPPLIERS.find(s => s.id === id);

    if (!supplier) {
        return (
            <div style={{ padding: 40, textAlign: 'center' }}>
                <h3>Supplier not found</h3>
                <button className="btn btn-primary" onClick={() => navigate('/suppliers')}>Back to Suppliers</button>
            </div>
        );
    }

    const filtered = supplier.devices.filter(d => 
        d.imei.includes(search) || d.model.toLowerCase().includes(search.toLowerCase())
    );

    const limit = 10;
    const pages = Math.ceil(filtered.length / limit) || 1;
    const safePage = Math.max(1, Math.min(page, pages));
    const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);

    return (
        <>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button className="btn btn-secondary" style={{ padding: '8px 12px' }} onClick={() => navigate('/suppliers')}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div>
                        <div className="page-title">{supplier.name} - Devices</div>
                        <div className="breadcrumb">Suppliers <span>/</span> {supplier.name} <span>/</span> Devices</div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                {/* Search Bar */}
                <div className="filter-bar">
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        <input 
                            className="search-input" 
                            style={{ width: '100%', paddingLeft: 40 }} 
                            placeholder="Search by IMEI or Model..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-card" style={{ border: 'none', background: 'transparent' }}>
                    <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '16px 24px' }}>IMEI NUMBER</th>
                                    <th>MODEL</th>
                                    <th>TYPE</th>
                                    <th>ADDED DATE</th>
                                    <th>STATUS</th>
                                    <th style={{ textAlign: 'right', paddingRight: 24 }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(d => (
                                    <tr key={d.id}>
                                        <td style={{ padding: '16px 24px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text)' }}>
                                            {d.imei}
                                        </td>
                                        <td style={{ fontWeight: 800 }}>{d.model}</td>
                                        <td>
                                            <Badge variant="blue">{d.type}</Badge>
                                        </td>
                                        <td style={{ color: 'var(--muted)', fontSize: 12 }}>{d.addedDate}</td>
                                        <td>
                                            <Badge variant={d.status === 'In Stock' ? 'green' : d.status === 'Assigned' ? 'amber' : 'red'}>
                                                {d.status}
                                            </Badge>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: 24 }}>
                                            <div className="actions-col" style={{ justifyContent: 'flex-end' }}>
                                                <button className="act-btn act-edit"><span className="material-symbols-outlined">edit</span></button>
                                                <button className="act-btn act-delete"><span className="material-symbols-outlined">delete</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {pages > 1 && (
                        <Pagination current={safePage} total={pages} onChange={setPage} />
                    )}
                </div>
            </div>
        </>
    );
};
