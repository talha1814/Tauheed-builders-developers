'use client';

import React, { useState } from 'react';
import { Unit, Project } from '@/lib/types';
import { formatPKR, formatArea, slugify } from '@/lib/utils';
import { Plus, Search, Trash2, Edit3, Check, X, Layers } from 'lucide-react';

interface UnitsClientManagerProps {
  initialUnits: Unit[];
  projects: Project[];
}

export default function UnitsClientManager({ initialUnits, projects }: UnitsClientManagerProps) {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [unitNumber, setUnitNumber] = useState('');
  const [category, setCategory] = useState<Unit['category']>('residential');
  const [type, setType] = useState<Unit['type']>('2-bedroom');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [areaSqFt, setAreaSqFt] = useState(1250);
  const [pricePKR, setPricePKR] = useState(18500000);
  const [availability, setAvailability] = useState<Unit['availability']>('available');
  const [floorNumber, setFloorNumber] = useState('4');
  const [description, setDescription] = useState('');
  const [floorPlanUrl, setFloorPlanUrl] = useState('');

  const filteredUnits = units.filter((u) => {
    const matchProj = selectedProjectId === 'all' || u.projectId === selectedProjectId;
    const matchSearch =
      search === '' ||
      u.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
      (u.projectName && u.projectName.toLowerCase().includes(search.toLowerCase()));
    return matchProj && matchSearch;
  });

  const handleSaveUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === projectId);
    const slug = slugify(`${unitNumber}-${type}`);

    const newUnitPayload = {
      projectId,
      unitNumber,
      slug,
      category,
      type,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      areaSqFt: Number(areaSqFt),
      pricePKR: Number(pricePKR),
      availability,
      floorNumber,
      description,
      floorPlanUrl: floorPlanUrl || undefined,
    };

    try {
      const res = await fetch('/api/admin/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUnitPayload),
      });

      const json = await res.json();
      if (res.ok && json.unit) {
        setUnits([json.unit, ...units]);
        setShowAddModal(false);
        setUnitNumber('');
        setDescription('');
      } else {
        alert(json.error || 'Failed to create unit');
      }
    } catch {
      alert('Error creating unit');
    }
  };

  const handleToggleAvailability = async (id: string, current: Unit['availability']) => {
    const nextStatus: Unit['availability'] = current === 'available' ? 'reserved' : current === 'reserved' ? 'sold' : 'available';
    try {
      const res = await fetch('/api/admin/units', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, availability: nextStatus }),
      });
      if (res.ok) {
        setUnits(units.map(u => u.id === id ? { ...u, availability: nextStatus } : u));
      }
    } catch {
      alert('Failed to update availability');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this unit from inventory?')) return;
    try {
      const res = await fetch(`/api/admin/units?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUnits(units.filter(u => u.id !== id));
      }
    } catch {
      alert('Failed to delete unit');
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#16191D] p-4 rounded-lg border border-[#252A30]">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8E9296] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by unit number or project..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
          >
            <option value="all">All Associated Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Unit</span>
        </button>
      </div>

      {/* Units Table */}
      <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8E7E2]">
            <thead>
              <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                <th className="py-3 px-4">Unit Number</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Floor</th>
                <th className="py-3 px-4">Area (Sq Ft)</th>
                <th className="py-3 px-4">Price (PKR)</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252A30]">
              {filteredUnits.map((u) => (
                <tr key={u.id} className="hover:bg-[#1A1E24] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {u.unitNumber}
                  </td>
                  <td className="py-3.5 px-4 text-[#8E9296]">
                    {u.projectName || 'Unassigned'}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-[#C8C7C2]">
                    {u.type.replace('-', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-[#8E9296]">
                    Floor {u.floorNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    {formatArea(u.areaSqFt)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#B89A68]">
                    {formatPKR(u.pricePKR)}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleAvailability(u.id, u.availability)}
                      title="Click to advance status"
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        u.availability === 'available'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : u.availability === 'reserved'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {u.availability}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#16191D] border border-[#252A30] rounded-lg max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A30]">
              <h3 className="font-serif text-lg font-bold text-white">Add Unit to Inventory</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#8E9296] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUnit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#C8C7C2] mb-1">Select Development *</label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Unit Number / Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TH-402"
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#C8C7C2] mb-1">Unit Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                  >
                    <option value="studio">Studio</option>
                    <option value="1-bedroom">1-Bedroom</option>
                    <option value="2-bedroom">2-Bedroom</option>
                    <option value="3-bedroom">3-Bedroom</option>
                    <option value="4-bedroom">4-Bedroom</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="duplex">Duplex</option>
                    <option value="shop">Shop</option>
                    <option value="office">Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#C8C7C2] mb-1">Floor Level</label>
                  <input
                    type="text"
                    value={floorNumber}
                    onChange={(e) => setFloorNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                  />
                </div>

                <div>
                  <label className="block text-[#C8C7C2] mb-1">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                  />
                </div>

                <div>
                  <label className="block text-[#C8C7C2] mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={pricePKR}
                    onChange={(e) => setPricePKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-[#D4BD8F] font-mono rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Floor Plan Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={floorPlanUrl}
                  onChange={(e) => setFloorPlanUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                />
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Corner orientation, balcony view, private terrace..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1F242B] text-[#8E9296] hover:text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] font-bold uppercase rounded tracking-wider"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
