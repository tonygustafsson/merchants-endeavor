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
            <th>On mission</th>
        </tr>

        {#each $ships as ship, i}
            <tr on:click={() => ships.toggleModal(ship.id)}>
                <td>⛵ {ship.name}</td>
                <td>{ucFirst(ship.type)}</td>
                <td>{ship.health}</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        {/each}
    </table>

    {#each $ships as ship, i}
        {#if ship.showModal}
            <Modal on:close={() => ships.toggleModal(ship.id)}>
                <h3>{ship.name}</h3>

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

    <h3>Corporations</h3>

    <p>You do not control any corporations yet.</p>

    <h3>Stocks</h3>

    <p>You have no stocks or bonds yet.</p>
</div>
