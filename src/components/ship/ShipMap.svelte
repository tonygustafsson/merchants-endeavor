<script>
    import { onMount } from 'svelte';
    import { ships } from '../../stores/ships';

    export let ship;

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
        charlestown_fortdefrance:
            'm 1003.286,361.90678 c 0,0 -134.31661,41.95536 -153.35798,101.96552 -8.32246,26.22878 -12.09797,112.26973 4.39774,146.50053 10.89694,22.6126 18.75194,42.56649 31.65365,45.8674 12.25263,3.13485 29.8458,-9.83451 29.8458,-9.83451',
        charlestown_tortuga:
            'm 1005.2966,365.92797 c 0,0 39.2097,-73.48669 -10.45781,-132.60915 C 945.17131,174.19636 698.68114,109.57733 698.68114,109.57733',
        charlestown_portauprince:
            'm 1007.3072,366.93326 c 0,0 -442.32054,21.62748 -496.82665,-87.96261 -54.50611,-109.59008 -52.05707,-100.897 -6.1072,-117.28481 45.94987,-16.38781 131.9794,50.43174 131.9794,50.43174',
        charlestown_havana:
            'm 1006.3019,365.92797 c 0,0 -626.9497,10.49568 -740.42825,-114.21707 C 152.39509,126.99815 114.98521,106.35157 151.15681,69.015381 c 19.51765,-20.146039 84.0826,3.365974 84.0826,3.365974',
        charlestown_santiago:
            'm 1007.3072,364.92267 c 0,0 -589.113,7.50483 -611.50333,-116.45829 -22.39033,-123.96311 22.39952,-122.8023 22.39952,-122.8023',
        charlestown_sanjuan:
            'm 1006.3019,364.92267 c 0,0 -33.10652,-4.39931 -34.21937,-27.23906 -1.22685,-25.17941 28.85257,-69.52312 12.80564,-81.27649 -30.6028,-22.41462 -61.02058,6.98059 -61.02058,6.98059',
        charlestown_villemstad:
            'm 1006.3019,366.93326 c 0,0 -24.23577,10.13022 -21.9715,36.84283 6.28312,74.12493 41.4939,228.78678 20.4597,287.05288 -28.61421,79.26363 -71.38806,141.58944 -115.42319,140.35941 -44.03512,-1.23004 -42.90716,-45.04643 -42.90716,-45.04643',
        charlestown_marigo:
            'm 1007.3072,365.92797 c 0,0 -39.12521,5.01273 -42.22246,-13.06886 -12.40808,-72.43789 180.95336,-102.54025 180.95336,-102.54025',
        charlestown_cartagena:
            'm 1004.2913,364.92267 c 0,0 -99.37126,9.48834 -179.66293,71.67406 -80.29166,62.18572 -220.55885,257.77084 -245.83447,335.47922 -25.27561,77.70838 0.25695,74.3838 0.25695,74.3838',
        bermuda_charlestown:
            'm 1135.4053,72.200225 c 0,0 -103.6062,116.053475 -126.9887,187.959445 -10.516,32.3388 -3.531,101.95583 -3.531,101.95583',
        bridgetown_charlestown:
            'm 1157.351,695.92234 c 0,0 -13.5248,-83.56164 -32.5131,-120.62323 -29.3659,-57.31656 -101.4462,-88.76255 -122.0352,-149.78415 -6.75992,-20.03487 2.0829,-63.39946 2.0829,-63.39946'
    };

    const towns = [
        'charlestown',
        'bridgetown',
        'bermuda',
        'fortdefrance',
        'tortuga',
        'portauprince',
        'havana',
        'santiago',
        'sanjuan',
        'villemstad',
        'marigo',
        'cartagena'
    ];

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
                ships.changeTown(ship.id, to);
                routePosition = 0;
            }
        };

        requestAnimationFrame(animate);
    };

    onMount(() => {
        const matchingInitPath = Object.keys(routePaths).find(routeName => {
            return routeName.startsWith(ship.town);
        });

        if (!matchingInitPath) return;

        const initPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        initPath.setAttributeNS(null, 'd', routePaths[matchingInitPath]);
        const shipPositionPoint = initPath.getPointAtLength(0);

        shipPosition = {
            x: shipPositionPoint.x - shipWidth / 2,
            y: shipPositionPoint.y - shipHeight
        };
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
    <p>Current town: {ship.town}</p>

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
