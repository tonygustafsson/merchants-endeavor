<script>
    import { onMount } from 'svelte';

    const mapWidth = 914;
    const mapHeight = 771;
    const shipWidth = 48;
    const shipHeight = 48;
    const pixelsPerAnimation = 4;

    let santacatalina_marigo;
    let santacatalina_portofspain;
    let portofspain_marigo;
    let marigo_portofspain;
    let traveling = false;

    let shipDirection = 'left';
    let shipPosition = { x: 0, y: 0 };
    let routePosition = 0;
    let routePath;
    let routePathLength;
    let shipIcon;

    const travel = (from, to) => {
        traveling = true;

        if (from === 'santacatalina' && to === 'marigo') {
            routePath = santacatalina_marigo;
        } else if (from === 'santacatalina' && to === 'portofspain') {
            routePath = santacatalina_portofspain;
        } else if (from === 'portofspain' && to === 'marigo') {
            routePath = portofspain_marigo;
        } else if (from === 'marigo' && to === 'portofspain') {
            routePath = marigo_portofspain;
        }

        routePathLength = routePath.getTotalLength();

        const animate = () => {
            routePosition += pixelsPerAnimation;
            const shipPositionPoint = routePath.getPointAtLength(routePosition);
            const newDirection = shipPosition.x < shipPositionPoint.x - shipWidth / 2 ? 'right' : 'left';

            if (shipDirection !== newDirection) {
                shipDirection = newDirection;
                shipIcon.setAttribute('xlink:href', `/img/map/ship-${newDirection}.png`);
            }

            shipPosition = {
                x: shipPositionPoint.x - shipWidth / 2,
                y: shipPositionPoint.y - shipHeight
            };

            if (routePosition < routePathLength) {
                requestAnimationFrame(animate);
            } else {
                traveling = false;
                routePosition = 0;
            }
        };

        requestAnimationFrame(animate);
    };
</script>

<style>
    .map {
        width: 100%;
        max-width: 100%;
        padding-bottom: 2em;
    }
</style>

<div class="ship-map">
    <button disabled={traveling} on:click={() => travel('santacatalina', 'marigo')}>Santa Catalina to Marigo</button>
    <button disabled={traveling} on:click={() => travel('santacatalina', 'portofspain')}>
        Santa Catalina to Port of Spain
    </button>
    <button disabled={traveling} on:click={() => travel('portofspain', 'marigo')}>Port of Spain to Marigo</button>
    <button disabled={traveling} on:click={() => travel('marigo', 'portofspain')}>Port of Spain to Marigo</button>

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
            xlink:href="/img/map/ship-right.png"
            x={shipPosition.x}
            y={shipPosition.y}
            width={shipWidth}
            height={shipHeight} />
        <path
            bind:this={santacatalina_marigo}
            id="santacatalina-marigo"
            d="m 117.61017,575.79979 c 0,0 188.67666,-41.08891 271.98903,-82.46016 40.65385,-20.18789
            243.57759,-179.42535 292.29311,-215.31042 48.71552,-35.88507 168.33121,-77.11184 168.33121,-77.11184"
            style="fill:none;stroke:none" />
        <path
            bind:this={santacatalina_portofspain}
            id="santacataline-portofspain"
            d="m 117.61017,575.79979 c 0,0 177.44306,-16.24475 266.22161,-12.84221 100.41931,3.84868 203.95205,5.29378
            299.13376,37.53183 53.08149,17.9787 145.20607,84.75317 145.20607,84.75317"
            style="fill:none;stroke:none" />
        <path
            bind:this={portofspain_marigo}
            id="portofspain-marigo"
            d="m 828.17161,685.24258 c 0,0 -204.23497,-126.00498 -219.73708,-207.22568 -2.99002,-15.66573
            -27.1846,-52.69457 14.09245,-118.46499 13.16597,-20.97852 42.52811,-62.36231 88.08927,-95.0242
            57.53297,-41.24424 139.60727,-63.61034 139.60727,-63.61034"
            style="fill:none;stroke:none" />
        <path
            bind:this={marigo_portofspain}
            id="portofspain-marigo"
            d="m 850.22352,200.91737 c 0,0 -350.98597,205.9078 -262.20742,209.31034 100.41931,3.84868 -0.23227,158.02365
            94.94944,190.2617 53.08149,17.9787 145.20607,84.75317 145.20607,84.75317"
            style="fill:none;stroke:none" />
    </svg>
</div>
