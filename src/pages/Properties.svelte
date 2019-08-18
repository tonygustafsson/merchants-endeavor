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

<style>
    .overview tr {
        cursor: pointer;
    }
</style>

<div class="app-properties">
    <h2>Properties</h2>

    <p>Here you will see a list of things you own, like ships, buildings, corporations and stocks.</p>

    <h3>Ships</h3>

    <table class="overview">
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Health</th>
            <th>Load</th>
            <th>On mission</th>
        </tr>

        {#each $ships as ship, i}
            <tr on:click={() => game.changeRoute('properties', ship.id)}>
                <td>⛵ {ship.name}</td>
                <td>{ucFirst(ship.type)}</td>
                <td>{ship.health}%</td>
                <td>{ship.food + ship.water} / {shipTypes[ship.type].loadCapacity}</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        {/each}
    </table>

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

    <h3>Corporations</h3>

    <p>You do not control any corporations yet.</p>

    <h3>Stocks</h3>

    <p>You have no stocks or bonds yet.</p>
</div>
