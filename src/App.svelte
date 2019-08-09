<script>
    import { ticker } from './stores/ticker.js';
    import { time } from './stores/time.js';

    import Time from './Time.svelte';
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

    h1 {
        width: 80%;
        margin: 0.5em 10%;
        text-shadow: 0px 0 20px #fff;
    }
</style>

<div class="app">
    <h1>Merchant Simulator</h1>

    <div class="container">
        <Time />
        <Weather />
        <Inventory />

        <h3>Actions</h3>
        <Crew />
        <Ships />
    </div>
</div>
