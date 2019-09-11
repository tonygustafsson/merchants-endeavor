<script>
    import { businesses } from '../stores/businesses.js';
    import { game } from '../stores/game';
    import BusinessActions from '../components/business/BusinessActions.svelte';

    $: business = $businesses.find(s => s.id === $game.route.id);
</script>

<div class="app-business">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if business}
        <h2>Business: {business.name}</h2>

        <BusinessActions {business} />
    {:else}
        <p>Business not found.</p>
    {/if}
</div>
