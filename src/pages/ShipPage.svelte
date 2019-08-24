<script>
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import { goods } from '../stores/goods.js';
    import { staff } from '../stores/staff.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { game } from '../stores/game';
    import { ucFirst } from '../utils/string';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';
    import RangeSlider from '../components/RangeSlider.svelte';
    import TextInput from '../components/TextInput.svelte';

    $: ship = $ships.find(s => s.id === $game.route.id);
    $: maxCrewMembers = ship ? ship.crewMembers + $staff.members : 0;
    $: maxCannons = ship ? ship.cannons + $goods.cannons : 0;
    $: maxFood = ship ? ship.food + $goods.food : 0;
    $: maxWater = ship ? ship.water + $goods.water : 0;

    const sellShip = ship => {
        const worth = shipTypes[ship.type].worth;

        ships.removeShip(ship.id);
        merchant.addDoubloons(worth);
        game.changeRoute('properties');
    };

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

    td {
        filter: grayscale(0.5);
    }
</style>

<div class="app-ship">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if ship}
        <h2>Ship: {ship.name}</h2>

        <Table>
            <tr>
                <th>Quality</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>⛵ Type</td>
                <td>{ucFirst(ship.type)}</td>
            </tr>
            <tr>
                <td>👫 Crew members</td>
                <td>{ship.crewMembers} (Min: {shipTypes[ship.type].crewMin} Max: {shipTypes[ship.type].crewMax})</td>
            </tr>
            <tr>
                <td>💣 Cannons</td>
                <td>{ship.cannons} / {shipTypes[ship.type].cannonsMax}</td>
            </tr>
            <tr>
                <td>🍲 Food</td>
                <td>{ship.food} cartons</td>
            </tr>
            <tr>
                <td>🥛 Water</td>
                <td>{ship.water} barrels</td>
            </tr>
            <tr>
                <td>💚 Health</td>
                <td>{ship.health}%</td>
            </tr>
            <tr>
                <td>⚖ Load</td>
                <td>{ship.food + ship.water} / {shipTypes[ship.type].loadCapacity}</td>
            </tr>
            <tr>
                <td>⛵ On mission</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        </Table>

        <h3>Actions</h3>

        <div>
            <TextInput
                label="Ship name"
                name="ship-name"
                value={ship.name}
                on:change={e => ships.setName(ship.id, e.target.value)} />
            <Button>Change name</Button>
        </div>

        <Button disabled={ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>⛵ Send on mission</Button>
        <Button on:click={() => sellShip(ship)}>⛵ Sell the ship</Button>

        <h3>Rearrange ship contents</h3>

        <div class="slider-container">
            <div>
                <RangeSlider
                    value={ship.crewMembers}
                    max={maxCrewMembers}
                    on:input={e => changeCrewMembersOnboard(e.target.value)}
                    label="👫 Crew members onboard <strong>({ship.crewMembers} onboard)</strong>" />
                {$staff.members} more available
            </div>

            <div>
                <RangeSlider
                    value={ship.cannons}
                    max={maxCannons}
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
    {:else}
        <p>Ship not found.</p>
    {/if}
</div>
