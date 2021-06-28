<script>
    import { ships } from '../../stores/ships.js';
    import { staff } from '../../stores/staff.js';
    import { goods } from '../../stores/goods.js';
    import { log } from '../../stores/log.js';
    import {
        types,
        minFoodPerCrewMemberForMission,
        minWaterPerCrewMemberForMission,
        minShipHealthForMission,
        minCrewHealthForMission,
        minCrewMoodForMission
    } from '../../constants/ships';
    import Button from '../Button.svelte';

    export let ship;

    $: minFood = ship ? ship.crewMembers * minFoodPerCrewMemberForMission : 0;
    $: minWater = ship ? ship.crewMembers * minWaterPerCrewMemberForMission : 0;

    $: readyForMission = () => {
        if (!ship) return false;
        if (ship.health <= minShipHealthForMission) return false;
        if (ship.crewMembers < types[ship.type].crewMin) return false;
        if (ship.cannons < types[ship.type].cannonsMin) return false;
        if ($goods.food < minFood) return false;
        if ($goods.water < minWater) return false;
        if (staff.mood <= minCrewMoodForMission) return false;
        if (staff.health <= minCrewHealthForMission) return false;

        return true;
    };

    const sendOnMission = () => {
        goods.remove('food', minFood);
        goods.remove('water', minWater);
        ships.sendOnMission(ship.id);

        log.add(`You sent your ${ship.type} ${ship.name} on a mission.`);
    };
</script>

<div class="component-mission">
    <h3>Mission</h3>

    {#if ship.onMission}
        <p>This ship is on a mission. Please wait for it to come back.</p>
    {:else if readyForMission()}
        <p>Everything seems fine. You are ready for a mission.</p>
    {:else}
        {#if ship.crewMembers < types[ship.type].crewMin}
            <p>
                <span class="warning-sign">⚠</span>
                There needs to be at least {types[ship.type].crewMin} crew members to sail.
            </p>
        {/if}
        {#if ship.cannons < types[ship.type].cannonsMin}
            <p>
                <span class="warning-sign">⚠</span>
                You need at least {types[ship.type].cannonsMin} cannons to sail.
            </p>
        {/if}
        {#if ship.health < 0}
            <p>
                <span class="warning-sign">⚠</span>
                The ship is to damaged to travel, you should repair it first.
            </p>
        {/if}
        {#if $goods.food < minFood}
            <p>
                <span class="warning-sign">⚠</span>
                You have to little food on the ship to travel, you need at least {minFood} cartons available.
            </p>
        {/if}
        {#if $goods.water < minWater}
            <p>
                <span class="warning-sign">⚠</span>
                You have to little water on the ship to travel, you need at least {minWater} barrels available.
            </p>
        {/if}
        {#if staff.mood <= 0}
            <p>
                <span class="warning-sign">⚠</span>
                Your crew is unhappy with their labor and rewards, you should try to please them.
            </p>
        {/if}
        {#if staff.health <= 0}
            <p>
                <span class="warning-sign">⚠</span>
                Your crew is in need of health care, you should try to attend to their needs.
            </p>
        {/if}
    {/if}

    <Button disabled={!readyForMission() || ship.onMission} on:click={sendOnMission}>⛵ Send on mission</Button>
</div>

<style>
    h3 {
        margin-top: 0;
    }

    .warning-sign {
        color: orange;
        font-size: 160%;
        font-weight: bold;
        vertical-align: middle;
        margin-right: 0.25em;
    }
</style>
