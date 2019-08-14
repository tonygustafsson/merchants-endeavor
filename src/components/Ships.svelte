<script>
    import { ships } from '../stores/ships.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { loader } from '../stores/loader';
    import Modal from './Modal.svelte';
    import { ucFirst } from '../utils/string';

    let noOfShips = 0;

    ships.subscribe(value => {
        noOfShips = value.length;
    });

    const addNewShip = () => {
        loader.setLoading(true);

        getRandomShip().then(newShip => {
            ships.addShip(newShip);
            loader.setLoading(false);
        });
    };
</script>

<h3>Ships</h3>

<table>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Health</th>
        <th>Min/Max Crew</th>
        <th>Max cannons</th>
        <th>Max load</th>
        <th>On mission</th>
    </tr>

    {#each $ships as ship, i}
        <tr>
            <td>
                <a href="showship" on:click|preventDefault={() => ships.toggleModal(ship.id)}>⛵ {ship.name}</a>
            </td>
            <td>{ucFirst(ship.type)}</td>
            <td>{ship.health}</td>
            <td>{shipTypes[ship.type].crewMin}/{shipTypes[ship.type].crewMax}</td>
            <td>{shipTypes[ship.type].cannonsMax}</td>
            <td>{shipTypes[ship.type].loadCapacity}</td>
            <td>{ship.onMission ? 'Yes' : 'No'}</td>
        </tr>
    {/each}
</table>

{#each $ships as ship, i}
    {#if ship.showModal}
        <Modal on:close={() => ships.toggleModal(ship.id)}>
            <h3>{ship.name}</h3>

            <input type="text" value={ship.name} on:change={e => ships.setName(ship.id, e.target.value)} />
            <button>Save name</button>

            <p>Type: {ship.type}</p>
            <p>Health: {ship.health}</p>
            <p>On mission: {ship.onMission ? 'Yes' : 'No'}</p>

            <button disabled={ship.onMission} on:click={() => ships.sendOnMission(ship.id)}>Send on mission</button>
            <button on:click={() => ships.removeShip(ship.id)}>Remove ship</button>
        </Modal>
    {/if}
{/each}

<button disabled={noOfShips >= 10} on:click={addNewShip}>Buy ships</button>
