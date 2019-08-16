<script>
    import Settings from '../components/Settings.svelte';
    import { time } from '../stores/time.js';
    import { merchant } from '../stores/merchant';
    import { ships } from '../stores/ships';
    import { staff } from '../stores/staff';
    import { goods } from '../stores/goods';
    import { ucFirst } from '../utils/string';

    let noOfShips = 0;
    let noOfStaff = 0;

    staff.subscribe(value => {
        noOfStaff = value.members;
    });

    ships.subscribe(value => {
        noOfShips = value.length;
    });
</script>

<div class="page-stats">
    <h2>{$merchant.name}</h2>

    <p>
        <strong>Gender:</strong>
        {ucFirst($merchant.gender)}
        <br />
        <strong>Nationality:</strong>
        {#if $merchant.nationality === 'english'}
            🇬🇧
        {:else if $merchant.nationality === 'french'}
            🇫🇷
        {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
        {ucFirst($merchant.nationality)}
        <br />
        <strong>Doubloons:</strong>
        {$merchant.doubloons}
        <br />
        <strong>Ships:</strong>
        {noOfShips}
        <br />
        <strong>Cannons:</strong>
        {$goods.cannons}
        <br />
        <strong>Staff:</strong>
        {noOfStaff}
        <br />
        <strong>Food:</strong>
        {$goods.food} cartons
        <br />
        <strong>Water:</strong>
        {$goods.water} barrels
        <br />
        <strong>Started out:</strong>
        {$time.sinceStart}
    </p>

    <Settings />
</div>
