<script>
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import { shipTypes, getRandomShip } from '../utils/ship';
    import { game } from '../stores/game';
    import { log } from '../stores/log';
    import Modal from '../components/Modal.svelte';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';

    import { ucFirst } from '../utils/string';

    let showBuyModal = false;

    const buyShip = shipType => {
        game.setLoading(true);

        getRandomShip(shipType).then(newShip => {
            const price = shipTypes[shipType].price;

            ships.addShip(newShip);
            merchant.subtractDoubloons(price);
            log.add(`You bought a new ${newShip.type} named ${newShip.name} for ${price} dbl.`);
            game.setLoading(false);
        });
    };
</script>

<div class="app-properties">
    <h2>Properties</h2>

    <p>Here you will see a list of things you own, like ships, buildings, corporations and stocks.</p>

    <h3>Ships</h3>

    <Table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Health</th>
            <th>Load</th>
            <th>On mission</th>
        </tr>

        {#each $ships as ship, i}
            <tr style="cursor: pointer" on:click={() => game.changeRoute('properties', ship.id)}>
                <td>⛵ {ship.name}</td>
                <td>{ucFirst(ship.type)}</td>
                <td>{ship.health}%</td>
                <td>{ship.food + ship.water} / {shipTypes[ship.type].loadCapacity}</td>
                <td>{ship.onMission ? 'Yes' : 'No'}</td>
            </tr>
        {/each}
    </Table>

    <Button on:click={() => (showBuyModal = true)}>⛵ Buy ships</Button>

    {#if showBuyModal}
        <Modal on:close={() => (showBuyModal = false)}>
            <h3>Buy ships</h3>

            <p>Click on the ship you want and can afford.</p>

            <div>
                <Button disabled={$merchant.doubloons < shipTypes.brig.price} on:click={() => buyShip('brig')}>
                    ⛵ Buy brig ({shipTypes.brig.price} dbl)
                </Button>
            </div>
            <div>
                <Button
                    disabled={$merchant.doubloons < shipTypes.merchantman.price}
                    on:click={() => buyShip('merchantman')}>
                    ⛵ Buy merchantman ({shipTypes.merchantman.price} dbl)
                </Button>
            </div>
            <div>
                <Button disabled={$merchant.doubloons < shipTypes.galleon.price} on:click={() => buyShip('galleon')}>
                    ⛵ Buy galleon ({shipTypes.galleon.price} dbl)
                </Button>
            </div>
            <div>
                <Button disabled={$merchant.doubloons < shipTypes.frigate.price} on:click={() => buyShip('frigate')}>
                    ⛵ Buy frigate ({shipTypes.frigate.price} dbl)
                </Button>
            </div>
        </Modal>
    {/if}

    <h3>Corporations</h3>

    <p>You do not control any corporations yet.</p>

    <h3>Stocks</h3>

    <p>You have no stocks or bonds yet.</p>
</div>
