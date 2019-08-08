<script>
    import { ticker } from './stores/ticker.js';

    import Inventory from './Inventory.svelte';
    import Crew from './Crew.svelte';
    import Ships from './Ships.svelte';
    import Weather from './Weather.svelte';
</script>

<style>
    .container {
        width: 80%;
        margin: 1em 10%;
        background: rgba(255, 255, 255, 0.8);
        padding: 1em;
        position: relative;
    }
</style>

<div class="app">
    <div class="container">
        <h1>Merchant Simulator</h1>

        <p>Tick: {$ticker}</p>

        <Weather />

        <Inventory />

        <Crew />

        <Ships />
    </div>
</div>
