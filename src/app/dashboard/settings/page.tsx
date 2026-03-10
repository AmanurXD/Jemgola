'use client';

import { useState } from 'react';
import { Settings, User, Users, Key, Bell as BellIcon, Shield, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, PageHeader, Button, Badge, Tabs, Input } from '@/components/ui';
import { seedUser } from '@/data/seed';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Profile');
    const [showKey, setShowKey] = useState<string | null>(null);

    const tabList = ['Profile', 'Team', 'API Keys', 'Notifications', 'Security'];
    const apiKeys = [
        { id: 'k1', name: 'Production', prefix: 'jg_prod_', key: 'jg_prod_7x2kLm9nPqR4sT', created: 'Feb 1, 2026', lastUsed: '2 hours ago' },
        { id: 'k2', name: 'Development', prefix: 'jg_dev_', key: 'jg_dev_3aB5cD7eF9gH1i', created: 'Jan 15, 2026', lastUsed: '5 days ago' },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Settings" description="Manage your account and workspace preferences" />

            <Tabs tabs={tabList} active={activeTab} onChange={setActiveTab} layoutId="settings-tab" />

            <div className="max-w-2xl">
                {activeTab === 'Profile' && (
                    <Card padding="lg">
                        <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-lg font-semibold text-white">
                                    {seedUser.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-heading">{seedUser.name}</p>
                                    <p className="text-xs text-muted-foreground">{seedUser.email}</p>
                                </div>
                            </div>
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">Full Name</label><Input defaultValue={seedUser.name} /></div>
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">Email</label><Input type="email" defaultValue={seedUser.email} /></div>
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">Organization</label><Input defaultValue="Acme AI Labs" /></div>
                            <Button variant="primary" size="md">Save Changes</Button>
                        </div>
                    </Card>
                )}

                {activeTab === 'Team' && (
                    <Card padding="lg">
                        <CardHeader action={<Button variant="secondary" size="sm" icon={<Users />}>Invite Member</Button>}>
                            <CardTitle>Team Members</CardTitle>
                        </CardHeader>
                        <div className="space-y-2">
                            {[
                                { name: 'Alex Chen', email: 'alex@jemgola.dev', role: 'Owner' },
                                { name: 'Sarah Kim', email: 'sarah@acme.ai', role: 'Admin' },
                                { name: 'Marcus Liu', email: 'marcus@acme.ai', role: 'Member' },
                            ].map(m => (
                                <div key={m.email} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface-0 border border-border-subtle">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-[11px] font-bold text-muted-foreground">
                                            {m.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium text-heading">{m.name}</p>
                                            <p className="text-xs text-muted-foreground">{m.email}</p>
                                        </div>
                                    </div>
                                    <Badge variant={m.role === 'Owner' ? 'info' : 'outline'}>{m.role}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'API Keys' && (
                    <Card padding="lg">
                        <CardHeader action={<Button variant="secondary" size="sm" icon={<Key />}>Create Key</Button>}>
                            <CardTitle>API Keys</CardTitle>
                        </CardHeader>
                        <div className="space-y-2">
                            {apiKeys.map(k => (
                                <div key={k.id} className="py-3 px-3.5 rounded-lg bg-surface-0 border border-border-subtle">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[13px] font-medium text-heading">{k.name}</span>
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="p-1 rounded hover:bg-surface-2 text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button>
                                            <button className="p-1 rounded hover:bg-surface-2 text-muted-foreground"><Copy className="w-3.5 h-3.5" /></button>
                                            <button className="p-1 rounded hover:bg-destructive/5 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground">{showKey === k.id ? k.key : k.prefix + '••••••••••'}</p>
                                    <p className="text-[11px] text-muted-foreground/60 mt-1">Created {k.created} · Last used {k.lastUsed}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'Notifications' && (
                    <Card padding="lg">
                        <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                        <div className="space-y-4">
                            {[
                                { label: 'Pod status changes', desc: 'Get notified when pods start, stop, or fail', defaultOn: true },
                                { label: 'Billing alerts', desc: 'Alerts when credits are low or invoices are generated', defaultOn: true },
                                { label: 'Security events', desc: 'New login detections and API key usage', defaultOn: true },
                                { label: 'Product updates', desc: 'New features and platform announcements', defaultOn: false },
                            ].map(n => (
                                <div key={n.label} className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-[13px] font-medium text-heading">{n.label}</p>
                                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                                    </div>
                                    <button className={cn(
                                        "w-9 h-5 rounded-full transition-colors relative",
                                        n.defaultOn ? 'bg-primary' : 'bg-surface-3'
                                    )}>
                                        <span className={cn("w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all", n.defaultOn ? 'right-[3px]' : 'left-[3px]')} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'Security' && (
                    <div className="space-y-5">
                        <Card padding="lg">
                            <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
                            <div className="space-y-3">
                                <div><label className="text-xs text-muted-foreground mb-1.5 block">Current Password</label><Input type="password" /></div>
                                <div><label className="text-xs text-muted-foreground mb-1.5 block">New Password</label><Input type="password" /></div>
                                <div><label className="text-xs text-muted-foreground mb-1.5 block">Confirm New Password</label><Input type="password" /></div>
                                <Button variant="primary" size="md">Update Password</Button>
                            </div>
                        </Card>
                        <Card padding="lg" className="border-destructive/20">
                            <CardHeader><CardTitle>Danger Zone</CardTitle></CardHeader>
                            <p className="text-xs text-muted-foreground mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                            <Button variant="danger" size="sm" icon={<Trash2 />}>Delete Account</Button>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
