<script>
    import { onMount } from 'svelte';
    import { towns } from '../../constants/game';
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
            'm 1157.351,695.92234 c 0,0 -13.5248,-83.56164 -32.5131,-120.62323 -29.3659,-57.31656 -101.4462,-88.76255 -122.0352,-149.78415 -6.75992,-20.03487 2.0829,-63.39946 2.0829,-63.39946',
        bridgetown_bermuda:
            'm 1157.0964,699.68644 c 0,0 -71.5079,-165.12353 -82.524,-250.4167 -17.9034,-138.61817 61.4128,-380.909567 61.4128,-380.909567',
        bridgetown_fortdefrance:
            'm 1157.0964,696.67055 c 0,0 -253.97675,71.28575 -282.58964,-18.6756 -6.03085,-18.96151 46.34493,-37.62101 46.34493,-37.62101',
        bridgetown_tortuga:
            'm 1156.0911,697.67585 c 0,0 -56.4764,-137.35957 -95.9859,-201.28208 C 1024.721,439.14558 873.79641,353.25329 812.42557,291.39127 775.16467,253.83216 829.57455,200.27108 810.17064,172.57657 773.49563,120.23164 682.5964,108.57204 682.5964,108.57204',
        bridgetown_portauprince:
            'm 1158.1017,702.70233 c 0,0 -264.64073,-110.00959 -363.0099,-209.12956 C 758.852,457.05636 526.89169,256.47913 497.19467,197.75108 c -32.30946,-63.89437 139.15808,15.3718 139.15808,15.3718',
        bridgetown_havana:
            'm 1157.0964,697.67585 c 0,0 -280.06333,-111.23146 -405.86862,-192.40871 C 640.54058,433.84501 277.84986,237.99016 166.40822,136.42744 87.804458,64.791629 237.25,69.36547 237.25,69.36547',
        bridgetown_santiago:
            'm 1157.0964,699.68644 c 0,0 -286.06851,-113.84859 -406.76909,-206.28222 C 668.45187,430.70324 458.99787,285.57237 388.8496,198.40085 346.79651,146.1425 419.20868,125.66208 419.20868,125.66208',
        bridgetown_sanjuan:
            'm 1155.0858,698.68115 c 0,0 -26.3474,-30.32202 -31.0572,-74.7232 -9.8933,-93.26779 -10.0744,-248.65838 -71.9379,-315.62429 -12.4478,-13.47454 -47.9109,-63.61914 -71.34841,-70.66865 -34.42814,-10.35525 -56.87471,25.7227 -56.87471,25.7227',
        bridgetown_villemstad:
            'm 1156.0911,696.67055 c 0,0 -80.3395,95.01888 -136.8498,111.14266 -32.69718,9.32928 -120.78873,23.11404 -159.29094,13.95712 -26.47223,-6.29586 -11.48002,-35.62838 -11.48002,-35.62838',
        bridgetown_marigo:
            'm 1157.0964,696.67055 c 0,0 -96.0626,-161.22887 -94.321,-250.40534 1.3772,-70.51495 82.2574,-194.94105 82.2574,-194.94105',
        bridgetown_cartagena:
            'm 1156.0911,698.68115 c 0,0 -380.44729,-80.02843 -516.69739,25.67481 -18.74858,14.54521 -37.34943,54.54421 -43.22246,84.91368 -5.89002,30.45732 0.97493,51.26426 0.97493,51.26426'
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
    <p>You are in: {ship.town}</p>

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
