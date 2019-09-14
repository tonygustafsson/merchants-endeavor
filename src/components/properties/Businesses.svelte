<script>
    import { merchant } from '../../stores/merchant.js';
    import { businesses } from '../../stores/businesses.js';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import { ticker } from '../../stores/ticker';
    import Modal from '../../components/Modal.svelte';
    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';
    import { types } from '../../constants/businesses';
    import { getRandomId, ucFirst } from '../../utils/string';
    import { getRandomLineFromFile } from '../../utils/fileReader';

    let showBuyModal = false;

    export const getRandomBusiness = (businessType, merchantName = 'Merchant') => {
        return getRandomLineFromFile(`../lists/businessName-${businessType}.txt`)
            .then(businessName => {
                merchantName = merchantName.split(' ')[0];
                businessName = businessName.replace('{0}', merchantName);
                let currentTick = $ticker;

                const business = {
                    id: getRandomId(32),
                    created: currentTick,
                    name: businessName,
                    type: businessType,
                    profit: 0,
                    staff: 0
                };

                return business;
            })
            .catch(err => {
                alert('Could not create business...');
            });
    };

    const buyBusiness = businessType => {
        game.setLoading(true);

        getRandomBusiness(businessType, $merchant.name).then(newBusiness => {
            const price = types[businessType].price;

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
                <th>Profit</th>
            </tr>

            {#each $businesses as business}
                <tr style="cursor: pointer" on:click={() => game.changeRoute('business', business.id)}>
                    <td>🏠 {business.name}</td>
                    <td>{ucFirst(business.type)}</td>
                    <td>{business.staff}</td>
                    <td>{business.profit} dbl</td>
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

        <Button disabled={$merchant.doubloons < types.merchant.price} on:click={() => buyBusiness('merchant')}>
            <img src="img/merchant.png" alt="Merchant" />
            Merchant
            <br />
            {types.merchant.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < types.blacksmith.price} on:click={() => buyBusiness('blacksmith')}>
            <img src="img/blacksmith.png" alt="Blacksmith" />
            Blacksmith
            <br />
            {types.blacksmith.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < types.tavern.price} on:click={() => buyBusiness('tavern')}>
            <img src="img/tavern.png" alt="Tavern" />
            Tavern
            <br />
            {types.tavern.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < types.brothel.price} on:click={() => buyBusiness('brothel')}>
            <img src="img/brothel.png" alt="Brothel" />
            Brothel
            <br />
            {types.brothel.price} dbl
        </Button>
    </Modal>
{/if}
