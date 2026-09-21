import { Milestone, VerticalTab } from "@/types";
import { Activity, GitPullRequest, Rocket, ShieldCheck } from "lucide-react";

export const DEFAULT_MILESTONES: Milestone[] = [
  { date: "Q1 2025", title: "Foundation", description: "Architecture, design system, and tooling." },
  { date: "Q2 2025", title: "Prototype", description: "First product flow and user validation." },
  { date: "Q3 2025", title: "Alpha", description: "Internal rollout with analytics and feedback loops." },
  { date: "Q1 2026", title: "Beta", description: "Expanded onboarding and production readiness." },
];

export const DEMO_TABS: VerticalTab[] = [
  {
    id: "deploy",
    label: "Deployments",
    hint: "Push to production",
    icon: Rocket,
    eyebrow: "Ship",
    title: "Deploy every push in seconds",
    body: "Every commit builds, previews, and promotes on its own. Instant rollbacks keep production one click from a known good release.",
    points: [
      "Immutable preview URL for every pull request",
      "Atomic promotions with zero downtime",
      "One-click rollback to any prior build",
    ],
    metric: { value: "12s", label: "median build to live" },
  },
  {
    id: "observe",
    label: "Observability",
    hint: "Traces, logs, metrics",
    icon: Activity,
    eyebrow: "Watch",
    title: "See every request as it happens",
    body: "Traces, logs, and metrics stream into one timeline. Filter by route, region, or release to catch the slow path before users feel it.",
    points: [
      "Distributed traces across all services",
      "Live tail with structured log search",
      "Alerts wired to Slack and PagerDuty",
    ],
    metric: { value: "1.4M", label: "spans indexed per minute" },
  },
  {
    id: "access",
    label: "Access Control",
    hint: "Roles and audit",
    icon: ShieldCheck,
    eyebrow: "Secure",
    title: "Least-privilege access by default",
    body: "Scoped tokens, SSO, and per-environment roles keep production locked down. Every action lands in an immutable audit log you can export.",
    points: [
      "SAML and SCIM for your identity provider",
      "Fine-grained roles per project and environment",
      "Signed audit trail retained for 90 days",
    ],
    metric: { value: "SOC 2", label: "Type II certified" },
  },
  {
    id: "collab",
    label: "Collaboration",
    hint: "Review in the flow",
    icon: GitPullRequest,
    eyebrow: "Together",
    title: "Review changes without leaving the PR",
    body: "Preview links, inline comments, and deploy status land on the pull request. Required approvals gate promotion so nothing ships unseen.",
    points: [
      "Deploy status checks on every pull request",
      "Comment threads pinned to a live preview",
      "Required approvals before promote",
    ],
    metric: { value: "3x", label: "faster review cycles" },
  },
];