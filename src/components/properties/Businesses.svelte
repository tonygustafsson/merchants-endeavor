<script>
    import { merchant } from '../../stores/merchant.js';
    import { businesses } from '../../stores/businesses.js';
    import { businessTypes, getRandomBusiness } from '../../utils/business';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import Modal from '../../components/Modal.svelte';
    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';
    import { ucFirst } from '../../utils/string';

    let showBuyModal = false;

    const buyBusiness = businessType => {
        game.setLoading(true);

        getRandomBusiness(businessType).then(newBusiness => {
            const price = businessTypes[businessType].price;

            businesses.add(newBusiness);
            merchant.subtractDoubloons(price);
            log.add(`You bought a new ${newBusiness.type} business named ${newBusiness.name} for ${price} dbl.`);
            game.setLoading(false);
        });
    };
</script>

<div class="component-businesses">
    <h3>Businesses</h3>

    {#if $businesses.length > 0}
        <Table>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Staff</th>
            </tr>

            {#each $businesses as business}
                <tr style="cursor: pointer" on:click={() => game.changeRoute('business', business.id)}>
                    <td>🏠 {business.name}</td>
                    <td>{ucFirst(business.type)}</td>
                    <td>{business.staff}</td>
                </tr>
            {/each}
        </Table>
    {:else}
        <p>
            <em>You do not own any businesses yet.</em>
        </p>
    {/if}

    <Button on:click={() => (showBuyModal = true)}>🏠 Buy businesses</Button>
</div>

{#if showBuyModal}
    <Modal on:close={() => (showBuyModal = false)}>
        <h3>Buy businesses</h3>

        <Button disabled={$merchant.doubloons < businessTypes.merchant.price} on:click={() => buyBusiness('merchant')}>
            <img src="img/merchant.png" alt="Merchant" />
            Merchant
            <br />
            {businessTypes.merchant.price} dbl
        </Button>

        <Button
            disabled={$merchant.doubloons < businessTypes.blacksmith.price}
            on:click={() => buyBusiness('blacksmith')}>
            <img src="img/blacksmith.png" alt="Blacksmith" />
            Blacksmith
            <br />
            {businessTypes.blacksmith.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < businessTypes.tavern.price} on:click={() => buyBusiness('tacern')}>
            <img src="img/tavern.png" alt="Tavern" />
            Tavern
            <br />
            {businessTypes.tavern.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < businessTypes.brothel.price} on:click={() => buyBusiness('brothel')}>
            <img src="img/brothel.png" alt="Brothel" />
            Brothel
            <br />
            {businessTypes.brothel.price} dbl
        </Button>
    </Modal>
{/if}
