<script>
    import { game } from './stores/game';

    import Start from './pages/Start.svelte';
    import General from './pages/General.svelte';
    import Properties from './pages/Properties.svelte';
    import Staff from './pages/Staff.svelte';
    import Goods from './pages/Goods.svelte';
    import Time from './components/Time.svelte';

    import Weather from './components/Weather.svelte';
    import Navigation from './components/Navigation.svelte';
    import Loader from './components/Loader.svelte';

    let gameLoaded = false;

    let unsubscribe = game.subscribe(value => {
        if (value.loaded === true) {
            gameLoaded = value.loaded;
            unsubscribe();
        }
    });
</script>

<style>
    .container {
        width: 80%;
        margin: 1rem auto;
        padding: 1rem;
    }
    .white-panel {
        background: rgba(255, 255, 255, 0.8);
    }
    h1 {
        text-shadow: 0px 0 20px #fff;
        margin: 0;
    }
</style>

<div class="app">
    <Loader />
    <Weather />

    <div class="container">
        <h1>Merchant Simulator</h1>

        {#if $game.route !== 'start'}
            <Time />
            <Navigation />
        {/if}
    </div>

    <div class="container white-panel">
        {#if gameLoaded}
            {#if $game.route === 'start'}
                <Start />
            {:else if $game.route === 'properties'}
                <Properties />
            {:else if $game.route === 'staff'}
                <Staff />
            {:else if $game.route === 'goods'}
                <Goods />
            {:else}
                <General />
            {/if}
        {:else}
            <h2>Loading data...</h2>
        {/if}
    </div>
</div>
