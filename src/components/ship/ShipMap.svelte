<script>
    import { onMount } from 'svelte';

    const mapWidth = 914;
    const mapHeight = 771;
    const shipWidth = 48;
    const shipHeight = 48;
    const pixelsPerAnimation = 1;

    let shipPosition = { x: 0, y: 0 };
    let routePosition = 0;
    let routePath;
    let routePathLength;
    let shipIcon;

    onMount(() => {
        routePathLength = routePath.getTotalLength();

        const animate = () => {
            routePosition += pixelsPerAnimation;
            const shipPositionPoint = routePath.getPointAtLength(routePosition);

            shipPosition = {
                x: shipPositionPoint.x - shipWidth / 2,
                y: shipPositionPoint.y - shipHeight
            };

            if (routePosition < routePathLength) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    });
</script>

<style>
    .map {
        width: 100%;
        max-width: 100%;
        padding-bottom: 2em;
    }
</style>

<div class="ship-map">
    <svg
        class="map"
        viewBox="0 0 {mapWidth}
        {mapHeight}"
        width={mapWidth}
        height={mapHeight}
        preserveAspectRatio="none">
        <image xlink:href="/img/map/background.jpg" cx="0" cy="0" />
        <image
            bind:this={shipIcon}
            xlink:href="/img/map/ship.png"
            x={shipPosition.x}
            y={shipPosition.y}
            width={shipWidth}
            height={shipHeight} />
        <path
            bind:this={routePath}
            d="m 215.38464,73.673322 c 0,0 186.272,144.289158 218.31469,223.246548 13.0901,32.25572 -33.78089,171.35124
            -31.47016,199.37418 3.85447,46.74441 225.09076,116.62449 230.99397,135.17048"
            id="path1"
            style="fill:none;stroke:none" />
    </svg>
</div>
