export function accessibleOnClick(handler: (newValue: React.MouseEvent<HTMLDivElement>) => void) {
    return {
        className: "modal",
        role: "button",
        onClick: handler
    }
}