<script>
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

<style>
    td:first-child {
        width: 25%;
    }
    td:last-child {
        text-align: left;
    }
</style>

<div class="page-stats">
    <h2>General</h2>

    <p>
        Here you can see general information about you and how things are going. It will also be a place to view recent
        events.
    </p>

    <h3>{$merchant.name}</h3>

    <p>
        {#if $merchant.nationality === 'english'}
            🇬🇧
        {:else if $merchant.nationality === 'french'}
            🇫🇷
        {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
        You are trying to tame the carribean as a {ucFirst($merchant.nationality)} {$merchant.gender}. You started out {$time.sinceStart}.
    </p>

    <h3>Possessions</h3>

    <table>
        <tr>
            <td>Doubloons</td>
            <td>{$merchant.doubloons} dbl</td>
        </tr>
        <tr>
            <td>Ships</td>
            <td>{noOfShips} ships</td>
        </tr>
        <tr>
            <td>Cannons</td>
            <td>{$goods.cannons} pcs</td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>{noOfStaff} members</td>
        </tr>
        <tr>
            <td>Food</td>
            <td>{$goods.food} cartons</td>
        </tr>
        <tr>
            <td>Water</td>
            <td>{$goods.water} barrels</td>
        </tr>
    </table>
</div>
