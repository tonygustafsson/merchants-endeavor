<script>
    import { merchant } from '../../stores/merchant.js';
    import { businessTypes, getRandomBusiness } from '../../utils/business';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import Modal from '../../components/Modal.svelte';
    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';

    let showBuyModal = false;

    const buyBusiness = businessType => {
        console.log('Buy');
    };
</script>

<div class="component-businesses">
    <h3>Businesses</h3>

    <p>
        <em>You do not own any businesses yet.</em>
    </p>

    <Button on:click={() => (showBuyModal = true)}>🏠 Buy businesses</Button>
</div>

{#if showBuyModal}
    <Modal on:close={() => (showBuyModal = false)}>
        <h3>Buy businesses</h3>

        <Button disabled={$merchant.doubloons < businessTypes.merchant.price} on:click={() => buyBusiness('brig')}>
            <img src="img/merchant.png" alt="Merchant" />
            Merchant
            <br />
            {businessTypes.merchant.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < businessTypes.blacksmith.price} on:click={() => buyBusiness('brig')}>
            <img src="img/blacksmith.png" alt="Blacksmith" />
            Blacksmith
            <br />
            {businessTypes.blacksmith.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < businessTypes.tavern.price} on:click={() => buyBusiness('brig')}>
            <img src="img/tavern.png" alt="Tavern" />
            Tavern
            <br />
            {businessTypes.tavern.price} dbl
        </Button>

        <Button disabled={$merchant.doubloons < businessTypes.brothel.price} on:click={() => buyBusiness('brig')}>
            <img src="img/brothel.png" alt="Brothel" />
            Brothel
            <br />
            {businessTypes.brothel.price} dbl
        </Button>
    </Modal>
{/if}
