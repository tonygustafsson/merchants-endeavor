<script>
    import Merchant from '../components/Merchant.svelte';
    import Time from '../components/Time.svelte';
    import Inventory from '../components/Inventory.svelte';
    import Crew from '../components/Crew.svelte';
    import Ships from '../components/Ships.svelte';
    import Weather from '../components/Weather.svelte';
    import Settings from '../components/Settings.svelte';
</script>

<div class="page-stats">
    <Time />
    <Weather />
    <Merchant />
    <Inventory />
    <Crew />
    <Ships />
    <Settings />
</div>
