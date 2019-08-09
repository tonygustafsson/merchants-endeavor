<script>
    import { ships } from '../stores/ships.js';

    let noOfShips = 0;

    ships.subscribe(value => {
        noOfShips = value.ships.length;
    });
</script>

<h3>Ships</h3>

<table>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Health</th>
        <th>Actions</th>
    </tr>

    {#each $ships.ships as ship, i}
        <tr>
            <td>{ship.name}</td>
            <td>{ship.type}</td>
            <td>{ship.health}</td>
            <td>
                {#if !ship.onMission}
                    <a href="sendOnMission/{ship.id}" on:click|preventDefault={() => ships.sendOnMission(ship.id)}>
                        Send on mission
                    </a>
                {:else}On mission{/if}
                <a href="removeShip/{ship.id}" on:click|preventDefault={() => ships.removeShip(ship.id)}>x</a>
            </td>
        </tr>
    {/each}
</table>

<button disabled={noOfShips >= 10} on:click={ships.addShip}>Buy ships</button>
