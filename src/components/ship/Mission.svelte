<script>
    import { ships } from '../../stores/ships.js';
    import { staff } from '../../stores/staff.js';
    import { shipTypes } from '../../utils/ship';
    import Button from '../Button.svelte';

    export let ship;

    $: currentLoad = ship ? ship.food + ship.water : 0;
    $: loadLeft = ship ? shipTypes[ship.type].loadCapacity - currentLoad : 0;
    $: minFood = ship ? ship.crewMembers * 4 : 0;
    $: minWater = ship ? ship.crewMembers * 8 : 0;

    $: readyForMission = () => {
        if (!ship) return false;
        if (loadLeft < 0) return false;
        if (ship.health < 0) return false;
        if (ship.crewMembers < shipTypes[ship.type].crewMin) return false;
        if (ship.food < minFood) return false;
        if (ship.water < minWater) return false;
        if (staff.mood <= 0) return false;
        if (staff.health <= 0) return false;

        return true;
    };
</script>

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

<div class="component-mission">
    <h3>Mission</h3>

    {#if ship.onMission}
        <p>This ship is on a mission. Please wait for it to come back.</p>
    {:else if readyForMission()}
        <p>Everything seems fine. You are ready for a mission.</p>
    {:else}
        {#if ship.crewMembers < shipTypes[ship.type].crewMin}
            <p>
                <span class="warning-sign">⚠</span>
                There needs to be at least {shipTypes[ship.type].crewMin} crew members to sail.
            </p>
        {/if}
        {#if loadLeft < 0}
            <p>
                <span class="warning-sign">⚠</span>
                The ship is over loaded, it can only hold {shipTypes[ship.type].loadCapacity} cartons.
            </p>
        {/if}
        {#if ship.health < 0}
            <p>
                <span class="warning-sign">⚠</span>
                The ship is to damaged to travel, you should repair it first.
            </p>
        {/if}
        {#if ship.food < minFood}
            <p>
                <span class="warning-sign">⚠</span>
                You have to little food on the ship to travel, you need at least {minFood} cartons.
            </p>
        {/if}
        {#if ship.water < minWater}
            <p>
                <span class="warning-sign">⚠</span>
                You have to little water on the ship to travel, you need at least {minWater} barrels.
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

    <Button disabled={!readyForMission() || ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>
        ⛵ Send on mission
    </Button>
</div>
