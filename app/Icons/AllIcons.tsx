import Link from 'next/link';
import React from 'react'


export const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ArrowIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 9L9 1M9 1H3M9 1V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const IterateIcon = () => (
    <div className="group col-span-1 flex aspect-5/3 max-h-[calc(25vh-50px)] min-h-32 w-full transition-colors duration-300"
        style={{ opacity: 1 }}
    >
        <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
            {/* Item 1 - Second largest (50%) - Clockwise */}
            <div className="absolute top-[0%] left-[20%] flex aspect-square h-[50%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 iterate-rotate-cw"
                    style={{ "--r": "1052.37deg" } as React.CSSProperties}
                >
                    <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(-1589.24deg)" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="absolute inset-0"
                            strokeWidth={1}
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-1/6 iterate-rotate-cw"
                    style={{ "--r": "1052.37deg" } as React.CSSProperties}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 2 - Fourth (20%) - Clockwise */}
            <div className="absolute top-[5%] left-[75%] flex aspect-square h-[20%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 iterate-rotate-cw"
                    style={{ "--r": "1052.37deg" } as React.CSSProperties}
                >
                    <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(1589.24deg)" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="absolute inset-0"
                            strokeWidth={1}
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-1/6 iterate-rotate-cw"
                    style={{ "--r": "1052.37deg" } as React.CSSProperties}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 3 - Third (35%) - Anti-clockwise */}
            <div className="absolute top-[35%] left-[0%] flex aspect-square h-[35%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 iterate-rotate-ccw"
                    style={{ "--r": "1052.37deg" } as React.CSSProperties}
                >
                    <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(-1589.24deg)" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="absolute inset-0"
                            strokeWidth={1}
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 4 - Largest (65%) - Anti-clockwise */}
            <div className="absolute top-[35%] left-[25%] flex aspect-square h-[65%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 iterate-rotate-ccw"
                    style={{ "--r": "-1052.37deg" } as React.CSSProperties}
                >
                    <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(1589.24deg)" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="absolute inset-0"
                            strokeWidth={1}
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Label */}
        <div className="relative flex-1">
            <div className="absolute top-[36%] -left-6 flex -translate-y-1/2 items-center gap-2">
                <div className="atlas-web-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold text-[#2D3E2F] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    1
                </div>
                <div className="atlas-web-mono">Iterate</div>
            </div>
        </div>
    </div>
);

export const EvaluateIcon = () => (
    <div
        className="group col-span-1 flex aspect-5/3 max-h-[calc(25vh-50px)] min-h-32 w-full transition-colors duration-300"
        style={{ opacity: 1 }}
    >
        <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
            {/* Item 1 - Second largest (50%) - Anti-clockwise */}
            <div className="absolute top-[37%] left-[0%] flex aspect-square h-[50%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 evaluate-rotate-ccw"
                    style={{ "--r": "-959.484deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 2 - Largest (55%) - Clockwise */}
            <div className="absolute top-[0%] left-[20%] flex aspect-square h-[55%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 evaluate-rotate-cw"
                    style={{ "--r": "959.484deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 3 - Fourth (20%) - Anti-clockwise */}
            <div className="absolute top-[35%] left-[75%] flex aspect-square h-[20%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 evaluate-rotate-ccw"
                    style={{ "--r": "-1052.37deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 4 - Third (40%) - Clockwise */}
            <div className="absolute top-[60%] left-[35%] flex aspect-square h-[40%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 evaluate-rotate-cw"
                    style={{ "--r": "959.484deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Label */}
        <div className="relative flex-1">
            <div className="absolute top-[68%] -left-7 flex -translate-y-1/2 items-center gap-2">
                <div className="atlas-web-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold text-[#2D3E2F] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    2
                </div>
                <div className="atlas-web-mono">Evaluate</div>
            </div>
        </div>
    </div>
);

export const DeployIcon = () => (
    <div
        className="group col-span-1 flex aspect-5/3 max-h-[calc(25vh-50px)] min-h-32 w-full transition-colors duration-300"
        style={{ opacity: 1 }}
    >
        <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
            {/* Item 1 - Largest (60%) - Anti-clockwise */}
            <div className="absolute top-[40%] left-[0%] flex aspect-square h-[60%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 deploy-rotate-ccw"
                    style={{ "--r": "-1052.37deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 2 - Third (25%) - Clockwise */}
            <div className="absolute top-[0%] left-[45%] flex aspect-square h-[25%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 deploy-rotate-cw"
                    style={{ "--r": "1202.1deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 3 - Second largest (40%) - Anti-clockwise */}
            <div className="absolute top-[25%] left-[60%] flex aspect-square h-[40%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 deploy-rotate-ccw"
                    style={{ "--r": "-1202.1deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 4 - Fourth (20%) - Anti-clockwise */}
            <div className="absolute top-[75%] left-[65%] flex aspect-square h-[20%] shrink-0 items-center justify-center">
                <div
                    className="absolute -inset-1/6 deploy-rotate-ccw"
                    style={{ "--r": "-1202.1deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Label */}
        <div className="relative flex-1">
            <div className="absolute top-[9%] -left-7 flex -translate-y-1/2 items-center gap-2">
                <div className="atlas-web-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold text-[#2D3E2F] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    3
                </div>
                <div className="atlas-web-mono">Deploy</div>
            </div>
        </div>
    </div>
);

export const MonitorIcon = () => (
    <div
        className="group col-span-1 flex aspect-5/3 max-h-[calc(25vh-50px)] min-h-32 w-full transition-colors duration-300"
        style={{ opacity: 1 }}
    >
        <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
            {/* Item 1 - Largest (65%) - Clockwise */}
            <div className="absolute top-[0%] left-[0%] flex aspect-square h-[65%] shrink-0 items-center justify-center">
                {/* Inner solid circle - static */}
                <div className="absolute -inset-1/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                {/* Outer dashed circle - rotating */}
                <div
                    className="absolute -inset-1/6 monitor-rotate-cw"
                    style={{ "--r": "50870.3deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 2 - Smallest (25%) - Anti-clockwise */}
            <div className="absolute top-[0%] left-[70%] flex aspect-square h-[25%] shrink-0 items-center justify-center">
                {/* Inner solid circle - static */}
                <div className="absolute -inset-1/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                {/* Outer dashed circle - rotating */}
                <div
                    className="absolute -inset-1/6 monitor-rotate-ccw"
                    style={{ "--r": "-50870.3deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 3 - Third (28%) - Anti-clockwise */}
            <div className="absolute top-[72%] left-[10%] flex aspect-square h-[28%] shrink-0 items-center justify-center">
                {/* Inner solid circle - static */}
                <div className="absolute -inset-1/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                {/* Outer dashed circle - rotating */}
                <div
                    className="absolute -inset-1/6 monitor-rotate-ccw"
                    style={{ "--r": "-50870.3deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>

            {/* Item 4 - Second largest (45%) - Anti-clockwise */}
            <div className="absolute top-[55%] left-[55%] flex aspect-square h-[45%] shrink-0 items-center justify-center">
                {/* Inner solid circle - static */}
                <div className="absolute -inset-1/6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                {/* Outer dashed circle - rotating */}
                <div
                    className="absolute -inset-1/6 monitor-rotate-ccw"
                    style={{ "--r": "-50870.3deg" } as React.CSSProperties}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="24"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="5 3"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="absolute -inset-[calc(5%+12px)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                        strokeWidth={1}
                    >
                        <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Label */}
        <div className="relative flex-1">
            <div className="absolute top-[40%] -left-8 flex -translate-y-1/2 items-center gap-2">
                <div className="atlas-web-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[12px] font-bold text-[#2D3E2F] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    4
                </div>
                <div className="atlas-web-mono">Monitor</div>
            </div>
        </div>
    </div>
);

export const AdalineLogo = () => (
    <Link
        href="/"
        className="flex-none overflow-hidden"
        aria-label="Adaline Homepage"
        style={{ width: "auto", fontFamily: "var(--font-fragment-mono)" }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 84 15"
            className="text-[#262827] h-[20px]"
        >
            <path d="M9.15.003.451 12.124v1.733h1.74l8.698-6.928V.003zM10.89 11.777H8.801v2.078h2.087zM39.034.67v5.113h-.036C38.52 5.034 37.472 4.5 36.301 4.5c-2.413 0-4.099 1.906-4.099 4.81 0 2.601 1.562 4.775 4.135 4.775 1.029 0 2.218-.517 2.697-1.425h.035l.089 1.193h1.349V.67zM36.46 12.73c-1.739 0-2.715-1.497-2.715-3.439 0-1.977.976-3.474 2.715-3.474 1.757 0 2.59 1.515 2.59 3.474 0 1.925-.887 3.439-2.59 3.439m13.396-.196V7.742c0-.516-.088-1.015-.283-1.443-.409-.98-1.491-1.8-3.248-1.8-1.916 0-3.584 1.052-3.655 2.887h1.473c.089-1.122 1.1-1.639 2.182-1.639 1.225 0 2.023.606 2.023 1.853v.66l-2.821.195c-2.395.16-3.265 1.568-3.265 2.94 0 1.265.976 2.69 3.159 2.69 1.348 0 2.43-.588 2.98-1.497h.036l.16 1.265h2.218v-1.318zm-1.508-2.53c0 1.586-1.082 2.762-2.697 2.762-1.295 0-1.828-.73-1.828-1.515 0-1.122.994-1.568 1.988-1.639l2.537-.178zM70.263 4.5c-1.1 0-2.414.57-2.857 1.621h-.036l-.106-1.39h-1.33v9.122h1.525v-4.24c0-.766.035-1.657.337-2.334.408-.82 1.189-1.39 2.094-1.39C71.31 5.89 72 6.78 72 8.189v5.665h1.509V7.974c0-2.174-1.225-3.474-3.248-3.474m13.236 5.22c0-.018.036-.25.036-.57 0-2.459-1.384-4.65-4.117-4.65-2.715 0-4.258 2.298-4.258 4.828 0 2.298 1.366 4.757 4.223 4.757 2.058 0 3.637-1.23 3.921-2.975h-1.526c-.302 1.104-1.136 1.621-2.342 1.621-1.721 0-2.715-1.514-2.715-2.922V9.72zM79.4 5.8c1.668 0 2.467 1.283 2.502 2.637h-5.128C76.81 7.101 77.857 5.8 79.4 5.8m-23.74 6.735V.669h-3.301v1.265h1.74v10.601h-1.882v1.318h5.359v-1.318zm6.813 0V4.732h-3.282V6.05h1.72v6.485H58.96v1.318h5.483v-1.318zM64.407.669h-1.934v1.907h1.934zM26.134 8.847l.107-.16h2.714V3.128L21.361 13.89h-1.916v-.036L28.885.67h1.738v13.22h-1.668V9.987h-2.82z"></path>
        </svg>
    </Link>
);

export const PlayButtonIcon = () => (
    <div className="relative w-5 h-5 flex items-center justify-center">
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="10"
                cy="10"
                r="9.5"
                stroke="#262827"
                strokeWidth="1"
                fill="white"
            />
            <path d="M8 6L14 10L8 14V6Z" fill="#262827" />
        </svg>
    </div>
);
