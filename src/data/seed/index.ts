import {
    Gpu, Pod, Cluster, ClusterNode, ServerlessEndpoint, Node as NodeModel,
    Volume, TrainingJob, ContainerImage, Template, PaymentMethod, Invoice,
    InvoiceLineItem, Plan, Transaction, User, Workspace, TeamMember, ApiKey,
    MonitoringAlert, LogEntry, FirewallRule, MetricSeries, MetricPoint,
    UsageBreakdown, MonthlySpend, ActivityItem, RechargeConfig,
} from '@/domain/models';

// ─── GPU Catalogue ────────────────────────────────────────
export const seedGpus: Gpu[] = [
    { id: 'gpu-1', name: 'NVIDIA H100 SXM', manufacturer: 'NVIDIA', vram: 80, cudaCores: 16896, tensorCores: 528, memoryBandwidth: 3350, pricePerHour: 3.89, availability: 'available', region: 'US East', category: 'data_center', tdp: 700, architecture: 'Hopper' },
    { id: 'gpu-2', name: 'NVIDIA A100 80GB', manufacturer: 'NVIDIA', vram: 80, cudaCores: 6912, tensorCores: 432, memoryBandwidth: 2039, pricePerHour: 2.49, availability: 'available', region: 'US East', category: 'data_center', tdp: 400, architecture: 'Ampere' },
    { id: 'gpu-3', name: 'NVIDIA A100 40GB', manufacturer: 'NVIDIA', vram: 40, cudaCores: 6912, tensorCores: 432, memoryBandwidth: 1555, pricePerHour: 1.64, availability: 'limited', region: 'US West', category: 'data_center', tdp: 400, architecture: 'Ampere' },
    { id: 'gpu-4', name: 'NVIDIA L40S', manufacturer: 'NVIDIA', vram: 48, cudaCores: 18176, tensorCores: 568, memoryBandwidth: 864, pricePerHour: 1.14, availability: 'available', region: 'EU West', category: 'data_center', tdp: 350, architecture: 'Ada Lovelace' },
    { id: 'gpu-5', name: 'NVIDIA RTX 4090', manufacturer: 'NVIDIA', vram: 24, cudaCores: 16384, tensorCores: 512, memoryBandwidth: 1008, pricePerHour: 0.74, availability: 'available', region: 'US East', category: 'consumer', tdp: 450, architecture: 'Ada Lovelace' },
    { id: 'gpu-6', name: 'NVIDIA RTX 4080', manufacturer: 'NVIDIA', vram: 16, cudaCores: 9728, tensorCores: 304, memoryBandwidth: 717, pricePerHour: 0.54, availability: 'available', region: 'US West', category: 'consumer', tdp: 320, architecture: 'Ada Lovelace' },
    { id: 'gpu-7', name: 'NVIDIA RTX A6000', manufacturer: 'NVIDIA', vram: 48, cudaCores: 10752, tensorCores: 336, memoryBandwidth: 768, pricePerHour: 0.89, availability: 'limited', region: 'EU Central', category: 'professional', tdp: 300, architecture: 'Ampere' },
    { id: 'gpu-8', name: 'NVIDIA RTX 3090', manufacturer: 'NVIDIA', vram: 24, cudaCores: 10496, tensorCores: 328, memoryBandwidth: 936, pricePerHour: 0.44, availability: 'available', region: 'US East', category: 'consumer', tdp: 350, architecture: 'Ampere' },
    { id: 'gpu-9', name: 'NVIDIA H200', manufacturer: 'NVIDIA', vram: 141, cudaCores: 16896, tensorCores: 528, memoryBandwidth: 4800, pricePerHour: 5.49, availability: 'limited', region: 'US East', category: 'data_center', tdp: 700, architecture: 'Hopper' },
    { id: 'gpu-10', name: 'NVIDIA A10G', manufacturer: 'NVIDIA', vram: 24, cudaCores: 9216, tensorCores: 288, memoryBandwidth: 600, pricePerHour: 0.79, availability: 'available', region: 'Asia Pacific', category: 'data_center', tdp: 150, architecture: 'Ampere' },
];

// ─── Pods ──────────────────────────────────────────────────
export const seedPods: Pod[] = [
    { id: 'pod-1', name: 'llama-3-inference', status: 'running', config: { gpuType: 'gpu-1', gpuCount: 1, containerImage: 'runpod/pytorch:2.1-cuda12.1', ports: [8080, 8888], envVars: { MODEL: 'meta-llama/Llama-3-70B', QUANTIZE: '4bit' }, volumeIds: ['vol-1'], cpuLimit: 8, memoryLimit: 32 }, region: 'US East', createdAt: '2026-03-01T08:00:00Z', uptimeSeconds: 432000, costAccrued: 421.65, gpuName: 'NVIDIA H100 SXM' },
    { id: 'pod-2', name: 'stable-diffusion-xl', status: 'running', config: { gpuType: 'gpu-5', gpuCount: 1, containerImage: 'runpod/stable-diffusion:xl-1.0', ports: [7860], envVars: { MODEL: 'stabilityai/sdxl-turbo' }, volumeIds: [], cpuLimit: 4, memoryLimit: 16 }, region: 'US East', createdAt: '2026-03-03T14:30:00Z', uptimeSeconds: 172800, costAccrued: 35.52, gpuName: 'NVIDIA RTX 4090' },
    { id: 'pod-3', name: 'jupyter-research', status: 'stopped', config: { gpuType: 'gpu-2', gpuCount: 1, containerImage: 'jupyter/tensorflow-notebook:latest', ports: [8888], envVars: {}, volumeIds: ['vol-2'], cpuLimit: 4, memoryLimit: 16 }, region: 'US West', createdAt: '2026-02-15T10:00:00Z', uptimeSeconds: 0, costAccrued: 0, gpuName: 'NVIDIA A100 80GB' },
    { id: 'pod-4', name: 'whisper-api', status: 'running', config: { gpuType: 'gpu-5', gpuCount: 1, containerImage: 'openai/whisper:large-v3', ports: [8000], envVars: { MODEL_SIZE: 'large-v3' }, volumeIds: [], cpuLimit: 4, memoryLimit: 16 }, region: 'EU West', createdAt: '2026-03-04T09:15:00Z', uptimeSeconds: 86400, costAccrued: 17.76, gpuName: 'NVIDIA RTX 4090' },
    { id: 'pod-5', name: 'training-bert-v2', status: 'failed', config: { gpuType: 'gpu-2', gpuCount: 2, containerImage: 'huggingface/transformers:4.36', ports: [6006], envVars: { WANDB_PROJECT: 'bert-ft' }, volumeIds: ['vol-3'], cpuLimit: 16, memoryLimit: 64 }, region: 'US East', createdAt: '2026-03-02T22:00:00Z', uptimeSeconds: 7200, costAccrued: 9.96, gpuName: 'NVIDIA A100 80GB' },
    { id: 'pod-6', name: 'comfyui-workspace', status: 'creating', config: { gpuType: 'gpu-6', gpuCount: 1, containerImage: 'comfyanonymous/comfyui:latest', ports: [8188], envVars: {}, volumeIds: [], cpuLimit: 4, memoryLimit: 16 }, region: 'US East', createdAt: '2026-03-06T10:50:00Z', uptimeSeconds: 0, costAccrued: 0, gpuName: 'NVIDIA RTX 4080' },
];

// ─── Clusters ─────────────────────────────────────────────
const makeClusterNodes = (count: number, gpuName: string): ClusterNode[] =>
    Array.from({ length: count }, (_, i) => ({
        id: `node-c-${i + 1}`,
        status: (i === count - 1 && count > 2 ? 'degraded' : 'healthy') as ClusterNode['status'],
        gpuName,
        gpuUtilization: 40 + Math.random() * 55,
        cpuUtilization: 30 + Math.random() * 40,
        memoryUtilization: 50 + Math.random() * 30,
        lastHeartbeat: new Date(Date.now() - Math.random() * 60000).toISOString(),
    }));

export const seedClusters: Cluster[] = [
    { id: 'cls-1', name: 'prod-inference-cluster', status: 'active', nodes: makeClusterNodes(4, 'NVIDIA H100 SXM'), region: 'US East', gpuType: 'gpu-1', totalVram: 320, createdAt: '2026-02-20T08:00:00Z', scalingPolicy: 'auto' },
    { id: 'cls-2', name: 'dev-training-cluster', status: 'active', nodes: makeClusterNodes(2, 'NVIDIA A100 80GB'), region: 'US West', gpuType: 'gpu-2', totalVram: 160, createdAt: '2026-02-25T14:00:00Z', scalingPolicy: 'manual' },
    { id: 'cls-3', name: 'staging-cluster', status: 'creating', nodes: [], region: 'EU West', gpuType: 'gpu-4', totalVram: 0, createdAt: '2026-03-06T09:00:00Z', scalingPolicy: 'manual' },
];

// ─── Serverless Endpoints ─────────────────────────────────
export const seedEndpoints: ServerlessEndpoint[] = [
    { id: 'ep-1', name: 'llama-3-chat', status: 'active', gpuType: 'NVIDIA H100 SXM', containerImage: 'jemgola/llama3-server:latest', requestsPerMin: 245, avgLatencyMs: 120, coldStarts: 3, minWorkers: 2, maxWorkers: 8, activeWorkers: 4, createdAt: '2026-02-28T12:00:00Z' },
    { id: 'ep-2', name: 'image-gen-api', status: 'active', gpuType: 'NVIDIA RTX 4090', containerImage: 'jemgola/sdxl-api:v2', requestsPerMin: 89, avgLatencyMs: 340, coldStarts: 1, minWorkers: 1, maxWorkers: 4, activeWorkers: 2, createdAt: '2026-03-01T09:00:00Z' },
    { id: 'ep-3', name: 'whisper-transcribe', status: 'idle', gpuType: 'NVIDIA RTX 4090', containerImage: 'jemgola/whisper-api:v1', requestsPerMin: 0, avgLatencyMs: 0, coldStarts: 0, minWorkers: 0, maxWorkers: 3, activeWorkers: 0, createdAt: '2026-03-02T15:00:00Z' },
];

// ─── Storage Volumes ──────────────────────────────────────
export const seedVolumes: Volume[] = [
    { id: 'vol-1', name: 'llama-models', status: 'attached', sizeGb: 200, usedGb: 142, region: 'US East', attachedTo: 'pod-1', attachedPodName: 'llama-3-inference', filesystemType: 'ext4', createdAt: '2026-02-20T08:00:00Z' },
    { id: 'vol-2', name: 'research-data', status: 'available', sizeGb: 500, usedGb: 287, region: 'US West', attachedTo: null, attachedPodName: null, filesystemType: 'ext4', createdAt: '2026-02-15T10:00:00Z' },
    { id: 'vol-3', name: 'training-datasets', status: 'available', sizeGb: 1000, usedGb: 612, region: 'US East', attachedTo: null, attachedPodName: null, filesystemType: 'ext4', createdAt: '2026-01-10T12:00:00Z' },
    { id: 'vol-4', name: 'checkpoints', status: 'attached', sizeGb: 100, usedGb: 34, region: 'US East', attachedTo: 'pod-2', attachedPodName: 'stable-diffusion-xl', filesystemType: 'ext4', createdAt: '2026-03-01T08:00:00Z' },
];

// ─── Finetuning Jobs ──────────────────────────────────────
export const seedJobs: TrainingJob[] = [
    { id: 'job-1', name: 'llama3-customer-support', status: 'training', baseModel: 'meta-llama/Llama-3-8B', datasetName: 'support-tickets-v3', datasetRows: 45000, gpuType: 'NVIDIA A100 80GB', progress: 67, currentEpoch: 2, totalEpochs: 3, trainingLoss: 0.342, durationSeconds: 14400, estimatedTimeRemaining: 7200, costAccrued: 35.86, createdAt: '2026-03-05T20:00:00Z', checkpoints: [{ id: 'ckpt-1', epoch: 1, loss: 0.521, createdAt: '2026-03-06T00:00:00Z' }] },
    { id: 'job-2', name: 'mistral-code-gen', status: 'completed', baseModel: 'mistralai/Mistral-7B-v0.3', datasetName: 'code-instructions-50k', datasetRows: 50000, gpuType: 'NVIDIA A100 80GB', progress: 100, currentEpoch: 5, totalEpochs: 5, trainingLoss: 0.187, durationSeconds: 43200, estimatedTimeRemaining: 0, costAccrued: 107.58, createdAt: '2026-03-01T10:00:00Z', checkpoints: [{ id: 'ckpt-2', epoch: 3, loss: 0.298, createdAt: '2026-03-02T02:00:00Z' }, { id: 'ckpt-3', epoch: 5, loss: 0.187, createdAt: '2026-03-02T10:00:00Z' }] },
    { id: 'job-3', name: 'phi-3-qa-adapter', status: 'queued', baseModel: 'microsoft/Phi-3-mini-4k', datasetName: 'qa-pairs-20k', datasetRows: 20000, gpuType: 'NVIDIA RTX 4090', progress: 0, currentEpoch: 0, totalEpochs: 4, trainingLoss: 0, durationSeconds: 0, estimatedTimeRemaining: 0, costAccrued: 0, createdAt: '2026-03-06T09:00:00Z', checkpoints: [] },
];

// ─── Container Images ─────────────────────────────────────
export const seedContainers: ContainerImage[] = [
    { id: 'img-1', name: 'jemgola/llama3-server', tag: 'latest', sizeBytes: 8500000000, createdAt: '2026-03-01T12:00:00Z', pulls: 1240, layers: 12 },
    { id: 'img-2', name: 'jemgola/sdxl-api', tag: 'v2', sizeBytes: 12000000000, createdAt: '2026-02-28T09:00:00Z', pulls: 890, layers: 15 },
    { id: 'img-3', name: 'jemgola/whisper-api', tag: 'v1', sizeBytes: 4200000000, createdAt: '2026-02-25T16:00:00Z', pulls: 567, layers: 8 },
    { id: 'img-4', name: 'jemgola/embeddings-service', tag: 'v3', sizeBytes: 3100000000, createdAt: '2026-03-04T11:00:00Z', pulls: 234, layers: 7 },
];

// ─── Templates ────────────────────────────────────────────
export const seedTemplates: Template[] = [
    { id: 'tpl-1', name: 'PyTorch Training', description: 'Pre-configured PyTorch environment with CUDA support, Jupyter, and common ML libraries.', category: 'ml_training', gpuRecommendation: 'NVIDIA A100 80GB', containerImage: 'runpod/pytorch:2.1-cuda12.1', icon: 'Brain', envVars: { PYTORCH_CUDA_ALLOC_CONF: 'expandable_segments:True' } },
    { id: 'tpl-2', name: 'vLLM Inference', description: 'High-throughput LLM inference server using vLLM with OpenAI-compatible API.', category: 'inference', gpuRecommendation: 'NVIDIA H100 SXM', containerImage: 'vllm/vllm-openai:latest', icon: 'Zap', envVars: { MAX_MODEL_LEN: '4096' } },
    { id: 'tpl-3', name: 'ComfyUI', description: 'Node-based Stable Diffusion UI with custom workflow support.', category: 'inference', gpuRecommendation: 'NVIDIA RTX 4090', containerImage: 'comfyanonymous/comfyui:latest', icon: 'Image', envVars: {} },
    { id: 'tpl-4', name: 'Jupyter Lab', description: 'Full-featured Jupyter Lab environment with GPU acceleration and data science libraries.', category: 'development', gpuRecommendation: 'NVIDIA RTX 4090', containerImage: 'jupyter/tensorflow-notebook:latest', icon: 'Code', envVars: {} },
    { id: 'tpl-5', name: 'Web Scraper', description: 'Headless browser environment with Puppeteer and proxy support for large-scale scraping.', category: 'web_scraping', gpuRecommendation: 'NVIDIA RTX 4080', containerImage: 'scraphq/scraper:latest', icon: 'Globe', envVars: {} },
    { id: 'tpl-6', name: 'Text Generation WebUI', description: 'Feature-rich interface for running LLMs with multiple backend support.', category: 'inference', gpuRecommendation: 'NVIDIA RTX 4090', containerImage: 'oobabooga/text-generation-webui:latest', icon: 'MessageSquare', envVars: {} },
];

// ─── Billing ──────────────────────────────────────────────
export const seedPlans: Plan[] = [
    { id: 'plan-1', name: 'Community', pricePerMonth: 0, features: ['Pay-as-you-go GPU access', 'Community support', '1 concurrent pod', '50 GB storage', 'Basic monitoring'], gpuHoursIncluded: 0, storageGbIncluded: 50 },
    { id: 'plan-2', name: 'Pro', pricePerMonth: 29, features: ['Priority GPU access', 'Email support', '10 concurrent pods', '500 GB storage', 'Advanced monitoring', 'Team collaboration', 'Custom templates', 'API access'], gpuHoursIncluded: 50, storageGbIncluded: 500, isPopular: true },
    { id: 'plan-3', name: 'Enterprise', pricePerMonth: 199, features: ['Dedicated GPU pools', '24/7 priority support', 'Unlimited pods', '5 TB storage', 'Full monitoring suite', 'SSO & RBAC', 'Custom SLAs', 'Dedicated account manager', 'Volume discounts'], gpuHoursIncluded: 500, storageGbIncluded: 5000 },
];

export const seedPaymentMethods: PaymentMethod[] = [
    { id: 'pm-1', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2027, isDefault: true },
    { id: 'pm-2', brand: 'Mastercard', last4: '8888', expMonth: 6, expYear: 2028, isDefault: false },
];

export const seedInvoices: Invoice[] = [
    { id: 'inv-1', number: 'INV-2026-001', date: '2026-02-01T00:00:00Z', amount: 487.32, status: 'paid', lineItems: [{ description: 'GPU Hours - H100 SXM (124h)', quantity: 124, unitPrice: 3.89, total: 482.36 }, { description: 'Storage - 200 GB', quantity: 200, unitPrice: 0.02, total: 4.00 }, { description: 'Network Egress - 4.8 GB', quantity: 4.8, unitPrice: 0.20, total: 0.96 }], tax: 0, paymentMethodId: 'pm-1' },
    { id: 'inv-2', number: 'INV-2026-002', date: '2026-03-01T00:00:00Z', amount: 623.18, status: 'paid', lineItems: [{ description: 'GPU Hours - H100 SXM (96h)', quantity: 96, unitPrice: 3.89, total: 373.44 }, { description: 'GPU Hours - RTX 4090 (240h)', quantity: 240, unitPrice: 0.74, total: 177.60 }, { description: 'GPU Hours - A100 80GB (24h)', quantity: 24, unitPrice: 2.49, total: 59.76 }, { description: 'Storage - 700 GB', quantity: 700, unitPrice: 0.02, total: 14.00 }, { description: 'Serverless Invocations (43.8k)', quantity: 43800, unitPrice: 0.0001, total: 4.38 }], tax: 0, paymentMethodId: 'pm-1' },
    { id: 'inv-3', number: 'INV-2026-003', date: '2026-03-06T00:00:00Z', amount: 0, status: 'draft', lineItems: [], tax: 0, paymentMethodId: null },
];

export const seedTransactions: Transaction[] = [
    { id: 'tx-1', type: 'top_up', description: 'Manual top-up', amount: 500, balanceAfter: 500, createdAt: '2026-02-01T10:00:00Z' },
    { id: 'tx-2', type: 'usage', description: 'GPU compute - Feb 2026', amount: -487.32, balanceAfter: 12.68, createdAt: '2026-03-01T00:00:00Z' },
    { id: 'tx-3', type: 'auto_recharge', description: 'Auto-recharge triggered', amount: 100, balanceAfter: 112.68, createdAt: '2026-03-01T00:05:00Z' },
    { id: 'tx-4', type: 'top_up', description: 'Manual top-up', amount: 250, balanceAfter: 362.68, createdAt: '2026-03-03T14:00:00Z' },
    { id: 'tx-5', type: 'usage', description: 'GPU compute - current period', amount: -178.43, balanceAfter: 184.25, createdAt: '2026-03-06T10:00:00Z' },
    { id: 'tx-6', type: 'promotional', description: 'Welcome credit bonus', amount: 25, balanceAfter: 209.25, createdAt: '2026-03-06T10:05:00Z' },
];

// ─── User & Workspace ─────────────────────────────────────
export const seedUser: User = {
    id: 'user-1', name: 'Alex Chen', email: 'alex@jemgola.dev', avatarUrl: null, timezone: 'America/New_York', createdAt: '2026-01-15T08:00:00Z'
};

export const seedWorkspace: Workspace = {
    id: 'ws-1', name: 'Acme AI Labs', slug: 'acme-ai-labs', region: 'US East', type: 'team', createdAt: '2026-01-15T08:00:00Z'
};

export const seedTeamMembers: TeamMember[] = [
    { id: 'tm-1', userId: 'user-1', name: 'Alex Chen', email: 'alex@jemgola.dev', role: 'owner', joinedAt: '2026-01-15T08:00:00Z' },
    { id: 'tm-2', userId: 'user-2', name: 'Sarah Kim', email: 'sarah@acme.ai', role: 'admin', joinedAt: '2026-01-20T10:00:00Z' },
    { id: 'tm-3', userId: 'user-3', name: 'James Wright', email: 'james@acme.ai', role: 'member', joinedAt: '2026-02-05T14:00:00Z' },
];

export const seedApiKeys: ApiKey[] = [
    { id: 'key-1', name: 'Production API Key', keyPreview: 'jg_prod_...x8f2', createdAt: '2026-02-01T10:00:00Z', lastUsedAt: '2026-03-06T09:30:00Z', isActive: true },
    { id: 'key-2', name: 'Development Key', keyPreview: 'jg_dev_...k3m9', createdAt: '2026-02-15T12:00:00Z', lastUsedAt: '2026-03-05T18:00:00Z', isActive: true },
    { id: 'key-3', name: 'CI/CD Pipeline', keyPreview: 'jg_ci_...p7w1', createdAt: '2026-03-01T08:00:00Z', lastUsedAt: null, isActive: false },
];

// ─── Monitoring ───────────────────────────────────────────
function generateTimeSeries(hours: number, baseValue: number, variance: number): MetricPoint[] {
    const points: MetricPoint[] = [];
    const now = Date.now();
    for (let i = hours; i >= 0; i--) {
        points.push({
            timestamp: new Date(now - i * 3600000).toISOString(),
            value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance)),
        });
    }
    return points;
}

export const seedMetricSeries: MetricSeries[] = [
    { label: 'GPU Utilization', data: generateTimeSeries(24, 72, 30), color: '#7c3aed' },
    { label: 'CPU Usage', data: generateTimeSeries(24, 45, 20), color: '#3b82f6' },
    { label: 'Memory Usage', data: generateTimeSeries(24, 61, 15), color: '#06b6d4' },
    { label: 'Network I/O', data: generateTimeSeries(24, 30, 25), color: '#22c55e' },
];

export const seedAlerts: MonitoringAlert[] = [
    { id: 'alert-1', severity: 'warning', message: 'GPU memory usage above 90% on pod llama-3-inference', resource: 'pod-1', timestamp: '2026-03-06T09:45:00Z', acknowledged: false },
    { id: 'alert-2', severity: 'info', message: 'Auto-scaling triggered for cluster prod-inference-cluster', resource: 'cls-1', timestamp: '2026-03-06T08:30:00Z', acknowledged: true },
    { id: 'alert-3', severity: 'critical', message: 'Pod training-bert-v2 failed with OOM error', resource: 'pod-5', timestamp: '2026-03-02T23:30:00Z', acknowledged: true },
];

// ─── Logs ─────────────────────────────────────────────────
export const seedLogs: LogEntry[] = [
    { id: 'log-1', timestamp: '2026-03-06T10:55:00Z', severity: 'info', source: 'llama-3-inference', sourceType: 'pod', message: 'Server listening on port 8080' },
    { id: 'log-2', timestamp: '2026-03-06T10:54:30Z', severity: 'info', source: 'llama-3-inference', sourceType: 'pod', message: 'Model loaded successfully: meta-llama/Llama-3-70B (4bit quantized)' },
    { id: 'log-3', timestamp: '2026-03-06T10:54:00Z', severity: 'warning', source: 'llama-3-inference', sourceType: 'pod', message: 'GPU memory usage at 91.2% - consider upgrading to 80GB VRAM' },
    { id: 'log-4', timestamp: '2026-03-06T10:53:00Z', severity: 'info', source: 'stable-diffusion-xl', sourceType: 'pod', message: 'Processing batch: 4 images, resolution 1024x1024' },
    { id: 'log-5', timestamp: '2026-03-06T10:52:00Z', severity: 'error', source: 'training-bert-v2', sourceType: 'pod', message: 'CUDA out of memory. Tried to allocate 2.00 GiB. GPU 0 has a total capacity of 79.35 GiB' },
    { id: 'log-6', timestamp: '2026-03-06T10:51:00Z', severity: 'info', source: 'llama-3-chat', sourceType: 'endpoint', message: 'Scaling up: 4 → 6 workers (request queue depth: 12)' },
    { id: 'log-7', timestamp: '2026-03-06T10:50:00Z', severity: 'debug', source: 'prod-inference-cluster', sourceType: 'cluster', message: 'Health check passed for all nodes (4/4 healthy)' },
    { id: 'log-8', timestamp: '2026-03-06T10:49:00Z', severity: 'info', source: 'whisper-api', sourceType: 'pod', message: 'Transcription completed: 45.2s audio processed in 3.1s' },
    { id: 'log-9', timestamp: '2026-03-06T10:48:00Z', severity: 'warning', source: 'prod-inference-cluster', sourceType: 'cluster', message: 'Node node-c-4 reporting degraded status - elevated error rate' },
    { id: 'log-10', timestamp: '2026-03-06T10:47:00Z', severity: 'info', source: 'image-gen-api', sourceType: 'endpoint', message: 'Cold start completed in 4.2s for worker-3' },
];

// ─── Networking ───────────────────────────────────────────
export const seedFirewallRules: FirewallRule[] = [
    { id: 'fw-1', name: 'Allow HTTPS', protocol: 'TCP', portRange: '443', source: '0.0.0.0/0', direction: 'inbound' },
    { id: 'fw-2', name: 'Allow SSH', protocol: 'TCP', portRange: '22', source: '10.0.0.0/8', direction: 'inbound' },
    { id: 'fw-3', name: 'Allow API', protocol: 'TCP', portRange: '8080-8090', source: '0.0.0.0/0', direction: 'inbound' },
    { id: 'fw-4', name: 'Allow All Outbound', protocol: 'TCP', portRange: '1-65535', source: '0.0.0.0/0', direction: 'outbound' },
];

// ─── Dashboard Overview ───────────────────────────────────
export const seedUsageBreakdown: UsageBreakdown = {
    gpuHours: 284, gpuCost: 842.16, storageGb: 1800, storageCost: 36.00, networkEgressGb: 12.4, networkCost: 2.48, serverlessInvocations: 89200, serverlessCost: 8.92, totalCost: 889.56,
};

export const seedMonthlySpend: MonthlySpend[] = [
    { month: 'Oct 2025', amount: 312.45 },
    { month: 'Nov 2025', amount: 428.67 },
    { month: 'Dec 2025', amount: 389.12 },
    { month: 'Jan 2026', amount: 521.34 },
    { month: 'Feb 2026', amount: 487.32 },
    { month: 'Mar 2026', amount: 889.56 },
];

export const seedRecentActivity: ActivityItem[] = [
    { id: 'act-1', action: 'Pod created', resource: 'comfyui-workspace', timestamp: '2026-03-06T10:50:00Z', icon: 'Server' },
    { id: 'act-2', action: 'Training job started', resource: 'llama3-customer-support', timestamp: '2026-03-05T20:00:00Z', icon: 'Brain' },
    { id: 'act-3', action: 'Volume created', resource: 'checkpoints', timestamp: '2026-03-01T08:00:00Z', icon: 'Database' },
    { id: 'act-4', action: 'Endpoint deployed', resource: 'llama-3-chat', timestamp: '2026-02-28T12:00:00Z', icon: 'Zap' },
    { id: 'act-5', action: 'Cluster created', resource: 'dev-training-cluster', timestamp: '2026-02-25T14:00:00Z', icon: 'Network' },
];

export const seedRechargeConfig: RechargeConfig = {
    enabled: true, threshold: 10, rechargeAmount: 100, paymentMethodId: 'pm-1',
};

export const seedCreditBalance = 209.25;
