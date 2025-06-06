
interface YouTubeParams {
    videoId: string
    autoplay?: boolean
    mute?: boolean
    loop?: boolean
    start?: number | null
    end?: number | null
}

export function buildEmbedUrl(params: YouTubeParams): string {
    const { videoId, autoplay, mute, loop, start, end } = params

    let url = `https://www.youtube.com/embed/${videoId}?`
    const queryParams: string[] = []

    if (autoplay) queryParams.push('autoplay=1')
    if (mute) queryParams.push('mute=1')
    if (loop) queryParams.push(`loop=1&playlist=${videoId}`)
    if (start !== null && start !== undefined) queryParams.push(`start=${start}`)
    if (end !== null && end !== undefined) queryParams.push(`end=${end}`)

    return url + queryParams.join('&')
}

export function getContainerStyle(
    borderRadius: string | number,
    responsive: boolean
): Record<string, string> {
    const baseStyle = {
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        overflow: 'hidden'
    }

    if (responsive) {
        return {
            ...baseStyle,
            position: 'relative',
            paddingBottom: '56.25%',
            height: '0'
        }
    }
    return baseStyle
}
