<script>
    import { onMount } from 'svelte';
    import { towns } from '../../constants/game';

    const mapWidth = 1249;
    const mapHeight = 949;
    const shipWidth = 48;
    const shipHeight = 48;
    const pixelsPerAnimation = 4;

    const routePaths = {
        charlestown_bridgetown:
            'm 1004.8856,362.1155 c 0,0 -12.05335,172.60364 29.0602,243.10195 25.7185,44.09996 123.4052,90.70489 123.4052,90.70489',
        charlestown_bermuda:
            'm 1004.8856,362.1155 c 0,0 0,0 3.5307,-96.47393 2.821,-77.08159 126.989,-193.441345 126.989,-193.441345',
        bermuda_charlestown:
            'm 1135.4053,72.200225 c 0,0 -103.6062,116.053475 -126.9887,187.959445 -10.516,32.3388 -3.531,101.95583 -3.531,101.95583',
        bridgetown_charlestown:
            'm 1157.351,695.92234 c 0,0 -13.5248,-83.56164 -32.5131,-120.62323 -29.3659,-57.31656 -101.4462,-88.76255 -122.0352,-149.78415 -6.75992,-20.03487 2.0829,-63.39946 2.0829,-63.39946'
    };

    let currentTown = towns[0];

    let traveling = false;

    let shipDirection = 'left';
    let shipPosition = { x: 0, y: 0 };
    let routePosition = 0;
    let routePathLength = 0;
    let shipIcon;

    const travel = (from, to) => {
        if (!towns.includes(from) || !towns.includes(to)) return;

        let routePath = routePaths[`${from}_${to}`];

        if (!routePath) return;

        traveling = true;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', routePath);
        routePathLength = path.getTotalLength();

        const animate = () => {
            routePosition += pixelsPerAnimation;
            const shipPositionPoint = path.getPointAtLength(routePosition);
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
    <p>You are in: {currentTown}</p>

    {#each towns as fromTown}
        {#each towns as toTown}
            {#if `${fromTown}_${toTown}` in routePaths}
                <button disabled={traveling} on:click={() => travel(fromTown, toTown)}>{fromTown} to {toTown}</button>
            {/if}
        {/each}
    {/each}

    <svg class="map" viewBox="0 0 {mapWidth} {mapHeight}" width={mapWidth} preserveAspectRatio="none">
        <image xlink:href="/img/map/background.jpg" cx="0" cy="0" />
        <image
            bind:this={shipIcon}
            xlink:href="/img/map/ship-right.png"
            x={shipPosition.x}
            y={shipPosition.y}
            width={shipWidth}
            height={shipHeight} />
    </svg>
</div>
