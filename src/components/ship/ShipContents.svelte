<script>
    import { ships } from '../../stores/ships.js';
    import { goods } from '../../stores/goods.js';
    import { staff } from '../../stores/staff.js';
    import { shipTypes } from '../../utils/ship';
    import Button from '../../components/Button.svelte';
    import RangeSlider from '../../components/RangeSlider.svelte';

    export let ship;

    $: currentLoad = ship ? ship.food + ship.water : 0;

    $: maxCrewMembers = () => {
        if (!ship) return 0;

        if (ship.crewMembers + $staff.members > shipTypes[ship.type].crewMax) {
            return shipTypes[ship.type].crewMax;
        }

        return ship.crewMembers + $staff.members;
    };
    $: maxCannons = () => {
        if (!ship) return 0;

        if (ship.cannons + $goods.cannons > shipTypes[ship.type].cannonsMax) {
            return shipTypes[ship.type].cannonsMax;
        }

        return ship.cannons + $goods.cannons;
    };
    $: maxFood = ship ? ship.food + $goods.food : 0;
    $: maxWater = ship ? ship.water + $goods.water : 0;

    const changeGoodsOnboard = (item, value) => {
        const approvedItems = ['food', 'water', 'cannons'];
        if (!approvedItems.includes(item)) return;

        value = parseInt(value, 10);

        if (value > ship[item]) {
            // Add more of the item to ship
            goods.remove(item, value - ship[item]);
        } else {
            // Remove the item from ship
            goods.add(item, ship[item] - value);
        }

        ships.changeItemsOnboard(ship.id, item, value);
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
                on:input={e => changeGoodsOnboard('cannons', e.target.value)}
                label="💣 Cannons <strong>({ship.cannons} onboard)</strong>" />
            {$goods.cannons} more available
        </div>

        <div>
            <RangeSlider
                value={ship.food}
                max={maxFood}
                on:input={e => changeGoodsOnboard('food', e.target.value)}
                label="🍲 Food <strong>({ship.food} onboard)</strong>" />
            {$goods.food} more available
        </div>

        <div>
            <RangeSlider
                value={ship.water}
                max={maxWater}
                on:input={e => changeGoodsOnboard('water', e.target.value)}
                label="🥛 Water <strong>({ship.water} onboard)</strong>" />
            {$goods.water} more available
        </div>
    </div>
</div>
