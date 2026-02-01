import { IterateIcon, EvaluateIcon, DeployIcon, MonitorIcon, AdalineLogo, PlayButtonIcon } from "../Icons/AllIcons";



interface PillarData {
    number: number;
    title: string;
    subtitle: string;
    links: { name: string; href: string; external?: boolean }[];
    Icon: React.FC;
}

export const pillars: PillarData[] = [
    {
        number: 1,
        title: "ITERATE",
        subtitle: "Sketch, test\nand refine",
        links: [
            { name: "Editor", href: "/editor" },
            { name: "Playground", href: "/playground" },
            { name: "Datasets", href: "/datasets" },
        ],
        Icon: IterateIcon,
    },
    {
        number: 2,
        title: "EVALUATE",
        subtitle: "Reflect\nand measure",
        links: [
            { name: "Evaluations", href: "/evaluations" },
            { name: "Datasets", href: "/datasets" },
        ],
        Icon: EvaluateIcon,
    },
    {
        number: 3,
        title: "DEPLOY",
        subtitle: "From draft\nto live",
        links: [
            { name: "Deployments", href: "/deployments" },
            { name: "Analytics", href: "/analytics" },
            { name: "Gateway", href: "/gateway", external: true },
        ],
        Icon: DeployIcon,
    },
    {
        number: 4,
        title: "MONITOR",
        subtitle: "Insights\nin real time",
        links: [
            { name: "Logs", href: "/logs" },
            { name: "Analytics", href: "/analytics" },
        ],
        Icon: MonitorIcon,
    },
];