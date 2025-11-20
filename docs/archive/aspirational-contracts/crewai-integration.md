---
purpose: "Technical specification for AI Founders Core Service (CrewAI)"
status: "active"
last_reviewed: "2025-11-20"
---

# AI Founders Core Service Specification

The AI Founders Team (CrewAI) is the central intelligence of StartupAI, orchestrating market analysis, idea validation, and strategic recommendations across both marketing and product interfaces.

## Core Service Architecture

```
                AI Founders Core
                (startupai-crew)
                      |
        ┌─────────────┼─────────────┐
        |             |             |
   [Analysis]    [Activity]    [Results]
        |             |             |
   Product API   Marketing API   Webhook
```

| Component | Location | Purpose |
| --- | --- | --- |
| Core Service | `startupai-crew` repository | Python CrewAI orchestration with 5 AI agents |
| Agent Definitions | `startupai-crew/src/agents/` | Sage, Forge, Pulse, Compass, Guardian implementations |
| API Gateway | `startupai-crew/api/` | RESTful endpoints for both marketing and product |
| Activity Feed | `startupai-crew/src/activity/` | Real-time agent status for transparency |
| Analysis Engine | `startupai-crew/src/analysis/` | Market validation and strategy generation |

## The AI Founders Team

### Primary Agents

1. **Sage (CEO Agent)**
   - Role: Strategic vision and market positioning
   - Tools: Market research APIs, competitive analysis, trend detection
   - Outputs: Strategic recommendations, positioning statements, vision documents

2. **Forge (CTO Agent)**
   - Role: Technical architecture and feasibility assessment
   - Tools: Tech stack analyzer, complexity estimator, architecture patterns
   - Outputs: Technical roadmap, architecture diagrams, feasibility reports

3. **Pulse (CMO Agent)**
   - Role: Market analysis and go-to-market strategy
   - Tools: Market sizing, customer segmentation, channel analysis
   - Outputs: Marketing strategy, customer personas, GTM playbook

4. **Compass (COO Agent)**
   - Role: Operations planning and resource optimization
   - Tools: Process mapping, resource calculator, milestone planner
   - Outputs: Operational plan, resource allocation, timeline

5. **Guardian (Chief of Staff Agent)**
   - Role: Quality assurance and meta-governance
   - Tools: Consistency checker, completeness validator, risk assessor
   - Outputs: Quality reports, risk assessments, improvement recommendations

### Agent Collaboration Patterns

```python
# Example orchestration flow
class AIFoundersOrchestrator:
    def analyze_startup(self, project_data):
        # Stage 1: Market Understanding (Pulse leads)
        market_analysis = self.pulse.analyze_market(project_data)

        # Stage 2: Technical Feasibility (Forge leads)
        tech_assessment = self.forge.assess_feasibility(
            project_data,
            market_analysis
        )

        # Stage 3: Strategic Synthesis (Sage leads)
        strategy = self.sage.formulate_strategy(
            market_analysis,
            tech_assessment
        )

        # Stage 4: Operational Planning (Compass leads)
        operations = self.compass.plan_execution(
            strategy,
            tech_assessment
        )

        # Stage 5: Quality Assurance (Guardian reviews all)
        final_report = self.guardian.validate_and_enhance(
            market_analysis,
            tech_assessment,
            strategy,
            operations
        )

        return final_report
```

## Service APIs

### Public APIs (Marketing Interface)

```yaml
# Activity Feed - No auth required
GET /api/v1/public/activity
Response:
  agents:
    - name: string
      status: analyzing|idle|reporting
      currentTask: string
      progress: 0-100
  totalAnalyses: number
  successRate: percentage

# Trust Metrics - No auth required
GET /api/v1/public/metrics
Response:
  validationsCompleted: number
  marketsAnalyzed: number
  averageCompletionTime: seconds
  agentUptime: percentage
```

### Private APIs (Product Interface)

```yaml
# Start Analysis - Requires service auth
POST /api/v1/analysis/start
Headers:
  X-Service-Token: jwt_token
Body:
  userId: uuid
  planTier: trial|sprint|founder|enterprise
  projectData: object
Response:
  analysisId: uuid
  estimatedCompletion: timestamp
  assignedAgents: array

# Get Results - Requires service auth
GET /api/v1/analysis/{analysisId}/results
Headers:
  X-Service-Token: jwt_token
Response:
  status: pending|processing|complete
  results:
    sage: object      # Strategic recommendations
    forge: object     # Technical assessment
    pulse: object     # Market analysis
    compass: object   # Operational plan
    guardian: object  # Quality report
```

## Deployment Architecture

### Production Infrastructure

```yaml
Service: startupai-crew
Platform: [Railway/Render/AWS Lambda]
Runtime: Python 3.11+
Framework: CrewAI 0.x + LangChain
LLM: GPT-4 (primary) + Claude (fallback)

Components:
  - API Gateway (FastAPI)
  - Task Queue (Celery + Redis)
  - Agent Orchestrator (CrewAI)
  - Activity Publisher (WebSockets)
  - Result Storage (PostgreSQL)
```

### Scaling Strategy

- **Horizontal**: Multiple worker nodes for parallel analysis
- **Vertical**: GPU instances for enhanced LLM processing
- **Queue-based**: Async processing with priority queues by plan tier
- **Caching**: Results cached for similar analysis requests

## Data Flow Specifications

### Analysis Lifecycle

```
1. Request Initiation
   Product → POST /api/v1/analysis/start → CrewAI Core

2. Agent Orchestration
   CrewAI Core → Assign to agent pool → Begin analysis

3. Progress Updates
   CrewAI Core → WebSocket → Marketing (public status)
   CrewAI Core → Webhook → Product (detailed progress)

4. Result Delivery
   CrewAI Core → Store results → Notify Product
   Product → GET /api/v1/analysis/results → Display
```

### Real-time Transparency

```
Every 5 seconds:
  CrewAI Core → Publish agent status → Redis PubSub
  Marketing Site → Subscribe to updates → Update UI

On significant events:
  CrewAI Core → Emit event → PostHog Analytics
  Marketing Site → Display achievement → Trust signals
```

## Security & Compliance

### Data Protection

- **PII Handling**: All customer data sanitized before LLM processing
- **Data Retention**: Analysis results retained per plan tier (30-365 days)
- **Encryption**: TLS 1.3 for transit, AES-256 for storage
- **Access Control**: Service-to-service auth via JWT tokens

### Rate Limiting

| Plan Tier | Analyses/Month | Concurrent | Priority |
| --- | --- | --- | --- |
| Trial | 1 | 1 | Low |
| Sprint | 5 | 2 | Medium |
| Founder | Unlimited | 5 | High |
| Enterprise | Unlimited | 10+ | Highest |

## Monitoring & Observability

### Key Metrics

- **Agent Performance**: Tasks completed, average duration, error rates
- **System Health**: API latency, queue depth, worker utilization
- **Business Metrics**: Analyses completed, customer satisfaction scores
- **Cost Tracking**: LLM token usage, compute hours

### Alerting Thresholds

```yaml
Critical:
  - API response time > 5s
  - Agent error rate > 5%
  - Queue depth > 100 items

Warning:
  - API response time > 2s
  - Agent error rate > 2%
  - Queue depth > 50 items
```

## Evolution Roadmap

### Phase 1: Foundation (Current)
- ✅ 5 AI Founders agents defined
- ✅ Basic orchestration working
- 🔄 API endpoints implemented
- 🔄 Marketing transparency integration

### Phase 2: Enhancement (Q1 2025)
- [ ] Advanced agent collaboration
- [ ] Custom analysis templates
- [ ] White-label agent teams
- [ ] Knowledge base integration

### Phase 3: Scale (Q2 2025)
- [ ] Multi-tenant architecture
- [ ] Agent marketplace
- [ ] Custom agent creation
- [ ] Enterprise workflows

## Migration Notes

**From Integration to Core Service:**

The CrewAI system has evolved from a backend integration to the core service of StartupAI. Key changes:

1. **Positioning**: No longer "CrewAI integration" but "AI Founders Core Service"
2. **Architecture**: Hub-and-spoke with CrewAI at center, not peripheral
3. **Agents**: Elevated from tools to C-suite AI Founders Team
4. **Visibility**: Public transparency through marketing interface
5. **Priority**: Core differentiator, not future enhancement

All documentation should reflect CrewAI as the heart of StartupAI, with the two web interfaces serving as windows into the AI team's work.