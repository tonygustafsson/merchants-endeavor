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
    input[type='range'] {
        width: 40%;
        margin: 1em;
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
                <th>Ship quality</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Type</td>
                <td>{ucFirst(ship.type)}</td>
            </tr>
            <tr>
                <td>Crew members</td>
                <td>{ship.crewMembers} (Min: {shipTypes[ship.type].crewMin} Max: {shipTypes[ship.type].crewMax})</td>
            </tr>
            <tr>
                <td>Cannons</td>
                <td>{ship.cannons} / {shipTypes[ship.type].cannonsMax}</td>
            </tr>
            <tr>
                <td>Food</td>
                <td>{ship.food} cartons</td>
            </tr>
            <tr>
                <td>Water</td>
                <td>{ship.water} barrels</td>
            </tr>
            <tr>
                <td>Health</td>
                <td>{ship.health}%</td>
            </tr>
            <tr>
                <td>Load</td>
                <td>{ship.food + ship.water} / {shipTypes[ship.type].loadCapacity}</td>
            </tr>
            <tr>
                <td>On mission</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        </Table>

        <h3>Actions</h3>

        <div>
            <input type="text" value={ship.name} on:change={e => ships.setName(ship.id, e.target.value)} />
            <Button>Change name</Button>
        </div>

        <Button disabled={ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>Send on mission</Button>
        <Button on:click={() => sellShip(ship)}>Sell the ship</Button>

        <h3>Rearrange ship contents</h3>

        <div>
            <label for="crewMembers">
                Crew members onboard
                <strong>({ship.crewMembers} onboard)</strong>
            </label>
            <input
                on:input={e => changeCrewMembersOnboard(e.target.value)}
                type="range"
                name="crewMembers"
                value={ship.crewMembers}
                min="0"
                max={maxCrewMembers} />
            {$staff.members} more available
        </div>

        <div>
            <label for="cannons">
                Cannons
                <strong>({ship.cannons} onboard)</strong>
            </label>
            <input
                on:input={e => changeGoodsOnboard('cannons', e.target.value)}
                type="range"
                name="cannons"
                value={ship.cannons}
                min="0"
                max={maxCannons} />
            {$goods.cannons} more available
        </div>

        <div>
            <label for="food">
                Food
                <strong>({ship.food} onboard)</strong>
            </label>
            <input
                on:input={e => changeGoodsOnboard('food', e.target.value)}
                type="range"
                name="food"
                value={ship.food}
                min="0"
                max={maxFood} />
            {$goods.food} more available
        </div>

        <div>
            <label for="water">
                Water
                <strong>({ship.water} onboard)</strong>
            </label>
            <input
                on:input={e => changeGoodsOnboard('water', e.target.value)}
                type="range"
                name="water"
                value={ship.water}
                min="0"
                max={maxWater} />
            {$goods.water} more available
        </div>
    {:else}
        <p>Ship not found.</p>
    {/if}
</div>
