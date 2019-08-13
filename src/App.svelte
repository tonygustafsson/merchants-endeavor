<script>
    import { ticker } from './stores/ticker.js';
    import { time } from './stores/time.js';

    import Loader from './components/Loader.svelte';
    import Time from './components/Time.svelte';
    import Inventory from './components/Inventory.svelte';
    import Crew from './components/Crew.svelte';
    import Ships from './components/Ships.svelte';
    import Weather from './components/Weather.svelte';
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
        <Loader />
        <Time />
        <Weather />
        <Inventory />
        <Crew />
        <Ships />
    </div>
</div>
