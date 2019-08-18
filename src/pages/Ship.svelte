<script>
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import { goods } from '../stores/goods.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { game } from '../stores/game';
    import { ucFirst } from '../utils/string';

    $: ship = $ships.find(s => s.id === $game.route.id);
    $: maxFood = ship ? ship.food + $goods.food : 0;
    $: maxWater = ship ? ship.water + $goods.water : 0;

    const sellShip = ship => {
        const worth = shipTypes[ship.type].worth;

        ships.removeShip(ship.id);
        merchant.addDoubloons(worth);
        game.changeRoute('properties');
    };

    const changeFoodOnboard = value => {
        value = parseInt(value, 10);

        if (value > ship.food) {
            // Add more food to ship
            goods.remove('food', value - ship.food);
        } else {
            // Remove food from
            goods.add('food', ship.food - value);
        }

        ships.changeFoodOnboard(ship.id, value);
    };

    const changeWaterOnboard = value => {
        value = parseInt(value, 10);

        if (value > ship.water) {
            // Add more water to ship
            goods.remove('water', value - ship.water);
        } else {
            // Remove water from
            goods.add('water', ship.water - value);
        }

        ships.changeWaterOnboard(ship.id, value);
    };
</script>

<div class="app-ship">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if ship}
        <h2>Ship: {ship.name}</h2>

        <table>
            <tr>
                <td>Type</td>
                <td>{ucFirst(ship.type)}</td>
            </tr>
            <tr>
                <td>Crew members</td>
                <td>{ship.crewMembers}</td>
            </tr>
            <tr>
                <td>Minimum crew</td>
                <td>{shipTypes[ship.type].crewMin}</td>
            </tr>
            <tr>
                <td>Maximum crew</td>
                <td>{shipTypes[ship.type].crewMax}</td>
            </tr>
            <tr>
                <td>Cannons onboard</td>
                <td>{ship.cannons}</td>
            </tr>
            <tr>
                <td>Maximum Cannons</td>
                <td>{shipTypes[ship.type].cannonsMax}</td>
            </tr>
            <tr>
                <td>Food onboard</td>
                <td>{ship.food} cartons</td>
            </tr>
            <tr>
                <td>Water onboard</td>
                <td>{ship.water} barrels</td>
            </tr>
            <tr>
                <td>Health</td>
                <td>{ship.health}%</td>
            </tr>
            <tr>
                <td>Current load</td>
                <td>0</td>
            </tr>
            <tr>
                <td>Maximum load</td>
                <td>{shipTypes[ship.type].loadCapacity}</td>
            </tr>
            <tr>
                <td>On mission</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        </table>

        <h3>Actions</h3>

        <div>
            <input type="text" value={ship.name} on:change={e => ships.setName(ship.id, e.target.value)} />
            <button>Save name</button>
        </div>

        <div>
            <label for="food">Food onboard</label>
            <input
                on:change={e => changeFoodOnboard(e.target.value)}
                type="range"
                name="food"
                value={ship.food}
                min="0"
                max={maxFood} />
            {ship.food} ({$goods.food} available)
        </div>

        <div>
            <label for="water">Water onboard</label>
            <input
                on:change={e => changeWaterOnboard(e.target.value)}
                type="range"
                name="water"
                value={ship.water}
                min="0"
                max={maxWater} />
            {ship.water} ({$goods.water} available)
        </div>

        <button disabled={ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>Send on mission</button>
        <button on:click={() => sellShip(ship)}>Sell ship</button>
    {:else}
        <p>Ship not found.</p>
    {/if}
</div>
