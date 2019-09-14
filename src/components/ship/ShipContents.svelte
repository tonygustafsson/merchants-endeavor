<script>
    import { ships } from '../../stores/ships.js';
    import { goods } from '../../stores/goods.js';
    import { staff } from '../../stores/staff.js';
    import { types } from '../../constants/ships';
    import Button from '../../components/Button.svelte';
    import RangeSlider from '../../components/RangeSlider.svelte';

    export let ship;

    $: maxCrewMembers = () => {
        if (!ship) return 0;

        if (ship.crewMembers + $staff.members > types[ship.type].crewMax) {
            return types[ship.type].crewMax;
        }

        return ship.crewMembers + $staff.members;
    };

    $: maxCannons = () => {
        if (!ship) return 0;

        if (ship.cannons + $goods.cannons > types[ship.type].cannonsMax) {
            return types[ship.type].cannonsMax;
        }

        return ship.cannons + $goods.cannons;
    };

    const changeCannons = value => {
        value = parseInt(value, 10);

        if (value > ship.cannons) {
            // Add more cannons to ship
            goods.remove('cannons', value - ship.cannons);
        } else {
            // Remove cannons from ship
            goods.add('cannons', ship.cannons - value);
        }

        ships.changeItemsOnboard(ship.id, 'cannons', value);
    };

    const changeCrewMembersOnboard = value => {
        value = parseInt(value, 10);

        if (value > ship.crewMembers) {
            // Add more crew members to ship
            staff.remove(value - ship.crewMembers);
        } else {
            // Remove crew members from ship
            staff.add(ship.crewMembers - value);
        }

        ships.changeItemsOnboard(ship.id, 'crewMembers', value);
    };
</script>

<style>
    .slider-container {
        width: 50%;
    }

    .slider-container > div {
        background: #fff;
        padding: 0.5em;
        margin-bottom: 1.5em;
    }
</style>

<div class="component-shipcontents">
    <h3>Rearrange ship contents</h3>

    <div class="slider-container">
        <div>
            <RangeSlider
                value={ship.crewMembers}
                max={maxCrewMembers()}
                on:input={e => changeCrewMembersOnboard(e.target.value)}
                label="👫 Crew members onboard <strong>({ship.crewMembers} onboard)</strong>" />
            {$staff.members} more available
        </div>

        <div>
            <RangeSlider
                value={ship.cannons}
                max={maxCannons()}
                on:input={e => changeCannons(e.target.value)}
                label="💣 Cannons <strong>({ship.cannons} onboard)</strong>" />
            {$goods.cannons} more available
        </div>
    </div>
</div>
