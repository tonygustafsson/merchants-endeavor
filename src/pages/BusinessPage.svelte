<script>
    import { businesses } from '../stores/businesses.js';
    import { game } from '../stores/game';
    import BusinessActions from '../components/business/BusinessActions.svelte';
    import BusinessContents from '../components/business/BusinessContents.svelte';
    import { time } from '../stores/time';

    $: business = $businesses.find(s => s.id === $game.route.id);
</script>

<div class="app-business">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if business}
        <h2>Business: {business.name}</h2>

        <p>Created {$time.getTimeAtTick(business.created)}</p>
        <p>Profit: {business.profit} dbl</p>

        <BusinessActions {business} />

        <BusinessContents {business} />
    {:else}
        <p>Business not found.</p>
    {/if}
</div>
