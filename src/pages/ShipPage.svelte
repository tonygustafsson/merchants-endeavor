<script>
    import { ships } from '../stores/ships.js';
    import { game } from '../stores/game';

    import Mission from '../components/ship/Mission.svelte';
    import ShipInfo from '../components/ship/ShipInfo.svelte';
    import ShipActions from '../components/ship/ShipActions.svelte';
    import ShipContents from '../components/ship/ShipContents.svelte';
    import ShipMap from '../components/ship/ShipMap.svelte';

    $: ship = $ships.find(s => s.id === $game.route.id);
</script>

<div class="app-ship">
    <p>
        <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>&lt; Back to Properties</a>
    </p>

    {#if ship}
        <h2>Ship: {ship.name}</h2>

        <ShipMap {ship} />

        <Mission {ship} />

        <ShipInfo {ship} />

        <ShipActions {ship} />

        {#if !ship.onMission}
            <ShipContents {ship} />
        {/if}
    {:else}
        <p>Ship not found.</p>
    {/if}
</div>
