'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Key, Users, Bell, Shield, Copy, Plus, MoreHorizontal, Trash2, Check } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { seedUser, seedWorkspace, seedTeamMembers, seedApiKeys } from '@/data/seed';

const tabs = ['Profile', 'Team', 'API Keys', 'Notifications', 'Security'];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Profile');

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-sm text-zinc-400">Manage your account and workspace settings</p></div>

            <div className="flex gap-1 border-b border-white/5">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={cn("px-4 py-2.5 text-sm transition-all relative", activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300')}
                    >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="settings-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                    </button>
                ))}
            </div>

            {activeTab === 'Profile' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="bg-card border border-white/5 rounded-xl p-6">
                        <h3 className="text-sm font-medium mb-4">Profile Information</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white">A</div>
                            <div><p className="font-medium">{seedUser.name}</p><p className="text-sm text-zinc-400">{seedUser.email}</p></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Full name</label><input type="text" defaultValue={seedUser.name} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Email</label><input type="email" defaultValue={seedUser.email} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Timezone</label><input type="text" defaultValue={seedUser.timezone} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                        </div>
                        <button className="mt-4 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-all">Save Changes</button>
                    </div>

                    <div className="bg-card border border-white/5 rounded-xl p-6">
                        <h3 className="text-sm font-medium mb-4">Workspace</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Workspace name</label><input type="text" defaultValue={seedWorkspace.name} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Slug</label><input type="text" defaultValue={seedWorkspace.slug} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-500 focus:outline-none" readOnly /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Region</label><input type="text" defaultValue={seedWorkspace.region} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-500 focus:outline-none" readOnly /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Type</label><input type="text" defaultValue={seedWorkspace.type} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-500 capitalize focus:outline-none" readOnly /></div>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'Team' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium">Team Members</h3>
                        <button className="text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Invite</button>
                    </div>
                    <div className="space-y-3">
                        {seedTeamMembers.map(m => (
                            <div key={m.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">{m.name.charAt(0)}</div>
                                    <div><p className="text-sm font-medium">{m.name}</p><p className="text-xs text-zinc-500">{m.email}</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full capitalize", m.role === 'owner' ? 'bg-purple-500/10 text-purple-400' : m.role === 'admin' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-500/10 text-zinc-400')}>{m.role}</span>
                                    <button className="p-1 text-zinc-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'API Keys' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium">API Keys</h3>
                        <button className="inline-flex items-center gap-1.5 text-xs bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg transition-all"><Plus className="w-3 h-3" /> Create Key</button>
                    </div>
                    <div className="space-y-3">
                        {seedApiKeys.map(key => (
                            <div key={key.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <Key className={cn("w-4 h-4", key.isActive ? 'text-emerald-400' : 'text-zinc-600')} />
                                    <div>
                                        <p className="text-sm font-medium">{key.name}</p>
                                        <p className="text-xs text-zinc-500 font-mono">{key.keyPreview}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-zinc-500">{key.lastUsedAt ? `Last used ${formatDate(key.lastUsedAt)}` : 'Never used'}</span>
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full", key.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-500')}>
                                        {key.isActive ? 'Active' : 'Revoked'}
                                    </span>
                                    <button className="p-1 text-zinc-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'Notifications' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/5 rounded-xl p-6 space-y-4">
                    <h3 className="text-sm font-medium mb-2">Notification Preferences</h3>
                    {['Pod status changes', 'Job completions', 'Low credit balance', 'Security alerts', 'Billing updates', 'System maintenance'].map(pref => (
                        <div key={pref} className="flex items-center justify-between py-2">
                            <span className="text-sm text-zinc-300">{pref}</span>
                            <div className="w-10 h-6 bg-purple-500 rounded-full flex items-center p-0.5 cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full ml-auto" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'Security' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-card border border-white/5 rounded-xl p-6">
                        <h3 className="text-sm font-medium mb-4">Change Password</h3>
                        <div className="space-y-3 max-w-sm">
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">Current password</label><input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                            <div><label className="text-xs text-zinc-400 mb-1.5 block">New password</label><input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-all">Update Password</button>
                        </div>
                    </div>
                    <div className="bg-card border border-red-500/10 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-red-400 mb-2">Danger Zone</h3>
                        <p className="text-xs text-zinc-400 mb-4">Permanently delete your account and all associated data.</p>
                        <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 inline mr-1.5" /> Delete Account
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
