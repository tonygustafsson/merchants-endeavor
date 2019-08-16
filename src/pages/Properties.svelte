<script>
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { game } from '../stores/game';
    import Modal from '../components/Modal.svelte';
    import { ucFirst } from '../utils/string';

    let showBuyModal = false;

    const buyShip = shipType => {
        game.setLoading(true);

        getRandomShip(shipType).then(newShip => {
            const price = shipTypes[shipType].price;

            ships.addShip(newShip);
            merchant.subtractDoubloons(price);
            game.setLoading(false);
        });
    };

    const sellShip = ship => {
        const worth = shipTypes[ship.type].worth;

        ships.removeShip(ship.id);
        merchant.addDoubloons(worth);
    };
</script>

<div class="app-properties">
    <h2>Properties</h2>

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
                <button on:click={() => sellShip(ship)}>Sell ship</button>
            </Modal>
        {/if}
    {/each}

    <button on:click={() => (showBuyModal = true)}>Buy ships</button>

    {#if showBuyModal}
        <Modal on:close={() => (showBuyModal = false)}>
            <h3>Buy ships</h3>

            <button disabled={$merchant.doubloons < shipTypes.brig.price} on:click={() => buyShip('brig')}>
                Buy brig ({shipTypes.brig.price} dbl)
            </button>
            <button
                disabled={$merchant.doubloons < shipTypes.merchantman.price}
                on:click={() => buyShip('merchantman')}>
                Buy merchantman ({shipTypes.merchantman.price} dbl)
            </button>
            <button disabled={$merchant.doubloons < shipTypes.galleon.price} on:click={() => buyShip('galleon')}>
                Buy galleon ({shipTypes.galleon.price} dbl)
            </button>
            <button disabled={$merchant.doubloons < shipTypes.frigate.price} on:click={() => buyShip('frigate')}>
                Buy frigate ({shipTypes.frigate.price} dbl)
            </button>
        </Modal>
    {/if}

</div>
