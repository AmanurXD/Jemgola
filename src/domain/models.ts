// GPU Domain Models

export type GpuAvailability = 'available' | 'limited' | 'sold_out';
export type GpuCategory = 'data_center' | 'professional' | 'consumer';

export interface Gpu {
    id: string;
    name: string;
    manufacturer: string;
    vram: number; // GB
    cudaCores: number;
    tensorCores: number;
    memoryBandwidth: number; // GB/s
    pricePerHour: number;
    availability: GpuAvailability;
    region: string;
    category: GpuCategory;
    tdp: number; // watts
    architecture: string;
}

// Pod Domain Models

export type PodStatus =
    | 'creating' | 'provisioning' | 'starting' | 'running'
    | 'stopping' | 'stopped' | 'failed' | 'restarting'
    | 'deleting' | 'deleted';

export interface PodConfig {
    gpuType: string;
    gpuCount: number;
    containerImage: string;
    ports: number[];
    envVars: Record<string, string>;
    volumeIds: string[];
    cpuLimit: number;
    memoryLimit: number; // GB
}

export interface Pod {
    id: string;
    name: string;
    status: PodStatus;
    config: PodConfig;
    region: string;
    createdAt: string;
    uptimeSeconds: number;
    costAccrued: number;
    gpuName: string;
}

// Cluster Domain Models

export type ClusterStatus = 'creating' | 'active' | 'scaling' | 'degraded' | 'deleting';

export interface ClusterNode {
    id: string;
    status: 'healthy' | 'degraded' | 'offline';
    gpuName: string;
    gpuUtilization: number;
    cpuUtilization: number;
    memoryUtilization: number;
    lastHeartbeat: string;
}

export interface Cluster {
    id: string;
    name: string;
    status: ClusterStatus;
    nodes: ClusterNode[];
    region: string;
    gpuType: string;
    totalVram: number;
    createdAt: string;
    scalingPolicy: 'manual' | 'auto';
}

// Serverless Domain Models

export type EndpointStatus = 'deploying' | 'active' | 'scaling' | 'idle' | 'failed';

export interface ServerlessEndpoint {
    id: string;
    name: string;
    status: EndpointStatus;
    gpuType: string;
    containerImage: string;
    requestsPerMin: number;
    avgLatencyMs: number;
    coldStarts: number;
    minWorkers: number;
    maxWorkers: number;
    activeWorkers: number;
    createdAt: string;
}

// Node Domain Models

export type NodeStatus = 'provisioning' | 'healthy' | 'degraded' | 'offline' | 'draining';

export interface Node {
    id: string;
    status: NodeStatus;
    gpuName: string;
    region: string;
    cpuUtilization: number;
    memoryUtilization: number;
    gpuUtilization: number;
    uptimeSeconds: number;
    attachedPods: string[];
}

// Storage Domain Models

export type VolumeStatus = 'creating' | 'available' | 'attached' | 'detaching' | 'deleting';

export interface Volume {
    id: string;
    name: string;
    status: VolumeStatus;
    sizeGb: number;
    usedGb: number;
    region: string;
    attachedTo: string | null; // pod id
    attachedPodName: string | null;
    filesystemType: string;
    createdAt: string;
}

// Finetuning Domain Models

export type JobStatus = 'queued' | 'preparing' | 'training' | 'completed' | 'failed' | 'cancelled';

export interface TrainingJob {
    id: string;
    name: string;
    status: JobStatus;
    baseModel: string;
    datasetName: string;
    datasetRows: number;
    gpuType: string;
    progress: number; // 0-100
    currentEpoch: number;
    totalEpochs: number;
    trainingLoss: number;
    durationSeconds: number;
    estimatedTimeRemaining: number;
    costAccrued: number;
    createdAt: string;
    checkpoints: Checkpoint[];
}

export interface Checkpoint {
    id: string;
    epoch: number;
    loss: number;
    createdAt: string;
}

// Container Domain Models

export interface ContainerImage {
    id: string;
    name: string;
    tag: string;
    sizeBytes: number;
    createdAt: string;
    pulls: number;
    layers: number;
}

// Template Domain Models

export type TemplateCategory = 'ml_training' | 'inference' | 'web_scraping' | 'development';

export interface Template {
    id: string;
    name: string;
    description: string;
    category: TemplateCategory;
    gpuRecommendation: string;
    containerImage: string;
    icon: string;
    envVars: Record<string, string>;
}

// Billing Domain Models

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'failed';

export interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
}

export interface InvoiceLineItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Invoice {
    id: string;
    number: string;
    date: string;
    amount: number;
    status: InvoiceStatus;
    lineItems: InvoiceLineItem[];
    tax: number;
    paymentMethodId: string | null;
}

export interface Plan {
    id: string;
    name: string;
    pricePerMonth: number;
    features: string[];
    gpuHoursIncluded: number;
    storageGbIncluded: number;
    isPopular?: boolean;
}

export interface UsageBreakdown {
    gpuHours: number;
    gpuCost: number;
    storageGb: number;
    storageCost: number;
    networkEgressGb: number;
    networkCost: number;
    serverlessInvocations: number;
    serverlessCost: number;
    totalCost: number;
}

// Credits Domain Models

export type TransactionType = 'top_up' | 'usage' | 'auto_recharge' | 'refund' | 'promotional';

export interface Transaction {
    id: string;
    type: TransactionType;
    description: string;
    amount: number; // positive = credit, negative = debit
    balanceAfter: number;
    createdAt: string;
}

export interface RechargeConfig {
    enabled: boolean;
    threshold: number;
    rechargeAmount: number;
    paymentMethodId: string;
}

// User / Auth Domain Models

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    timezone: string;
    createdAt: string;
}

export interface Session {
    token: string;
    userId: string;
    expiresAt: string;
}

export interface Workspace {
    id: string;
    name: string;
    slug: string;
    region: string;
    type: 'personal' | 'team' | 'enterprise';
    createdAt: string;
}

export interface TeamMember {
    id: string;
    userId: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
}

export interface ApiKey {
    id: string;
    name: string;
    keyPreview: string;
    createdAt: string;
    lastUsedAt: string | null;
    isActive: boolean;
}

// Monitoring Domain Models

export interface MetricPoint {
    timestamp: string;
    value: number;
}

export interface MetricSeries {
    label: string;
    data: MetricPoint[];
    color: string;
}

export interface MonitoringAlert {
    id: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    resource: string;
    timestamp: string;
    acknowledged: boolean;
}

// Log Domain Models

export type LogSeverity = 'debug' | 'info' | 'warning' | 'error';

export interface LogEntry {
    id: string;
    timestamp: string;
    severity: LogSeverity;
    source: string;
    sourceType: 'pod' | 'cluster' | 'endpoint';
    message: string;
}

// Networking Domain Models

export interface FirewallRule {
    id: string;
    name: string;
    protocol: 'TCP' | 'UDP' | 'ICMP';
    portRange: string;
    source: string;
    direction: 'inbound' | 'outbound';
}

// Shared Types

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
    status: AsyncStatus;
    data?: T;
    error?: string;
}

export interface MonthlySpend {
    month: string;
    amount: number;
}

export interface ActivityItem {
    id: string;
    action: string;
    resource: string;
    timestamp: string;
    icon: string;
}
