<script>
    import { businesses } from '../stores/businesses.js';
    import { game } from '../stores/game';

    $: business = $businesses.find(s => s.id === $game.route.id);
</script>

<div class="app-business">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if business}
        <h2>Business: {business.name}</h2>
    {:else}
        <p>Business not found.</p>
    {/if}
</div>
