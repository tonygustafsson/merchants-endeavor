<script>
    import Ships from '../components/properties/Ships.svelte';
    import Businesses from '../components/properties/Businesses.svelte';
    import Loans from '../components/properties/Loans.svelte';
</script>

<div class="app-properties">
    <h2>Properties</h2>

    <p>Here you will see a list of things you own, like ships, buildings, corporations and stocks.</p>

    <Ships />

    <Businesses />

    <Loans />
</div>
