<script>
    import { ships } from '../../stores/ships.js';
    import { merchant } from '../../stores/merchant.js';
    import { shipTypes, getRandomShip } from '../../utils/ship';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import Modal from '../../components/Modal.svelte';
    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';
    import { ucFirst } from '../../utils/string';

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

<div class="component-ships">
    <h3>Ships</h3>

    {#if $ships.length > 0}
        <Table>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Health</th>
                <th>Crew</th>
                <th>Cannons</th>
                <th>On mission</th>
            </tr>

            {#each $ships as ship}
                <tr style="cursor: pointer" on:click={() => game.changeRoute('ship', ship.id)}>
                    <td>⛵ {ship.name}</td>
                    <td>{ucFirst(ship.type)}</td>
                    <td>{ship.health}%</td>
                    <td>{ship.crewMembers}</td>
                    <td>{ship.cannons}</td>
                    <td>{ship.onMission ? 'Yes' : 'No'}</td>
                </tr>
            {/each}
        </Table>
    {:else}
        <p>
            <em>You do not own any ships yet.</em>
        </p>
    {/if}

    <Button on:click={() => (showBuyModal = true)}>⛵ Buy ships</Button>

    {#if showBuyModal}
        <Modal on:close={() => (showBuyModal = false)}>
            <h3>Buy ships</h3>

            <p>Click on the ship you want and can afford.</p>

            <Button disabled={$merchant.doubloons < shipTypes.brig.price} on:click={() => buyShip('brig')}>
                <img src="img/brig.jpg" alt="Brig" />
                Brig
                <br />
                {shipTypes.brig.price} dbl
            </Button>

            <Button
                disabled={$merchant.doubloons < shipTypes.merchantman.price}
                on:click={() => buyShip('merchantman')}>
                <img src="img/merchantman.jpg" alt="Merchantman" />
                Merchantman
                <br />
                {shipTypes.merchantman.price} dbl
            </Button>

            <Button disabled={$merchant.doubloons < shipTypes.galleon.price} on:click={() => buyShip('galleon')}>
                <img src="img/galleon.jpg" alt="Galleon" />
                Galleon
                <br />
                {shipTypes.galleon.price} dbl
            </Button>

            <Button disabled={$merchant.doubloons < shipTypes.frigate.price} on:click={() => buyShip('frigate')}>
                <img src="img/frigate.jpg" alt="Frigate" />
                Frigate
                <br />
                {shipTypes.frigate.price} dbl
            </Button>
        </Modal>
    {/if}
</div>
