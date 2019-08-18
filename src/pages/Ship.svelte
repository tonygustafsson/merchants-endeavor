<script>
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { game } from '../stores/game';
    import { ucFirst } from '../utils/string';

    $: ship = $ships.find(s => s.id === $game.route.id);

    const sellShip = ship => {
        const worth = shipTypes[ship.type].worth;

        ships.removeShip(ship.id);
        merchant.addDoubloons(worth);
        game.changeRoute('properties');
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

        <button disabled={ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>Send on mission</button>
        <button on:click={() => sellShip(ship)}>Sell ship</button>
    {:else}
        <p>Ship not found.</p>
    {/if}
</div>
