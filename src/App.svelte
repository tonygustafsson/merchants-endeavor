<script>
    import { game } from './stores/game';

    import Start from './pages/Start.svelte';
    import General from './pages/General.svelte';
    import Properties from './pages/Properties.svelte';
    import Ship from './pages/Ship.svelte';
    import Staff from './pages/Staff.svelte';
    import Goods from './pages/Goods.svelte';
    import Time from './components/Time.svelte';
    import Settings from './components/Settings.svelte';

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
        cursor: pointer;
    }
</style>

<div class="app">
    <Loader />

    <div class="container">
        <h1 on:click={() => game.changeRoute('general')}>Merchant Simulator</h1>

        {#if $game.route.page !== 'start'}
            <Time />
            <Weather />
            <Navigation />
            <Settings />
        {/if}
    </div>

    <div class="container white-panel">
        {#if gameLoaded}
            {#if $game.route.page === 'start'}
                <Start />
            {:else if $game.route.page === 'properties' && $game.route.id !== 0}
                <Ship />
            {:else if $game.route.page === 'properties'}
                <Properties />
            {:else if $game.route.page === 'staff'}
                <Staff />
            {:else if $game.route.page === 'goods'}
                <Goods />
            {:else}
                <General />
            {/if}
        {:else}
            <h2>Loading data...</h2>
        {/if}
    </div>
</div>
