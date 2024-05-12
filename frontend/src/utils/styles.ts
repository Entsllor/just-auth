export function cn(...args: any[]): string {
    return args.filter(arg => typeof arg === "string").join(" ")
}
