<script>
    import { time } from '../stores/time.js';
    import { merchant } from '../stores/merchant';
    import { ships } from '../stores/ships';
    import { staff } from '../stores/staff';
    import { goods } from '../stores/goods';
    import { game } from '../stores/game';
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
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>{$merchant.doubloons} dbl</a>
            </td>
        </tr>
        <tr>
            <td>Ships</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('properties')}>{noOfShips} ships</a>
            </td>
        </tr>
        <tr>
            <td>Cannons</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>{$goods.cannons} pcs</a>
            </td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('staff')}>{noOfStaff} members</a>
            </td>
        </tr>
        <tr>
            <td>Food</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>{$goods.food} cartons</a>
            </td>
        </tr>
        <tr>
            <td>Water</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>{$goods.water} barrels</a>
            </td>
        </tr>
    </table>
</div>
